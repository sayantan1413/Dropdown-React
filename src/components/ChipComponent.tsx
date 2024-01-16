import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import "./ChipComponent.css";

interface ChipComponentProps {
  items: string[];
}

export const ChipComponent: React.FC<ChipComponentProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isBackspacePressed, setIsBackspacePressed] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsBackspacePressed(false);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleItemClick = (item: string) => {
    console.log(item);
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setInputValue("");
    } else {
      const updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
      setSelectedItems(updatedItems);
    }
  };

  const handleChipRemove = (item: string) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(updatedItems);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedItems.length > 0
    ) {
      e.preventDefault();
      const lastChip = selectedItems[selectedItems.length - 1];
      if (!isBackspacePressed) {
        setIsBackspacePressed(true);
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.map((item) =>
            item === lastChip ? `${item}` : item
          )
        );
      } else {
        setIsBackspacePressed(false);
        setSelectedItems(selectedItems.slice(0, -1));
      }
    } else {
      setIsBackspacePressed(false);
    }
  };

  useEffect(() => {
    // Focus on the input element whenever the component mounts or input value changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  return (
    <div>
      <div className="chips">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className={`chip ${
              isBackspacePressed && index === selectedItems.length - 1
                ? "highlighted-chip"
                : ""
            }`}
            onClick={() => handleChipRemove(item)}
          >
            <div
              className="avatar"
              style={{ backgroundImage: "url(./avatar.png)" }}
            ></div>
            {item}
            <button className="remove-button">X</button>
          </div>
        ))}
      </div>
      <div className="input-field-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
          className="input-field"
        />
        {isInputFocused && inputValue.trim() === "" && (
          <ul className="item-list">
            {items
              .filter((item) => !selectedItems.includes(item))
              .map((item, index) => {
                console.log(item);
                return (
                  <li key={index} onClick={() => handleItemClick(item)}>
                    {item}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      {inputValue.trim() !== "" && (
        <ul className="item-list">
          {items
            .filter(
              (item) =>
                !selectedItems.includes(item) &&
                item.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item, index) => {
              return (
                <li key={index} onClick={() => handleItemClick(item)}>
                  {item}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
