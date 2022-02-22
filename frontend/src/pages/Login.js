import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const submitData = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <section className="heading">
        <FaSignInAlt /> Login
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form className="form-group" onSubmit={(e) => submitData(e)}>
          <input
            placeholder="Enter your email"
            type="email"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            placeholder="Enter your password"
            type="password"
            value={formState.password}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button className="btn btn-block">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
