import { useSelector } from "react-redux";
import LoginPage from "@/components/auth/LoginPage";
import HomePage from "@/components/home";
import { getToken } from "@/store/slice/auth";

export default function Login() {
  const token = useSelector(getToken);
  console.log(token);

  return <div>{token ? <HomePage /> : <LoginPage />}</div>;
}
