import React from "react";
import { Empty, Spin } from "antd";

function SearchLoadingError(props) {
  const {
    loading,
    searchedBooks,
    error: { noBooksFound, networkError },
  } = props;

  return (
    <>
      {(noBooksFound || networkError) && (
        <div className="loading-error-container">
          <Empty
            description={
              <span>{noBooksFound ? "No Book found." : "Network error."}</span>
            }
          />
        </div>
      )}

      {!noBooksFound &&
        !networkError &&
        !loading &&
        searchedBooks.length === 0 && (
          <div className="loading-error-container">
            <img src="./images/empty-search.svg" alt="" width="30%" />
          </div>
        )}

      {loading && (
        <div className="loading-error-container">
          <Spin />
        </div>
      )}
    </>
  );
}

export default SearchLoadingError;
