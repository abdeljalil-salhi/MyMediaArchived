import { FC } from "react";

import Capricorn from "../../svgs/Capricorn";
import Aquarius from "../../svgs/Aquarius";
import Pisces from "../../svgs/Pisces";
import Aries from "../../svgs/Aries";
import Taurus from "../../svgs/Taurus";
import Gemini from "../../svgs/Gemini";
import Cancer from "../../svgs/Cancer";
import Leo from "../../svgs/Leo";
import Virgo from "../../svgs/Virgo";
import Libra from "../../svgs/Libra";
import Scorpio from "../../svgs/Scorpio";
import Sagittarius from "../../svgs/Sagittarius";

interface AstrologicalSignProps {
  date: string;
}

export const AstrologicalSign: FC<AstrologicalSignProps> = ({ date }) => {
  const signs = [
    "Aries: The Ram",
    "Taurus: The Bull",
    "Gemini: The Twins",
    "Cancer: The Crab",
    "Leo: The Lion",
    "Virgo: The Virgin",
    "Libra: The Scales",
    "Scorpio: The Scorpion",
    "Sagittarius: The Archer",
    "Capricorn: The Goat",
    "Aquarius: The Water Bearer",
    "Pisces: The Fish",
  ];

  const sign =
    Number(
      new Intl.DateTimeFormat("fr-TN-u-ca-persian", {
        month: "numeric",
      }).format(new Date(date))
    ) - 1;

  const signName = signs[sign].split(":")[0].toLowerCase();

  const signsComponents: any = {
    capricorn: <Capricorn />,
    aquarius: <Aquarius />,
    pisces: <Pisces />,
    aries: <Aries />,
    taurus: <Taurus />,
    gemini: <Gemini />,
    cancer: <Cancer />,
    leo: <Leo />,
    virgo: <Virgo />,
    libra: <Libra />,
    scorpio: <Scorpio />,
    sagittarius: <Sagittarius />,
  };

  return (
    <div className="rightbarInfoItem">
      <span className="rightbarInfoItemKey ignoreMargins">
        {signsComponents[signName]}
      </span>
      <span className="rightbarInfoItemValue normalInfo">
        <span className="rightbarInfoItemValueAstrologicalSign">
          {signs[sign].split(": ")[0]}
        </span>
        <span className="rightbarInfoItemValueAstrologicalTitle">
          {signs[sign].split(": ")[1]}
        </span>
      </span>
    </div>
  );
};
