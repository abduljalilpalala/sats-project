import Link from 'next/link'
import React, { FC, useState } from 'react'
import { EyeOff, Eye } from 'react-feather'
import ReactDatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import useAxiosError from '~/hooks/axiosError'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { SignInFormSchema, SignUpFormSchema } from '~/shared/validation'
import { AxiosResponseError, SignInUpFormValues } from '~/shared/types'

type Props = {
  isLogin?: boolean | false
  actions: {
    handleAuthSubmit: (data: SignInUpFormValues) => Promise<void>
  }
  axiosErrors: {
    error: AxiosResponseError
    isError: boolean
  }
}

const AuthForm: FC<Props> = (props): JSX.Element => {
  const [showPass, setShowPass] = useState(false)

  const {
    isLogin,
    actions: { handleAuthSubmit },
    axiosErrors: { isError, error }
  } = props

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting }
  } = useForm<SignInUpFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(isLogin ? SignInFormSchema : SignUpFormSchema)
  })

  useAxiosError(isError, error, setError)

  const handleShowPasswordToggle = (): void => setShowPass(!showPass)

  return (
    <form onSubmit={handleSubmit(handleAuthSubmit)}>
      <div className="grid gap-x-6 gap-y-2.5">
        {!isLogin && (
          <>
            <div className="col-span-12">
              <label htmlFor="id-number" className="block text-sm font-medium">
                ID Number <small className="font-light italic">Optional</small>
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register('id_number')}
                className={`
                  block w-full rounded-sm border-[3px] border-[#4497ee] py-0.5 text-slate-900 outline-none 
                  focus:border-[#3b83d1] focus:ring-0
                `}
              />
            </div>
            <div className="col-span-12">
              <label className="block text-sm font-medium">
                <small className="text-rose-600">*</small> Batch
              </label>
              <select
                disabled={isSubmitting}
                {...register('employment_status')}
                className={`
                  block w-full rounded-sm border-[3px] border-[#4497ee] py-0.5 text-slate-900 outline-none 
                  focus:border-[#3b83d1] focus:ring-0
                `}
              >
                <option value={1}>2018-2019</option>
                <option value={2}>2019-2020</option>
                <option value={3}>2020-2021</option>
                <option value={3}>2021-2022</option>
              </select>
            </div>
            <div className="col-span-12">
              <label htmlFor="name" className="block text-sm font-medium">
                <small className="text-rose-600">*</small> Name
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register('name')}
                className={`
                  block w-full rounded-sm border-[3px] py-0.5 text-slate-900 outline-none focus:ring-0
                  ${
                    errors?.name
                      ? 'border-rose-500 bg-rose-50 focus:border-rose-500'
                      : 'border-[#4497ee] bg-white focus:border-[#3b83d1]'
                  }
                `}
              />
              {errors?.name && <span className="error">{`${errors?.name?.message}`}</span>}
            </div>
          </>
        )}
        <div className="col-span-12">
          <label htmlFor="email-address" className="block text-sm font-medium">
            <small className="text-rose-600">*</small> Email address
          </label>
          <input
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            {...register('email')}
            className={`
              block w-full rounded-sm border-[3px] py-0.5 text-slate-900 outline-none focus:ring-0
              ${
                errors?.email
                  ? 'border-rose-500 bg-rose-50 focus:border-rose-500'
                  : 'border-[#4497ee] bg-white focus:border-[#3b83d1]'
              }
            `}
          />
          {errors?.email && <span className="error">{`${errors?.email?.message}`}</span>}
        </div>
        {!isLogin && (
          <>
            <div className="col-span-12">
              <label className="block text-sm font-medium">
                <small className="text-rose-600">*</small> Birth Date
              </label>
              <Controller
                control={control}
                name="birth_date"
                render={({ field }: any) => (
                  <ReactDatePicker
                    selected={field.value}
                    maxDate={new Date()}
                    onChange={(date: Date) => field.onChange(date)}
                    className={`
                      block w-full rounded-sm border-[3px] py-0.5 text-slate-900 outline-none focus:ring-0
                      ${
                        errors?.birth_date
                          ? 'border-rose-500 bg-rose-50 focus:border-rose-500'
                          : 'border-[#4497ee] bg-white focus:border-[#3b83d1]'
                      }
                    `}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors?.birth_date && (
                <span className="error">{`${errors?.birth_date?.message}`}</span>
              )}
            </div>
            <div className="col-span-12">
              <label className="block text-sm font-medium">
                <small className="text-rose-600">*</small> Contact Number
              </label>
              <input
                type="number"
                disabled={isSubmitting}
                {...register('contact_number')}
                className={`
                  block w-full rounded-sm border-[3px] py-0.5 text-slate-900 outline-none focus:ring-0
                  ${
                    errors?.contact_number
                      ? 'border-rose-500 bg-rose-50 focus:border-rose-500'
                      : 'border-[#4497ee] bg-white focus:border-[#3b83d1]'
                  }
                `}
              />
              {errors?.contact_number && (
                <span className="error">{`${errors?.contact_number?.message}`}</span>
              )}
            </div>
            <div className="col-span-12">
              <label className="block text-sm font-medium">
                <small className="text-rose-600">*</small> Employment Status
              </label>
              <select
                disabled={isSubmitting}
                {...register('employment_status')}
                className={`
                  block w-full rounded-sm border-[3px] py-0.5 text-slate-900 outline-none focus:ring-0
                  ${
                    errors?.employment_status
                      ? 'border-rose-500 bg-rose-50 focus:border-rose-500'
                      : 'border-[#4497ee] bg-white focus:border-[#3b83d1]'
                  }
                `}
              >
                <option value={1}>Unemployed</option>
                <option value={2}>Employed</option>
                <option value={3}>Self-Employed</option>
              </select>
            </div>
          </>
        )}
        <div className="col-span-12">
          <label htmlFor="password" className="block text-sm font-medium">
            <small className="text-rose-600">*</small> Password
          </label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              disabled={isSubmitting}
              {...register('password')}
              className={`
              block w-full rounded-sm border-[3px] py-0.5 text-slate-900 outline-none focus:ring-0
              ${
                errors?.password
                  ? 'border-rose-500 bg-rose-50 focus:border-rose-500'
                  : 'border-[#4497ee] bg-white focus:border-[#3b83d1]'
              }
            `}
            />
            <button
              type="button"
              className={`
                group absolute inset-y-0 right-0 block overflow-hidden rounded-r 
                px-4 outline-none transition duration-75 ease-in-out
              `}
              onClick={handleShowPasswordToggle}
            >
              {showPass ? (
                <EyeOff
                  className={`
                  h-4 w-4 text-slate-500 group-hover:text-slate-800 
                  group-focus:text-slate-800
              `}
                />
              ) : (
                <Eye
                  className={`
                  h-4 w-4 text-slate-500 group-hover:text-slate-800 
                  group-focus:text-slate-800
              `}
                />
              )}
            </button>
          </div>
          {errors?.password && <span className="error">{`${errors?.password?.message}`}</span>}
        </div>
        {!isLogin && (
          <div className="col-span-12">
            <label htmlFor="confirm-password" className="block text-sm font-medium">
              <small className="text-rose-600">*</small> Confirm Password
            </label>
            <input
              type="password"
              disabled={isSubmitting}
              {...register('password_confirmation')}
              autoComplete="password"
              className={`
                block w-full rounded-sm border-[3px] py-0.5 text-slate-900 outline-none focus:ring-0
                ${
                  errors?.password_confirmation
                    ? 'border-rose-500 bg-rose-50 focus:border-rose-500'
                    : 'border-[#4497ee] bg-white focus:border-[#3b83d1]'
                }
              `}
            />
            {errors?.password_confirmation && (
              <span className="error">{`${errors?.password_confirmation?.message}`}</span>
            )}
          </div>
        )}
        {isLogin && (
          <div className="col-span-12 flex w-full items-center">
            <div className="mt-2 flex items-center">
              <div className="flex h-5 items-center">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded-sm border border-gray-300 bg-gray-50"
                />
              </div>
              <label htmlFor="remember" className="ml-2 text-xs text-gray-200">
                Remember me
              </label>
            </div>
          </div>
        )}
      </div>
      <div className={`text-right ${isLogin ? 'mt-16' : 'mt-8'}`}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            inline-flex w-full justify-center rounded-sm border border-transparent bg-[#4497ee]
            py-1.5 px-4 text-sm font-medium text-white shadow-sm focus:outline-none disabled:cursor-not-allowed
            disabled:bg-opacity-50 hover:bg-[#4497ee]/90 disabled:hover:bg-opacity-50 active:scale-95
          `}
        >
          {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Continue'}
        </button>
      </div>
    </form>
  )
}

export default AuthForm
