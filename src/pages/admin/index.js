import { Routes, Route, Navigate } from "react-router-dom";
import ChangePassword from "./ChangePassword.js";
import AccountStatement from "./AccountStatement.js";
import AddAccount from "./AddAccount";
import CurrentBets from "./CurrentBets.js";
import DeleteBet from "./DeleteBet.js";
import GeneralReport from "./GeneralReport.js";
import Home from "./List_Of_Clients.js";
import MarketAnaylsisContainer from "./MarketAnaylsisContainer.js";
import { MatchScreen } from "./MatchScreen.js";
import MatchSubmit from "./MatchSubmit.js";
import ProfitLoss from "./ProfitLoss.js";
import Reports from "./Reports.js";
import TotalBets from "./TotalBets.js";
import MatchSubmit1 from "../../components/MatchSubmit1.js";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Authprovider";
import CustomHeader from "../../components/CommonMasterAdminLayout/Header.js";
import Login from "../login/index.js";
import ForgotPassword from "../ForgotPassword/index.js";
import Verification from "../Varification/index.js";
import NewPassword from "../NewPassword/index.js";
import jwtDecode from "jwt-decode";
const AdminRoutes = () => {
  const { tokenMaster } = useContext(AuthContext);
  useEffect(() => {
    if (tokenMaster != localStorage.getItem("JWTmaster")) {
      window.location.reload();
    }
  }, []);

  function AdminPrivateRoute({ children }) {
    const token = localStorage.getItem("JWTmaster");
    const decodedToken = jwtDecode(token);
    if (decodedToken?.role !== "admin") {
      return <Navigate to="/admin" />;
    }
    return children;
  }
  return (
    <>
      {/* <CustomHeader /> */}
      <Routes forceRefresh={true}>
        <Route path="/" element={<Login allowedRole={["admin"]} />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route
          path="/list_of_clients"
          element={
            <AdminPrivateRoute>
              <Home />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/market_analysis"
          element={
            <AdminPrivateRoute>
              <MarketAnaylsisContainer />
            </AdminPrivateRoute>
          }
        />
        <Route
          exact
          path="/live_market"
          element={
            <AdminPrivateRoute>
              <Home />{" "}
            </AdminPrivateRoute>
          }
        />
        <Route exact path="/add_account" element={<AddAccount />} />
        <Route exact path="/match" element={<MatchScreen />} />
        <Route exact path="/account_statement" element={<AccountStatement />} />
        <Route exact path="/general_report" element={<GeneralReport />} />
        <Route exact path="/profit_loss" element={<ProfitLoss />} />
        <Route exact path="/current_bet" element={<CurrentBets />} />
        <Route exact path="/delete_bet" element={<DeleteBet />} />
        <Route exact path="/reports" element={<Reports />} />
        <Route exact path="/game_report" element={<Reports />} />
        <Route exact path="/total_bets" element={<TotalBets />} />
        <Route exact path="/match_submit" element={<MatchSubmit />} />
        <Route exact path="/change_password" element={<ChangePassword />} />
        <Route exact path="/match_submit1" element={<MatchSubmit1 />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
