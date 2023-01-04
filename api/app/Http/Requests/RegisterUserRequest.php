<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
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
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
      'birth_date' => ['date', 'required'],
      'batch' => ['required'],
      'course_id' => ['required'],
      'contact_number' => ['required', 'min:11', 'max:11'],
      'employment_status' => ['required'],
      'work_place' => ['nullable', 'max:255'],
      'company_name' => ['nullable', 'max:255'],
      'position' => ['nullable', 'max:255'],
    ];
  }
}
