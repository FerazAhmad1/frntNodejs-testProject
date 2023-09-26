import React, { useState, useRef } from "react";
import axios from "axios";
import "./book.css";

export const Book = ({ id, title, createdAt, setDeleted }) => {
  const [state, setState] = useState(true);

  const fineRef = useRef();
  const calcFine = (dateString) => {
    const hour = Math.floor(
      (Date.now() - new Date(dateString).getTime()) / 3600000
    );
    return hour * 10 || 0;
  };

  const deleteBook = async (id) => {
    const response = await axios.delete(
      `http://localhost:3500/api/v1/book/${id}`
    );
    if (response.status == 204) {
      const data = JSON.parse(localStorage.getItem("allbooks"));
      const remainingData = data.filter((book) => book.id !== id);
      localStorage.setItem("allbooks", JSON.stringify(remainingData));
    }
    setDeleted((prevDeleted) => !prevDeleted);
  };
  const clickHandler = (id) => {
    deleteBook(id);
    return;
  };

  return (
    <>
      {[
        <div className="book">
          {state ? (
            <div>
              <p className="title book_pragraph">title: {title}</p>
              <p className="created book_pragraph">Created at:{createdAt}</p>
              <p className="ISI book_pragraph">ISI</p>
              <p className="fine book_pragraph">Fine:{calcFine(createdAt)}</p>
            </div>
          ) : (
            <input ref={fineRef} className="book_input" type="text" />
          )}

          <button
            onClick={(e) => {
              const fine = calcFine(createdAt);
              if (fine && state) {
                setState((previousState) => !previousState);
                return;
              } else {
                clickHandler(id);
                setDeleted((prevState) => !prevState);
              }
            }}
            className="return"
            type="submit">
            {state ? "return" : "pay"}
          </button>
        </div>,
      ]}
    </>
  );
};
