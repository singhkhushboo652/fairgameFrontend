import { memo, useContext, useEffect, useState } from "react";
import ListH from "./ListH";
import ListHeaderT from "./ListHeaderT";
import Row from "./Row";
import { Box, Pagination } from "@mui/material";
import { setRole } from "../../newStore";
import constants from "../../components/helper/constants";
import { SocketContext } from "../../context/socketContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllEventSession,
} from "../../newStore/reducers/expertMatchDetails";

const MatchListComp = () => {
  const [allMatch, setAllMatch] = useState([]);
  const [pageCount, setPageCount] = useState(constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(constants.customPageLimit);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { allEventSession } = useSelector(
    (state) => state?.expertMatchDetails
  );

  const { axios } = setRole();
  const getAllMatch = async (title) => {
    try {
      if (title) {
        setCurrentPage(1);
      }

      let response = await axios.get(
        `/game-match/getAllMatch?${title ? `title=${title}` : ""
        }&pageNo=${currentPage}&pageLimit=${pageLimit}`
      );
      setAllMatch(response.data[0]);

      setPageCount(
        Math.ceil(
          parseInt(response?.data[1] ? response.data[1] : 1) /
          constants.customPageLimit
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllMatch();
  }, [currentPage]);
  function callPage(e, value) {
    setCurrentPage(parseInt(value));
  }
  useEffect(() => {
    if (socket && socket.connected) {
      socket.onevent = async (packet) => {
        if (packet.data[0] === "newMatchAdded") {
          getAllMatch();
        }
        if (packet.data[0] === "resultDeclareForBet") {
          getAllMatch();
        }
        if (packet.data[0] === "newBetAdded") {
          const value = packet.data[1];
          try {
            const updatedAllEventSession = allEventSession.map(
              (currentMatch) => {
                if (currentMatch.id === value?.match_id) {
                  const betObj = {
                    id: value.id,
                    bet_condition: value.bet_condition,
                  };
                  const newBettings = [...currentMatch.bettings, betObj];
                  return {
                    ...currentMatch,
                    bettings: newBettings,
                  };
                }
                return currentMatch;
              }
            );
            dispatch(setAllEventSession(updatedAllEventSession));
          } catch (err) {
            console.log(err?.message);
          }
        }
      };
    }
  }, [socket]);
  // const currentElements = allMatch;
  return (
    <Box
      sx={[
        {
          marginX: "10px",
          marginTop: "10px",
          minHeight: "200px",
          borderRadius: "10px",
          border: "2px solid white",
        },
        (theme) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <ListH getAllMatch={getAllMatch} />
      <ListHeaderT />
      {allMatch.map((element, i) => {
        return (
          <Row
            key={i}
            index={i + 1}
            containerStyle={{ background: (i + 1) % 2 === 0 ? "#ECECEC" : "" }}
            data={element}
          />
        );
      })}
      <Pagination
        sx={{
          background: "#073c25",
          overflow: "hidden",
          borderRadius: "0px 0px 10px 10px",
        }}
        page={currentPage}
        className="whiteTextPagination d-flex justify-content-center"
        count={pageCount}
        color="primary"
        onChange={callPage}
      />
    </Box>
  );
};

export default memo(MatchListComp);
