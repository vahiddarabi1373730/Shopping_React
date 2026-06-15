"use client";
import "./login-register.scss";
import React, { useState } from "react";
import Register from "@/app/pages/loginRegister/register";
import Login from "@/app/pages/loginRegister/login";

export interface LoginRegisterProps {
  handleLogin: (isLogin: boolean) => void;
}
export enum LoginRegisterState {
  Login = "login",
  Register = "register",
}
export default function LoginRegister({ handleLogin }: LoginRegisterProps) {
  const [loginStatus, setLoginStatus] = useState(LoginRegisterState.Login);
  const changeLoginRegisterStatus = (status: LoginRegisterState) => {
    setLoginStatus(status);
  };

  return (
    <div className="container-login-register flex flex-col justify-center items-center gap-4 w-full">
      <div className="flex justify-between py-2 px-8 rounded-[8px] text-sm font-medium  w-[50%] z-[10] bg-(--gray-400) text-(--gray-25)">
        <span
          className={`flex justify-center flex-1 cursor-pointer py-2 ${loginStatus === LoginRegisterState.Login && "selected"}`}
          onClick={() => changeLoginRegisterStatus(LoginRegisterState.Login)}
        >
          ورود
        </span>
        <span
          className={`flex justify-center flex-1 cursor-pointer py-2 ${loginStatus === LoginRegisterState.Register && "selected"}`}
          onClick={() => changeLoginRegisterStatus(LoginRegisterState.Register)}
        >
          ثبت نام
        </span>
      </div>
      {loginStatus === LoginRegisterState.Register ? (
        <Register handleLogin={handleLogin} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
      <div className="opacity-cover"></div>
    </div>
  );
}
