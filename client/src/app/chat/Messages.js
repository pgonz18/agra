import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    marginTop: '5px',
    borderRadius: '20px',
    padding: '8px 15px',
    font: 'bold small sans-serif',
    color: 'white',
    backgroundColor: props => props.color,
    display: 'inline-block',
    maxWidth: '145px',
    overflowWrap: 'break-word',
  },
});

const Messages = ({ message, player, color }) => {
  const classes = useStyles({ color });

  return (
    <div className={classes.root}>
      <div>{player}: {message}</div>
    </div>
  );
};

export default Messages;
