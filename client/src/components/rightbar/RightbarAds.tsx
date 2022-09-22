import { FC } from "react";
import { Link } from "react-router-dom";

import { PC } from "../../globals";

interface RightbarAdsProps {}

export const RightbarAds: FC<RightbarAdsProps> = () => {
  return (
    <div className="rightbarAds">
      <span className="rightbarAdText">Advertisement</span>
      <Link to="/" draggable={false}>
        <img
          src={`${PC}assets/images/schema.png`}
          alt="MyMedia Ads"
          className="rightbarAdImage skeleton"
          draggable={false}
        />
      </Link>
    </div>
  );
};
