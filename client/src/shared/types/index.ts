export type SignInUpFormValues = {
  id_number?: string
  name: string
  email: string
  birth_date: string
  contact_number?: string
  employment_status: string
  password: string
  password_confirmation: string
}

export type AxiosResponseError = {
  status: number | undefined
  content: any
}

export type SignInUpFormFields =
  | 'name'
  | 'email'
  | 'birth_date'
  | 'contact_number'
  | 'employment_status'
  | 'password'
  | 'password_confirmation'
