import { useForm } from 'react-hook-form'
import React, { FC, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { About, Profile, Security } from './types'
import DialogBox from '~/components/templates/DialogBox'
import { AboutFormSchema, ProfileFormSchema, SecurityFormSchema } from '~/shared/validation'

type Props = {
  isOpen: boolean
  toggle: () => void
}

const SettingsModal: FC<Props> = (props): JSX.Element => {
  const { isOpen, toggle } = props
  const [active, setActive] = useState<string>('Profile')

  const handleUpdateProfile = async (data: Profile): Promise<void> => {
    const { name, email } = data
    alert(JSON.stringify({ name, email }, null, 2))
  }

  const handleUpdateSecurity = async (data: Security): Promise<void> => {
    const { current_password, new_password, password_confirmation } = data
    alert(JSON.stringify({ current_password, new_password, password_confirmation }, null, 2))
  }

  const handleUpdateAbout = async (data: About): Promise<void> => {
    const { id_number, birth_date, employment_status } = data
    alert(JSON.stringify({ id_number, birth_date, employment_status }, null, 2))
  }

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
          resolver: yupResolver(ProfileFormSchema)
        })

        return (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-px-12 text-left text-slate-800">Your photo</p>
              <div className="flex flex-row items-center justify-between">
                <img
                  src="/images/animated-avatar.jpg"
                  alt="team-icon"
                  className="max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px] rounded-full"
                />
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    className="hidden"
                    id="upload"
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
                    className={`
                      h-px-36 w-px-170 cursor-not-allowed rounded-md border border-blue-600 bg-slate-500 tracking-tight 
                      text-slate-900 opacity-50 duration-150 ease-in-out hover:bg-slate-500 hover:text-slate-50 mobile:!max-w-[120px] 
                      mobile:!text-sm
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
                    placeholder="name@company.com"
                  />
                  {errors?.email && <span className="error">{`${errors?.email?.message}`}</span>}
                </div>
              </div>
              <button type="submit" className="form-submit mt-8">
                Save Changes
              </button>
            </form>
          </>
        )
      }

      case 'Security': {
        const {
          register,
          handleSubmit,
          formState: { isSubmitting, errors }
        } = useForm<Security>({
          mode: 'onTouched',
          resolver: yupResolver(SecurityFormSchema)
        })

        return (
          <form className="flex flex-col gap-9" onSubmit={handleSubmit(handleUpdateSecurity)}>
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
            <button type="submit" className="form-submit mt-8">
              Save Changes
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
          resolver: yupResolver(AboutFormSchema)
        })

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
                  {...register('employment_status')}
                >
                  <option value={1}>2018-2019</option>
                  <option value={2}>2019-2020</option>
                  <option value={3}>2020-2021</option>
                  <option value={3}>2021-2022</option>
                </select>
                {errors?.employment_status && (
                  <span className="error">{`${errors?.employment_status?.message}`}</span>
                )}
              </div>
            </div>
            <button type="submit" className="form-submit mt-8">
              Save Changes
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

export default SettingsModal
