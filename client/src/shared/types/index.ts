export type User = {
  id_number?: any
  batch: string
  course_id: string
  name: string
  email: string
  birth_date: string
  contact_number: string
  employment_status: string
  work_place: string
  company_name: string
  position: string
  work_id: any
  role?: number
  is_verified?: boolean | number
  password: string
  password_confirmation: string
}

export type AxiosResponseError = {
  status: number | undefined
  content: any
}

export type Password = {
  currentPassword: string
  newPassword: string
  newConfirmedPassword: string
}

export type SignInUpFormFields =
  | 'batch'
  | 'name'
  | 'email'
  | 'birth_date'
  | 'contact_number'
  | 'employment_status'
  | 'password'
  | 'password_confirmation'

export type Roles = {
  ADMIN: number
  USER: number
}
