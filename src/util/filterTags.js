const searchMenu = [
  {
    key: "all",
    text: "all",
    value:
      "http://hn.algolia.com/api/v1/search?tags=(story, comment, show_hn, ask_hn)",
    content: "all",
  },
  {
    key: "story",
    text: "stories",
    value: "http://hn.algolia.com/api/v1/search?tags=story",
    content: "stories",
  },
];
const byMenu = [
  {
    key: "popularity",
    text: "popularity",
    value: "http://hn.algolia.com/api/v1/search?tags=front_page",
    content: "popularity",
  },
  {
    key: "date",
    text: "date",
    value:
      "http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>86400",
    content: "date",
  },
];

const forMenu = [
  {
    key: "all time",
    text: "all time",
    value:
      "http://hn.algolia.com/api/v1/search?tags=(story, comment, show_hn, ask_hn)",
    content: "all time",
  },
  {
    key: "last 24h",
    text: "last 24h",
    value:
      "http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>86400",
    content: "last 24h",
  },
];

export { searchMenu, byMenu, forMenu };
