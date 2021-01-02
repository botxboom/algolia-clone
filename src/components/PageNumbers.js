import React, { useState } from "react";
import { Pagination } from "semantic-ui-react";

function PageNumbers(props) {
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
        onPageChange={(e, data) => props.fetchpagefeed(data.activePage)}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        defaultActivePage={1}
        siblingRange={1}
        totalPages={
          props.totalHits / 20 > 100 ? 100 : Math.floor(props.totalHits / 20)
        }
      />
    </div>
  );
}

export default PageNumbers;
