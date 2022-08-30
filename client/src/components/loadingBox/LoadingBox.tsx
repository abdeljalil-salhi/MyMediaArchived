import { FC } from "react";

interface LoadingBoxProps {}

export const LoadingBox: FC<LoadingBoxProps> = () => {
  // the LoadingBox component is used to display a loading box
  //
  // Notes:
  // - The loading box is displayed when the query is loading
  // - The loading box is not displayed if the query is loaded, or has an error
  //
  // Example:
  // <LoadingBox />

  return (
    <div className="loadingBox">
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
};
