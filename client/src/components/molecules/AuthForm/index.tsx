import React, { FC } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AxiosResponseError, SignInUpFormValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { SignInFormSchema, SignUpFormSchema } from '~/shared/validation'
import { clxs } from '~/helpers/classNames'
import useAxiosError from '~/hooks/axiosError'

type Props = {
  isLogin: boolean
  actions: {
    handleAuthSubmit: (data: SignInUpFormValues) => Promise<void>
  }
  axiosErrors: {
    error: AxiosResponseError
    isError: boolean
  }
}

const AuthForm: FC<Props> = (props): JSX.Element => {
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

  return (
    <form onSubmit={handleSubmit(handleAuthSubmit)}>
      <div className="grid gap-x-6 gap-y-4">
        {!isLogin && (
          <>
            <div className="col-span-12">
              <label htmlFor="id-number" className="block text-sm font-medium text-slate-700">
                ID Number <small className="italic">Optional</small>
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register('id_number')}
                className={`
                  mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                  disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
                `}
              />
            </div>
            <div className="col-span-12">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Name <small className="text-rose-600">*</small>
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register('name')}
                className={`
                  mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                  disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
                `}
              />
              {errors?.name && <span className="error">{`${errors?.name?.message}`}</span>}
            </div>
          </>
        )}
        <div className="col-span-12">
          <label htmlFor="email-address" className="block text-sm font-medium text-slate-700">
            Email address <small className="text-rose-600">*</small>
          </label>
          <input
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            {...register('email')}
            className={`
              mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
              disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
            `}
          />
          {errors?.email && <span className="error">{`${errors?.email?.message}`}</span>}
        </div>
        {!isLogin && (
          <>
            <div className="col-span-12">
              <label className="block text-sm font-medium text-slate-700">
                Birth Date <small className="text-rose-600">*</small>
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
                      mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                      disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
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
              <label className="block text-sm font-medium text-slate-700">Contact Number</label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register('contact_number')}
                className={`
                  mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                  disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
                `}
              />
              {errors?.contact_number && (
                <span className="error">{`${errors?.contact_number?.message}`}</span>
              )}
            </div>
            <div className="col-span-12">
              <label className="block text-sm font-medium text-slate-700">
                Employment Status<small className="text-rose-600">*</small>
              </label>
              <select
                disabled={isSubmitting}
                {...register('employment_status')}
                className={`
                  mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                  disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
                `}
              >
                <option value={1}>Unemployed</option>
                <option value={2}>Employed</option>
                <option value={3}>Self-Employed</option>
              </select>
              {errors?.employment_status && (
                <span className="error">{`${errors?.employment_status?.message}`}</span>
              )}
            </div>
          </>
        )}
        <div className="col-span-12">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password <small className="text-rose-600">*</small>
          </label>
          <input
            type="password"
            disabled={isSubmitting}
            {...register('password')}
            className={`
              mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
              disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
            `}
          />
          {errors?.password && <span className="error">{`${errors?.password?.message}`}</span>}
        </div>
        {!isLogin && (
          <div className="col-span-12">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">
              Confirm Password <small className="text-rose-600">*</small>
            </label>
            <input
              type="password"
              disabled={isSubmitting}
              {...register('password_confirmation')}
              autoComplete="password"
              className={`
                mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50 sm:text-sm
              `}
            />
            {errors?.password_confirmation && (
              <span className="error">{`${errors?.password_confirmation?.message}`}</span>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clxs(
            'inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600',
            'py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2',
            'focus:ring-indigo-500 focus:ring-offset-2 hover:bg-indigo-700',
            'disabled:cursor-not-allowed disabled:bg-opacity-50 disabled:hover:bg-opacity-50'
          )}
        >
          {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Continue'}
        </button>
      </div>
    </form>
  )
}

export default AuthForm
