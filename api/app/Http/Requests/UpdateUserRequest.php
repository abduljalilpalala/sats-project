<?php

namespace App\Http\Requests;

use App\Enums\EmploymentStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id_number' => ['nullable', 'max:255'],
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', "unique:users,email," . $this->request->get('id') . ""],
            'contact_number' => ['required', 'min:11', 'max:11'],
            'batch_id' => ['required'],
            'birth_date' => ['required', 'date', 'max:255'],
            'employment_status_id' => ['required', "in:" . EmploymentStatusEnum::EMPLOYED->value . "," . EmploymentStatusEnum::UNEMPLOYED->value . "," . EmploymentStatusEnum::SELF_EMPLOYED->value . ""],
            'course_id' => ['nullable'],
            'job_id' => ['nullable'],
            'work_place' => ['nullable', 'max:255'],
            'company_name' => ['nullable', 'max:255'],
            'position' => ['nullable', 'max:255'],
            'work_id' => ['mimes:jpeg,jpg,png', 'max:2048']
        ];
    }

    public function allowed()
    {
        return $this->except(['job_id', 'work_place', 'position', 'work_id', 'company_name']);
    }
}
