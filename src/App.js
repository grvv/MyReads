import "./App.css";
import React, { Component } from "react";
import MainPageView from "./views/MainPageView";
import { message, Drawer } from "antd";
import BookInfo from "./components/BookInfo";
import SearchBooks from "./views/SearchBooks";
import { Route } from "react-router-dom";
import { getValue, addToLocalStorage } from "./utils/LocalStorageHelper";
import Header from "./components/Header";

class App extends Component {
  state = {
    read: getValue("read") || [],
    wantToRead: getValue("wantToRead") || [],
    currentlyReading: getValue("currentlyReading") || [],

    showBookInfo: false,
    selectedBook: undefined,
  };

  showInfo = () => this.setState({ showBookInfo: true });
  closeInfo = () => this.setState({ showBookInfo: false });

  showBookInfo = (selectedBook) => {
    this.setState(() => ({ selectedBook }), this.showInfo);
  };

  addBookToShelf = (shelfName, book) => {
    const bookExists = book.shelfName && book.shelfName === shelfName;

    if (!bookExists) {
      book.shelfName = shelfName;

      this.setState(
        (prevState) => ({
          [shelfName]: [...prevState[shelfName], book],
        }),
        () => addToLocalStorage(shelfName, this.state[shelfName])
      );

      message.success("Book Added to the shelf successfully");
    } else {
      message.error("Book already exists in the shelf");
    }
  };

  removeFromShelf = (book, callBack) => {
    const { shelfName, id: bookId } = book;
    const filteredArray = this.state[shelfName].filter(
      ({ id }) => id !== bookId
    );

    if (!callBack) {
      this.setState(
        () => ({ [shelfName]: filteredArray }),
        () => {
          addToLocalStorage(shelfName, filteredArray);
          message.success("Book removed from the shelf successfully");
        }
      );
    } else {
      this.setState(
        () => ({ [shelfName]: filteredArray }),
        () => {
          addToLocalStorage(shelfName, filteredArray);
          callBack();
        }
      );
    }
  };

  moveToAnotherShelf = (moveToShelfName, book) => {
    this.removeFromShelf(book, () =>
      this.addBookToShelf(moveToShelfName, book)
    );
  };

  render() {
    const {
      read,
      wantToRead,
      currentlyReading,
      selectedBook,
      showBookInfo,
    } = this.state;

    return (
      <>
        <Header />

        <Route
          exact
          path="/"
          render={() => (
            <MainPageView
              showBookInfo={this.showBookInfo}
              removeFromShelf={this.removeFromShelf}
              moveToAnotherShelf={this.moveToAnotherShelf}
              shelves={{ read, wantToRead, currentlyReading }}
            />
          )}
        />

        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks
              showBookInfo={this.showBookInfo}
              addBookToShelf={this.addBookToShelf}
              removeFromShelf={this.removeFromShelf}
              moveToAnotherShelf={this.moveToAnotherShelf}
              allBooksInShelves={[...read, ...wantToRead, ...currentlyReading]}
            />
          )}
        />

        <Drawer
          width={500}
          closable={false}
          placement="right"
          destroyOnClose={true}
          onClose={this.closeInfo}
          visible={showBookInfo}
        >
          {selectedBook && <BookInfo {...selectedBook} />}
        </Drawer>
      </>
    );
  }
}
export default App;
