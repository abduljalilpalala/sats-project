export interface ISidebar {
  Icon: any
  name: string
  href: string
}

export interface Alumni {
  id: string
  name: string
  batch: string
}

export interface IAlumniData {
  id: number
  id_number: string
  name: string
  email: string
  birth_date: string
  contact_number: string
  is_verified: number | boolean
  role_id: number
  employment_status_id: number
  batch_id: number
  email_verified?: null
  created_at: string
  updated_at: string
  avatar: [
    {
      id: number
      original_url: string
    }
  ]
}
