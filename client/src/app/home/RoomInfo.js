import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { fetchRoom } from '../features/thunks';

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
});

const RoomInfo = ({ room }) => {
      const [open, setOpen] = useState(false);
      const [number, setNumber] = useState('');
      const [username, setUsername] = useState('');
      const [update, setUpdate] = useState(false);

      const dispatch = useDispatch();

      const classes = useStyles();

      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleNumberChange = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
        let update = false;
        room.users.forEach(player => {
          if (player.playerNumber === e.target.value) {
            setUsername(player.username);
            setUpdate(true);
            update = true;
          };
        });
        if (!update) {
          setUsername('');
          setUpdate(false);
        };
      };

      const handleUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchRoom({ number, username, id: room._id, update }));
      };

      return (
        <div className={classes.buttonInstructions}>
          <button type="button" onClick={handleOpen}>
            Join
          </button>
          <Modal
            aria-labelledby="Join"
            aria-describedby="Player Information"
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
                <form className={classes.root} onSubmit={handleSubmit}>
                    <div className={classes.pickColor}>
                      <label>
                        Pick color:
                        <select value={number} onChange={handleNumberChange}>
                          <option value="">--Choose color--</option>
                          <option value="2">Red</option>
                          <option value="3">Blue</option>
                          <option value="4">Green</option>
                          <option value="5">Orange</option>
                        </select>
                      </label>
                    </div>
                    <div className={classes.input}>
                      <label>
                        Player name:
                        <input type="text" value={username} onChange={handleUsernameChange} />
                      </label>
                    </div>
                    <div className={classes.button}>
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
              </div>
            </Fade>
          </Modal>
        </div>
  );
};

export default RoomInfo;
