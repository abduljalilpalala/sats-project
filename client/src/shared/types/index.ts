export type User = {
  id_number?: string
  batch: string
  name: string
  email: string
  birth_date: string
  contact_number: string
  employment_status: string
  role?: number
  is_verified?: boolean
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
