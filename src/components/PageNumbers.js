import React from "react";
import { connect } from "react-redux";
import { Pagination } from "semantic-ui-react";

function PageNumbers(props) {
  const pageNumber = props.totalHits ? props.totalHits : 0;

  return (
    <div
      style={{
        justifyContent: "center",
        marginTop: 20,
        Content: "block",
        display: "flex",
        width: "100%",
      }}
      className="page__number"
    >
      <Pagination
        onPageChange={(e, data) => {
          props.filterURL
            ? props.fetchmisfeed(
                props.filterURL,
                props.searchvalue,
                data.activePage
              )
            : props.fetchpagefeed(props.searchvalue, data.activePage);
        }}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        defaultActivePage={1}
        siblingRange={1}
        totalPages={pageNumber / 20 > 100 ? 100 : Math.floor(pageNumber / 20)}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filterURL: state.feed.filterValue,
  };
};

export default connect(mapStateToProps, null)(PageNumbers);
