import { X } from 'react-feather'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { ChangeEvent, FC, useState } from 'react'

import axios from '~/shared/lib/axios'
import userHooks from '~/hooks/user/userHooks'
import { About, Profile, Security } from './types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import handleImageError from '~/utils/handleImageError'
import DialogBox from '~/components/templates/DialogBox'
import { AboutFormSchema, ProfileFormSchema, SecurityFormSchema } from '~/shared/validation'

type Props = {
  isOpen: boolean
  toggle: () => void
}

const AlumniSettings: FC<Props> = (props): JSX.Element => {
  const { isOpen, toggle } = props
  const [formError, setFormError]: any = useState(null)
  const [active, setActive] = useState<string>('Profile')
  const { data: alumni, mutate } = userHooks()

  const menuList = ['Profile', 'Security', 'About']

  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLElement).innerText
    setActive(value)
  }

  const modalMenu = menuList.map((menu: string, index: number) => {
    return (
      <button
        key={index}
        onClick={onClick}
        className={`
           border-b border-transparent pb-0.5 outline-none
          ${active === menu ? ' border-slate-900 text-slate-900' : 'text-slate-500'}
        `}
      >
        {menu}
      </button>
    )
  })

  const activeComponent = (tab: string) => {
    switch (tab) {
      case 'Profile': {
        const {
          register,
          handleSubmit,
          formState: { isSubmitting, errors }
        } = useForm<Profile>({
          mode: 'onTouched',
          resolver: yupResolver(ProfileFormSchema),
          defaultValues: {
            name: alumni?.name,
            email: alumni?.email,
            contact_number: alumni?.contact_number
          }
        })

        const handleUpdateProfile = async (data: Profile): Promise<void> => {
          try {
            const payload = {
              id: alumni?.id,
              name: data?.name,
              email: data?.email,
              contact_number: data?.contact_number,
              id_number: alumni?.id_number,
              birth_date: alumni?.birth_date,
              employment_status_id: alumni?.employment_status_id
            }

            const response = await axios.put('/api/user', payload)

            if (response.status === 200) {
              mutate()
              toast.success('Successfully Updated!')
            }
          } catch (error: any) {
            if (error?.response?.status !== 422) throw error
            toast.error(error?.response?.data?.message)
          }
        }

        const updateAvatar = async (e: ChangeEvent<HTMLInputElement | null>): Promise<void> => {
          try {
            if (!e.target.files) return

            const files = e.target.files[0]
            const formData = new FormData()
            formData.append('avatar', files)
            formData.append('_method', 'POST')

            const response = await axios.post('/api/user/user-avatar', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })

            if (response.status === 204) {
              mutate()
              toast.success('Successfully Updated!')
            }
          } catch (error: any) {
            if (error?.response?.status !== 422) throw error
            toast.error(error?.response?.data?.message)
          }
        }

        const removeAvatar = async (): Promise<void> => {
          try {
            const response = await axios.delete('/api/user/user-avatar')
            if (response.status === 204) {
              mutate()
              toast.success('Successfully Deleted!')
            }
          } catch (error: any) {
            if (error?.response?.status !== 422) throw error
            toast.error(error?.response?.data?.message)
          }
        }

        return (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-px-12 text-left text-slate-800">Your photo</p>
              <div className="flex flex-row items-center justify-between">
                <img
                  src={alumni?.avatar[0]?.original_url}
                  onError={(e) => handleImageError(e, '/images/avatar.png')}
                  className="max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px] rounded-full"
                  alt=""
                />
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    className="hidden"
                    id="upload"
                    onChange={updateAvatar}
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <label
                    htmlFor="upload"
                    className={`
                      flex h-px-36 w-px-170 cursor-pointer items-center justify-center
                      rounded-md bg-blue-600 tracking-tight text-slate-50 duration-150 ease-in-out hover:bg-blue-800 mobile:!max-w-[120px] mobile:!text-sm
                    `}
                  >
                    Upload Photo
                  </label>

                  <button
                    type="button"
                    data-tip="Under development"
                    onClick={removeAvatar}
                    disabled={alumni?.avatar[0]?.original_url ? false : true}
                    className={`
                      h-px-36 w-px-170 rounded-md border border-blue-600 bg-slate-500 tracking-tight 
                      text-slate-900 opacity-50 duration-150 ease-in-out hover:bg-slate-500 hover:text-slate-50 mobile:!max-w-[120px] 
                      mobile:!text-sm
                      ${!alumni?.avatar[0]?.original_url ? 'cursor-not-allowed opacity-50' : ''}
                    `}
                  >
                    Remove photo
                  </button>
                </div>
              </div>
              <p className="text-px-12 text-left text-slate-600">
                Photos helps Alumni to recognize you
              </p>
            </div>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="form-label float-left">
                    Your full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    disabled={isSubmitting}
                    {...register('name')}
                    defaultValue={alumni?.name}
                    placeholder="john doe"
                  />
                  {errors?.name && <span className="error">{`${errors?.name?.message}`}</span>}
                </div>
                <div>
                  <label htmlFor="email" className="form-label float-left">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    disabled={isSubmitting}
                    className="form-control"
                    defaultValue={alumni?.email}
                    placeholder="name@company.com"
                  />
                  {errors?.email && <span className="error">{`${errors?.email?.message}`}</span>}
                </div>
                <div>
                  <label htmlFor="contact-number" className="form-label float-left">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contact-number"
                    {...register('contact_number')}
                    disabled={isSubmitting}
                    className="form-control"
                    defaultValue={alumni?.contact_number}
                    placeholder="Your contact number"
                  />
                </div>
              </div>
              <button type="submit" className="form-submit mt-8" disabled={isSubmitting}>
                {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save Changes'}
              </button>
            </form>
          </>
        )
      }

      case 'Security': {
        const {
          reset,
          register,
          handleSubmit,
          formState: { isSubmitting, errors }
        } = useForm<Security>({
          mode: 'onTouched',
          resolver: yupResolver(SecurityFormSchema)
        })

        // P.S.: This will handle Update the Security Password of the User
        const handleUpdateSecurity = async (data: Security): Promise<void> => {
          try {
            const payload = {
              currentPassword: data?.current_password,
              newPassword: data?.new_password,
              newConfirmedPassword: data?.password_confirmation
            }

            const response = await axios.put('/api/user/change-password', payload)

            if (response?.status === 204) {
              reset({
                current_password: '',
                new_password: '',
                password_confirmation: ''
              })
              toast.success('Successfully Updated!')
              setFormError(null)
            }
          } catch (error: any) {
            if (error?.response?.status !== 422) throw error
            setFormError(Object.values(error?.response?.data?.message).flat())
            toast.error(error?.response?.data?.message)
          }
        }

        return (
          <form className="flex flex-col gap-9" onSubmit={handleSubmit(handleUpdateSecurity)}>
            {formError && (
              <div
                className={`
                  relative flex w-full items-center justify-center rounded border border-rose-200
                bg-rose-50 py-2 text-center text-rose-800 hover:shadow hover:shadow-rose-100
                `}
              >
                <span className="px-6 text-sm font-medium">{formError}</span>
                <button
                  type="button"
                  className="absolute right-2 rounded hover:bg-rose-100"
                  onClick={() => setFormError(null)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="current_password" className="form-label float-left">
                  Current password <span>*</span>
                </label>
                <input
                  type="password"
                  {...register('current_password')}
                  id="current_password"
                  disabled={isSubmitting}
                  className="form-control"
                  placeholder="********"
                />
                {errors?.current_password && (
                  <span className="error">{`${errors?.current_password?.message}`}</span>
                )}
              </div>
              <div>
                <label htmlFor="new_password" className="form-label float-left">
                  New password <span>*</span>
                </label>
                <input
                  type="password"
                  id="new_password"
                  {...register('new_password')}
                  disabled={isSubmitting}
                  className="form-control"
                  placeholder="***********"
                />
                {errors?.new_password && (
                  <span className="error">{`${errors?.new_password?.message}`}</span>
                )}
              </div>
              <div>
                <label htmlFor="password_confirmation" className="form-label float-left">
                  Confirm new password <span>*</span>
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  {...register('password_confirmation')}
                  className="form-control"
                  disabled={isSubmitting}
                  placeholder="***********"
                />
                {errors?.password_confirmation && (
                  <span className="error">{`${errors?.password_confirmation?.message}`}</span>
                )}
              </div>
            </div>
            <button type="submit" className="form-submit mt-8" disabled={isSubmitting}>
              {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save Changes'}
            </button>
          </form>
        )
      }

      case 'About': {
        const {
          register,
          handleSubmit,
          formState: { isSubmitting, errors }
        } = useForm<About>({
          mode: 'onTouched',
          resolver: yupResolver(AboutFormSchema),
          defaultValues: {
            id_number: alumni?.id_number,
            birth_date: alumni?.birth_date,
            employment_status_id: alumni?.employment_status_id
          }
        })

        const handleUpdateAbout = async (data: About): Promise<void> => {
          try {
            const payload = {
              id: alumni?.id,
              name: alumni?.name,
              email: alumni?.email,
              contact_number: alumni?.contact_number,
              id_number: data?.id_number,
              birth_date: data?.birth_date,
              employment_status_id: data?.employment_status_id
            }

            const response = await axios.put('/api/user', payload)

            if (response.status === 200) {
              mutate()
              toast.success('Successfully Updated!')
            }
          } catch (error) {
            toast.error(`${error}`)
          }
        }

        const employmentStatus = [
          {
            id: 1,
            name: 'Employed'
          },
          {
            id: 2,
            name: 'Self-Employed'
          },
          {
            id: 3,
            name: 'Unemployed'
          }
        ]

        return (
          <form className="flex flex-col gap-9" onSubmit={handleSubmit(handleUpdateAbout)}>
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="id_number" className="form-label float-left">
                  ID Number
                </label>
                <input
                  type="text"
                  id="id_number"
                  defaultValue={alumni?.id_number}
                  className="form-control"
                  disabled={isSubmitting}
                  {...register('id_number')}
                  placeholder="00000000000"
                />
              </div>
              <div>
                <label htmlFor="birth_date" className="form-label float-left">
                  Birth date <span>*</span>
                </label>
                <input
                  type="date"
                  id="birth_date"
                  defaultValue={alumni?.birth_date}
                  disabled={isSubmitting}
                  {...register('birth_date')}
                  className="form-control"
                  placeholder="1999/19/10"
                />
                {errors?.birth_date && (
                  <span className="error">{`${errors?.birth_date?.message}`}</span>
                )}
              </div>
              <div>
                <label htmlFor="employment_status" className="form-label float-left">
                  Employment Status <span>*</span>
                </label>
                <select
                  className="form-control"
                  id="employment_status"
                  disabled={isSubmitting}
                  {...register('employment_status_id')}
                  defaultValue={alumni?.employment_status_id}
                >
                  {employmentStatus.map(({ id, name }) => (
                    <option key={id} value={id} selected={alumni?.employment_status_id === id}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors?.employment_status_id && (
                  <span className="error">{`${errors?.employment_status_id?.message}`}</span>
                )}
              </div>
            </div>
            <button type="submit" className="form-submit mt-8" disabled={isSubmitting}>
              {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save Changes'}
            </button>
          </form>
        )
      }

      default: {
        return <h1 className="text-px-18 text-rose-600">404 Error!</h1>
      }
    }
  }

  return (
    <DialogBox
      isOpen={isOpen}
      closeModal={toggle}
      headerTitle="My Settings"
      hasMenu={true}
      menu={modalMenu}
      className="flex flex-col"
    >
      {activeComponent(active)}
    </DialogBox>
  )
}

export default AlumniSettings
