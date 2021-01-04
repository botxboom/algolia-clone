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
  searchvalue,
  activePage,
  prevSearchValue,
}) {
  function onSearchChange(e, data) {
    const filterText = data.value ? data.value : "";
    const searchv = prevSearchValue ? prevSearchValue : "";
    fetchFilterFeed(filterText, searchv, (activePage = 0));
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
        {commaNumber(totalResults ? totalResults : 0)} results in (
        {time ? time / 1000 : 0}) seconds{" "}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filterURL: state.feed.filterValue,
    activePage: state.feed.currentActivePage,
    prevSearchValue: state.feed.searchValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilterFeed: (filterURl, input, pageNumber) =>
      dispatch(fetchFeed(filterURl, input, pageNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
