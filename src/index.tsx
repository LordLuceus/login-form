import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import LoggedIn from "./components/logged-in";
import LoginForm from "./components/login-form";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  if (user) {
    return <LoggedIn user={user} onLogout={setUser} />;
  }

  return (
    <div>
      <LoginForm onLoginSuccess={setUser} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
