import React, { useEffect } from "react";
import Post from "../components/Post";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchFeed, fetchMiscFeed } from "../redux";
import Search from "../components/Search";
import PageNumbers from "../components/PageNumbers";
import Filters from "../components/Filters";

function Home({
  feedData,
  fetchFeed,
  fetchSFeed,
  fetchPageFeed,
  searchValue,
  fetchMiscFeed,
}) {
  useEffect(() => {
    fetchFeed("", "", "");
  }, []);

  return (
    <Grid column={1}>
      <Grid.Row className="search__bar">
        <Search fetchSearchFeed={fetchSFeed} />
      </Grid.Row>
      <Grid.Row className="filters__">
        <Filters
          searchvalue={searchValue}
          totalResults={feedData["nbHits"]}
          time={feedData["processingTimeMS"]}
        />
      </Grid.Row>
      <Grid.Row className="feed__box">
        {feedData.loading ? (
          <h2>Loading ...</h2>
        ) : feedData.error ? (
          <h2>{fetchFeed.error}</h2>
        ) : (
          <div style={{ display: "inline-grid" }}>
            {feedData && feedData.hits ? (
              feedData.hits.map((data) => {
                return (
                  data.title && (
                    <Post
                      key={data.objectID}
                      id={data.objectID}
                      title={data.title}
                      url={data.url}
                      points={data.points}
                      author={data.author}
                      createdAt={data.created_at}
                      commentCount={data.num_comments}
                    />
                  )
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <h1>Loading...</h1>
              </div>
            )}
          </div>
        )}
      </Grid.Row>
      <Grid.Row>
        <PageNumbers
          fetchmisfeed={fetchMiscFeed}
          searchvalue={searchValue}
          fetchpagefeed={fetchPageFeed}
          totalHits={feedData ? feedData.nbHits : 0}
        />
      </Grid.Row>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    feedData: state.feed.data,
    searchValue: state.feed.searchValue,
    filterURL: state.feed.filterValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeed: () => dispatch(fetchFeed()),
    fetchSFeed: (input, pn) => dispatch(fetchFeed("", input, pn)),
    fetchPageFeed: (input = "", pageNumber = 0) =>
      dispatch(fetchFeed(null, input, pageNumber)),
    fetchFilterFeed: (filterURl, input, pageNumber = 0) =>
      dispatch(fetchFeed(filterURl, input, pageNumber)),
    fetchMiscFeed: (fu, input, pageNumber = 0) =>
      dispatch(fetchMiscFeed(fu, input, pageNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
