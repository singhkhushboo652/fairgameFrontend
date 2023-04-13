import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manualBookMarkerRates: {
    teamA: "1000000",
    teamB: "-1000000",
  },
  sessionRates: null,
  matchOdds: {},
  sessionOdds: {},
  allBetRates: [],
  allSessionBets: [],
  matchOddsLive:null,
  bookmakerLive:null,
  sessionOddsLive: null,
};

const matchDetails = createSlice({
  name: "matchDetails",
  initialState,
  reducers: {
    setManualBookMarkerRates: (state, action) => {
      state.manualBookMarkerRates = action.payload;
    },
    removeManualBookMarkerRates: (state, action) => {
      state.manualBookMarkerRates = {};
    },
    setMatchOdds: (state, action) => {
      state.matchOdds = action.payload;
    },
    setMatchOddsLive: (state, action) => {
      state.matchOddsLive = action.payload
    },
    setBookMakerLive: (state, action) => {
      state.bookmakerLive = action.payload
    },
    removeMatchOdds: (state, action) => {
      state.matchOdds = [];
    },
    setSessionOdds: (state, action) => {
      state.sessionOdds = action.payload;
    },
    setSessionOddsLive: (state, action) => {
      state.sessionOddsLive = action.payload
    },
    removeSessionOdds: (state, action) => {
      state.sessionOdds = [];
    },
    setAllBetRate: (state, action) => {
      state.allBetRates = action.payload;
    },
    setAddBetRates: (state, action) => {
      // const body= [...state.items,action.payload];
      // console.log(body,"BODY")
      // state.allBetRates =body
      return {
        ...state,
        data: [...state.allBetRates, action.payload],
      };
    },
    removeAllBetRates: (state, action) => {
      state.allBetRates = [];
    },
    setAllSessionBets: (state, action) => {
      state.allSessionBets = action.payload;
    },
    removeAllSessionBets: (state, action) => {
      state.allSessionBets = [];
    },

    setSessionRates: (state, action) => {
      state.sessionRates = action.payload;
    },
  },
});

export const {
  setManualBookMarkerRates,
  removeManualBookMarkerRates,
  setMatchOdds,
  removeMatchOdds,
  setSessionOdds,
  removeSessionOdds,
  setAllBetRate,
  removeAllBetRates,
  setAddBetRates,
  setAllSessionBets,
  removeAllSessionBets,
  setSessionRates,
  setMatchOddsLive,
  setBookMakerLive,
  setSessionOddsLive,
  
} = matchDetails.actions;

export default matchDetails.reducer;
