export default function setItemLocalStorage(token: string, expire: number) {
  localStorage.setItem("shopping_token", token);
  localStorage.setItem("shopping_token_expire", expire.toString());
}
