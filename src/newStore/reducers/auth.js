import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: {},
  allRole: [],
  userMaster: {},
  userExpert: {},
  userAdmin: {},
  user: {},
  loading: false,
};

export const auth = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const role = action?.payload?.role?.roleName.trim();
      if (["admin", "master", "superAdmin", "superMaster"].includes(role)) {
        localStorage.setItem("JWTmaster", action.payload.access_token);
        state.userMaster = { roleType: "role1", ...action.payload };
      } else if (["fairGameWallet", "fairGameAdmin"].includes(role)) {
        localStorage.setItem("JWTadmin", action.payload.access_token);
        state.userAdmin = { roleType: "role2", ...action.payload };
      } else if (["expert"].includes(role)) {
        localStorage.setItem("JWTexpert", action.payload.access_token);
        const userExpert = { roleType: "role3", ...action.payload };
        state.userExpert = userExpert;
      } else if (["user"].includes(role)) {
        localStorage.setItem("JWTuser", action.payload.access_token);
        const body = { roleType: "role4", ...action.payload };
        state.user = body;
      }
    },
    logout: (state, action) => {
      switch (action?.payload?.roleType) {
        case "role1":
          state.userMaster = {};
          localStorage.removeItem("JWTmaster", action.payload.access_token);
          break;
        case "role2":
          state.userAdmin = {};
          localStorage.removeItem("JWTadmin", action.payload.access_token);
          break;
        case "role3":
          state.userExpert = {};
          localStorage.removeItem("JWTexpert", action.payload.access_token);
          break;
        case "role4":
          state.user = {};
          localStorage.removeItem("JWTuser", action.payload.access_token);
          break;
        default:
          state.guest = {};
          localStorage.removeItem("JWT", action.payload.access_token);
          break;
      }
    },

    setAllRoles: (state, action) => {
      state.allRole = action.payload;
    },
  },
});

export const { signIn, logout, setAllRoles } = auth.actions;

// export const selectCount = state => state.counter;

export default auth.reducer;
