import React, { useEffect, useRef, useState } from "react";
import "./SidebarOption.css";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SidebarOption({ Icon, title, id, addChanneloption }) {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChannelName("");
  };

  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`, { replace: true });
    } else {
      navigate(`${title}`, { replace: true });
    }
  };

  const addChannel = () => {
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
      handleClose();
    }
  };

  useEffect(() => {
    if (open) inputRef.current.focus();
  }, [open]);

  return (
    <>
      {addChanneloption && (
        <div>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Please enter the channel name
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <input
                  id="channelName"
                  name="channelName"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  ref={inputRef}
                />
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <button className="save" onClick={addChannel}>
                  Save
                </button>
                <button className="cancel" onClick={handleClose}>
                  Cancel
                </button>
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
      <div
        className="sidebarOption"
        onClick={addChanneloption ? handleOpen : selectChannel}
      >
        {Icon && <Icon className="sidebarOption-icon" />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <h3 className="sidebarOption-channel">
            <span className="sidebarOption-hash">#</span> {title}
          </h3>
        )}
      </div>
    </>
  );
}

export default SidebarOption;
