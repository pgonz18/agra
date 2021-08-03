import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { grabBall, setWithinFinish, checkWin, endTurn } from '../features/playerSlice';
import { sendBallMove, SendEndTurn } from '../features/thunks';
import { checkNewPosition, moveIntoFinishingArea } from '../features/helperFunctions';

const playerColors = (num) => {
  if (num === 2 || num > 155) {
    return '#ff4603';
  } else if (num === 44 || num > 141) {
    return '#00a2ff';
  } else if (num === 30 || num > 127) {
    return '#11ff00';
  } else if (num === 16 || num > 113) {
    return '#ffc003';
  } else {
    return 'white';
  };
};

const useStyles = makeStyles({
  box: {
    flexDirection: 'row',
    border: '1px hidden #E7B18F',
    borderRadius: '50%',
    height: '17px',
    width: '17px',
    margin: '5px',
  },
  circle: {
    flexDirection: 'row',
    border: '1px inset black',
    borderRadius: '50%',
    boxShadow: 'inset 0 0 6px black',
    height: '15px',
    width: '15px',
    margin: '5px',
    backgroundColor: props => playerColors(parseInt(props.value)),
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  sphere: {
    flexDirection: 'row',
    border: '1px groove black',
    borderRadius: '50%',
    height: '15px',
    width: '15px',
    margin: '5px',
    boxShadow: 'inset -1px -1px 5px #000, 3px 3px 8px black, inset 0px 0px 1px black',
    backgroundColor: props => props.color,
    '&:focus': {
      outline: '2px dotted purple',
      outlineOffset: '3px',
    },
  },
  redEnemySphere: {
    flexDirection: 'row',
    border: '1px solid black',
    borderRadius: '50%',
    height: '15px',
    width: '15px',
    margin: '5px',
    boxShadow: 'inset -1px -1px 5px #000, 3px 3px 8px black, inset 0px 0px 1px black',
    backgroundColor: 'red',
  },
  yellowEnemySphere: {
    flexDirection: 'row',
    border: '1px solid black',
    borderRadius: '50%',
    height: '15px',
    width: '15px',
    margin: '5px',
    boxShadow: 'inset -1px -1px 5px #000, 3px 3px 8px black, inset 0px 0px 1px black',
    backgroundColor: '#ff8c00',
  },
  blueEnemySphere: {
    flexDirection: 'row',
    border: '1px solid black',
    borderRadius: '50%',
    height: '15px',
    width: '15px',
    margin: '5px',
    boxShadow: 'inset -1px -1px 5px #000, 3px 3px 8px black, inset 0px 0px 1px black',
    backgroundColor: 'blue',
  },
  greenEnemySphere: {
    flexDirection: 'row',
    border: '1px solid black',
    borderRadius: '50%',
    height: '15px',
    width: '15px',
    margin: '5px',
    boxShadow: 'inset -1px -1px 5px #000, 3px 3px 8px black, inset 0px 0px 1px black',
    backgroundColor: '#0dad02',
  },
});

const Spot = ({ value }) => {
  const dispatch = useDispatch();
  const {
    ballOnHand,
    rolledNumber,
    ballLocations,
    startingSpot,
    finishing,
    playerNumber,
    finishLine,
    color,
    prison,
    lastNum,
    indexRange,
    allPrisons,
    finishLane,
    } = useSelector((state) => state.player);

  const props = { value, color: color };
  const classes = useStyles(props);

  const moveClickHandler = (e) => {
    e.preventDefault();
    const spotClicked = e.target.attributes.value.value;
    const previousLocation = ballLocations[ballOnHand];
    const newLocation = rolledNumber + parseInt(previousLocation);
    let data;

    if (prison.includes(previousLocation) &&
      (rolledNumber === 1 || rolledNumber === 6)) {
      const playerBalls = [...ballLocations].splice(indexRange[0], 4);
        if (!playerBalls.includes(startingSpot)) data = startingSpot;
    } else if (finishing[ballOnHand] && newLocation > finishLine[0]) {
      data = moveIntoFinishingArea(newLocation, spotClicked, lastNum);
    } else if (previousLocation === '100' && ['7', '21', '35', '49'].includes(spotClicked) && rolledNumber === 1) {
      data = spotClicked;
    }else {
      data = checkNewPosition(newLocation, spotClicked, playerNumber, previousLocation, rolledNumber);
    };
    if (data) {
      if (finishLane[data] !== undefined) {
        dispatch(checkWin({ location: data, ball: ballOnHand }));
      }
      const adjustedIndex = parseInt(ballOnHand) % 4;
      if (data <= finishLine[0] && data > finishLine[1]) {
        dispatch(setWithinFinish({ adjustedIndex, value: true }));
      };
      if (ballLocations.includes(data)) {
        const index = ballLocations.indexOf(data);
        dispatch(sendBallMove({ ball: index, location: allPrisons[index] }));
      };
      dispatch(sendBallMove({ ball: ballOnHand, location: data }));
      if (rolledNumber !== 6) {
        SendEndTurn();
        dispatch(endTurn());
      };
    };
  };

  const selectClickHandler = (e) => {
    e.preventDefault();
    dispatch(grabBall(e.target.attributes.value.value));
  };

  const space = value === '0' ?
    <div onClick={moveClickHandler} value={value} className={classes.box}></div> :
    <div onClick={moveClickHandler} value={value} className={classes.circle}></div>;

  const placeSphere = (enemyArray, indeces, val) => {
    const index = enemyArray.indexOf(val);
    const placeEnemySphere = {
      'red':   <div
      onClick={moveClickHandler}
      value={val}
      className={classes.redEnemySphere}></div>,
      'blue':   <div
      onClick={moveClickHandler}
      value={val}
      className={classes.blueEnemySphere}></div>,
      'yellow':   <div
      onClick={moveClickHandler}
      value={val}
      className={classes.yellowEnemySphere}></div>,
      'green':   <div
      onClick={moveClickHandler}
      value={val}
      className={classes.greenEnemySphere}></div>,
    };
    if (index >= indeces[0] && index < indeces[1]) {
      return (
        <div
        onClick={selectClickHandler}
        value={index}
        className={classes.sphere}
        tabIndex="0"></div>
      );
    } else {
      const color = index < 4 ? 'red' :
        index < 8 ? 'blue' :
        index < 12 ? 'green' :
        'yellow';
      return placeEnemySphere[color];
    };
  };

  const sphere = ballLocations.includes(value) ?
    placeSphere(ballLocations, indexRange, value) :
    null;

  return (sphere ? sphere : space);
};

export default Spot;
