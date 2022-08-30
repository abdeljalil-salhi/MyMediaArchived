import { FC } from "react";

import {
  Capricorn,
  Aquarius,
  Pisces,
  Aries,
  Taurus,
  Gemini,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagittarius,
} from "../../svgs/AstrologicalSigns";

interface AstrologicalSignProps {
  date: string;
}

export const AstrologicalSign: FC<AstrologicalSignProps> = ({ date }) => {
  // The AstrologicalSign component is used to display the user's astrological sign
  // It is displayed on the profile page
  //
  // Props:
  // date: the user's date of birth
  //
  // Notes:
  // - The date is formatted as MM/DD/YYYY
  // - The date is converted to a number and then substracted 1 to get the index of the sign
  // - The index is then used to get the sign from the array of signs (signs)

  // List of all the astrological signs names
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

  // Get the astrological sign from the date of birth,
  // according to the persian calendar
  const sign =
    Number(
      new Intl.DateTimeFormat("fr-TN-u-ca-persian", {
        month: "numeric",
      }).format(new Date(date))
    ) - 1;

  // Return the astrological sign name
  const signName = signs[sign].split(":")[0].toLowerCase();

  // List of all the astrological signs SVG components
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
        {/* Return the astrological sign SVG component */}
        {signsComponents[signName]}
      </span>
      <span className="rightbarInfoItemValue normalInfo">
        <span className="rightbarInfoItemValueAstrologicalSign">
          {/* Return the astrological sign name */}
          {signs[sign].split(": ")[0]}
        </span>
        <span className="rightbarInfoItemValueAstrologicalTitle">
          {/* Return the astrological sign title */}
          {signs[sign].split(": ")[1]}
        </span>
      </span>
    </div>
  );
};
