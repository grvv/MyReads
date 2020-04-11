import React, { Component } from "react";
import { Row, Col } from "antd";
import { search } from "../utils/BooksAPI";
import BookCard from "../components/BookCard";
import SearchInput from "../components/SearchInput";
import SearchLoadingError from "../components/SearchLoadingError";

const DEFAULT_ERROR_STATE = {
  noBooksFound: false,
  networkError: false,
};

class SearchBooks extends Component {
  // For Updating the search results if the book's state changes
  static getDerivedStateFromProps(props, state) {
    const { allBooksInShelves } = props;
    const { searchedBooks: searchResult } = state;

    if (allBooksInShelves.length && searchResult.length) {
      const searchedBooks = searchResult.map((book) => {
        let bookInShelf = allBooksInShelves.find(({ id }) => id === book.id);
        if (bookInShelf) bookInShelf = { ...bookInShelf };

        return bookInShelf || { ...book, shelfName: "" };
      });

      return { searchedBooks };
    }

    return null;
  }

  state = {
    error: {
      ...DEFAULT_ERROR_STATE,
    },
    loading: false,
    searchedBooks: [],
  };

  searchBooks = (query) => {
    if (!query.length) {
      this.setState({
        searchedBooks: [],
        loading: false,
        error: { networkError: false, noBooksFound: false },
      });
    } else {
      search(query)
        .then((searchedBooks) => {
          if (searchedBooks.error) {
            this.setState({
              searchedBooks: [],
              loading: false,
              error: { networkError: false, noBooksFound: true },
            });
          } else {
            this.setState({
              loading: false,
              error: { ...DEFAULT_ERROR_STATE },
              searchedBooks: this.filteredResult(searchedBooks),
            });
          }
        })
        .catch((error) =>
          this.setState({
            searchedBooks: [],
            loading: false,
            error: { networkError: true, noBooksFound: false },
          })
        );
    }
  };

  filteredResult = (arr) => {
    return arr.map((book) => {
      let bookInShelf = this.props.allBooksInShelves.find(
        ({ id }) => id === book.id
      );

      if (bookInShelf) bookInShelf = { ...bookInShelf };

      return bookInShelf || { ...book };
    });
  };

  render() {
    const {
      loading,
      searchedBooks,
      error: { noBooksFound, networkError },
    } = this.state;
    const {
      showBookInfo,
      addBookToShelf,
      removeFromShelf,
      moveToAnotherShelf,
    } = this.props;

    return (
      <div className="margin-top-40">
        <SearchInput
          searchBooks={(query) => {
            this.setState(
              () => ({ loading: true, error: { ...DEFAULT_ERROR_STATE } }),
              () => this.searchBooks(query)
            );
          }}
        />

        <SearchLoadingError {...this.state} />

        {!loading && !noBooksFound && !networkError && searchedBooks.length && (
          <Row>
            {searchedBooks.map((book) => (
              <Col
                key={book.id + book.shelfName}
                xs={20}
                sm={16}
                md={12}
                lg={8}
                xl={6}
              >
                <BookCard
                  book={book}
                  actions={{
                    showBookInfo,
                    addBookToShelf,
                    removeFromShelf,
                    moveToAnotherShelf,
                    updateSearchResult: this.updateSearchResult,
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}

export default SearchBooks;
