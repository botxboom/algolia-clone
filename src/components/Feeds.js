import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFeed } from "../redux";

function Feed({ feedData, fetchFeed }) {
  useEffect(() => {
    fetchFeed();
  }, []);

  return feedData.loading ? (
    <h2>Loading ...</h2>
  ) : feedData.error ? (
    <h2>{fetchFeed.error}</h2>
  ) : (
    <div>
      <h2>Feed List</h2>
      <div>
        {feedData &&
          feedData.hits &&
          feedData.hits.map((d) => {
            return <p>{d.title}</p>;
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    feedData: state.feed.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeed: () => dispatch(fetchFeed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
