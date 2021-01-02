import React, { useState, useEffect, useContext } from "react";
import axios from "../components/axios";
import Post from "../components/Post";
import { Grid, Transition } from "semantic-ui-react";
import commaNumber from "comma-number";
import { searchMenu, byMenu, forMenu } from "../util/filterTags";
import { Form, Button, Pagination } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { connect } from "react-redux";
import { fetchFeed, fetchSearchFeed } from "../redux";
import Search from "../components/Search";
import PageNumbers from "../components/PageNumbers";

function Home({ feedData, fetchFeed, fetchSFeed, fetchPageFeed }) {
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [time, setTime] = useState(0);
  const [value, setValue] = useState("");
  const [comment, setComment] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [totalHits, setTotalHits] = useState(0);
  var [api, setApi] = useState("");

  useEffect(() => {
    fetchFeed();
  }, []);

  // function handleSearchChange(e) {
  //   setValue(e.target.value);
  // }

  // function onSubmit(e) {
  //   e.preventDefault();
  //   console.log(value);
  //   axios
  //     .get(`/api/v1/search?query=${value}` + `&page=${currentPage}`)
  //     .then((res) => {
  //       setPost(res.data.hits);
  //       setTotalHits(res.data["nbHits"]);
  //       setTotalResults(res.data["nbHits"]);
  //       setTime(res.data["processingTimeMS"]);
  //     });
  // }

  //   useEffect(() => {
  //     const searchQuery = async (value) => {
  //       setCurrentPage(0);
  //       await axios
  //         .get(
  //           `/api/v1/search?query=${value}&tags=(story, comment, show_hn, ask_hn,,prefixAll)` +
  //             `&page=${currentPage}`
  //         )
  //         .then((res) => {
  //           setPost(res.data.hits);
  //           setTotalHits(res.data["nbHits"]);
  //           setTotalResults(res.data["nbHits"]);
  //           setTime(res.data["processingTimeMS"]);
  //         });
  //     };
  //     searchQuery(value);
  //   }, [value]);

  return (
    <Grid column={1}>
      <Grid.Row className="search__bar">
        <Search fetchSearchFeed={fetchSFeed} />
      </Grid.Row>
      <Grid.Row className="feed__box">
        {feedData.loading ? (
          <h2>Loading ...</h2>
        ) : feedData.error ? (
          <h2>{fetchFeed.error}</h2>
        ) : (
          <div style={{ display: "inline-grid" }}>
            {feedData &&
              feedData.hits &&
              feedData.hits.map((data) => {
                return (
                  data.title && (
                    <Post
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
              })}
          </div>
        )}
      </Grid.Row>
      <Grid.Row>
        <PageNumbers
          fetchpagefeed={fetchPageFeed}
          totalHits={feedData.nbHits}
        />
      </Grid.Row>
    </Grid>
  );

  // let filters = {
  //   search: "all",
  //   by: "popularity",
  //   for: "alltime",
  // };

  // // base feed fetch hook
  // useEffect(() => {
  //   const fetchFeed = async () => {
  //     await axios
  //       .get(
  //         "/api/v1/search?tags=(story, comment, show_hn, ask_hn)" +
  //           `&page=${currentPage}`
  //       )
  //       .then((res) => {
  //         const data = res.data.hits;
  //         setPost(data);
  //         setTotalResults(res.data["nbHits"]);
  //         setTime(res.data["processingTimeMS"]);
  //       });
  //   };
  //   fetchFeed();
  // }, [currentPage]);

  // // search feed fetch hook

  // // search for query
  //

  // //fetch filter results
  // function onSearchChange(e, data) {
  //   console.log(data.value);
  //   setCurrentPage("0");
  //   console.log(currentPage);
  //   setApi(data.value);
  //   axios.get(api + `&page=${currentPage}`).then((res) => {
  //     setPost(res.data.hits);
  //     setTotalHits(res.data["nbHits"]);
  //     setTotalResults(res.data["nbHits"]);
  //     setTime(res.data["processingTimeMS"]);
  //   });
  // }

  // //pagination

  // function changePage(e, data) {
  //   console.log(data.activePage);
  //   setCurrentPage(data.activePage);
  // }

  // return (
  //   <div className="post__feed">
  //     {/* //searchbar */}
  //     {user && (
  //
  //     )}

  //     {/* //filters */}
  //     <div style={{ marginBottom: 10, padding: 5 }}>
  //       <div style={{ marginLeft: 10 }}>
  //         {""} Search {""}
  //         <Dropdown
  //           button
  //           compact
  //           inline
  //           basic
  //           options={searchMenu}
  //           defaultValue={searchMenu[0].value}
  //           onChange={onSearchChange}
  //         />
  //         {""} by {""}
  //         <Dropdown
  //           button
  //           compact
  //           inline
  //           basic
  //           options={byMenu}
  //           defaultValue={byMenu[0].value}
  //           onChange={onSearchChange}
  //         />
  //         {""} for {""}
  //         <Dropdown
  //           button
  //           compact
  //           inline
  //           basic
  //           options={forMenu}
  //           defaultValue={forMenu[0].value}
  //           onChange={onSearchChange}
  //         />
  //         <p style={{ float: "right", fontSize: 12 }}>
  //           {commaNumber(totalResults)} results in ({time / 1000}) seconds
  //         </p>
  //       </div>
  //     </div>

  //     {/* //feed */}

  //   </div>
  // );
}

const mapStateToProps = (state) => {
  return {
    feedData: state.feed.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeed: () => dispatch(fetchFeed()),
    fetchSFeed: (input) => dispatch(fetchSearchFeed(input)),
    fetchPageFeed: (pageNumber) => dispatch(fetchFeed(pageNumber - 1)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
