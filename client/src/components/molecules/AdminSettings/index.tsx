import React, { useState, useEffect } from "react";

import ModalCard from '~/components/templates/ModalCard';
import SubmitButton from '~/components/atoms/SubmitButton';
import TaskIcon from '~/shared/icons/TaskIcon';
import SwitchToggle from '~/components/atoms/SwitchToggle';
import adminHooks from "~/hooks/admin/adminHooks";
import { Password } from "~/shared/types";

type AdminSettings = {
  isOpen: boolean,
  setIsOpen: () => void;
};

const AdminSettings = ({ isOpen, setIsOpen }: AdminSettings) => {
  const {
    error,
    isSuccess,
    getSmsStatus,
    setSmsSetting,
    changeAdminPassword,
  } = adminHooks();
  const { content } = error;
  const [active, setActive] = useState<string>("Post");
  const { currentPassword, newConfirmedPassword, newPassword } =
  {
    currentPassword: content?.currentPassword,
    newConfirmedPassword: content?.newConfirmedPassword,
    newPassword: content?.newPassword
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const value = e.currentTarget.innerText;
    setActive(value);
  };

  const [smsStatus, setSmsStatus] = useState<boolean | Promise<any>>(false);
  useEffect(() => {
    getSmsStatus().then((res) => {
      setSmsStatus(res);
    });
  }, [isSuccess]);

  const menuList = ["Post", "Security"];
  const modalMenu = menuList.map((menu: string, index: number) => {
    return (
      <button
        key={index}
        onClick={onClick}
        className={`text-slate_400 outline-none ${active === menu && "border-b border-sams-30 text-sams-30"}`}
      >
        {menu}
      </button>
    );
  });

  const [passwordData, setPasswordData] = useState<Password | null>(null);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;

    setPasswordData((prev: any) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (component: string, value?: boolean): void => {
    switch (component) {
      case "security":
        changeAdminPassword(passwordData).then(({ status }) => {
          if (status === 204) {
            setPasswordData({
              currentPassword: "",
              newPassword: "",
              newConfirmedPassword: ""
            });
          }
        });
        break;

      case "post":
        setSmsSetting(value);
        break;

      default:
        alert("No component selected");
    }
  };

  const activeComponent = (component: string) => {
    switch (component) {
      case "Security": {
        return (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <div >
                <label htmlFor="currentPassword" className="float-left mb-1 block text-xs font-normal text-[#64748b]">
                  Current password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  className="disabled:hover:ring-2 hover:ring-blue-600 focus:ring-2 focus:ring-blue-600 disabled:opacity-50 ring-1 ring-slate_300 transition duration-150 ease-in-out hover:ring-2 block w-full rounded border-none px-3 py-2 text-sm placeholder:text-slate_400 text-slate_900"
                  disabled={false}
                  placeholder="********"
                  value={passwordData?.currentPassword || ""}
                  onChange={onPasswordChange}
                />
                {error && <div className="flex flex-col justify-start w-full text-left">
                  {currentPassword?.map((error: string, index: number) => {
                    return <span key={index} className="text-sm text-red-600 float-left mt-[3px]">{currentPassword.length >= 2 && "*"} {error}</span>;
                  })}
                </div>}
              </div>
              <div >
                <label htmlFor="newPassword" className="float-left mb-1 block text-xs font-normal text-[#64748b]">
                  New password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="disabled:hover:ring-2 hover:ring-blue-600 focus:ring-2 focus:ring-blue-600 disabled:opacity-50 ring-1 ring-slate_300 transition duration-150 ease-in-out hover:ring-2 block w-full rounded border-none px-3 py-2 text-sm placeholder:text-slate_400 text-slate_900"
                  disabled={false}
                  placeholder="***********"
                  value={passwordData?.newPassword || ""}
                  onChange={onPasswordChange}
                />
                {error && <span className="text-sm text-red-600 float-left text-left">{newPassword}</span>}
              </div>
              <div >
                <label htmlFor="newConfirmedPassword" className="float-left mb-1 block text-xs font-normal text-[#64748b]">
                  Confirm new password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="newConfirmedPassword"
                  className="disabled:hover:ring-2 hover:ring-blue-600 focus:ring-2 focus:ring-blue-600 disabled:opacity-50 ring-1 ring-slate_300 transition duration-150 ease-in-out hover:ring-2 block w-full rounded border-none px-3 py-2 text-sm placeholder:text-slate_400 text-slate_900"
                  disabled={false}
                  placeholder="***********"
                  value={passwordData?.newConfirmedPassword || ""}
                  onChange={onPasswordChange}
                />
                {error && <span className="text-sm text-red-600 float-left text-left">{newConfirmedPassword}</span>}
              </div>
            </div>
            <SubmitButton isSubmitting={false} submitted={() => onSubmit("security")} text="Save changes" />
          </div>
        );
      }

      case "Post": {
        const switchState = (value: boolean) => {
          onSubmit("post", value);
        };

        return (
          <div className="mx-5 mobile:mx-0">
            <p className='text-slate_900 text-[15px] text-left mb-5'>Turn On/Off</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-start pb-5 gap-5">
                <div className="flex flex-row gap-3">
                  <TaskIcon />
                  <p className="text-slate_900 text-[15px] text-left">Automatically send post in SMS</p>
                </div>
                <SwitchToggle value={switchState} className="mt-[3px]" state={smsStatus} />
              </div>
            </div>
          </div>
        );
      }

      default: {
        return (
          <h1 className="text-px-18 text-rose-600">404 Error!</h1>
        );
      }
    }
  };

  return (
    <ModalCard
      isOpen={isOpen}
      hasMenu={true}
      headerTitle="My Settings"
      className="flex flex-col"
      menu={modalMenu}
      closeModal={() => { setIsOpen(); }}
    >
      {activeComponent(active)}
    </ModalCard>
  );
};

export default AdminSettings;
