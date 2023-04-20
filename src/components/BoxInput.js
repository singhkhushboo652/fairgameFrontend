import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const BoxInput = ({
  title,
  defaultValue,
  containerStyle,
  valueContainerStyle,
  valueTextStyle,
  trendingUp,
  trendingDown,
  setDefaultValue,
}) => {
  return (
    <Box sx={[{ display: "flex", flexDirection: "column" }, containerStyle]}>
      <Box
        sx={{
          background: "#262626",
          border: "1px solid #C7B6B6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25px",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: "11px", fontWeight: "600" }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={[
          {
            background: "#0B4F26",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "37px",
            marginTop: "1px",
          },
          valueContainerStyle,
        ]}
      >
        <TextField
          value={defaultValue}
          variant="standard"
          InputProps={{
            sx: {
              "& input": {
                textAlign: "center",
              },
            },
            disableUnderline: true,
            style: { fontSize: "16px", fontWeight: "600", color: "white" },
          }}
          onChange={(e) => {
            setDefaultValue(e.target.value);
          }}
          sx={{ textAlign: "center", alignItems: "center" }}
        />
      </Box>
    </Box>
  );
};

export default BoxInput;
