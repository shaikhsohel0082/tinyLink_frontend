import React from "react";
interface Props {
  currentpage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
import styles from "./Pagination.module.scss";
const Pagination = ({ currentpage, totalPages, setCurrentPage }: Props) => {
  // create array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination ">
      {/* Previous Button */}
      <li
        className={`page-item ${
          currentpage === 1 ? "disabled" : styles.cursor
        }`}
        onClick={() => {
          if (currentpage > 1) setCurrentPage((prev) => prev - 1);
        }}
      >
        <span className="page-link">Previous</span>
      </li>

      {/* Page Numbers */}
      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${currentpage === page ? "active" : ""} ${
            styles.cursor
          }`}
          onClick={() => setCurrentPage(page)}
        >
          <span className="page-link">{page}</span>
        </li>
      ))}

      {/* Next Button */}
      <li
        className={`page-item ${
          currentpage === totalPages ? "disabled" : styles.cursor
        }`}
        onClick={() => {
          if (currentpage < totalPages) setCurrentPage((prev) => prev + 1);
        }}
      >
        <span className="page-link">Next</span>
      </li>
    </ul>
  );
};

export default Pagination;
