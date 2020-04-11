import React from "react";
import BookShelf from "../components/BookShelf";

function MainPageView(props) {
  const { shelves, showBookInfo, removeFromShelf, moveToAnotherShelf } = props;
  const { currentlyReading, wantToRead, read } = shelves;
  return (
    <div className="margin-top-20">
      <BookShelf
        booksList={currentlyReading}
        shelfName="Currently Reading"
        actions={{ removeFromShelf, moveToAnotherShelf, showBookInfo }}
      />

      <BookShelf
        booksList={wantToRead}
        shelfName="Want to Read"
        actions={{ removeFromShelf, moveToAnotherShelf, showBookInfo }}
      />

      <BookShelf
        booksList={read}
        shelfName="Read"
        actions={{ removeFromShelf, moveToAnotherShelf, showBookInfo }}
      />
    </div>
  );
}

export default MainPageView;
