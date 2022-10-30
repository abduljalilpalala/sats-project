import React from "react";

type Props = {
  children: any
  hasHeader?: boolean
  headerTitle?: string
  className?: string
  childClass?: string
}

const Card = (props: Props) => {
  const { children, hasHeader = false, headerTitle, className, childClass } = props;

  return (
    <div className={`bg-slate-200 rounded-md p-6 text-center ${className}`}>
      {hasHeader && (
        <div className="pb-3 mb-3 border border-b-slate-400">
          <h1 className="text-base font-medium">{headerTitle}</h1>
        </div>
      )}
      <div className={childClass}>
        {children}
      </div>
    </div>
  );
};

export default Card;
