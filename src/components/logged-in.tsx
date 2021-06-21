import { Dispatch, SetStateAction } from "react";

interface LoggedInProps {
  user: any;
  onLogout: Dispatch<SetStateAction<any>>;
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
