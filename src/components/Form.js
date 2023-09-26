import React, { useEffect, useRef, useState } from "react";
import { Book } from "./Book";
import axios from "axios";
import "./form.css";

export const Form = () => {
  const [oneBook, setOneBook] = useState([]);
  const [allbook, setAllBook] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const formInputref = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formInputref.current);
    let title;
    const inputvalue = formInputref.current.value;

    formInputref.current.value = "";
    if (inputvalue && inputvalue.trim()) {
      title = inputvalue.trim();
    } else {
      alert("please tell which bokk you need ");
      return;
    }

    const response = await axios.post("http://localhost:3500/api/v1/book", {
      title,
    });
    const data = response.data.data;

    if (localStorage.getItem("allbooks")) {
      const locaStorageItem = JSON.parse(localStorage.getItem("allbooks"));
      locaStorageItem.push(data[0]);
      localStorage.setItem("allbooks", JSON.stringify(locaStorageItem));
    }

    setOneBook(response);
  };

  useEffect(() => {
    async function fetchdata() {
      const response = await axios.get("http://localhost:3500/api/v1/book");
      console.log(response, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      const data = response.data.data;
      localStorage.setItem("allbooks", JSON.stringify(data));
      setAllBook(data);
    }
    fetchdata();
  }, []);

  let renderData;
  if (localStorage.getItem("allbooks")) {
    console.log("yessssssssss");
    console.log(localStorage.getItem("allbooks"));
    renderData = JSON.parse(localStorage.getItem("allbooks"));
  } else {
    renderData = [];
  }

  return (
    <div className="form_book">
      <div className="form_container">
        <form className="form" onSubmit={submitHandler}>
          <input ref={formInputref} className="form_input" type="text" />
          <button className="form_button" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="books">
        {renderData.map((book) => (
          <div className="librrary">
            <Book {...book} setDeleted={setDeleted} />
          </div>
        ))}
      </div>
    </div>
  );
};
