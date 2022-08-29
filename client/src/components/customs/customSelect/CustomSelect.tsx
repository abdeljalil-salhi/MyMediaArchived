import { FC, useEffect, useState } from "react";
import { ArrowDropDownRounded, ArrowDropUpRounded } from "@mui/icons-material";

interface CustomSelectProps {
  optionsList: string[];
  customState: number;
  setCustomState: (state: number) => void;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  optionsList,
  customState,
  setCustomState,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  // Toggle display options for the select dropdown
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  // Event handler for selection using mouse click
  const handleClick = (index: number) => {
    setCustomState(index);
    setIsOptionsOpen(false);
  };

  // Event handler for selection using keyboard keys
  const handleKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        // Select the current option and close the options list
        e.preventDefault();
        setCustomState(index);
        setIsOptionsOpen(false);
        break;
      default:
        break;
    }
  };

  // Event handler for navigation using keyboard keys
  const handleListKeyDown = (e: any) => {
    switch (e.key) {
      case "Escape":
        // Close the options list
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case "ArrowUp":
        // Navigate to the previous option
        e.preventDefault();
        setCustomState(
          customState - 1 >= 0 ? customState - 1 : optionsList.length - 1
        );
        break;
      case "ArrowDown":
        // Navigate to the next option
        e.preventDefault();
        setCustomState(
          customState === optionsList.length - 1 ? 0 : customState + 1
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(customState);
  }, [customState]);

  return (
    <div className="CustomSelectContainer">
      <div className="CustomSelectWrapper">
        {/* @aria-haspopup: Indicate that the button has a popup when clicked
            @aria-expanded: Indicate whether the options list is expanded or collapsed */}
        <button
          type="button"
          className={isOptionsOpen ? "CustomSelectExpanded" : ""}
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          onKeyDown={handleListKeyDown}
          onClick={toggleOptions}
        >
          <span>{optionsList[customState]}</span>
          <span>
            {isOptionsOpen ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
          </span>
        </button>
        {/* @tabIndex={-1}:         Force the focus on the list once the dropdown is opened
            @aria-activedescendant: Allow us to specify which option is currently selected */}
        <ul
          className={`CustomSelectOptions ${
            isOptionsOpen ? "CustomSelectOptionsDisplay" : ""
          }`}
          role="listbox"
          aria-activedescendant={optionsList[customState]}
          tabIndex={-1}
        >
          {/* @id:              ID to reference in @aria-activedescendant
              @tabIndex={0}:    Tell the device that the list items can be tabbed through
              @role:            Indicate that the list items are options
              @aria-selected:   Tell us whether this option is currently selected or not */}
          {optionsList.map((option, index) => (
            <li
              className={
                customState === index ? "CustomSelectItemSelected" : ""
              }
              key={index}
              id={option}
              role="option"
              aria-selected={customState === index}
              tabIndex={0}
              onKeyDown={handleKeyDown(index)}
              onClick={() => handleClick(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
