import React from "react";
import { Typography, Rate, Tag, Button } from "antd";

const { Text, Title, Paragraph } = Typography;

function BookInfo(props) {
  const {
    title,
    imageLinks,
    publishedDate,
    subtitle,
    authors,
    categories,
    averageRating,
    description,
    previewLink,
  } = props;

  return (
    <>
      <img
        alt={title}
        style={{ marginBottom: "20px" }}
        src={imageLinks ? imageLinks.thumbnail : "./images/no-image.jpg"}
      />
      <Title level={3} style={{ marginBottom: 0 }}>
        {title} - { publishedDate && publishedDate.slice(0, 4)}
      </Title>
      <Text type="secondary">{subtitle}</Text>

      <br />
      <Text disabled>{authors && authors.join(", ")}</Text>

      <div style={{ marginTop: "8px" }}>
        {categories &&
          categories.map((category) => (
            <Tag key={category} color="default">
              {category}
            </Tag>
          ))}
      </div>

      <Rate disabled allowHalf defaultValue={averageRating} />

      <Paragraph
        ellipsis={{
          rows: 5,
          expandable: true,
        }}
        style={{ marginTop: "20px" }}
      >
        {description}
      </Paragraph>

      <Button
        block
        style={{ marginTop: "32px" }}
        onClick={() => window.open(previewLink, "_blank")}
      >
        Open Preview
      </Button>
    </>
  );
}

export default BookInfo;
