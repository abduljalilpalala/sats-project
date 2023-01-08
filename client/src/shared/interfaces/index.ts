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
  course_id: any
  work_place: string
  company_name: string
  position: string
  work_id: string
  birth_date: string
  contact_number: string
  is_verified: number | boolean
  role_id: number
  employment_status_id: any
  batch_id: number
  email_verified?: null
  created_at: string
  updated_at: string
  job: any
  avatar: [
    {
      id: number
      model_type: string
      model_id: number
      uuid: string
      collection_name: string
      name: string
      file_name: string
      mime_type: string
      disk: string
      conversions_disk: string
      size: number
      manipulations: [] | null | undefined
      custom_properties: [] | null | undefined
      generated_conversions: [] | null | undefined
      responsive_images: [] | null | undefined
      order_column: number
      created_at: string
      updated_at: string
      original_url: string
      preview_url: string | null | undefined
    }
  ]
}

export interface IPost {
  id: number
  content: string
  created_at: string
}

export interface IAlumniList {
  id: number
  id_number: string
  name: string
  batch: {
    id: number
    name: string
  }
  avatar: {
    fileName: string
    url: string
  }
  is_verified: number
  email: string
  number: string
}
