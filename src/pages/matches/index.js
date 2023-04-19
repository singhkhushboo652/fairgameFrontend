import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CustomHeader, SideBar } from "../../components";

import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import SessionBetSeperate from "../../components/sessionBetSeperate";
import AllRateSeperate from "../../components/AllRateSeperate";

import AccountStatementList from "../../components/AccountStatementList";
import YellowHeader from "../../components/yellowheader";
import ProfitLossComponent from "../../components/ProfitLossComponent";
import { ChangePassword } from "../../components/ChangePassword";
import { AuthContext } from "../../Authprovider";

import Home from "./Home";
import Match from "./Match";

export default function Matches() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("CRICKET");
  const [open, handleClose] = useState(false);
  const [flag, setFlag] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { activeTab } = useSelector((state) => state.betPlace);
  const { tokenUser } = useContext(AuthContext);
 
  useEffect(() => {
    if (flag) {
      navigate("/matches");
    } else {
      setFlag(true);
    }
  }, [activeTab]);

  // console.log(activeTab, "activeTab");

  const ChangeButtonValue = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            { flex: 1, display: "flex" },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
            }),
          ]}
        >
          <Box
            sx={{
              width: { mobile: "96vw", laptop: "35vw", tablet: "35vw" },
              minWidth: { laptop: "450px", tablet: "450px", mobile: "0px" },
              marginTop: "10px",
              marginX: { mobile: "2vw", laptop: "5vw" },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "18px", mobile: "20px" },
                fontWeight: "700",
              }}
            >
              Change Button Values
            </Typography>
            <Box
              sx={{
                width: "100%",
                minHeight: "200px",
                background: "#F8C851",
                borderRadius: "5px",
                padding: "20px",
                marginTop: "10px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Price Lable
                  </Typography>
                  {[
                    "100",
                    "5000",
                    "10000",
                    "25000",
                    "50000",
                    "100000",
                    "200000",
                    "500000",
                  ].map((x) => {
                    return <ValButton value={x} />;
                  })}
                </Box>
                <Box sx={{ flex: 1, marginLeft: "10px" }}>
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Price Value
                  </Typography>
                  {[
                    "100",
                    "5000",
                    "10000",
                    "25000",
                    "50000",
                    "100000",
                    "200000",
                    "500000",
                  ].map((x) => {
                    return <ValButton value={x} />;
                  })}
                </Box>
              </Box>
              <Box
                sx={{
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  marginTop: "50px",
                  marginBottom: "40px",
                  width: "80%",
                  background: "#0B4F26",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
                  color={"white"}
                >
                  Update
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const AccountStatement = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              paddingX: "5px",
            },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
            }),
          ]}
        >
          <YellowHeader />
          <AccountStatementList />
        </Box>
      </>
    );
  };

  const BetHistory = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            { flex: 1, display: "flex", minHeight: "100vh" },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
              flexDirection: "column",
            }),
          ]}
        >
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "5px", mobile: "3px" },
              marginTop: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"BET HISTORY"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { laptop: "row", mobile: "column" },
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "99%",
                display: "flex",
                flexDirection: { laptop: "row", mobile: "column" },
              }}
            >
              <AllRateSeperate mark2 mark />
              <Box sx={{ width: { laptop: "1vw", mobile: 0 } }}></Box>
              <SessionBetSeperate mark />
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const ProfitLoss = () => {
    return (
      <>
        <CustomHeader />
        <Box
          flex={1}
          sx={[
            { flex: 1, display: "flex", minHeight: "100vh" },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
              flexDirection: "column",
              paddingX: "1vw",
            }),
          ]}
        >
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "2px", mobile: "6px" },
              marginTop: "10px",
              marginBottom: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"PROFIT/LOSS REPORT"}
          </Typography>
          <ProfitLossComponent />
        </Box>
      </>
    );
  };

  const Rules = () => {
    const ListHeader = () => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "25px",
            background: "white",
            display: "flex",
            padding: "1px",
          }}
        >
          <Box
            sx={{
              width: { laptop: "3%", mobile: "6%" },
              height: "100%",
              background: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
            >
              No.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "97%", mobile: "94%" },
              height: "100%",
              background: "black",
              display: "flex",
              marginLeft: "1px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                color: "white",
                fontSize: "10px",
                paddingLeft: "5px",
              }}
            >
              Description
            </Typography>
          </Box>
        </Box>
      );
    };
    const RowComponent = ({ index }) => {
      let flag = index % 2 != 0;
      return (
        <Box
          sx={{
            width: "100%",
            height: "35px",
            background: "white",
            display: "flex",
            padding: "1px",
            paddingTop: "0px",
          }}
        >
          <Box
            sx={{
              width: { laptop: "3%", mobile: "6%" },
              height: "100%",
              background: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: "500", color: "white", fontSize: "12px" }}
            >
              {index + 1}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { laptop: "97%", mobile: "94%" },
              height: "100%",
              background: flag ? "#ECECEC" : "#FFE094",
              display: "flex",
              marginLeft: "1px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                color: "black",
                fontSize: { laptop: "10px", mobile: "8px" },
                paddingLeft: "5px",
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et
            </Typography>
          </Box>
        </Box>
      );
    };
    return (
      <>
        <CustomHeader />

        <Box
          flex={1}
          sx={[
            {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              paddingX: "5px",
            },
            (theme) => ({
              backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
            }),
          ]}
        >
          <Typography
            sx={{
              fontSize: { mobile: "12px", laptop: "15px" },
              marginLeft: { laptop: "2px", mobile: "3px" },
              marginTop: "10px",
              marginBottom: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"RULES"}
          </Typography>
          <ListHeader />
          {["", "", "", ""].map((value, index) => {
            return <RowComponent index={index} />;
          })}{" "}
        </Box>
      </>
    );
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {window.location.pathname === "/change_password" ? (
        <ChangePassword />
      ) : window.location.pathname === "/change_button_value" ? (
        <ChangeButtonValue />
      ) : window.location.pathname === "/account_statement" ? (
        <AccountStatement />
      ) : window.location.pathname === "/bet_history" ? (
        <BetHistory /> //profit_loss
      ) : window.location.pathname === "/profit_loss" ? (
        <ProfitLoss />
      ) : window.location.pathname === "/rules" ? (
        <Rules />
      ) : (
        <>
          <CustomHeader />
          <Box
            flex={1}
            sx={[
              { flex: 1, display: "flex" },
              (theme) => ({
                backgroundImage: `${theme.palette.primary.homeBodyGradient}`,
              }),
            ]}
          >
            <SideBar />
            {window.location.pathname === "/matches" && (
              <Match
                activeTab={activeTab}
                setVisible={setVisible}
                setSelected={setSelected}
                handleClose={handleClose}
              />
            )}
            {window.location.pathname === "/matchDetail" && (
              <Home
                activeTab={activeTab}
                setVisible={setVisible}
                visible={visible}
                setSelected={setSelected}
                handleClose={handleClose}
              />
            )}
          </Box>
        </>
      )}
      {/* <DailogModal /> */}
    </div>
  );
}

const ValButton = ({ value }) => {
  return (
    <Box
      sx={{
        background: "white",
        height: "40px",
        marginTop: "5px",
        border: "2px solid #DEDEDE",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        px: "5px",
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
        {value}
      </Typography>
    </Box>
  );
};
