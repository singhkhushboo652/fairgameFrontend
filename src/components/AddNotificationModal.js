import { Box, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CancelDark } from "../assets";
const AddNotificationModal = ({
  onClick,
  visible,
  setVisible,
  title,
  onDone,
}) => {

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleDone = () => {
    if (value == "") {
      return setError(true);
    }
    onDone(value);
    setValue("");
    setVisible(false);
  }
  const CustomButton = ({ title, color }) => {
    return (
      <Box
        onClick={handleDone}
        sx={{
          width: "35%",
          height: "35px",
          borderRadius: "5px",
          background: color,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "500", color: "white" }}
        >
          {title}
        </Typography>
      </Box>
    );
  };

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "500px",
            height: "270px",
            padding: 0.2,
            borderRadius: 2,
            boxShadow: "0px 5px 10px #1A568414",
            background: "white",
          }}
        >
          <Box
            sx={[
              {
                width: "100%",
                justifyContent: "space-between",
                paddingX: "10px",
                display: "flex",
                alignItems: "center",
                height: "50px",
                background: "white",
                borderRadius: 2,
              },
              (theme) => ({
                backgroundImage: theme.palette.primary.headerGradient,
              }),
            ]}
          >
            <Typography
              sx={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
            >
              {title ? title : "Add Notification"}
            </Typography>
            <img
              onClick={(e) => {
                e.stopPropagation();
                setVisible(false);

                onClick();
              }}
              src={CancelDark}
              style={{ width: "25px", height: "25px" }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              flexWrap: "wrap",
              flexDirection: "row",
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="standard"
              value={value}
              onChange={(e) => {
                setValue(e.target?.value);
              }}
              placeholder="Enter a valid reason to delete bet"
              multiline={true}
              InputProps={{
                disableUnderline: true,
                sx: {
                  borderRadius: "5px",
                  paddingY: "5px",
                  paddingX: "1vw",
                  boxShadow: "0px 5px 15px #0000001A",
                  width: "100%",
                  height: "100%",
                  fontSize: "10px",
                  overflow: "hidden",
                },
              }}
              style={{
                width: "96%",
                marginX: "2%",
                height: "100px",
                marginTop: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              marginX: "2%",
            }}
          >
            {error && <Typography sx={{ fontSize: "12px", color: '#ff0000' }} >Field Required !</Typography>}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100px",
              justifyContent: "space-evenly",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomButton color={"#0B4F26"} title={"Done"} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddNotificationModal;
