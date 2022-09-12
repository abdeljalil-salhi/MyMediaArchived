import { FC, KeyboardEvent, useEffect, useState } from "react";
import { TagRounded } from "@mui/icons-material";
import { Chip } from "@mui/material";

import { isEmpty } from "../../../utils/isEmpty";

interface CustomTagEditorProps {
  customState: string[];
  setCustomState: (value: string[]) => void;
}

export const CustomTagEditor: FC<CustomTagEditorProps> = ({
  customState,
  setCustomState,
}) => {
  // The CustomTagEditor component is used to edit the tags of the profile
  //
  // Props:
  // customState: the state of the tags
  // setCustomState: the function to set the state of the tags
  //
  // Notes:
  // - The component is used to edit the tags of the profile

  const [remainingTags, setRemainingTags] = useState<number>(10);

  // The addTags() function is responsible of adding the tags to the tags state
  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      // Remove extra spaces, trim the string, replace spaces with dashes, remove commas and format to lowercase to make it a valid tag
      const tag: string =
        event.target.value.charAt(0) !== "#"
          ? "#" +
            event.target.value
              .replace(/\s+/g, " ")
              .trim()
              .replaceAll(" ", "_")
              .replaceAll("-", "_")
              .replaceAll(",", "")
              .toLowerCase()
          : event.target.value
              .replace(/\s+/g, " ")
              .trim()
              .replaceAll(" ", "_")
              .replaceAll("-", "_")
              .replaceAll(",", "")
              .toLowerCase();
      // Check if the tag is empty or if it's already in the tags state
      if (!isEmpty(tag) && !customState.includes(tag)) {
        // Check if the tags state is full
        if (tag.length > 3 && remainingTags > 0)
          // Add the tag to the tags state
          setCustomState([...customState, tag]);
      }
      // Reset the input value to an empty string
      event.target.value = "";
    }
  };

  // The removeTags() function is responsible of removing the tags from the tags state
  const removeTags = (index: number) => {
    setCustomState([
      ...customState.filter(
        (tag: string) => customState.indexOf(tag) !== index
      ),
    ]);
  };

  // The remaining tags are calculated by subtracting the tags state length from 10 (the maximum number of tags)
  useEffect(() => {
    setRemainingTags(10 - customState.length);
  }, [customState]);

  return (
    <div className="customTagEditor">
      <div className="customTagEditorBox">
        <ul>
          {customState.map((tag: string, index: number) => (
            <Chip
              key={index}
              label={tag.split("#")}
              size="small"
              icon={<TagRounded />}
              onClick={() => null}
              onDelete={() => removeTags(index)}
            />
          ))}
          <input
            type="text"
            maxLength={16}
            onKeyDown={addTags}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) =>
              e.target.value === "," && (e.target.value = "")
            }
          />
        </ul>
      </div>
      <div className="customTagEditorDetails">
        <span className="customTagEditorDetailsRemaining">
          <span>{remainingTags} tags</span> are remaining
        </span>
      </div>
    </div>
  );
};
