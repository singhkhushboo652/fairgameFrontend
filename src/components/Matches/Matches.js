import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import "../index.css";
import { setRole } from "../helper/SetRole";
import Odds from "./Odds";

const MatchesComponent = ({ doNavigateWithState }) => {
  // const classes=useStyle()
  const [matchData, setMatchData] = useState([]);
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);

  const { axios } = setRole();

  useEffect(() => {
    getAllMatch();
  }, [currentPage, pageCount]);

  async function getAllMatch() {
    try {
      let { data } = await axios.get(
        `/game-match/getAllMatch?bets=1&pageNo=${currentPage}&pageLimit=${pageLimit}`
      );
      if (data.length > 0) {
        setMatchData(data[0]);
        setPageCount(Math.ceil(parseInt(data[1]) / pageLimit));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function callPage(e) {
    setCurrentPage(parseInt(e.target.outerText));
  }

  return (
    <>
      {matchData?.map((match) => {
        return (
          <Odds
            onClick={() => {
              doNavigateWithState(match.id);
            }}
            top={true}
            blur={false}
            match={match}
          />
        );
      })}
      <Pagination
        className="whiteTextPagination d-flex justify-content-center"
        count={pageCount}
        color="primary"
        onChange={callPage}
      />
      {/* <Odds onClick={onClick} top={false} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} />
            <Odds onClick={onClick} top={false} blur={true} upcoming={true} /> */}
    </>
  );
};

export default MatchesComponent;