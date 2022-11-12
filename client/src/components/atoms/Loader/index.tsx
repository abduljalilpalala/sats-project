import React from "react";
import { Spinner } from "~/shared/icons/SpinnerIcon";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Spinner className="w-[30px] h-[30px]" />
    </div>
  );
};

export default Loader;
