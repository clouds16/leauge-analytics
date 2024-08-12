import { useMemo } from "react";

function useItemStats() {
  const formatStatValue = (value) => {
    if (typeof value === "object" && value !== null) {
      if (value.flat !== 0) {
        return value.flat.toFixed(1);
      } else if (value.percent !== 0) {
        return `${value.percent}%`;
      }
    }
    return "0";
  };

  const getStatColor = useMemo(
    () => (itemStat, otherItemStat) => {
      const itemValue = parseFloat(formatStatValue(itemStat));
      const otherItemValue = parseFloat(formatStatValue(otherItemStat));
      if (itemValue > otherItemValue) {
        return "rgba(144, 238, 144, 0.5)"; // Light green
      } else if (otherItemValue > itemValue) {
        return "rgba(255, 99, 71, 0.5)"; // Light red
      }
      return "";
    },
    []
  );

  return { formatStatValue, getStatColor };
}

export default useItemStats;
