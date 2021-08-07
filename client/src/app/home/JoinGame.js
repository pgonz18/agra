import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { fetchRoom } from '../features/thunks';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '350px',
    height: '350px',
    margin: 'auto',
    borderRadius: '1.5em',
    backgroundColor: '#ffffff',
    boxShadow: '0px 11px 35px 2px rgba(0, 0, 0, 0.14)',
    font: 'bold 20px sans-serif',
  },
  rooms: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
    maxHeight: '250px',
    overflowY: 'auto',
  },
  room: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
    '&:hover': {
      color: 'blue',
      cursor: 'grab',
    },
  },
  input: {
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
  button: {
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
});

const JoinGame = ({ clickHandler }) => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/rooms')
      .then(data => {
        console.log(data.data);
        setRooms(data.data);
      }).catch(err => console.error(err));
  }, []);

  const classes = useStyles();

  const roomClickHandler = (e) => {
    e.preventDefault();
    console.log('roomclicker', e.target.outerText);
    dispatch(fetchRoom(e.target.outerText));
  };

  return (
    <div className={classes.root}>
    <input onClick={clickHandler} type="submit" value="Lobby" />
    <ul className={classes.rooms} >
    {
    rooms.map((room, i) => (
    <li key={i}
      onClick={roomClickHandler}
      className={classes.room}
      value={room.name}>{room.name}
    </li>))
      }
    </ul>
    </div>

  );
};

export default JoinGame;
