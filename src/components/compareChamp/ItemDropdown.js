import React, { useState, useEffect, useRef } from "react";
import { Form, ListGroup } from "react-bootstrap";

function ItemDropdown({ items, selectedItem, onSelectItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchTerm === "" && isFocused) {
      setFilteredItems(Object.entries(items));
    } else {
      const filtered = Object.entries(items).filter(([_, item]) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [items, searchTerm, isFocused]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
    if (value.length === 0) {
      onSelectItem(null);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleSelectItem = (id) => {
    onSelectItem(id);
    setSearchTerm(items[id].name);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <Form.Control
        type="text"
        placeholder="Search for an item..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        style={{
          fontSize: "0.8rem",
          padding: "0.25rem 0.5rem",
          height: "auto",
          minHeight: "38px",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      />
      {isOpen && (
        <ListGroup
          className="position-absolute w-100 mt-1 overflow-auto"
          style={{
            zIndex: 1000,
            maxHeight: "200px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            fontSize: "0.8rem",
          }}
        >
          {filteredItems.map(([id, item]) => (
            <ListGroup.Item
              key={id}
              action
              onClick={() => handleSelectItem(id)}
              className="py-1"
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default ItemDropdown;
