import { Dispatch, SetStateAction } from "react";
import { User } from "../types";

interface LoggedInProps {
  user: User;
  onLogout: Dispatch<SetStateAction<User | null>>;
}

const LoggedIn: React.FC<LoggedInProps> = ({ user, onLogout }) => {
  const handleLogout = () => {
    localStorage.clear();
    onLogout(null);
  };
  return (
    <div>
      <p>
        Welcome, {user.firstName} {user.lastName}!
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoggedIn;
