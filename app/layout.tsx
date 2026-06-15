"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/app/layout/components/layout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import StoreProvider from "@/app/providers/store-provider";
import { AuthInitializer } from "@/app/core/Initializer/AuthInitializer";
import LoginRegister from "@/app/pages/loginRegister/login-register";
import React, { useEffect, useState } from "react";
import CheckLogin from "@/app/share/helpers/check-login";
import { ConfigProvider, Spin } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLogin(!CheckLogin());
  }, []);
  const handleLogin = (isLogin: boolean) => {
    setIsLogin(isLogin);
  };
  return (
    <html
      lang="en"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col !bg-[#F6F6F6]">
        <AppRouterCacheProvider>
          <StyleProvider hashPriority="high">
            <ConfigProvider
              theme={{
                cssVar: { key: "app" },
              }}
            >
              <StoreProvider>
                <AuthInitializer>
                  {isLogin === null ? (
                    <Spin
                      className="flex justify-center items-center h-full"
                      size="large"
                    />
                  ) : (
                    <div className="h-screen">
                      {!isLogin && <LoginRegister handleLogin={handleLogin} />}
                      {isLogin && <Layout>{children}</Layout>}
                    </div>
                  )}
                </AuthInitializer>
              </StoreProvider>
            </ConfigProvider>
          </StyleProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
