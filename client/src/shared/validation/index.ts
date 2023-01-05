import * as Yup from 'yup'

export const SignInFormSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required('Password is required')
})

export const SignUpFormSchema = Yup.object().shape({
  id_number: Yup.string(),
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  email: Yup.string().email().required().label('Email'),
  birth_date: Yup.string().required().label('Birth Date'),
  contact_number: Yup.string()
    .label('Contact Number')
    .required('Contact Number is required')
    .min(11)
    .max(11),
  employment_status: Yup.string().required().label('Employment Status'),
  batch: Yup.string().required().label('Batch'),
  course_id: Yup.string().required().label('Course'),
  work_place: Yup.string().label('Work Place'),
  company_name: Yup.string().label('Company Name'),
  position: Yup.string().label('Position'),
  work_id: Yup.mixed(),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  password_confirmation: Yup.string()
    .label('Password Confirmation')
    .required('Confirm Password is required')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
})

export const ProfileFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  email: Yup.string().email().required().label('Email'),
  contact_number: Yup.string()
})

export const SecurityFormSchema = Yup.object().shape({
  current_password: Yup.string().required('Current Password is required'),
  new_password: Yup.string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  password_confirmation: Yup.string()
    .label('Password Confirmation')
    .required('Confirm Password is required')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([Yup.ref('new_password')], 'Passwords do not match')
})

export const AboutFormSchema = Yup.object().shape({
  id_number: Yup.string(),
  course: Yup.string(),
  work_place: Yup.string(),
  company_name: Yup.string(),
  position: Yup.string(),
  work_id: Yup.mixed(),
  birth_date: Yup.string().required('Birth date is required'),
  employment_status_id: Yup.mixed()
})
