import { useLoginMutation, useRegisterMutation } from "@/store/api/auth";
import { setToken, setUserDetails } from "@/store/slice/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await login({ mail, password });
    if (res?.data?.success) {
      dispatch(setToken({ token: res?.data?.data?.token }));
      dispatch(setUserDetails(res?.data?.data));
    }
  };

  const handleRegister = async () => {
    const res = await register({ username, mail, password });
    console.log("register", res);
    if (res?.data?.success) {
      dispatch(setToken({ token: res?.data?.data?.token }));
      dispatch(setUserDetails(res?.data?.data));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col w-64">
        {!isLogin && (
          <>
            <label htmlFor="name" className="mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </>
        )}

        <label htmlFor="name" className="mb-2">
          E-Mail:
        </label>
        <input
          type="email"
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <label htmlFor="name" className="mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={isLogin ? handleLogin : handleRegister}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLogin ? "Login" : "Register"}
      </button>
      <p
        className="cursor-pointer underline"
        onClick={() => setIsLogin((prev) => !prev)}
      >
        I want to {!isLogin ? "Login" : "Register"}.
      </p>
    </div>
  );
};

export default LoginPage;
