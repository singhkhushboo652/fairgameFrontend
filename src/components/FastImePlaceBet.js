import { TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "../components/index.css";
import { toast } from "react-toastify";
import { currencyFormatter } from "./helper/helper";
const FastTimePlaceBet = ({
  session,
  setFastAmount,
  selectedValue,
  setShowFastTimeBox,
  fromOdds,
  selectedFastAmount,
  typeOfBet,
  matchOddsData,
}) => {
  console.log(matchOddsData, "matchOddsData");
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const { buttonData } = useSelector((state) => state?.matchDetails);
  const [buttonList, setButtonList] = useState(buttonData);

  const myDivRef = useRef(null);

  useEffect(() => {
    if (!fromOdds) {
      // scrollToBottom();
      scrollToFullDiv();
      setButtonList(buttonData);
    }
  }, [selectedValue, fromOdds]);

  const scrollToFullDiv = () => {
    if (myDivRef.current) {
      const { scrollTop, offsetHeight, scrollHeight } = myDivRef.current;
      const scrollPosition = scrollTop + offsetHeight;

      if (scrollPosition < scrollHeight) {
        myDivRef.current.scrollTop = scrollHeight;
      }
    }
  };

  const handleAmountClick = (payload, session, value) => {
    if (session === "sessionOdds") {
      setFastAmount((prev) => ({ ...prev, sessionOdds: value }));
    } else if (session === "bookmaker") {
      setFastAmount((prev) => ({ ...prev, bookMaker: value }));
    } else if (session === "manualBookMaker") {
      console.log("payload", payload);
    }
    // } else if (session === "manualBookMaker") {
    //   if (type === "back") {
    //     if (matchOddsData?.teamA_suspend === null) {
    //       setFastAmountQuickBet((prev) => ({
    //         ...prev,
    //         [typeOfBet]: {
    //           ...prev[typeOfBet],
    //           teamA: {
    //             ...prev[typeOfBet].teamA,
    //             back: value,
    //           },
    //         },
    //       }));
    //     } else if (matchOddsData?.teamB_suspend === null) {
    //       setFastAmountQuickBet((prev) => ({
    //         ...prev,
    //         [typeOfBet]: {
    //           ...prev[typeOfBet],
    //           teamB: {
    //             ...prev[typeOfBet].teamB,
    //             back: value,
    //           },
    //         },
    //       }));
    //     }
    //   }
    //   if (type === "lay") {
    //     if (matchOddsData?.teamA_suspend === null) {
    //       setFastAmountQuickBet((prev) => ({
    //         ...prev,
    //         [typeOfBet]: {
    //           ...prev[typeOfBet],
    //           teamA: {
    //             ...prev[typeOfBet].teamA,
    //             lay: value,
    //           },
    //         },
    //       }));
    //     } else if (matchOddsData?.teamB_suspend === null) {
    //       setFastAmountQuickBet((prev) => ({
    //         ...prev,
    //         [typeOfBet]: {
    //           ...prev[typeOfBet],
    //           teamB: {
    //             ...prev[typeOfBet].teamB,
    //             lay: value,
    //           },
    //         },
    //       }));
    //     }
    //   }
    //   setFastAmount((prev) => ({ ...prev, [typeOfBet]: value }));
    // setShowFastTimeBox(false);
  };

  // const handleChange = (e) => {
  //   const value = e.target.value.trim();

  //   if (value === "") {
  //     if (session === "sessionOdds") {
  //       setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
  //     } else if (session === "manualBookMaker") {
  //       setFastAmount((prev) => ({ ...prev, [typeOfBet]: 0 }));
  //     } else if (session === "bookmaker") {
  //       setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
  //     }
  //   } else {
  //     if (Number(value) <= 500000) {
  //       if (session === "sessionOdds") {
  //         setFastAmount((prev) => ({ ...prev, sessionOdds: Number(value) }));
  //       } else if (session === "manualBookMaker") {
  //         setFastAmount((prev) => ({
  //           ...prev,
  //           [typeOfBet]: Number(value),
  //         }));
  //       } else if (session === "bookmaker") {
  //         setFastAmount((prev) => ({ ...prev, bookMaker: Number(value) }));
  //       }
  //     } else {
  //       toast.warning(
  //         `Value must be between less then 500000
  //         `
  //       );
  //     }
  //   }
  // };

  return (
    <Box
      // ref={refs}
      ref={myDivRef}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          border: "1px solid white",
          borderRadius: "5px",
          gap: 1,
          overflow: "hidden",
          width: "100%",
        },
      ]}
    >
      <Box
        sx={{
          background: "#F8C851",
          width: { mobile: "100%", laptop: "100%" },
          overflow: "hidden",
          display: "flex",

          // justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          paddingY: "8px",
        }}
      >
        {matchesMobile && (
          <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
        )}

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            padding: "5px",
          }}
        >
          <Box
            sx={{
              width: { mobile: "50%", laptop: "60%", tablet: "50%" },
              height: "45px",

              paddingLeft: "20px",
              paddingRight: "20px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
            }}
          >
            <TextField
              onChange={handleChange}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                inputProps: { min: "0" },
                type: "number",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
          </Box>
          <Box
            sx={{
              width: { mobile: "50%", laptop: "40%", tablet: "50%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              flexDirection: "row-reverse",
            }}
          >
            <button
              // style={classes.CustomButton_Btn("#262626")}
              style={{
                color: "#fff",
                backgroundColor: "rgb(49 158 91)",
                width: "50%",
                // width: { laptop: "150px", mobile: "130px" },
                height: "45px",
                borderRadius: "5px",
                border: "2px solid white",
              }}
              onClick={() => {
                setShowFastTimeBox(false);
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "11px", laptop: "14px", tablet: "14px" },
                }}
              >
                Submit
              </Typography>
            </button>
            <button
              // style={classes.CustomButton_Btn("#262626")}
              style={{
                color: "#fff",
                backgroundColor: "#FF4D4D",
                width: "50%",
                // width: { laptop: "150px", mobile: "130px" },
                height: "45px",
                borderRadius: "5px",
                border: "2px solid white",
              }}
              onClick={() => {
                if (session === "sessionOdds") {
                  setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
                } else if (session === "manualBookMaker") {
                  setFastAmount((prev) => ({ ...prev, [typeOfBet]: 0 }));
                } else if (session === "bookmaker") {
                  setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
                }
                setShowFastTimeBox(false);
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "11px", laptop: "14px", tablet: "14px" },
                }}
              >
                Cancel
              </Typography>
            </button>
          </Box>
        </Box> */}
        {
          <>
            {matchOddsData.teamA_suspend == null ||
              (true && matchOddsData.teamB_suspend === null) ||
              (true && (
                <>
                  <Box
                    sx={{
                      // display: "flex",
                      // marginTop: "15px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      border: "1px solid #cc9f30",
                      padding: "0.5rem",
                      gap: { mobile: "3px", laptop: 1, tablet: 1 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        // marginTop: "15px",
                        ml: "6px",
                        flexWrap: "wrap",
                        maxWidth: "100%",
                        flex: 1,
                        // border: "1px solid black",
                        // padding: "0.5rem",
                        marginBottom: "5px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "black",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >
                        {"Team A"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        maxWidth: "100%",
                        flex: 1,
                        // border: "1px solid black",
                        // padding: "0.5rem",
                        gap: { mobile: "3px", laptop: 1, tablet: 1 },
                      }}
                    >
                      {buttonList.length > 0 &&
                        buttonList?.map((v, index) => (
                          <NumberData
                            key={index}
                            containerStyle={{
                              marginLeft: "2px",
                              flex: 1,
                              background: selectedFastAmount === v && "#FF4949",
                              borderRadius: "5px",
                              border: "2px solid white",
                            }}
                            value={v.value}
                            lable={v.lable}
                            type={"back"}
                            session={session}
                            // setShowFastTimeBox={setShowFastTimeBox}
                            typeOfBet={typeOfBet}
                            // setFastAmount={setFastAmount}
                            backgroundColor={"#A7DCFF"}
                            matchOddsData={matchOddsData}
                            // setFastAmountQuickBet={setFastAmountQuickBet}
                            handleAmountClick={handleAmountClick}
                          />
                        ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      // display: "flex",
                      // marginTop: "15px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      border: "1px solid #cc9f30",
                      padding: "0.5rem",
                      gap: { mobile: "3px", laptop: 1, tablet: 1 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        // marginTop: "15px",
                        ml: "6px",
                        flexWrap: "wrap",
                        maxWidth: "100%",
                        flex: 1,
                        // border: "1px solid black",
                        // padding: "0.5rem",
                        marginBottom: "5px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "black",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >
                        {"Team B"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        // marginTop: "15px",
                        marginX: "2px",
                        flexWrap: "wrap",
                        maxWidth: "100%",
                        flex: 1,
                        // border: "1px solid black",
                        // padding: "0.5rem",
                        gap: { mobile: "3px", laptop: 1, tablet: 1 },
                      }}
                    >
                      {buttonList.length > 0 &&
                        buttonList?.map((v, index) => (
                          <NumberData
                            key={index}
                            containerStyle={{
                              marginLeft: "2px",
                              flex: 1,
                              background: selectedFastAmount === v && "#FF4949",
                              borderRadius: "5px",
                              border: "2px solid white",
                            }}
                            value={v.value}
                            lable={v.lable}
                            type={"back"}
                            session={session}
                            // setShowFastTimeBox={setShowFastTimeBox}
                            typeOfBet={typeOfBet}
                            // setFastAmount={setFastAmount}
                            backgroundColor={"#A7DCFF"}
                            matchOddsData={matchOddsData}
                            // setFastAmountQuickBet={setFastAmountQuickBet}
                            handleAmountClick={handleAmountClick}
                          />
                        ))}
                    </Box>
                  </Box>
                </>
              ))}
            {matchOddsData.teamA_suspend !== null ||
              (matchOddsData.teamB_suspend !== null && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      // marginTop: "15px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      gap: { mobile: "3px", laptop: 1, tablet: 1 },
                    }}
                  >
                    {buttonList.length > 0 &&
                      buttonList?.map((v, index) => (
                        <NumberData
                          key={index}
                          containerStyle={{
                            marginLeft: "2px",
                            flex: 1,
                            background: selectedFastAmount === v && "#FF4949",
                            borderRadius: "5px",
                            border: "2px solid white",
                          }}
                          value={v.value}
                          lable={v.lable}
                          type={"back"}
                          session={session}
                          betOnTeam={
                            [null, ""].includes(matchOddsData?.teamA_Back)
                              ? matchOddsData?.teamB
                              : matchOddsData?.teamA
                          }
                          odds={
                            [null, ""].includes(matchOddsData?.teamA_Back)
                              ? matchOddsData?.teamB_Back
                              : matchOddsData?.teamA_Back
                          }
                          typeOfBet={typeOfBet}
                          backgroundColor={"#A7DCFF"}
                          matchOddsData={matchOddsData}
                          handleAmountClick={handleAmountClick}
                        />
                      ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // marginY: "8px",
                      marginX: "2px",
                      flexWrap: "wrap",
                      maxWidth: "50%",
                      flex: 1,
                      gap: { mobile: "3px", laptop: 1, tablet: 1 },
                    }}
                  >
                    {buttonList.length > 0 &&
                      buttonList?.map((v, index) => (
                        <NumberData
                          key={index}
                          containerStyle={{
                            marginLeft: "2px",
                            flex: 1,
                            background: selectedFastAmount === v && "#FF4949",
                            borderRadius: "5px",
                            border: "2px solid white",
                          }}
                          value={v.value}
                          lable={v.lable}
                          type={"lay"}
                          session={session}
                          betOnTeam={
                            [null, ""].includes(matchOddsData?.teamA_lay)
                              ? matchOddsData?.teamB
                              : matchOddsData?.teamA
                          }
                          odds={
                            [null, ""].includes(matchOddsData?.teamA_lay)
                              ? matchOddsData?.teamB_lay
                              : matchOddsData?.teamA_lay
                          }
                          typeOfBet={typeOfBet}
                          backgroundColor={"#FFB5B5"}
                          matchOddsData={matchOddsData}
                          handleAmountClick={handleAmountClick}
                        />
                      ))}
                  </Box>
                </>
              ))}
            {/* <Box
              sx={{
                display: "flex",
                // marginTop: "15px",
                marginX: "2px",
                flexWrap: "wrap",
                maxWidth: "50%",
                flex: 1,
                gap: { mobile: "3px", laptop: 1, tablet: 1 },
              }}
            >
              {buttonList.length > 0 &&
                buttonList?.map((v, index) => (
                  <NumberData
                    key={index}
                    containerStyle={{
                      marginLeft: "2px",
                      flex: 1,
                      background: selectedFastAmount === v && "#FF4949",
                      borderRadius: "5px",
                      border: "2px solid white",
                    }}
                    value={v.value}
                    lable={v.lable}
                    type={"back"}
                    session={session}
                    setShowFastTimeBox={setShowFastTimeBox}
                    typeOfBet={typeOfBet}
                    setFastAmount={setFastAmount}
                    backgroundColor={"#A7DCFF"}
                    quickBetTeamData={quickBetTeamData}
                    setQuickBetTeamData={setQuickBetTeamData}
                    matchOddsData={matchOddsData}
                  />
                ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                // marginY: "8px",
                marginX: "2px",
                flexWrap: "wrap",
                maxWidth: "50%",
                flex: 1,
                gap: { mobile: "3px", laptop: 1, tablet: 1 },
              }}
            >
              {buttonList.length > 0 &&
                buttonList?.map((v, index) => (
                  <NumberData
                    key={index}
                    containerStyle={{
                      marginLeft: "2px",
                      flex: 1,
                      background: selectedFastAmount === v && "#FF4949",
                      borderRadius: "5px",
                      border: "2px solid white",
                    }}
                    value={v.value}
                    lable={v.lable}
                    type={"lay"}
                    session={session}
                    setShowFastTimeBox={setShowFastTimeBox}
                    typeOfBet={typeOfBet}
                    setFastAmount={setFastAmount}
                    backgroundColor={"#FFB5B5"}
                    quickBetTeamData={quickBetTeamData}
                    setQuickBetTeamData={setQuickBetTeamData}
                    matchOddsData={matchOddsData}
                  />
                ))}
            </Box> */}
          </>
        }
      </Box>
    </Box>
  );
};

const NumberData = ({
  value,
  typeOfBet,
  containerStyle,
  // setFastAmount,
  // setShowFastTimeBox,
  session,
  backgroundColor,
  type,
  betOnTeam,
  matchOddsData,
  // setFastAmountQuickBet,
  handleAmountClick,
  odds,
}) => {
  return (
    <Box
      onClick={() => {
        const payload = {
          betId: matchOddsData?.bet_id,
          betOn: betOnTeam,
          bet_type: type,
          // country: "India",
          id: matchOddsData?.match_id,
          // ip_address: "45.248.161.71",
          marketType: typeOfBet,
          matchType: matchOddsData?.matchType,
          odds: odds,
          place_index: 0,
          stack: currencyFormatter(value),
          stake: currencyFormatter(value),
          teamA_name: matchOddsData?.teamA,
          teamB_name: matchOddsData?.teamB,
          teamC_name: matchOddsData?.teamC,
          team_bet: betOnTeam,
        };
        handleAmountClick(payload, currencyFormatter(value));
      }}
      sx={[
        {
          display: "flex",
          cursor: "pointer",
          borderRadius: "3px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          minWidth: { laptop: "22%", mobile: "47%" },
          background: `${backgroundColor}`,
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {currencyFormatter(value)}
      </Typography>
    </Box>
  );
};
export default FastTimePlaceBet;
