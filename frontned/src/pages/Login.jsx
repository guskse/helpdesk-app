import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//import redux and toolkit stuff
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

//toast
import { toast } from "react-toastify";

//loading spinner
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //deconstruct formData state
  const { email, password } = formData;

  const navigate = useNavigate();

  //redux toolkit stuff
  const dispatch = useDispatch();
  //from authSlice
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect to homepage when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    //reset the state from authSlice to the initialState
    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  //change the state when changing the values in the login form input fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    //redux stuff
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Login</h1>
        <p>Welcome!</p>
      </section>

      <section className="form">
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">
              <FaSignInAlt />
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
