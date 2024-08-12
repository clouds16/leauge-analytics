import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import useItemStats from "../../hooks/useItemStats";

function ItemCard({ items }) {
  const { formatStatValue } = useItemStats();

  if (!items || items.length === 0) {
    return null;
  }

  const renderItemStats = (item) => {
    return Object.entries(item.stats)
      .map(([key, value]) => {
        const formattedValue = formatStatValue(value);
        if (formattedValue !== "0" && formattedValue !== "0%") {
          return (
            <ListGroup.Item key={key} className="p-1 small">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
              {formattedValue}
            </ListGroup.Item>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <>
      {items.map((item, index) => (
        <Card key={index} className="h-100">
          <Card.Body className="p-2">
            <div className="d-flex align-items-center mb-2">
              <Card.Img
                src={item.icon}
                style={{ width: "32px", height: "32px", marginRight: "10px" }}
              />
              <Card.Title className="mb-0 small">{item.name}</Card.Title>
            </div>
            <Card.Subtitle className="mb-2 text-muted small">
              Cost: {item.shop.prices.total} gold
            </Card.Subtitle>
          </Card.Body>
          <ListGroup variant="flush" className="small">
            {renderItemStats(item)}
          </ListGroup>
        </Card>
      ))}
    </>
  );
}

export default ItemCard;
