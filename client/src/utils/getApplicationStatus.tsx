import { ApplicationStatus } from "~/shared/data/roleConstant";

const getApplicationStatus = (status: boolean | number) => {
  switch (status) {
    case ApplicationStatus.PENDING:
      return (
        <div className="flex items-center gap-3">
          <span className="mobile:hidden">Pending</span>
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="13" rx="6.5" fill="#64748B" />
          </svg>
        </div>
      );
    case ApplicationStatus.APPROVED:
      return (
        <div className="flex items-center gap-3">
          <span className="mobile:hidden">Approved</span>
          <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="13" rx="6.5" fill="#0EDE6E" />
            <path d="M3.875 6.875L5.375 8.375L9.125 4.625" stroke="#F9F9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    default:
      return <span>Error</span>;
  }
};

export default getApplicationStatus;
