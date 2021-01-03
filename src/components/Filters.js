import React from "react";
import { searchMenu, byMenu, forMenu } from "../util/filterTags";
import { Dropdown } from "semantic-ui-react";
import commaNumber from "comma-number";
import { connect } from "react-redux";
import { fetchFeed } from "../redux";

function Filters({
  totalResults,
  time,
  fetchFilterFeed,
  filterURL,
  searchvalue,
  activePage,
}) {
  function onSearchChange(e, data) {
    fetchFilterFeed(data.value, searchvalue, (activePage = 0));
  }

  return (
    <div
      style={{
        width: "100%",
        display: "inline",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <div id="content-desktop">
        {""} Search {""}
        <Dropdown
          button
          inline
          basic
          options={searchMenu}
          defaultValue={searchMenu[0].value}
          onChange={onSearchChange}
        />
        {""} by {""}
        <Dropdown
          button
          compact
          inline
          basic
          options={byMenu}
          defaultValue={byMenu[0].value}
          onChange={onSearchChange}
        />
        {""} for {""}
        <Dropdown
          button
          compact
          inline
          basic
          options={forMenu}
          defaultValue={forMenu[0].value}
          onChange={onSearchChange}
        />
      </div>
      <div id="content-mobile">
        <Dropdown
          button
          inline
          basic
          options={searchMenu}
          defaultValue={searchMenu[0].value}
          onChange={onSearchChange}
        />
        <Dropdown
          button
          compact
          inline
          basic
          options={byMenu}
          defaultValue={byMenu[0].value}
          onChange={onSearchChange}
        />
        <Dropdown
          button
          compact
          inline
          basic
          options={forMenu}
          defaultValue={forMenu[0].value}
          onChange={onSearchChange}
        />
      </div>
      <p id="content-desktop" style={{ float: "right", fontSize: 12 }}>
        {commaNumber(totalResults)} results in ({time / 1000}) seconds{" "}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filterURL: state.feed.filterValue,
    activePage: state.feed.currentActivePage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilterFeed: (filterURl, input, pageNumber) =>
      dispatch(fetchFeed(filterURl, encodeURI(input), pageNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
