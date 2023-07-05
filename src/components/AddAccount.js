import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "./Input";
import { EyeIcon } from "../admin/assets";
import DropDownSimple from "./DropdownSimple";
import { useNavigate } from "react-router-dom";

import { doSendErrorForPassword } from "./helper/doCheckErrorForPassword";
import Modal from "./Modal";
import { setRole } from "../newStore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import InputMyPartnership from "./InputMypartnership";

const containerStyles = {
  marginTop: { mobile: "2px", laptop: "10px" },
};
const selectValueStyle = {
  fontSize: { mobile: "2px", laptop: "10px" },
};
const titleStyles = {
  color: "#202020",
  fontSize: { mobile: "10px", laptop: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const imputStyle = {
  fontSize: { mobile: "10px", laptop: "14px", fontWeight: "600" },
};
const inputContainerStyle = {
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};

var matchComissionArray = [];

const AddAccount = () => {
  const { axios, locPath, JWT, roleName } = setRole();
  const navigate = useNavigate();
  const { userWallet, allRole } = useSelector((state) => state.auth);
  const [roleOfUser, setRoleOfUser] = useState("");
  const [errorShow, setErrorShow] = useState("");
  const [successShow, setSuccessShow] = useState("");
  const [locationPath, setLocationPath] = useState(locPath);
  const [myPartnershipsError, setMyPartnershipsError] = useState(false);
  const [Detail, setDetail] = useState({
    1: { field: "userName", val: "" },
    2: { field: "password", val: "" },
    3: { field: "confirmPassword", val: "" },
    4: { field: "fullName", val: "" },
    5: { field: "city", val: "" },
    6: { field: "phoneNumber", val: 0 },
    7: { field: "accountType", val: "" },
    8: { field: "creditReference", val: 0 },
    9: { field: "roleId", val: "" },
    10: { field: "uplinePertnerShip", val: 0 },
    11: { field: "myPertnerShip", val: null },
    12: { field: "downLinePertnerShip", val: 0 },
    13: { field: "remark", val: "" },
    14: { field: "adminTransPassword", val: "" },
    15: { field: "myPartnership", val: 0 },
    16: { field: "sessionComisssion", val: null },
    17: { field: "matchTypeComission", val: null },
    18: { field: "matchComission", val: null },
  });
  const [error, setError] = useState({
    1: { field: "userName", val: false },
    2: { field: "password", val: false },
    3: { field: "confirmPassword", val: false },
    4: { field: "fullName", val: false },
    5: { field: "city", val: false },
    6: { field: "phoneNumber", val: false },
    7: { field: "accountType", val: false },
    8: { field: "creditReference", val: false },
    9: { field: "roleId", val: false },
    10: { field: "uplinePertnerShip", val: false },
    11: { field: "myPertnerShip", val: "" },
    12: { field: "downLinePertnerShip", val: false },
    13: { field: "remark", val: false },
    14: { field: "adminTransPassword", val: "error" },
    15: { field: "myPartnership", val: false },
    16: { field: "sessionComisssion", val: false },
    17: { field: "matchTypeComission", val: false },
    18: { field: "matchComission", val: false },
  });
  const [roles, setRoles] = useState(
    allRole?.map((v) => ({ role: v.roleName, roleId: v.id }))
  );
  const [userAlreadyExist, setUserAlredyExist] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [downLinePar, setDownlinePar] = useState(0);

  const [typeToShow, setTypeToShow] = useState([
    "Select account type",
    "Fairgame Admin",
    "Super Admin",
    "Admin",
    "Super Master",
    "Master",
    "User",
  ]);

  const matchComissionTypes = ["0.00", "Total Loss", "Entry Wise"];

  console.log("Setting", error);
  const [profile, setProfile] = useState(currentUser);
  const types = [
    { role: "fairGameAdmin", val: "Fairgame Admin", level: 1 },
    { role: "superAdmin", val: "Super Admin", level: 2 },
    { role: "admin", val: "Admin", level: 3 },
    { role: "superMaster", val: "Super Master", level: 4 },
    { role: "master", val: "Master", level: 5 },
    { role: "user", val: "User", level: 7 },
  ];

  const [showMatchCommision, setShowMatchCommision] = useState(false);

  useEffect(() => {
    if (Detail[17].val === "BetLoss") {
      let local = [];
      for (let i = 0; i <= 1.5; i += 0.25) {
        local.push(i?.toFixed(2));
      }
      matchComissionArray = local;
    } else {
      let local = [];
      for (let i = 0; i <= 2; i += 0.25) {
        local.push(i?.toFixed(2));
      }
      matchComissionArray = local;
    }
    if (Detail[17].val !== null && Detail[17].val !== "0.00") {
      setShowMatchCommision(false);
      setTimeout(() => {
        setShowMatchCommision(true);
      }, 100); // 3 seconds
    } else {
      setShowMatchCommision(false);
    }
    setDetail({
      ...Detail,
      18: {
        ...Detail[18],
        val: null,
      },
    });
  }, [Detail[17].val]);
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };
  const [mypar, setMypar] = useState("");
  const [uplineP, setUplineP] = useState(0);
  // const { roleName } = allRole?.find((role) => role?.id === currentUser?.roleId);
  const setTypeForAccountType = () => {
    const typo =
      roleName === "fairGameWallet"
        ? types
        : types?.filter((type) => {
            const roleLevel = types?.find((t) => t?.role === roleName)?.level;
            return roleLevel && type?.level > roleLevel;
          });

    if (roleName === "fairGameAdmin") {
      typo.push({ role: "expert", val: "Expert", level: 6 });
    }

    setTypeToShow(typo?.map((v) => v.role));
  };

  const addAccount = async () => {
    if (error[11].val !== "") {
      toast.error(error[11].val);
      return false;
    } if (error[1].val==="Only a-z, A-Z,and 0-9 characters allowed!. eg. fairGame00" || error[1].val===true){
      toast.error("Field required");
      return false;
    }
   
     else {
      
      let payload = {
        userName: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        city: "",
        phoneNumber: 0,
        roleId: "",
        remark: "",
        adminTransPassword: "",
        myPartnership: 0,
        credit_refer: 0,
      };
      if (["admin", "wallet"].includes(locationPath)) {
        // payload.a_partnership=Detail[10].val
        payload = {
          ...payload,
          sm_partnership: Detail[11].val,
          m_partnership: Detail[12].val,
        };
      }
      try {
        function checkRoleId(age) {
          return (
            age.role.split(" ").join("").toLowerCase() ===
            Detail[9].val.split(" ").join("").toLowerCase()
          );
        }


        if (Detail[14].val === "") {
          setError({
            ...error,
            14: {
              ...error[14],
              val: "error",
            },
          });
          return false;
        }
        if (Detail[11].val > 100) {
          setMyPartnershipsError(true);
          return false;
        }
        if (myPartnershipsError) {
          return false;
        }
        if (
          Detail[17].val !== null &&
          Detail[17].val !== "0.00" &&
          Detail[18].val === null
        ) {
          setError({
            ...error,
            18: {
              ...error[18],
              val: "Field is required",
            },
          });
          return false;
        }
        if (
          !(
            Detail[3].val === 0 ||
            Detail[3].val === "" ||
            Detail[9].val === 0 ||
            Detail[9].val === "" ||
            Detail[14].val === 0 ||
            Detail[14].val === "" ||
            Detail[11].val === null
          )
        ) {
          //Detail[2].val === 0 || Detail[2].val === "" ||
          payload = {
            ...payload,
            userName: Detail[1].val,
            password: Detail[2].val,
            confirmPassword: Detail[3].val,
            fullName: Detail[4].val,
            city: Detail[5].val,
            phoneNumber: Detail[6].val,
            roleId: roles.filter(checkRoleId)[0].roleId,
            remark: Detail[13].val,
            adminTransPassword: Detail[14].val,
            myPartnership: Detail[11].val,
            credit_refer: Detail[8].val,
            sessionComisssion:
              Detail[16].val === "" || Detail[16].val === 0
                ? null
                : parseFloat(Detail[16].val),
            matchTypeComission:
              Detail[17].val === "0.00" ? null : Detail[17].val,
            matchComission: Detail[18].val === "0.00" ? null : Detail[18].val,
          };
          let response;
          response = await axios.post(`/fair-game-wallet/adduser`, payload);
          if (response.status == 200) {
            setSuccessShow(response.data.message);
            handleChangeShowModalSuccess(true);
          }
        }
      } catch (e) {
        console.log(e);
        setSuccessShow("");
        toast.error(e?.response?.data?.message);
        setErrorShow(e?.response?.data?.message);
      }
    }
  };

  const setDownParterShipVal = (val1, val2) => {
    let val3 = 100 - val1 - val2;
    setDetail({
      ...Detail,
      12: {
        ...Detail[12],
        val: parseInt(val3),
      },
    });
  };

  async function getUserDetail() {
    try {
      const { data } = await axios.get("users/profile");
      setProfile(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  const sessionComissionArray = [];
  for (let i = 0; i <= 4; i += 0.25) {
    sessionComissionArray.push(i?.toFixed(2));
  }
  function handleUpline() {
    const {
      a_partnership,
      sa_partnership,
      sm_partnership,
      fa_partnership,
      fw_partnership,
    } = profile;

    const partnershipMap = {
      superMaster:
        a_partnership + sa_partnership + fa_partnership + fw_partnership,
      superAdmin: fa_partnership + fw_partnership,
      master:
        sm_partnership +
        a_partnership +
        sa_partnership +
        fa_partnership +
        fw_partnership,
      admin: sa_partnership + fa_partnership + fw_partnership,
      fairGameWallet: 0,
      fairGameAdmin: fw_partnership,
    };

    const thisUplinePertnerShip = partnershipMap[roleName] || 0;

    return thisUplinePertnerShip;
  }
  useEffect(() => {
    if (profile && roleName) {
      const res = handleUpline(roleName);
      setUplineP(res);
      setDetail({
        ...Detail,
        10: {
          ...Detail[10],
          val: res,
        },
        12: {
          ...Detail[12],
          val: 100 - res,
        },
      });
      setDownlinePar(100 - res);
      setError({
        ...error,
        10: {
          ...error[10],
          val: false,
        },
      });
    }
  }, [profile, roleName]);

  useEffect(() => {
    if (currentUser === null) {
      getUserDetail();
    }
  }, []);
  useEffect(() => {
    setTypeForAccountType();
  }, [userWallet?.role?.roleName, Detail, error, showSuccessModal]);

  async function checkUserName({ val }) {
    try {
      let body = {
        userName: val,
      };
      const { data } = await axios.post(
        `fair-game-wallet/checkUserExist`,
        body
      );
      if (data.data.exist === true) {
        setError({
          ...error,
          1: {
            ...error[1],
            val: true,
          },
        });
        setUserAlredyExist("User Already Exist With This Name");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleTransPass({ place, val, setError, error }) {
    if (isNaN(val) || val === "") {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "error",
        },
      });
    } else {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "",
        },
      });
    }
  }
  function CheckThisPosition({ place, val, val2, setError, error }) {
    const total = parseInt(val2) + Detail[10].val;
    if (isNaN(Detail[11].val) || Detail[11].val < 0) {
      return false;
    }
    if (total <= 100) {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "",
        },
      });
    }
    if (total > 101) {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: " sum of upline , downline and  my partnership should be not exceeding 100.",
        },
      });
    }
  }

  console.log(Detail, "error");
  useEffect(() => {
    if (Detail[9].val === "user") {
      setDetail({
        ...Detail,
        11: {
          ...Detail[11],
          val: 100 - Detail[10].val,
        },
        12: {
          ...Detail[12],
          val: 0,
        },
      });

      setError({
        ...error,
        11: {
          ...error[11],
          val: "",
        },
      });
    }
  }, [Detail[9].val]);

  return (
    <>
      <Box sx={{ margin: "1%" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            marginLeft: "4px",
          }}
        >
          Add Account
        </Typography>
        <form
          style={{ marginTop: "1%" }}
          onSubmit={(e) => {
            e?.preventDefault();
            addAccount();
          }}
        >
          <Box
            sx={{
              background: "#F8C851",
              minHeight: "60vh",
              borderRadius: "5px",
              padding: "16px",
              paddingTop: "3px",
              marginTop: "2px",
              display: "flex",
              flexDirection: { mobile: "column", laptop: "row", tablet: "row" },
              width: "100%",
              gap: { mobile: 0, laptop: 5, tablet: 4 },
              // flexWrap:"wrap",
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "auto auto",
                  gridColumnGap: "10px",
                }}
              >
                <div style={{ order: 1 }}>
                  <Input
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    placeholder={"Username (Required)"}
                    title={"Username*"}
                    setDetail={setDetail}
                    onKeyDown={(event) => {
                      if (event.code === "Space") {
                        event.preventDefault();
                      } else {
                        const regex = /^[a-zA-Z0-9]*$/; // Only allows a-z, A-Z, and 0-9
                        if (!regex.test(event.key)) {
                          event.preventDefault();
                        }
                      }
                    }}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={1}
                    required={true}
                    onFocusOut={checkUserName}
                    toFoucs={true}
                  />
                  {error[1].val && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      {userAlreadyExist
                        ? userAlreadyExist
                        : error[1].val || "Field Required"}
                    </p>
                  )}
                </div>
                <div style={{ order: 3 }}>
                  <Input
                    containerStyle={containerStyles}
                    img={EyeIcon}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"User Password*"}
                    setDetail={setDetail}
                    Detail={Detail}
                    required={true}
                    setError={setError}
                    error={error}
                    place={2}
                    onFocusOut={doSendErrorForPassword}
                    toFoucs={true}
                  />{" "}
                </div>
                {/** handleError={handleError} checkMesasge={true} */}
                {/* {error[2].val && <p style={{ color: "#fa1e1e" }}>{error[2].val}</p>} */}
                <div style={{ order: 5 }}>
                  <Input
                    containerStyle={containerStyles}
                    img={EyeIcon}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"Confirm User Password*"}
                    setDetail={setDetail}
                    required={true}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={3}
                  />
                  {Detail[2]?.val !== Detail[3]?.val && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      Password Doesn't Match
                    </p>
                  )}
                </div>
                <div style={{ order: 2 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"Fullname (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"Fullname"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={4}
                  />
                </div>
                <div style={{ order: 4 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"City (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"City"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={5}
                  />
                </div>
                <div style={{ order: 6 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"Mobile (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"Mobile Number"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={6}
                    type={"Number"}
                  />
                </div>
              </Box>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <div style={{ order: 2 }}>
                  <DropDownSimple
                    dropStyle={{
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                    }}
                    valueStyle={{ ...imputStyle, color: "white" }}
                    title={"Account Type*"}
                    valueContainerStyle={{
                      height: "45px",
                      marginX: "0px",
                      background: "#0B4F26",
                      border: "1px solid #DEDEDE",
                      borderRadius: "5px",
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    containerStyle={{
                      width: "100%",
                      position: "relative",
                      marginTop: "5px",
                    }}
                    titleStyle={{ marginLeft: "0px" }}
                    data={typeToShow}
                    dropDownStyle={{
                      width: "100%",
                      marginLeft: "0px",
                      marginTop: "0px",
                      position: "absolute",
                    }}
                    dropDownTextStyle={imputStyle}
                    Detail={Detail}
                    setDetail={setDetail}
                    place={9}
                  />
                  {error[9]?.val ||
                    (Detail[9]?.val === "" && (
                      <p className="validCommon" style={{ color: "#fa1e1e" }}>
                        Field Required
                      </p>
                    ))}
                </div>
                <div style={{ order: 1 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"Credit Reference*"}
                    setDetail={setDetail}
                    required={true}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={8}
                    type={"Number"}
                  />
                  {error[9]?.val && (
                    <p style={{ color: "#fa1e1e" }}>Field Required</p>
                  )}
                </div>
              </Box>
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  containerStyle={{
                    ...containerStyles,
                    display: Detail[9].val === "user" ? "none" : "block",
                  }}
                  titleStyle={titleStyles}
                  inputStyle={imputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor: "#DEDEDE",
                    height: { laptop: "45px", mobile: "36px" },
                  }}
                  title={"Upline Partnership"}
                  setDetail={setDetail}
                  Detail={Detail}
                  setError={setError}
                  error={error}
                  disabled={true}
                  place={10}
                  autoMaticFillValue={`${Detail[10]?.val}`}
                />
                {error[10].val && (
                  <p style={{ color: "#fa1e1e" }}>Field Required</p>
                )}

                {Detail[9].val === "user" ? (
                  <InputMyPartnership
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    containerStyle={{
                      ...containerStyles,
                      display: Detail[9].val === "user" ? "none" : "block",
                    }}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    title={"My Partnership"}
                    setDetail={setDetail}
                    onFocusOut={CheckThisPosition}
                    toFoucs={true}
                    min={0}
                    max={100}
                    disabled={Detail[9].val === "user"}
                    setDownlinePar={setDownlinePar}
                    Detail={Detail}
                    value={Detail[11].val}
                    // placeholder={Detail[11].val}
                    setError={setError}
                    error={error}
                    place={11}
                    required={true}
                    type={"Number"}
                  />
                ) : (
                  <Input
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      backgroundColor: Detail[9].val === "user" && "#DEDEDE",
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    containerStyle={{
                      ...containerStyles,
                      display: Detail[9].val === "user" ? "none" : "block",
                    }}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    title={"My Partnership"}
                    setDetail={setDetail}
                    onFocusOut={CheckThisPosition}
                    toFoucs={true}
                    // min={0}
                    setMypar={(val) => setMypar(val)}
                    max={100}
                    setDownlinePar={setDownlinePar}
                    Detail={Detail}
                    // placeholder={Detail[11].val}
                    setError={setError}
                    required={true}
                    error={error}
                    place={11}
                    type={"Number"}
                  />
                )}

                {myPartnershipsError && (
                  <p style={{ color: "#fa1e1e" }}>
                    sum of upline , downline and my partnership should be not
                    exceeding 100.
                  </p>
                )}

                {error[11]?.val !== "" && (
                  <p style={{ color: "#fa1e1e" }}>{error[11]?.val}</p>
                )}
              </Box>
              <Input
                containerStyle={{
                  ...containerStyles,
                  display: Detail[9].val === "user" ? "none" : "block",
                }}
                titleStyle={titleStyles}
                inputStyle={imputStyle}
                disabled={true}
                inputContainerStyle={{
                  backgroundColor: "#DEDEDE",
                  ...inputContainerStyle,
                  height: { laptop: "45px", mobile: "36px" },
                }}
                title={"Downline partnership"}
                setDetail={setDetail}
                Detail={Detail}
                setError={setError}
                error={error}
                place={12}
                type={"Number"}
                placeholder={Detail[12].val}
                // autoMaticFillValue={Detail[12].val}
              />
              {error[12]?.val && (
                <p className="validCommon" style={{ color: "#fa1e1e" }}>
                  Field Required
                </p>
              )}

              {Detail[9].val === "user" && (
                <>
                  <Box
                    sx={{
                      display: {
                        laptop: "block",
                        tablet: "grid",
                        mobile: "grid",
                      },
                      // grid-template-columns: auto auto auto;
                      gridTemplateColumns: "50% 47%",
                      gridColumnGap: "10px",
                    }}
                  >
                    <DropDownSimple
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      valueStyle={{ ...imputStyle, color: "white" }}
                      title={"Match Commission Type"}
                      valueContainerStyle={{
                        height: "45px",
                        marginX: "0px",
                        background: "#0B4F26",
                        border: "1px solid #DEDEDE",
                        borderRadius: "5px",
                        height: { laptop: "45px", mobile: "36px" },
                      }}
                      containerStyle={{
                        width: "100%",
                        position: "relative",
                        marginTop: "10px",
                      }}
                      titleStyle={{ marginLeft: "0px" }}
                      data={matchComissionTypes}
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                      }}
                      dropDownTextStyle={{ ...imputStyle, lineHeight: 1 }}
                      Detail={Detail}
                      setDetail={setDetail}
                      place={17}
                    />
                    {error[17]?.val && (
                      <p className="validCommon" style={{ color: "#fa1e1e" }}>
                        Field Required
                      </p>
                    )}
                    {Detail[17].val !== null && Detail[17].val !== "0.00" && (
                      <>
                        <DropDownSimple
                          openDrop={showMatchCommision}
                          defaultValue={"0.00"}
                          dropStyle={{
                            filter:
                              "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                          }}
                          valueStyle={{ ...imputStyle, color: "white" }}
                          title={"Match Commission (%)*"}
                          valueContainerStyle={{
                            height: "45px",
                            marginX: "0px",

                            background: "#0B4F26",
                            border: "1px solid #DEDEDE",
                            borderRadius: "5px",
                          }}
                          containerStyle={{
                            width: "100%",
                            position: "relative",
                            marginTop: "10px",
                          }}
                          titleStyle={{ marginLeft: "0px" }}
                          data={matchComissionArray}
                          dropDownStyle={{
                            width: "100%",
                            marginLeft: "0px",
                            marginTop: "0px",
                            position: "absolute",
                            maxHeight: "210px",
                            overflow: "scroll",
                          }}
                          // dropDownTextStyle={{...imputStyle,  fontSize:{ laptop: "14px", mobile: "12px" },}}
                          Detail={Detail}
                          setDetail={setDetail}
                          place={18}
                        />
                        {error[18].val && (
                          <p
                            className="validCommon"
                            style={{ color: "#fa1e1e" }}
                          >
                            Field Required
                          </p>
                        )}
                      </>
                    )}

                    <DropDownSimple
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      valueStyle={{ ...imputStyle, color: "white" }}
                      title={"Session Commission (%)"}
                      valueContainerStyle={{
                        height: "45px",
                        marginX: "0px",

                        background: "#0B4F26",
                        border: "1px solid #DEDEDE",
                        borderRadius: "5px",
                        height: { laptop: "45px", mobile: "36px" },
                      }}
                      containerStyle={{
                        width: "100%",
                        position: "relative",
                        marginTop: "10px",
                      }}
                      titleStyle={{ marginLeft: "0px" }}
                      data={sessionComissionArray}
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                        maxHeight: "210px",
                        overflow: "scroll",
                      }}
                      dropDownTextStyle={{ ...imputStyle }}
                      Detail={Detail}
                      setDetail={setDetail}
                      place={16}
                      selectValueStyle={{
                        selectValueStyle,
                      }}
                    />

                    {error[16]?.val && (
                      <p className="validCommon" style={{ color: "#fa1e1e" }}>
                        Field Required
                      </p>
                    )}
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{ flex: 2 }} className="addAccountRemark">
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  titleStyle={titleStyles}
                  inputStyle={imputStyle}
                  inputProps={{
                    multiline: true,
                    rows: 10,
                    // rows: { laptop: 10, mobile: 2 },
                  }}
                  placeholder={"Remark (Optional)"}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { laptop: "205px", mobile: "70px" },
                    width: "100%",
                  }}
                  title={"Remark"}
                  setDetail={setDetail}
                  Detail={Detail}
                  setError={setError}
                  error={error}
                  place={13}
                />
                <div>
                  <Input
                    containerStyle={{ ...containerStyles, width: "100%" }}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{ ...inputContainerStyle }}
                    title={"Admin Transaction Password*"}
                    required={true}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={14}
                    onFocusOut={handleTransPass}
                    toFoucs={true}
                  />
                  {/* {error[14]?.val !== "" && (
                <Typography className="validCommon" style={{ color: "#fa1e1e" }}>
                  Admin Transaction Password Required
                </Typography>
              )} */}
                </div>
              </Box>
              <Button
                className="cursor-pointer"
                sx={{
                  background: "#0B4F26",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  border: "2px solid black",
                  alignItems: "center",
                  borderRadius: "5px",
                  height: "45px",
                  marginTop: { mobile: "12px", laptop: "35px" },
                  color: "white",
                  fontSize: "18px",
                }}
                type="submit"
              >
                Create
              </Button>

              {errorShow && !successShow && (
                <p style={{ color: "#fa1e1e" }}>{errorShow}</p>
              )}
              {successShow && <p style={{ color: "#0B4F26" }}>{successShow}</p>}
            </Box>
          </Box>
        </form>
        {errorShow ===
          "User need to first create the transaction password." && (
          <Button
            className="cursor-pointer"
            sx={{
              background: "#0B4F26",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              border: "2px solid black",
              alignItems: "center",
              borderRadius: "5px",
              height: "45px",
              marginTop: "35px",
              color: "white",
              fontSize: "18px",
            }}
            onClick={(e) => {
              navigate(
                `/${window.location.pathname.split("/")[1]}/createTransPassword`
              );
            }}
          >
            Create Trans Password
          </Button>
        )}
      </Box>
      {showSuccessModal && (
        <Modal
          message={successShow}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          activeTab={"Client list"}
          navigateTo={"list_of_clients"}
        />
      )}

      <style jsx scoped>
        {`
          @media only screen and (max-width: 575px) {
            .addAccountRemark textarea {
              height: 60px !important;
            }
            .validCommon {
              font-size: 12px;
              line-height: 16px;
            }
          }
        `}
      </style>
    </>
  );
};

export default AddAccount;
