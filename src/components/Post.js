import React from "react";
import moment from "moment";

const baseURL = "https://news.ycombinator.com";

function Post(props) {
  return (
    <div style={{ display: "inline-block", margin: 5, marginTop: 0 }}>
      <div style={{ wordBreak: "break-word" }}>
        <a href={baseURL + "/item?id=" + props.id} style={{ marginBottom: 0 }}>
          {props.title}
        </a>
        <a href={props.url} style={{ color: "gray" }}>
          {" "}
          ({props.url})
        </a>
      </div>
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
        <a href={baseURL + "/item?id=" + props.id} class="hide">
          {props.commentCount} comments
        </a>
      </div>
    </div>
  );
}

export default Post;
