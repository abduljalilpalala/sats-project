export type Profile = {
  name: string
  email: string
  course_id: number
  contact_number: string | number
}

export type Security = {
  current_password: string
  new_password: string
  password_confirmation: string
}

export type About = {
  id_number: string | undefined | null
  course: string | undefined | null
  course_id: number
  birth_date: string
  employment_status_id: number
}
