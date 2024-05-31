import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, reset, closeTicket } from "../features/ticket/ticketSlice";
import {
  getNotes,
  createNote,
  reset as noteReset,
} from "../features/note/noteSlice";

import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

import { FaPlus } from "react-icons/fa";

//modal styles and setup
import Modal from "react-modal";
const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};
Modal.setAppElement("#root");
//

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [noteText, setNoteText] = useState("");

  //ticket states
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  //note states
  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, isError, message, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong...</h3>;
  }

  //modal function (open / close)
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //create submit note form
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus />
          Add note
        </button>
      )}

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              name="noteText"
              id="noteText"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Ticket;
