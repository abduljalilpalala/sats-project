<?php

namespace App\Http\Requests;

use App\Enums\EmploymentStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserAboutRequest extends FormRequest
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
            'birth_date' => ['required', 'date', 'max:255'],
            'employment_status_id' => ['required'],
            'job_id' => ['nullable'],
            'work_place' => ['nullable', 'max:255'],
            'company_name' => ['nullable', 'max:255'],
            'position' => ['nullable', 'max:255'],
            'work_id' => ['nullable', 'mimes:jpeg,jpg,png', 'max:2048']
        ];
    }
}
