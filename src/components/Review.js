import React from "react";

const ReviewsPagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination">
      <nav className="inline-flex items-center p-1 rounded bg-white space-x-2">
        <a
          href="#"
          onClick={() => paginate(currentPage - 1)}
          className={`p-1 rounded border text-black bg-white ${
            currentPage === 1
              ? "pointer-events-none"
              : "hover:text-white hover:bg-blue-600 hover:border-blue-600"
          }`}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </a>
        <p className="text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
        <a
          href="#"
          onClick={() => paginate(currentPage + 1)}
          className={`p-1 rounded border text-black bg-white ${
            currentPage === totalPages
              ? "pointer-events-none"
              : "hover:text-white hover:bg-blue-600 hover:border-blue-600"
          }`}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </a>
      </nav>
    </div>
  );
};

export default ReviewsPagination;
