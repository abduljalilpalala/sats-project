import React from 'react'

import { Spinner } from '~/shared/icons/SpinnerIcon'

type Props = {
  submitted: (value: any) => void
  isSubmitting: boolean
  text?: string
  className?: string
  isDisabled?: boolean
}

const SubmitButton: React.FC<Props> = ({
  submitted,
  isSubmitting,
  text = 'Submit',
  className = '',
  isDisabled
}) => {
  return (
    <button
      type="submit"
      onClick={submitted}
      className={`form-submit ${isDisabled && '!cursor-not-allowed'} ${className}`}
      disabled={isSubmitting || isDisabled}
    >
      {isSubmitting ? <Spinner className="h-5 w-5" /> : text}
    </button>
  )
}

export default SubmitButton
