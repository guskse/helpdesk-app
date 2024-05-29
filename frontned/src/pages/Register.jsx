import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//icons
import { FaUser } from "react-icons/fa";

//redux and redux toolkit stuff
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

//toast
import { toast } from "react-toastify";

//loading spinner
import Spinner from "../components/Spinner";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  //deconstruct the formData state
  const { name, email, password, password2 } = formData;

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

  //change the state when changing the values in the register form input fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      //redux stuff
      dispatch(register(userData));
    }
  };

  
  if(isLoading){
    return <Spinner />
  }


  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              className="form-control"
              required
            />
          </div>

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
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">
              <FaUser />
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
