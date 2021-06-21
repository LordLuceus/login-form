import axios from "axios";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { validateEmail } from "../helpers/validate-email";
import { User } from "../types";
import Error from "./error";

interface LoginFormProps {
  onLoginSuccess: Dispatch<SetStateAction<User | null>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [requestError, setRequestError] = useState("");
  const [emailError, setEmailError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailError(validateEmail(username));
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [username]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError) {
      inputRef.current?.focus();
      return;
    }

    try {
      const { data } = await axios.post(
        "https://api.getcountapp.com/api/v1/authenticate",
        { username, password }
      );
      const { user }: { user: User } = data;
      onLoginSuccess(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      setRequestError(err.message);
    }
  };

  return (
    <div>
      {requestError && <Error message={requestError} />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={inputRef}
        />
        {emailError && <Error message={emailError} />}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
