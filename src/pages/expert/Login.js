import { Card, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { eye, logo, mail } from "../../assets";
import { Input, CustomButton, AuthLogo } from "../../components";
import AuthBackground from "../../components/AuthBackground";
import { ReCAPTCHACustom } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../store/activeUser";
import { GlobalStore } from "../../context/globalStore";
import { setCurrentUser } from "../../newStore/reducers/currentUser";
import { setRole } from "../../newStore";

import jwtDecode from "jwt-decode";
import { setAllRoles, setUpdatedTransPasswords, signIn } from "../../newStore/reducers/auth";
import { removeSocket } from "../../components/helper/removeSocket";
import { toast } from "react-toastify";
import {
  LoginServerError,
  SuperMaster,
} from "../../components/helper/constants";
var newtoken = "";
export default function Login(props) {
  const theme = useTheme();
  let { transPass, axios, role } = setRole();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const location = useLocation();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => {
    return state?.activeUser?.activeUser;
  });

  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [loginDetail, setLoginDetail] = useState({
    1: { field: "username", val: "" },
    2: { field: "password", val: "" },
  });
  const [error, setError] = useState({
    1: { field: "username", val: false },
    2: { field: "password", val: false },
  });

  const getLocalToken = (val) => {
    if (
      ["admin", "master", "superAdmin", "supperMaster"].some((v) =>
        val.includes(v)
      )
    ) {
      newtoken = sessionStorage.getItem("JWTwallet");
    } else if (
      ["fairGameWallet", "fairGameAdmin"].some((v) => val.includes(v))
    ) {
      newtoken = sessionStorage.getItem("JWTwallet");
    } else if (["expert"].some((v) => val.includes(v))) {
      newtoken = sessionStorage.getItem("JWTexpert");
    }
  };

  const [loginError, setLoginError] = useState();
  useEffect(() => {
    getLocalToken(props.allowedRole);
  }, [props.allowedRole]);

  async function getToken(val) {
    try {
      const token = await sessionStorage.getItem(val);
      return token;
    } catch (error) {
      console.log("Error fetching token from local storage:", error);
    }
  }
  const handleNavigate = async (path, type) => {
    // Set a timeout for 2 seconds before navigating

    let token = "";
    switch (type) {
      case "admin":
        token = getToken("JWTadmin");
        break;
      case "expert":
        token = getToken("JWTexpert");
        break;
      case "user":
        token = getToken("JWTuser");
        break;
      case "wallet":
        token = getToken("JWTwallet");
        break;
    }
    if (token !== "") {
      navigate(path);
    }
  };

  async function loginToAccount() {
    // changeErrors()
    // if (!error[1].val && !error[2].val && loginDetail[1].val !== "" && loginDetail[2].val !== "")
    try {
      let { data } = await axios.post(`/auth/login`, {
        username: loginDetail[1].val,
        password: loginDetail[2].val,
      });
      const decoded = newtoken !== null && jwtDecode(newtoken);
      const resToken = jwtDecode(data?.data?.access_token);
      if (decoded.sub === resToken.sub) {
        toast.warn("Please logout from previous session");
        return;
      }

      if (props.allowedRole.includes(data.data.role)) {
        let foundRoles = await axios.get(`/role`);
        let roles = foundRoles.data;
        dispatch(setAllRoles(roles));
        let roleDetail = roles.find(findThisRole);
        function findThisRole(role) {
          return role.id === data.data.roleId;
        }
        if (roleDetail) data.data.role = roleDetail;
        if (data.message === "User login successfully.") {
          removeSocket();
          // dispatch(setActiveRole(foundRoles.data));
          // dispatch(stateActions.setUser(data.data.role.roleName, data.data.access_token, data.data.isTransPasswordCreated));
          dispatch(setUpdatedTransPasswords(data.data.isTransPasswordCreated))

          dispatch(signIn(data.data));
          setRole(data.data.access_token);
          if (
            ["master", "admin", "superMaster", "superAdmin"].includes(
              data.data.role.roleName
            )
          ) {
            setGlobalStore((prev) => ({
              ...prev,
              adminWT: data.data.access_token,
            }));
            handleNavigate("/admin/list_of_clients", "admin");
          } else if (
            ["fairGameWallet", "fairGameAdmin"].includes(
              data.data.role.roleName
            )
          ) {
            setGlobalStore((prev) => ({
              ...prev,
              walletWT: data.data.access_token,
            }));
            handleNavigate("/wallet/list_of_clients", "wallet");
          } else if (["expert"].includes(data.data.role.roleName)) {
            setGlobalStore((prev) => ({
              ...prev,
              expertJWT: data.data.access_token,
            }));
            handleNavigate("/expert/match", "expert");
          } else {
            toast.error("User Unauthorized !");
          }
        }
      } else {
        toast.error("User Unauthorized !");
      }
    } catch (e) {
      console.log(e?.message);
      toast.error(e?.response?.data?.message || "Something went wrong!");
      if (!e?.response) return setLoginError(LoginServerError);
      setLoginError(e.response.data.message);
    }
    // }
  }
  return (
    <Box style={{ position: "relative" }}>
      <AuthBackground />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              py: "20px",
              width: "18%",
              minWidth: "250px",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <AuthLogo
            style={{
              width: { laptop: "300px", mobile: "250px" },
              height: "100px",
            }}
          />
          <Box sx={{ width: "100%", opacity: 1, width: "90%" }}>
            <Input
              placeholder={"Enter Username"}
              title={"Username"}
              img={mail}
              setDetail={setLoginDetail}
              Detail={loginDetail}
              setError={setError}
              error={error}
              place={1}
            />
            {error[1].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
            <Input
              placeholder={"Enter Password"}
              inputProps={{ type: "password" }}
              title={"Password"}
              containerStyle={{ marginTop: "10px" }}
              img={eye}
              setDetail={setLoginDetail}
              Detail={loginDetail}
              setError={setError}
              error={error}
              place={2}
            />
            {error[2].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
            <Typography
              onClick={() => {
                navigate("/forget_password");
              }}
              sx={{
                color: theme.palette.button.main,
                fontSize: { laptop: "10px", mobile: "12px" },
                textAlign: "right",
                marginRight: "10px",
                marginTop: ".5em",
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </Typography>
            <ReCAPTCHACustom containerStyle={{ marginTop: "20px" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginY: "1vh",
                marginTop: "4vh",
              }}
            >
              <CustomButton
                onClick={() => {
                  loginToAccount();
                }}
                buttonStyle={{ background: theme.palette.button.main }}
                title="Login"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
