<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\ApplicationStatusEnum;
use App\Enums\EmploymentStatusEnum;
use App\Enums\RoleEnum;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use Symfony\Component\HttpFoundation\Response;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function avatar()
    {
        return $this->media()->where('collection_name', 'avatar');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')->singleFile();
    }

    public function employmentStatus()
    {
        return $this->belongsTo(EmploymentStatus::class);
    }

    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function job()
    {
        return $this->hasOne(Job::class);
    }

    public function number()
    {
        return $this
            ->where('is_verified', ApplicationStatusEnum::APPROVED)
            ->get('contact_number');
    }

    public function scopeApplicants($query)
    {
        return $query->where('role_id', RoleEnum::USER);
    }

    public function scopeApproved($query)
    {
        return $query->where('is_verified', ApplicationStatusEnum::APPROVED);
    }

    public function scopePending($query)
    {
        return $query->where('is_verified', ApplicationStatusEnum::PENDING);
    }

    public function scopeEmail($query, $email)
    {
        return $query->where('email', $email);
    }

    public function scopeFilterBatch($query, $batch)
    {
        return $query->where('batch_id', $batch);
    }

    public function scopeFilterCourse($query, $course)
    {
        return $query->where('course_id', $course);
    }

    public function scopeEmployed($query)
    {
        return $query->where('employment_status_id', EmploymentStatusEnum::EMPLOYED);
    }

    public function scopeUnEmployed($query)
    {
        return $query->where('employment_status_id', EmploymentStatusEnum::UNEMPLOYED);
    }

    public function scopeSelfEmployed($query)
    {
        return $query->where('employment_status_id', EmploymentStatusEnum::SELF_EMPLOYED);
    }

    public function approveApplication()
    {
        return $this->update(['is_verified' => ApplicationStatusEnum::APPROVED]);
    }

    public function rejectApplication()
    {
        return $this->deleteOrFail();
    }

    public function updateAvatar($request)
    {
        if ($request->hasFile('avatar')) {
            $this->addMedia($request->file('avatar'))
                ->preservingOriginal()->toMediaCollection('avatar');
            return response()->noContent();
        }
        return response()->json(['Error: ' => 'Ooops, Something went wrong'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function removeAvatar()
    {
        $this->addMedia(public_path('assets/avatars/default.png'))
            ->preservingOriginal()->toMediaCollection('avatar');
        return response()->noContent();
    }

    static public function registerApplicant($request)
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'id_number' => $request->id_number,
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'birth_date' => $request->birth_date,
                'contact_number' => $request->contact_number,
                'batch_id' => $request->batch,
                'employment_status_id' => $request->employment_status,
                'course_id' => $request->course_id,
            ]);

            if (intval($request->employment_status) === EmploymentStatusEnum::EMPLOYED->value) {
                $job = $user->job()->create([
                    'work_place' => $request->work_place,
                    'company_name' => $request->company_name,
                    'position' => $request->position
                ]);

                $job->addMedia($request->file('work_id'))
                ->preservingOriginal()->toMediaCollection('work_id');
            }

            DB::commit();
            return response()->noContent();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateUserDetails($request)
    {
        $this->update($request->validated());
    }

    public static function boot()
    {
        parent::boot();

        self::created(function (User $user) {
            $user->addMedia(public_path('assets/avatars/default.png'))
                ->preservingOriginal()->toMediaCollection('avatar');
        });
    }
}
