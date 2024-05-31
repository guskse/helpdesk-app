//react router dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

//components
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* CREATE TICKET PRIVATE ROUTE */}
            <Route path="/new-ticket" element={<PrivateRoute />}>
              {/* OUTLET */}
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>

            {/* ALL TICKETS PRIVATE ROUTE */}
            <Route path="/tickets" element={<PrivateRoute />}>
              {/* OUTLET */}
              <Route path="/tickets" element={<Tickets />} />
            </Route>

            {/* TICKET PRIVATE ROUTE */}
            <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
              {/* OUTLET */}
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
            
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
