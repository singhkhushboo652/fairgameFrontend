import { memo } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import moment from "moment";
import { StyledImage } from ".";
import { ArrowDown } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import SessionBetSeperate from "./sessionBetSeperate";
import ChildUserList from "./ChildUserList";
import { useState } from "react";
import { useEffect } from "react";
import { setRole } from "../newStore";
import AllRateSeperate from "./AllRateSeperate";

const AllUserListSeparate = ({
  item,
  index,
  getBetReport,
  showListOfUsers,
  sessionBetData,
  selectedId,
  matchId,
}) => {
  const theme = useTheme();
  let { axios } = setRole();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [showSessionResultList, setShowSessionResultList] = useState(false);
  const [showChildUserList, setShowChildUserList] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [betData, setBetData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [data1, setData] = useState([]);

  const [showSubUsers, setSubSusers] = useState({
    value: false,
    id: "",
    role: item?.role,
  });

  const getBetAndSessionData = async () => {
    try {
      let payload = {
        gameType: item?.eventType,
        userId: item?.userId,
        matchId: matchId,
      };
      let payload2 = {
        gameType: item?.eventType,
        userId: item?.userId,
        match_id: matchId,
        sessionBet: true,
      };
      const resp = await axios.post(`/betting/getResultBetProfitLoss`, payload);

      const resp2 = await axios.post(
        `/betting/getResultBetProfitLoss`,
        payload2
      );
      const newData = resp?.data?.data?.filter((v) => v.sessionBet !== true);
      const newData1 = resp2?.data?.data?.filter((v) => v.sessionBet === true);

      setBetData(
        newData?.map((v) => ({
          id: v.id,
          isActive: true,
          createAt: v.createAt,
          updateAt: v.createAt,
          createdBy: null,
          deletedAt: null,
          user_id: null,
          match_id: v.match_id,
          bet_id: v.bet_id,
          result: "pending",
          team_bet: v.team_bet || v.teamBet,
          odds: v.odds,
          win_amount: null,
          loss_amount: null,
          bet_type: v.betType,
          country: null,
          ip_address: null,
          rate: null,
          marketType: v.marketType,
          myProfitLoss: v.myProfitLoss,
          amount: v.amount,
          deleted_reason: v.deleted_reason,
          username: v.username,
        }))
      );
      setSessionData(
        newData1?.map((v) => ({
          id: v.id,
          isActive: true,
          createAt: v.createAt,
          updateAt: v.createAt,
          createdBy: null,
          deletedAt: null,
          user_id: null,
          match_id: v.match_id,
          bet_id: v.bet_id,
          result: "pending",
          team_bet: v.team_bet || v.teamBet,
          odds: v.odds,
          win_amount: null,
          loss_amount: null,
          bet_type: v.betType,
          country: null,
          ip_address: null,
          rate: null,
          marketType: v.marketType,
          myProfitLoss: v.myProfitLoss,
          amount: v.amount,
          deleted_reason: v.deleted_reason,
          username: v.username,
        }))
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box key={index} sx={{ width: "100%" }}>
      <Box
        onClick={() => {
          if (!["user"].includes(item?.role)) {
            if (showSubUsers?.value && showSubUsers?.id === item?.userId) {
              setSubSusers({
                ...showSubUsers,
                value: false,
                id: "",
              });
              setShowChildUserList(false);
            } else {
              setSubSusers({
                ...showSubUsers,
                value: true,
                id: item?.userId,
              });
              setShowChildUserList(true);
            }
          } else {
            if (showSessionResultList) {
              setShowSessionResultList((prev) => !prev);
            } else {
              getBetAndSessionData();
              setShowSessionResultList(true);
            }
          }
          // if (item?.role !== "user") {
          //   setShowChildUserList(true);
          //   setSelectedUserId(item?.userId);
          // } else if (item?.role === "user") {
          //   setShowSessionResultList((prev) => !prev);
          //   setSelectedUserId(item?.userId);
          // }
        }}
        sx={{
          width: "100%",
          height: "45px",
          background: "white",
          display: "flex",
          padding: 0.1,
        }}
      >
        <Box
          sx={{
            width: { mobile: "10%", laptop: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "black",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
          >
            {"0" + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { mobile: "65%", laptop: "80%", tablet: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: { laptop: "center", mobile: "flex-end" },
            display: "flex",
            paddingX: "10px",
            background: "#0B4F26",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { laptop: "0px", mobile: "10px" },
              color: "white",
              marginLeft: "5px",
              fontWeight: "500",
              position: "absolute",
              top: 0,
              right: 5,
            }}
          >
            ({moment(item?.betDate).format("DD-MM-YYYY")})
          </Typography>

          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "10px", laptop: "15px" },
                color: "white",
                fontWeight: "700",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
              }}
            >
              {item?.userName}
            </Typography>
          </Box>
          {item?.role !== "user" && (
            <StyledImage
              onClick={() => {}}
              src={ArrowDown}
              sx={{
                width: { laptop: "20px", mobile: "10px" },
                height: { laptop: "10px", mobile: "6px" },
                transform:
                  showSubUsers?.id === item?.userId && showChildUserList
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            background: "#27AC1E",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "12px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Profit
            </Typography>
            <StyledImage
              src={ARROWUP}
              sx={{
                width: { laptop: "25px", mobile: "15px" },
                height: { laptop: "12px", mobile: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss >= 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#E32A2A",
            paddingX: "2px",
            width: { mobile: "25%", laptop: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { laptop: "12px", mobile: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Loss
            </Typography>
            <StyledImage
              src={ARROWDOWN}
              sx={{
                width: { laptop: "25px", mobile: "15px" },
                height: { laptop: "12px", mobile: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss < 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      {showSubUsers?.value && (
        <>
          <Box
            sx={{
              width: { mobile: "100%", laptop: "99%" },
              marginTop: { mobile: ".25vh" },
              marginLeft: { laptop: "1%" },
              display: "flex",
              flexDirection: { laptop: "row", mobile: "column" },
            }}
          >
            <Box Box sx={{ width: "100%", display: "flex", gap: 1 }}>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                  // maxHeight: "51vh",
                  overflow: "hidden",
                  // overflowY: "auto",
                  marginY: { mobile: ".2vh", laptop: "1vh" },
                  padding: 0.2,
                }}
              >
                <ChildUserList
                  id={showSubUsers?.id}
                  show={showSubUsers?.value}
                  setShow={showSubUsers}
                  matchId={matchId}
                  role={showSubUsers?.role}
                  getBetReport={getBetReport}
                  sessionBetData={sessionBetData}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}

      {showSessionResultList && item?.role === "user" && (
        <Box
          sx={{
            width: { mobile: "100%", laptop: "99%" },
            marginTop: { mobile: ".25vh" },
            marginLeft: { laptop: "1%" },
            display: "flex",
            flexDirection: { laptop: "row", mobile: "column" },
          }}
        >
          <Box Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <Box
              sx={{
                width: { mobile: "50%", laptop: "50%", tablet: "50%" },
                maxHeight: "51vh",
                overflow: "hidden",
                // overflowY: "auto",
                marginY: { mobile: ".2vh", laptop: "1vh" },
                padding: 0.2,
              }}
            >
              <AllRateSeperate
                betHistory={false}
                allBetsData={betData}
                profit
                isArrow={true}
              />
            </Box>
            <Box
              sx={{
                width: { mobile: "50%", laptop: "50%", tablet: "50%" },
                maxHeight: "51vh",
                overflow: "hidden",
                // overflowY: "auto",
                marginY: { mobile: ".2vh", laptop: "1vh" },
                padding: 0.2,
              }}
            >
              <SessionBetSeperate
                betHistory={false}
                allBetsData={sessionData}
                profit
                isArrow={true}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(AllUserListSeparate);
