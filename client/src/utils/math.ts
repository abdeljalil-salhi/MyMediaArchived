// Decimal adjust
export const decimalAdjust = (type: string, value: number, exp: number) => {
  type = String(type);

  if (!["round", "floor", "ceil"].includes(type))
    throw new TypeError(
      "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
    );

  exp = Number(exp);
  value = Number(value);

  if (exp % 1 !== 0 || Number.isNaN(value)) return NaN;
  else if (exp === 0) {
    switch (type) {
      case "round":
        return Math.round(value);
      case "floor":
        return Math.floor(value);
      case "ceil":
        return Math.ceil(value);
      default:
        return value;
    }
  }

  const [magnitude, exponent = 0] = value.toString().split("e");

  let adjustedValue: number = 0;
  switch (type) {
    case "round":
      adjustedValue = Math.round(Number(`${magnitude}e${+exponent - exp}`));
      break;
    case "floor":
      adjustedValue = Math.floor(Number(`${magnitude}e${+exponent - exp}`));
      break;
    case "ceil":
      adjustedValue = Math.ceil(Number(`${magnitude}e${+exponent - exp}`));
      break;
    default:
      adjustedValue = value;
  }

  // Shift back
  const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
  return Number(`${newMagnitude}e${+newExponent + exp}`);
};

// Decimal round
export const myRound = (value: number, exp: number) =>
  decimalAdjust("round", value, exp);

// Decimal floor
export const myFloor = (value: number, exp: number) =>
  decimalAdjust("floor", value, exp);

// Decimal ceil
export const MyCeil = (value: number, exp: number) =>
  decimalAdjust("ceil", value, exp);
