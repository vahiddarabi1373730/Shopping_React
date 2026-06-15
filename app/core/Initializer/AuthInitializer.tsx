"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CheckLogin from "@/app/share/helpers/check-login";

export function AuthInitializer({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let shouldRedirectToLogin = CheckLogin();

    if (shouldRedirectToLogin && pathName !== "/loginRegister") {
      router.push("/loginRegister");
    }
  }, [router, pathName]);

  return <>{children}</>;
}
