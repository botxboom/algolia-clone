import React, { useState, useEffect, useContext } from "react";
import { Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth"

function Search({ fetchSearchFeed }) {
  const [value, setValue] = useState("");

  const context = useContext(AuthContext)

  console.log(context)

  useEffect(() => {
    fetchSearchFeed(value, 0);
  }, [value]);

  function handleSearchChange(e) {
    setValue(e.target.value);
  }
  function handleClick(e){
    const time = new Date().toLocaleTimeString()
    e.preventDefault()
    console.log(context)
    {value.length > 0 &&  context.user && context.setUserSearch(context.user.username, value, time)}
 
  }
  return (
    value,
    (
      <div
        style={{
          width: "100%",
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 0,
        }}
      >
        <Form className="post-form">
          <Form.Field>
            <Form.Input
              width="50"
              placeholder="story, comment, url ..."
              name="body"
              onChange={handleSearchChange}
              value={value}
            />
          </Form.Field>
          <Form.Field>
            <Form.Button onClick={handleClick}>
              Search
            </Form.Button>
          </Form.Field>
        </Form>
      </div>
    )
  );
}

export default Search;
