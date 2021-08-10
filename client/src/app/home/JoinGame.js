import React, { useState, useEffect } from 'react';
import RoomInfo from './RoomInfo';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

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
});

const JoinGame = ({ clickHandler }) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/room')
      .then(data => {
        setRooms(data.data);
      }).catch(err => console.error(err));
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input onClick={clickHandler} type="button" value="Lobby" />
      <ul className={classes.rooms} >
      {
        rooms.map((room, i) => (
          <li key={i}
            className={classes.room}
            value={room.name}>
              {room.name}
            <RoomInfo room={room}/>
          </li>
        ))
      }
      </ul>
    </div>
  );
};

export default JoinGame;
