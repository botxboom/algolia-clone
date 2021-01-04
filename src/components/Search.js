import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth";

function Search({ fetchSearchFeed }) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const context = useContext(AuthContext);

  let v = value ? value : "";

  //store search data into localStorage
  function save() {
    const uname = context.user && context.user.username;
    const time = new Date().toLocaleTimeString();
    const searchValue = value.length > 0 ? value : "";
    const newData = { uname, searchValue, time };
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", "[]");
    }

    var oldData = JSON.parse(localStorage.getItem("data"));
    oldData.push(newData);

    localStorage.setItem("data", JSON.stringify(oldData));
  }

  //fetchData from localStorage
  function view() {
    if (localStorage.getItem("data") !== null) {
      return JSON.parse(localStorage.getItem("data"));
    } else {
      return null;
    }
  }

  useEffect(() => {
    fetchSearchFeed(v, 0);
  }, [v]);

  function handleSearchChange(e) {
    setValue(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    setValue(value);
    fetchSearchFeed(value, 0);
    save();
  }

  function onClickOnInput() {
    const data = view();
    const result =
      context.user && data
        ? data.filter((d) => {
            return d.uname === context.user.username;
          })
        : [];
    setOptions(result);
    console.log(result);
  }

  return (
    <div
      style={{
        width: "100%",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0,
      }}
    >
      <form onSubmit={handleClick} className="post-form">
        <div style={{ width: "100%", padding: 10 }} className="ui input">
          <input
            style={{ width: "85%" }}
            onClick={onClickOnInput}
            autoComplete="off"
            placeholder="story, comment, url ..."
            name="body"
            list="history"
            onChange={handleSearchChange}
            value={value}
          />
          <datalist id="history">
            {options.length > 0 && (
              <div>
                {options.map((v, i) => {
                  return <option value={v["searchValue"]} />;
                })}
              </div>
            )}
          </datalist>
          <button
            id="content-desktop"
            className="ui primary button"
            style={{ float: "right", marginLeft: 5 }}
            onClick={handleClick}
          >
            Search
          </button>
          <button
            onClick={handleClick}
            style={{ marginLeft: 5 }}
            id="content-mobile"
            className="ui icon blue button"
          >
            <i aria-hidden="true" className="search icon"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
