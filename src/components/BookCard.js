import React from "react";
import { Card, Menu, Dropdown, Button } from "antd";
import { EllipsisOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

function BookCard(props) {
  const { book, actions } = props;
  const { title, authors, imageLinks, shelfName } = book;
  const {
    showBookInfo,
    addBookToShelf,
    removeFromShelf,
    moveToAnotherShelf,
  } = actions;

  const decideBookAction = (buttonShelfName) => {
    if (!shelfName) {
      addBookToShelf(buttonShelfName, book);
    } else if (shelfName !== buttonShelfName) {
      moveToAnotherShelf(buttonShelfName, book);
    } else {
      removeFromShelf(book);
    }
  };

  const buttonText = (buttonShelfName, label) => {
    return `${
      shelfName !== buttonShelfName ? "Move to" : "Remove from"
    } ${label}`;
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button block onClick={() => decideBookAction("currentlyReading")}>
          {buttonText("currentlyReading", "currently reading")}
        </Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button block onClick={() => decideBookAction("wantToRead")}>
          {buttonText("wantToRead", "want to read")}
        </Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button block onClick={() => decideBookAction("read")}>
          {buttonText("read", "read")}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      hoverable
      className="book-card-styling"
      cover={
        <img
          alt={`Book thumbnail - ${title}`}
          src={imageLinks ? imageLinks.thumbnail : "./images/no-image.jpg"}
        />
      }
      actions={[
        <InfoCircleOutlined onClick={() => showBookInfo(book)} />,
        <Dropdown overlay={menu} trigger={["click"]}>
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>,
      ]}
    >
      <Meta title={title} description={authors ? authors.join(", ") : ""} />
    </Card>
  );
}

export default BookCard;
