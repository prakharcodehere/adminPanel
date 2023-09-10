import React, { useState } from "react";
import "./Pagination.css";
import { PagesOutlined } from "@mui/icons-material";

const Pagination = ({
  user,
  rowsInPage,
  pageButtons,
  goToFirst,
  goToLast,
  goNext,
  goBack,
  currentPage,
  deleteMultipleOrAll
}) => {


  let pages = [];
  let limit = Math.ceil(user.length / rowsInPage);

  for (let i = 1; i < limit; i++) {
    pages.push(i);
  }
  return (
    <div className="btnAndPagination">
      <div>
        <button className="deleteButton" onClick={deleteMultipleOrAll} >
          Delete selected
        </button>
      </div>
      <div>
      <button
        onClick={goToFirst}
        disabled={currentPage === 1}
        className="pageButton"
      >
        {"<<"}
      </button>
      <button
        onClick={goBack}
        disabled={currentPage === 1}
        className="pageButton"
      >
        {"<"}
      </button>
      {pageButtons()}
      <button
        onClick={goNext}
        disabled={currentPage === limit}
        className="pageButton"
      >
        {">"}
      </button>
      <button
        onClick={goToLast}
        disabled={currentPage === limit}
        className="pageButton"
      >
        {">>"}
      </button>
      </div>
    </div>
  );
};

export default Pagination;
