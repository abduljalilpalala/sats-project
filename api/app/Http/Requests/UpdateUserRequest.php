<?php

namespace App\Http\Requests;

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
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', "unique:users,email," . $this->request->get('id') . ""],
            'contact_number' => ['required', 'min:11', 'max:11'],
            'id_number' => ['nullable', 'max:255'],
            'birth_date' => ['required', 'date', 'max:255'],
            'employment_status_id' => ['nullable'],
            'course_id' => ['nullable']
        ];
    }
}
