import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";

function Search({ fetchSearchFeed }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchSearchFeed(value, 0);
  }, [value]);

  function handleSearchChange(e) {
    setValue(e.target.value);
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
        </Form>
      </div>
    )
  );
}

export default Search;
