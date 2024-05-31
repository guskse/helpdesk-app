import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//back button component
import BackButton from "../components/BackButton";

//redux tk
import { createTicket, reset } from "../features/ticket/ticketSlice";

//loading spinner
import Spinner from "../components/Spinner";

const NewTicket = () => {
  //get user from the redux
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  //get user info and put in the state and input fields
  const [name] = useState(user.name);
  const [email] = useState(user.email);

  //ticket states
  const [product, setProduct] = useState("Windows");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      //redirect to tickets page
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  //function on submit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create new Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Windows">Windows</option>
              <option value="Mac">Mac</option>
              <option value="MacbookPro">MacbookPro</option>
              <option value="Web">Web</option>
              <option value="Internet">Internet</option>
              <option value="PC">PC</option>
              <option value="Notebook">Notebook</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Give a description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
