import React from "react";
import { Empty } from "antd";
import BookCard from "./BookCard";

function BookShelf(props) {
  const { shelfName, booksList, actions } = props;

  return (
    <div className="shelf">
      <h2 className="shelf-name">{shelfName}</h2>
      {!booksList.length ? (
        <Empty
          description={
            <span>
              No Book in the shelf.
              <br />
              Please add some books.
            </span>
          }
        />
      ) : (
        <div className="books-container">
          {booksList.map((book) => (
            <BookCard book={book} key={book.id} actions={actions} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookShelf;
