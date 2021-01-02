import React from "react";
import moment from "moment";

const baseURL = "https://news.ycombinator.com";

function Comment(props) {
  return (
    <>
      <div className="meta__information">
        <a href={baseURL + "/item?id=" + props.id} class="reply">
          {props.points} points |{" "}
        </a>
        <a href={baseURL + "/user?id=" + props.author} class="save">
          {props.author} |{" "}
        </a>
        <a href={baseURL + "/item?id=" + props.id} class="hide">
          {moment(props.createdAt).fromNow()} |{" "}
        </a>
      </div>
      <div style={{ paddingLeft: 20, marginBottom: 5 }}>
        <p>{props.content}</p>
      </div>
    </>
  );
}

export default Comment;
