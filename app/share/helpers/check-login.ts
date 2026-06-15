export default function CheckLogin(): boolean {
  let shouldRedirectToLogin = false;
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("shopping_token");
  const expire = localStorage.getItem("shopping_token_expire");
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
  return shouldRedirectToLogin;
}
