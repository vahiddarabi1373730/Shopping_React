"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function AuthInitializer({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

  const checkExpireToken = (): void => {
    const shopping_token_expire = Number(
      localStorage.getItem("shopping_token_expire"),
    );
    const nowSecond = Math.floor(Date.now() / 1000);
    const isExpired = nowSecond > shopping_token_expire;
    if (isExpired) {
      localStorage.removeItem("shopping_token_expire");
      localStorage.removeItem("shopping_token");
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("shopping_token");
    const expire = localStorage.getItem("shopping_token_expire");
    let shouldRedirectToLogin = false;
    if (!token || !expire) {
      shouldRedirectToLogin = true;
    } else {
      const expireTime = Number(expire);
      const nowSecond = Math.floor(Date.now() / 1000);

      if (nowSecond > expireTime) {
        shouldRedirectToLogin = true;
        localStorage.removeItem("shopping_token_expire");
        localStorage.removeItem("shopping_token");
      }
    }

    if (shouldRedirectToLogin && pathName !== "/login") {
      router.push("/login");
    }
  }, [router, pathName]);
  return <>{children}</>;
}
