import React from "react";

import { Spinner } from "~/shared/icons/SpinnerIcon";

type Props = {
  submitted: (value: any) => void;
  isSubmitting: boolean;
  text?: string;
  className?: string;
  isDisabled?: boolean;
}

const SubmitButton: React.FC<Props> = ({ submitted, isSubmitting, text = "Submit", className = "", isDisabled }) => {
  return (
    <button
      type="submit"
      onClick={submitted}
      className={`${isDisabled && "!cursor-not-allowed"} ${className} w-full rounded bg-blue-600 px-5 py-2 text-center text-sm text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring - 4 focus: ring - blue - 600 / 50
    disabled:opacity-50 disabled:hover:bg-blue-600 flex justify-center
      `}
      disabled={isSubmitting || isDisabled}
    >
      {isSubmitting ? <Spinner className="h-5 w-5" /> : text}
    </button>
  );
};

export default SubmitButton;
