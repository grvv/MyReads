import React, { Component } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import escapeStringRegexp from "escape-string-regexp";

class SearchInput extends Component {
  state = {
    inputText: "",
  };

  debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  denouncedApiCall = this.debounce(this.props.searchBooks, 500);

  onInputChange = (e) => {
    let { value: inputText } = e.target;

    inputText = escapeStringRegexp(inputText);

    this.setState(
      () => ({ inputText }),
      () => this.denouncedApiCall(this.state.inputText.trim())
    );
  };

  render() {
    const { inputText } = this.state;

    return (
      <Input
        size="large"
        value={inputText}
        placeholder="Search"
        addonAfter={<SearchOutlined />}
        onChange={this.onInputChange}
      />
    );
  }
}

export default SearchInput;
