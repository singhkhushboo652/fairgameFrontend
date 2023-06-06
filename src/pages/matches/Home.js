import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { SocketContext } from "../../context/socketContext";
import { setRole } from "../../newStore";
import { useEffect } from "react";
import {
  removeCurrentUser,
  setCurrentUser,
} from "../../newStore/reducers/currentUser";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setAllBetRate,
  setAllSessionBets,
  setManualBookMarkerRates,
  setSelectedMatch,
  setSessionRates,
} from "../../newStore/reducers/matchDetails";
import { microServiceApiPath } from "../../components/helper/constants";
import Axios from "axios";
import { MatchOdds } from "../../components";
import MatchComponent from "../../components/MathComponent";
import LiveMatchHome from "../../components/LiveMatchHome";
import AllRateSeperate from "../../components/AllRateSeperate";
import SessionBetSeperate from "../../components/sessionBetSeperate";
import Lottie from "lottie-react";
import { HourGlass } from "../../assets";
import BetPlaced from "../../components/BetPlaced";
import EventListing from "../../components/EventListing";
import { memo } from "react";
import { logout } from "../../newStore/reducers/auth";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import CustomLoader from "../../components/helper/CustomLoader";
let sessionOffline = [];
let matchOddsCount = 0;
const Home = ({ selected, setSelected, setVisible, visible, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [fastAmount, setFastAmount] = useState({
    bookMaker: 0,
    mannualBookMaker: 0,
    sessionOdds: 0,
  });

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const { allBetRates, allSessionBets } = useSelector(
    (state) => state?.matchDetails
  );
  const [IObets, setIObtes] = useState(allBetRates);
  const [sessionBets, setSessionBets] = useState(allSessionBets);
  const id = location.state;
  const [matchDetail, setMatchDetail] = useState();
  const [matchOddsData, setMatchOddsData] = useState([]);
  const [matchSessionData, setMatchSessionData] = useState([]);
  const [marketId, setMarketId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { selectedMatch } = useSelector((state) => state?.matchDetails);
  const [currentMatch, setCurrentMatch] = useState(selectedMatch);
  const [currentMatchProfit, setCurrentMatchProfit] = useState([]);

  const [bookMakerRateLive, setBookMakerLive] = useState(
    currentMatch?.bookMakerRateLive
  );
  // const [liveSssionOdd,setLiveSessionOdd] = useState(currentMatch?.)
  const { socket, socketMicro } = useContext(SocketContext);
  // console.log("selectedMatch :", selectedMatch)
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [isHandled, setIsHandled] = useState(false);
  const checkMctchId = useSelector(
    (state) => state?.matchDetails?.selectedMatch?.id
  );
  const { axios, role } = setRole();
  const [matchId, setMatchId] = useState(
    id || sessionStorage.getItem("matchId")
  );
  // console.log("currentMatchProfit 444:", currentMatchProfit);
  const [sessionExposer, setSessionExposure] = useState(0);
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [sessionLock, setSessionLock] = useState(false);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.on("newMessage", (value) => {
        console.log(value);
      });

      socket.onevent = async (packet) => {
        console.log(`Received event: ${packet.data[0]}`, packet.data[1]);

        if (packet.data[0] === "resultDeclareForBet") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id !== value?.match_id) {
                return currentMatch;
              }
              // Update the bettings array in the current match object
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting.id === value.betId) {
                  if (sessionOffline.includes(value.betId)) {
                    const newres = sessionOffline.filter(
                      (id) => id !== value.betId
                    );
                    sessionOffline = newres;
                  }
                  sessionOffline.push(value.betId);
                }
                return betting;
              });
              var newUpdatedValue = updatedBettings;
              return {
                ...currentMatch,
                bettings: newUpdatedValue,
              };
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "updateMatchActiveStatus") {
          const value = packet.data[1];
          // matchId = value?.matchId;
          setCurrentMatch((currentMatch) => {
            // if (currentMatch?.id === matchId) {
            if (currentMatch?.id === value?.matchId) {
              return {
                ...currentMatch,
                apiBookMakerActive: value?.apiBookMakerActive,
                apiMatchActive: value?.apiMatchActive,
                apiSessionActive: value?.apiSessionActive,
                manualBookMakerActive: value?.manualBookMakerActive,
                manualSessionActive: value?.manualSessionActive,
              };
            }
            return currentMatch;
          });
        }
        if (packet.data[0] === "logoutUserForce") {
          dispatch(removeCurrentUser());
          dispatch(removeManualBookMarkerRates());
          dispatch(removeSelectedMatch());
          dispatch(logout({ roleType: "role4" }));
          setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
          // await axios.get("auth/logout");
          removeSocket();
          socket.disconnect();
          socketMicro.disconnect();
        }
        if (packet.data[0] === "updateSessionRate_user") {
          const value = packet.data[1];
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id !== value?.match_id) {
                // If the new bet doesn't belong to the current match, return the current state
                return currentMatch;
              }
              // Update the bettings array in the current match object
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting.id === value.betId) {
                  // alert(JSON.stringify(value));
                  // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                  return {
                    ...betting,
                    ...value,
                  };
                } else if (
                  betting?.id === value?.betId &&
                  value.sessionBet === false
                ) {
                  return {
                    ...betting,
                    ...value,
                  };
                }
                return betting;
              });
              var newUpdatedValue = updatedBettings;
              const bettingsIds = updatedBettings?.map(
                (betting) => betting?.id
              );
              if (!bettingsIds?.includes(value.betId)) {
                // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array
                newUpdatedValue = [...newUpdatedValue, value];
              }

              // Return the updated current match object
              return {
                ...currentMatch,
                bettings: newUpdatedValue,
              };
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "newBetAdded") {
          const value = packet.data[1];
          console.log("newBetAdded :", value);
          // matchId = value?.match_id;
          try {
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.id !== value?.match_id) {
                // If the new bet doesn't belong to the current match, return the current state
                return currentMatch;
              }

              // Update the bettings array in the current match object
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting.id === value.id && value.sessionBet) {
                  // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                  return {
                    ...betting,
                    ...value,
                  };
                } else if (
                  betting?.id === value?.id &&
                  value.sessionBet === false
                ) {
                  return {
                    ...betting,
                    ...value,
                  };
                }
                return betting;
              });
              var newUpdatedValue = updatedBettings;
              const bettingsIds = updatedBettings?.map(
                (betting) => betting?.id
              );

              if (!bettingsIds?.includes(value.id)) {
                // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

                newUpdatedValue = [...newUpdatedValue, value];
              } else {
                if (
                  sessionOffline.includes(value.id) &&
                  value.betStatus === 1
                ) {
                  const newres = sessionOffline.filter((id) => id !== value.id);
                  sessionOffline = newres;
                }
                if (value?.betStatus === 0) {
                  sessionOffline.push(value.id);
                }
                // newUpdatedValue = newUpdatedValue?.filter(
                //   (v) => v?.id !== value?.id && v?.betStatus === 1
                // );
              }

              // Return the updated current match object
              return {
                ...currentMatch,
                bettings: newUpdatedValue,
              };
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "matchOddRateLive") {
          // Bookmaker Market live and stop disable condition
          const value = packet.data[1];
          setCurrentMatch((prev) => {
            if (prev?.id === value?.matchId) {
              return {
                ...prev,
                matchOddRateLive: value?.matchOddLive,
              };
            }
            return prev;
          });
        }
        if (packet.data[0] === "userBalanceUpdate") {
          const data = packet.data[1];
          const user = {
            ...currentUser,
            current_balance: data?.currentBalacne,
          };
          dispatch(setCurrentUser(user));

          //currentBalacne
        }
        if (packet.data[0] === "bookMakerRateLive") {
          // Bookmaker Market live and stop disable condition
          const value = packet.data[1];
          setCurrentMatch((prev) => {
            if (prev?.id === value?.matchId) {
              return {
                ...prev,
                bookMakerRateLive: value?.bookMakerLive,
              };
            }
            return prev;
          });

          // if (value?.matchId === currentMatch?.id) {
          //   setCurrentMatch((prev) => ({
          //     ...prev,
          //     bookMakerRateLive: value?.bookMakerLive,
          //   }));
          // }
        }

        if (packet.data[0] === "match_bet") {
          // alert(3333)
          const data = packet.data[1];
          if (!isHandled) {
            setIsHandled(true);
            try {
              // console.warn(data, "check rates");
              // getAllBets();
              // console.log(data, "MATCHH_BET", data?.betPlaceData?.match_id, id);
              if (data) {
                const user = {
                  ...currentUser,
                  current_balance: data.newBalance,
                  exposure: data.exposure,
                };
                const manualBookmaker = {
                  matchId: data?.betPlaceData?.match_id,
                  teamA: data.teamA_rate,
                  teamB: data.teamB_rate,
                  teamC: data.teamC_rate,
                };
                const body = {
                  id: data?.betPlaceData?.id,
                  isActive: true,
                  createAt: data?.betPlaceData?.createAt,
                  updateAt: data?.betPlaceData?.createAt,
                  createdBy: null,
                  deletedAt: null,
                  user_id: null,
                  match_id: data?.betPlaceData?.match_id,
                  bet_id: data?.betPlaceData?.bet_id,
                  result: "pending",
                  team_bet: data?.betPlaceData?.team_bet,
                  odds: data?.betPlaceData?.odds,
                  win_amount: null,
                  loss_amount: null,
                  bet_type: data?.betPlaceData?.bet_type,
                  country: null,
                  ip_address: null,
                  rate: null,
                  marketType: data?.betPlaceData?.marketType,
                  amount:
                    data?.betPlaceData?.stack || data?.betPlaceData?.stake,
                };
                if (data?.betPlaceData?.match_id === id) {
                  setIObtes((prev) => [body, ...prev]);
                }
                // alert(JSON.stringify(manualBookmaker));
                dispatch(setCurrentUser(user));
                dispatch(setManualBookMarkerRates(manualBookmaker));
              }
            } catch (e) {
              console.log("error", e?.message);
            } finally {
              setIsHandled(false);
            }
          }
        }

        if (packet.data[0] === "session_bet") {
          const data = packet.data[1];
          try {
            setSessionExposure(data?.sessionExposure);
            setCurrentMatch((currentMatch) => {
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (betting?.id === data?.betPlaceData?.bet_id) {
                  // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                  let profitLoss = data?.profitLoss;
                  return {
                    ...betting,
                    profitLoss: profitLoss,
                  };
                }
                return betting;
              });
              // Return the updated current match object
              return {
                ...currentMatch,
                bettings: updatedBettings,
              };
            });
          } catch (err) {
            console.log(err?.message);
          }
          // setCurrentMatch({
          //   ...currentMatch,
          //   matchSessionData: updatedBettings1
          // });

          const user = {
            ...currentUser,
            current_balance: data.newBalance,
            exposure: data.exposure,
          };
          // alert(JSON.stringify(data?.betPlaceData))
          // console.warn("data?.betPlaceData :", data?.betPlaceData)

          // console.warn("selectedData val112", val);

          setSessionBets((prev) => {
            const updatedPrev = Array.isArray(prev) ? prev : []; // Ensure prev is an array
            return [data.betPlaceData, ...updatedPrev];
          });

          // dispatch(setAllSessionBets([data.betPlaceData, ...session]));
          dispatch(setCurrentUser(user));
          // dispatch(setSessionRates(data?.profitLoss));
        }

        if (packet.data[0] === "sessionResult") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            const user = {
              ...currentUser,
              current_balance: value.current_balance,
              exposure: value.exposure,
            };

            dispatch(setCurrentUser(user));
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.matchId !== value?.matchId) {
                // If the new bet doesn't belong to the current match, return the current state
                return currentMatch;
              }

              const updatedBettings = currentMatch?.bettings?.filter(
                (betting) => betting?.id !== value?.betId
              );

              return {
                ...currentMatch,
                bettings: updatedBettings,
              };
            });
            setSessionExposure(value?.sessionExposure);
            setSessionBets((sessionBets) =>
              sessionBets?.filter((v) => v?.bet_id !== value?.betId)
            );
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "sessionNoResult") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            const user = {
              ...currentUser,
              current_balance: value.current_balance,
              exposure: value.exposure,
            };

            dispatch(setCurrentUser(user));
            setCurrentMatch((currentMatch) => {
              const updatedBettings = currentMatch?.bettings?.map((betting) => {
                if (
                  betting?.id === value?.betId &&
                  currentMatch?.id === value?.match_id
                ) {
                  return {
                    ...betting,
                    profitLoss: null,
                  };
                }
                return betting;
              });

              return {
                ...currentMatch,
                bettings: updatedBettings,
              };
            });

            setSessionExposure(value?.sessionExposure);
            setSessionBets((sessionBets) =>
              sessionBets?.filter((v) => v?.bet_id !== value?.betId)
            );
          } catch (err) {
            console.log(err?.message);
          }
        }

        if (packet.data[0] === "matchResult") {
          const value = packet.data[1];
          // matchId = value?.match_id;
          try {
            const user = {
              ...currentUser,
              current_balance: value.current_balance,
              exposure: value.exposure,
            };

            dispatch(setCurrentUser(user));
            setCurrentMatch((currentMatch) => {
              if (currentMatch?.matchId !== value?.matchId) {
                // If the new bet doesn't belong to the current match, return the current state
                return currentMatch;
              }
              navigate("/matches");
            });
          } catch (err) {
            console.log(err?.message);
          }
        }

        // manual bookmaker
        if (packet.data[0] === "teamA_rate_user") {
          const value = packet.data[1];
          // console.log("value :", value);
          // console.log("manualBookmakerData :", manualBookmakerData);
          // alert(value?.betId);
          // alert(JSON.stringify(value.betId));
          try {
            setManualBookmakerData((currentMatches) => {
              // alert(value.betId)
              // if (currentMatches[0]?.id != value.betId) {
              //   return currentMatches;
              // }
              // Find the index of the match that you want to update
              // const index = currentMatches.findIndex(match => match.id === value?.betId);
              // alert(index)
              // if (index === -1) {
              //   // Match not found, return the current state
              //   return currentMatches;
              // }

              // Update the match object at the specified index
              const updatedMatch = {
                ...currentMatches[0],
                teamA_Back: value?.teamA_Back, // Update the teamA_Back value
                teamA_lay: value?.teamA_lay, // Update the teamA_lay value
                teamA_suspend:
                  value?.teamA_suspend == false ? null : "suspended", // Update the teamA_susp
                teamA_Ball: null,
                teamB_Ball: null,
                teamC_Ball: null,
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });

            console.log("manualBookmakerData 222:", manualBookmakerData);
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "teamB_rate_user") {
          const value = packet.data[1];
          try {
            setManualBookmakerData((currentMatches) => {
              // if (currentMatches[0]?.id != value.betId) {
              //   return currentMatches;
              // }

              // Update the match object at the specified index
              const updatedMatch = {
                ...currentMatches[0],
                teamB_Back: value?.teamB_Back, // Update the teamA_Back value
                teamB_lay: value?.teamB_lay, // Update the teamA_lay value
                teamB_suspend:
                  value?.teamB_suspend == false ? null : "suspended", // Update the teamA_susp
                teamA_Ball: null,
                teamB_Ball: null,
                teamC_Ball: null,
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "teamC_rate_user") {
          const value = packet.data[1];
          try {
            setManualBookmakerData((currentMatches) => {
              // if (currentMatches[0]?.id != value.betId) {
              //   return currentMatches;
              // }

              // Update the match object at the specified index
              const updatedMatch = {
                ...currentMatches[0],
                teamC_Back: value?.teamC_Back, // Update the teamA_Back value
                teamC_lay: value?.teamC_lay, // Update the teamA_lay value
                teamC_suspend:
                  value?.teamC_suspend == false ? null : "suspended", // Update the teamA_susp
                teamA_Ball: null,
                teamB_Ball: null,
                teamC_Ball: null,
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "updateRate_user") {
          const value = packet.data[1];
          try {
            setManualBookmakerData((currentMatches) => {
              // if (currentMatches[0]?.id != value.betId) {
              //   return currentMatches;
              // }
              const updatedMatch = {
                ...currentMatches[0],
                teamA_Back: value?.teamA_Back,
                teamA_lay: "",
                teamB_Back: value?.teamB_Back,
                teamB_lay: "",
                teamC_Back: value?.teamC_Back,
                teamC_lay: "",
                teamA_suspend: "live",
                teamB_suspend: "live",
                teamC_suspend: "live",
              };

              // Create a new array with the updated match object
              const updatedMatches = [
                ...currentMatches.slice(0, 0),
                updatedMatch,
                ...currentMatches.slice(0 + 1),
              ];

              // Return the new array as the updated state
              return updatedMatches;
            });
          } catch (err) {
            console.log(err?.message);
          }
        }
        if (packet.data[0] === "teamA_suspend_user") {
          const value = packet.data[1];
          if (value.teamA_suspend == "Ball Started") {
            try {
              setManualBookmakerData((currentMatches) => {
                // alert(JSON.stringify(currentMatches))
                // if (currentMatches[0]?.id != value.betId) {
                //   return currentMatches;
                // }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamA_suspend: "suspended",
                  teamA_Ball: "ball",
                  teamB_Ball: "ball",
                  teamC_Ball: "ball",
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          } else {
            try {
              setManualBookmakerData((currentMatches) => {
                // alert(JSON.stringify(currentMatches[0]));
                // if (currentMatches[0]?.id != value.betId) {
                //   return currentMatches;
                // }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamA_suspend: "suspended",
                  teamA_Ball: null,
                  teamB_Ball: null,
                  teamC_Ball: null,
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }
        }
        if (packet.data[0] === "teamB_suspend_user") {
          const value = packet.data[1];
          if (value.teamB_suspend == "Ball Started") {
            try {
              setManualBookmakerData((currentMatches) => {
                // if (currentMatches[0]?.id != value.betId) {
                //   return currentMatches;
                // }

                const updatedMatch = {
                  ...currentMatches[0],
                  teamB_suspend: "suspended",
                  teamA_Ball: "ball",
                  teamB_Ball: "ball",
                  teamC_Ball: "ball",
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          } else {
            try {
              setManualBookmakerData((currentMatches) => {
                // if (currentMatches[0]?.id != value.betId) {
                //   return currentMatches;
                // }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamB_suspend: "suspended",
                  teamA_Ball: null,
                  teamB_Ball: null,
                  teamC_Ball: null,
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }
        }
        if (packet.data[0] === "teamC_suspend_user") {
          const value = packet.data[1];
          if (value.teamC_suspend == "Ball Started") {
            try {
              setManualBookmakerData((currentMatches) => {
                // if (currentMatches[0]?.id != value.betId) {
                //   return currentMatches;
                // }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamC_suspend: "suspended",
                  teamA_Ball: "ball",
                  teamB_Ball: "ball",
                  teamC_Ball: "ball",
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          } else {
            try {
              setManualBookmakerData((currentMatches) => {
                // if (currentMatches[0]?.id != value.betId) {
                //   return currentMatches;
                // }
                const updatedMatch = {
                  ...currentMatches[0],
                  teamC_suspend: "suspended",
                  teamA_Ball: null,
                  teamB_Ball: null,
                  teamC_Ball: null,
                };
                const updatedMatches = [
                  ...currentMatches.slice(0, 0),
                  updatedMatch,
                  ...currentMatches.slice(0 + 1),
                ];
                return updatedMatches;
              });
            } catch (err) {
              console.log(err?.message);
            }
          }
        }
      };
    }

    // if (socket && !socket.connected) {
    //   alert("Socket is not connected. Reconnecting...");
    //   socket.connect();
    // }
  }, [socket]);

  useEffect(() => {
    try {
      if (socketMicro && socketMicro.connected && marketId) {
        socketMicro.on("connect", () => {
          socketMicro.emit("init", { id: marketId });
          activateLiveMatchMarket();
          setSessionLock(false);
        });
        socketMicro.on("connect_error", (event) => {
          // Handle the WebSocket connection error here

          setMacthOddsLive([]);
          setBookmakerLive([]);
          setCurrentMatch((currentMatch) => {
            const bettingToUpdate = currentMatch?.bettings?.map((betting) => {
              if (betting?.id && betting?.selectionId && betting?.sessionBet) {
                return { ...betting, yes_rate: null, no_rate: null };
              }
              return betting;
            });

            return {
              ...currentMatch,
              bettings: bettingToUpdate,
            };
          });
          setSessionLock(true);
          console.log("WebSocket connection failed:", event);
        });

        socketMicro.emit("init", { id: marketId });
        activateLiveMatchMarket();
        // socketMicro.on("bookMakerRateLive", (e) => {
        //   console.log("BookMaker", e);
        // });

        socketMicro.on("reconnect", () => {
          socketMicro.emit("init", { id: marketId });
          activateLiveMatchMarket();
          setSessionLock(false);
        });

        socketMicro.on(`session${marketId}`, (val) => {
          // console.log("currentMatchProfit 33:", val);

          if (val !== null && matchId === checkMctchId) {
            // console.warn("updatedBettings1 ", updatedBettings1);
            var newVal = val?.map((v) => ({
              bet_condition: v?.RunnerName,
              betStatus: 0,
              sessionBet: true,
              no_rate: v?.LayPrice1,
              yes_rate: v?.BackPrice1,
              rate_percent: `${v?.LaySize1}-${v?.BackSize1}`,
              suspended: v?.GameStatus,
              selectionId: v?.SelectionId,
            }));

            setCurrentMatch((currentMatch) => {
              if (currentMatch?.bettings?.length > 0) {
                const data = currentMatch?.bettings?.map((betting) => {
                  var selectedData = newVal?.find(
                    (data) => data?.selectionId === betting?.selectionId
                  );
                  if (selectedData !== undefined) {
                    return {
                      ...betting,
                      bet_condition: selectedData?.bet_condition,
                      no_rate: selectedData?.no_rate,
                      yes_rate: selectedData?.yes_rate,
                      rate_percent: selectedData?.rate_percent,
                      suspended: selectedData?.suspended,
                      selectionId: selectedData?.selectionId,
                    };
                  }
                  return betting;
                });

                // Merge the filteredNewVal with the currentMatch bettings array

                return {
                  ...currentMatch,
                  bettings: data,
                };
              }
              return currentMatch;
            });
          }
          // dispatch(setSessionOddsLive(body));
        });
        socketMicro.on(`matchOdds${marketId}`, (val) => {
          // matchodds Market live and stop disable condition
          if (val !== null) {
            if (val.length === 0) {
              matchOddsCount += 1;
              if (matchOddsCount >= 3) {
                socketMicro.emit("disconnect_market", {
                  id: marketId,
                });
                setMacthOddsLive([]);
                // socketMicro.disconnect();
              }
            } else {
              // dispatch(setMatchOddsLive(val[0]));
              setMacthOddsLive(val[0]);
              if (val[0]?.status === "CLOSED") {
                socketMicro.emit("disconnect_market", {
                  id: marketId,
                });
                setMacthOddsLive([]);
              }
            }
          }
        });
        socketMicro.on(`bookmaker${marketId}`, (val) => {
          if (val !== null) {
            // console.log("val 222:", val);
            if (val.length > 0) {
              // dispatch(setBookMakerLive(val[0]));
              setBookmakerLive(val[0]);
            } else {
              setBookmakerLive([]);
            }
          }
        });
      } else {
        setMacthOddsLive([]);
        setBookmakerLive([]);
        setSessionLock(false);
      }
    } catch (e) {
      console.log("error", e);
    }
    return () => {
      socketMicro?.emit("disconnect_market", {
        id: marketId,
      });
      setMacthOddsLive([]);
      setBookmakerLive([]);
      setSessionLock(false);
    };
  }, [socketMicro, marketId]);

  async function getAllBetsData1() {
    let payload = {
      match_id: id,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);

      setIObtes(
        data?.data?.data?.filter((b) =>
          ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
        )
      );
      const bets = data?.data?.data?.filter(
        (b) =>
          !["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
      );

      // console.log("bets", bets, data?.data?.data);
      setSessionBets(bets || []);
    } catch (e) {
      console.log(e);
    }
  }

  const activateLiveMatchMarket = async () => {
    try {
      await Axios.get(`${microServiceApiPath}/market/${marketId}`);
    } catch (e) {
      console.log("error", e?.message);
    }
  };

  async function getThisMatch(id) {
    try {
      const response = await axios.get(`/game-match/matchDetail/${id}`);
      console.log("response.data :", response.data);

      let matchOddsDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );
      console.log("matchOddsDataTemp :", matchOddsDataTemp);
      setManualBookmakerData(matchOddsDataTemp);
      // console.log("manualBookmakerData:", manualBookmakerData);

      // let matchSessionDataTemp = response.data?.bettings?.filter(
      //   (element) => element.sessionBet === true
      // );
      setSessionExposure(response?.data?.sessionExposure);
      setCurrentMatch({
        ...response.data,
      });
      // let bettingsData = response?.data;
      // console.log("response.data :", bettingsData)
      // setCurrentMatchProfit(bettingsData);

      // console.log("currentMatchProfit 111:", currentMatchProfit);
      dispatch(
        setSelectedMatch({
          ...response.data,
        })
      );
      // alert(response.data.teamA_rate)
      // alert(response.data.teamC_rate)
      dispatch(
        setManualBookMarkerRates({
          matchId: response.data.id,
          teamA: response.data.teamA_rate ? response.data.teamA_rate : 0,
          teamB: response.data.teamB_rate ? response.data.teamB_rate : 0,
          teamC: response.data.teamC_rate ? response.data.teamC_rate : 0,
        })
      );
      // setCurrentMatch(response.data);
      // setMatchOddsData(matchOddsDataTemp);

      // setMatchSessionData(matchSessionDataTemp);

      // dispatch(
      // console.warn("response.dat :",response.data)
      setMarketId(response.data.marketId);
      setMatchDetail(response.data);
      dispatch(
        setAllSessionBets(
          response?.data?.betting?.filter((v) => v?.sessionBet === true) || []
        )
      );
      // response.data.bettings?.forEach((element) => {
      //   if (element.sessionBet) {
      //     setSessionBets((prev) => {
      //       if (!prev.some((bet) => bet.id === element.id)) {
      //         return [...prev, element];
      //       }
      //       return prev;
      //     });
      //   } else {
      // setAllBetRates((prev) => {
      //   if (!prev.some((bet) => bet.id === element.id)) {
      //     return [...prev, element];
      //   }
      //   return prev;
      // });
      //   }
      // });
      // console.log(response.data, "sda");
      setLoading(false);
    } catch (e) {
      console.log("response", e.response.data);
      setLoading(false);
    }
  }
  // async function getAllBetsData() {
  //   try {
  //     let response = await axios.get(
  //       `/game-match/getAllMatch?bets=1&field=id,marketId`
  //     );
  //     setAllBetsData(response.data[0]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  useEffect(() => {
    if (matchId) {
      getThisMatch(matchId);
    }
    // getAllBetsData();
    getAllBetsData1();
  }, [matchId]);

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        marginTop: "1%",
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <EventListing setSelected={setSelected} selected={selected} />
      <BetPlaced visible={visible} setVisible={setVisible} />
      {/* {console.warn("currentMatch :", currentMatch)} */}
      {loading ? (
        <CustomLoader text="" />
      ) : (
        <>
          {matchesMobile &&
            (selected === "CRICKET" || selected === "INPLAY") && (
              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  gap: "8px",
                  marginTop: "2%",
                  flexDirection: "column",
                }}
              >
                <MatchComponent currentMatch={currentMatch} />
                <div style={{ width: "100%" }}>
                  <MatchOdds
                    sessionBets={sessionBets}
                    setFastAmount={setFastAmount}
                    fastAmount={fastAmount}
                    matchOddsLive={matchOddsLive}
                    sessionExposer={sessionExposer}
                    bookmakerLive={bookmakerLive}
                    onClick={() => handleClose(true)}
                    bookMakerRateLive={bookMakerRateLive}
                    data={currentMatch}
                    sessionOffline={sessionOffline}
                    // dataProfit={currentMatchProfit}
                    allBetsData={sessionBets}
                    manualBookmakerData={manualBookmakerData}
                  />
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "98%",
                    }}
                  >
                    {matchDetail?.manualSessionActive && (
                      <SessionBetSeperate allBetsData={sessionBets} mark />
                    )}
                    {IObets.length > 0 && (
                      <AllRateSeperate
                        allBetsData={IObets?.filter((v) =>
                          [
                            "MATCH ODDS",
                            "BOOKMAKER",
                            "MANUAL BOOKMAKER",
                          ]?.includes(v.marketType)
                        )}
                        count={
                          IObets?.filter((v) =>
                            [
                              "MATCH ODDS",
                              "BOOKMAKER",
                              "MANUAL BOOKMAKER",
                            ]?.includes(v.marketType)
                          ).length
                        }
                        mark
                      />
                    )}
                  </Box>
                  <LiveMatchHome />
                </Box>
              </div>
            )}
          {!matchesMobile &&
            (selected === "CRICKET" || selected === "INPLAY") && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: "8px",
                  marginTop: "1%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "70%",
                  }}
                >
                  <MatchOdds
                    sessionBets={sessionBets}
                    sessionExposer={sessionExposer}
                    setFastAmount={setFastAmount}
                    fastAmount={fastAmount}
                    matchOddsLive={matchOddsLive}
                    bookmakerLive={bookmakerLive}
                    sessionOffline={sessionOffline}
                    onClick={() => handleClose(true)}
                    data={currentMatch}
                    // dataProfit={currentMatchProfit}
                    allBetsData={allSessionBets}
                    manualBookmakerData={manualBookmakerData}
                  />
                </Box>
                <Box sx={{ width: "30%", paddingRight: "1%" }}>
                  <MatchComponent currentMatch={currentMatch} />{" "}
                  {/** Live scoreBoard */}
                  <LiveMatchHome currentMatch={currentMatch} /> {/* Poster */}
                  <AllRateSeperate
                    allBetsData={IObets?.filter((v) =>
                      ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"]?.includes(
                        v.marketType
                      )
                    )}
                    count={
                      IObets?.filter((v) =>
                        [
                          "MATCH ODDS",
                          "BOOKMAKER",
                          "MANUAL BOOKMAKER",
                        ]?.includes(v.marketType)
                      ).length
                    }
                    mark
                  />
                  {(matchDetail?.manualSessionActive ||
                    matchDetail?.apiSessionActive) && (
                    <SessionBetSeperate allBetsData={sessionBets} mark />
                  )}
                </Box>
              </Box>
            )}
        </>
      )}
    </Box>
  );
};

export default memo(Home);
