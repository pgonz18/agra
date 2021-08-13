import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles({
  buttonInstructions: {
    marginLeft: '10px',
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    backgroundColor: 'beige',
    border: '2px solid #000',
    boxShadow: '0px 11px 35px 2px rgba(0, 0, 0, 0.14)',
    overflowY: 'auto',
    padding: '5px',
    margin: '5px',
    width: '500px',
    height: '300px',
  },
})

const Instructions = () => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.buttonInstructions}>
      <button type="button" onClick={handleOpen}>
        Instructions
      </button>
      <Modal
        aria-labelledby="Instructions"
        aria-describedby="description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.instructions}>
            <h2 id="transition-modal-title">GAME INSTRUCTIONS</h2>
            <div id="transtion-modal-description">
              GETTING STARTED:
              <p>
              Red player starts the game. Before you can move your ball around the board you must get out of "Jail". To get out of "Jail" you must roll a "1" or "6", click on the marble you wish to get out then any empty space on the board for the ball to move to its starting spot. If you roll "6" any time in the game, you may roll again. Only one marble can occupy one space at a time.
              </p>
              MOVING AROUND THE BOARD:
              <p>
              To move, you count the full amount of spaces rolled in a clockwise direction, and then click on the space. You may skip over enemy balls, or your own. If the space is occupied by an enemy ball, you may click on it and send the corresponding ball to its "Jail".</p>
              SPECIAL SPACES:
              <p>
              If your ball lands on of the corners (The four spots closest to the center), then on the next turn you may move from corner to corner depending on the number you rolled. You may skip your homebase (homebase will be further explained in "HOW TO WIN"), however it is not advisable. If you roll a number that is one higher than the number needed to land on the corner (or "1" if you are already on the corner), then you can click on the center spot to move there. The only way to get out of the center spot is to roll a "1". Remember that you can be sent back to "prison" if any player lands on your spot, even in the special locations mentioned above. The only safe area on the board is your homebase.
              </p>
              HOW TO WIN:
              <p>
              In order to win the game you must get all your balls inside your homebase. Your homebase is the four spots that is the same color as your ball (Not your prison).
              </p>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Instructions;
