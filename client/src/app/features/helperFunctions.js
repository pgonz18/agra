export const checkNewPosition = (sumDieLocation, clickedLocation, selectedPlayer, currentlyAt, dieNum) => {
  const adjustedCorners = [14, 28, 42, 56, 14, 28, 42, 56,];
  const forCenter = [8, 22, 36, 50]

  if (forCenter.includes(sumDieLocation) && clickedLocation === '100') {
    return '100';
  };
  if (adjustedCorners.includes(parseInt(currentlyAt) + 7)) {
    const currInt = parseInt(currentlyAt) + 7;
    const clickedInt = parseInt(clickedLocation) + 7;
    const i = adjustedCorners.indexOf(currInt);
    const remainder = clickedInt % 14;
    const newLoc = clickedInt - remainder;
    const j = adjustedCorners.indexOf(newLoc, i);
    const difference = j - i;
    console.log(i, j, newLoc, remainder, clickedLocation);
    if (dieNum === remainder + difference) {
      return clickedLocation;
    };
  };

  // only time number doesn't reset after '56' is when player is number '2';
  if (sumDieLocation > 56) {
    if (selectedPlayer !== '2' && sumDieLocation - 56 + '' === clickedLocation) {
      return clickedLocation;
    };
  } else if (sumDieLocation + '' === clickedLocation) {
      return clickedLocation;
  };
  return  null;
};

export const moveIntoFinishingArea = (sumDieLocation, clickedLocation, lastInFinish) => {
  if (sumDieLocation + 99 + '' === clickedLocation) {
    return clickedLocation;
  } else if (sumDieLocation > 100 && sumDieLocation <= lastInFinish && sumDieLocation + '' === clickedLocation) {
    return clickedLocation;
  };
  return null;
};
