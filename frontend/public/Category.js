import React, { useReducer, useEffect } from "react";
import Layouts from "../components/Layout/Layouts";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../Services/foodService";
import Thumbnails from "../components/Layout/Thumbnails/Thumbnails";
import Search from "../components/Search/Search";
import { useParams } from "react-router-dom";
import Tags from "../components/Tags/Tags";
import NotFound from "../components/NotFound/NotFound";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function Category() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm, tag]);
  return (
    <Layouts>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound />}
      <Thumbnails foods={foods} />
    </Layouts>
  );
}
