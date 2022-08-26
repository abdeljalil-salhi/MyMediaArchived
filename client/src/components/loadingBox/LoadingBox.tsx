import { FC } from "react";

interface LoadingBoxProps {}

export const LoadingBox: FC<LoadingBoxProps> = () => {
  return (
    <div className="loadingBox">
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
};
