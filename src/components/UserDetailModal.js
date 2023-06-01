import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  TextField,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../store/userdetail";
import StyledImage from "./StyledImage";
import { setDailogData } from "../store/dailogModal";
import {
  CircleBack,
  DeleteIcon,
  EyeIcon,
  EyeIconWhite,
  EyeSlash,
  EyeSlashWhite,
  LockClosed,
  LockIcon,
  LockOpen,
  UnLockIcon,
} from "../admin/assets";
import { onChangeKeyCheck } from "./helper/PassKeyCheck";
import { useNavigate } from "react-router-dom";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import { setCurrentUser } from "../newStore/reducers/currentUser";
import { debounce } from "lodash";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35vw",
  minWidth: "500px",
  overflow: "hidden",
  background: "white",
  border: "2px solid white",
  borderRadius: "10px",
};

export default function UserDetailModal({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  activeWalletAmount,
  elementToUDM,
  setElementToUDM,
  getListOfUser,
  prevElement,
}) {
  const isModalOpen = useSelector((state) => state.userdetail)?.isModalOpen;
  const { axios } = setRole();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  function showDialogModal(isModalOpen, showRight, message) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      navigate(`/${window.location.pathname.split("/")[1]}/list_of_clients`);
    }, [2000]);
    setShowModalMessage(message);
    setShowUserModal(false);
  }

  const classes = {
    mainBox: {
      background: backgroundColor ?? "#F8C851",
      display: "flex",
      width: "100%",
      justifyContent: {
        mobile: "flex-start",
        tablet: "center",
        laptop: "center",
      },
      overflow: "hidden",
      paddingY: "15px",
      paddingTop: "5px",
      borderBottom: "2px solid white",
    },
    mainBoxSubsx: [
      {
        width: "11.5vw",
        display: "flex",

        height: "45px",
        paddingLeft: "10px",
        borderRight: "2px solid #0000",
      },
    ],
    BoxButtonStyledImage: { height: "18px", width: "17px", marginLeft: "5px" },
    BoxButtonContStyle: {
      background: "#E32A2A",
      flex: 1,
      marginLeft: "10px",
      marginRight: "10px",
      alignSelf: "center",
    },
  };

  const handleSettlement = async (val) => {
    try {
      const data = await axios.post(`/fair-game-wallet/comissionSettelment`, {
        userId: val,
      });
      if (data?.data?.data) {
        toast.success(data?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err.message);
    }
  };
  return (
    <Box sx={classes.mainBox}>
      {/* <Box onClick={() => {}} sx={classes.mainBoxSubsx}></Box> */}
      {selected != null && (
        <Box
          sx={{
            width: { mobile: "26%", tablet: "90%", laptop: "70%" },
            padding: "5px",
          }}
        >
          {selected == 0 && (
            <DepositComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              activeWalletAmount={activeWalletAmount}
              prevElement={prevElement}
              navigate={navigate}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
              dispatch={dispatch}
              showDialogModal={showDialogModal}
            />
          )}
          {selected == 1 && (
            <WithDrawComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              activeWalletAmount={activeWalletAmount}
              prevElement={prevElement}
              navigate={navigate}
              elementToUDM={elementToUDM}
              getListOfUser={getListOfUser}
              setElementToUDM={setElementToUDM}
              dispatch={dispatch}
              showDialogModal={showDialogModal}
            />
          )}
          {selected == 2 && (
            <NewCreditComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              prevElement={prevElement}
              navigate={navigate}
              getListOfUser={getListOfUser}
              elementToUDM={elementToUDM}
              dispatch={dispatch}
              setElementToUDM={setElementToUDM}
              showDialogModal={showDialogModal}
            />
          )}
          {selected == 5 && (
            <SetExposureComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              navigate={navigate}
              prevElement={prevElement}
              elementToUDM={elementToUDM}
              dispatch={dispatch}
              setElementToUDM={setElementToUDM}
              showDialogModal={showDialogModal}
            />
          )}
          {selected == 3 && (
            <ChangePasswordComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              dispatch={dispatch}
              navigate={navigate}
              showDialogModal={showDialogModal}
            />
          )}
          {selected == 4 && (
            <LockUnlockComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              dispatch={dispatch}
              navigate={navigate}
              prevElement={prevElement}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
              showDialogModal={showDialogModal}
            />
          )}
        </Box>
      )}

      {selected == null && (
        <Box
          sx={{
            // flex: 1,
            display: "flex",
            flexDirection: { mobile: "column", laptop: "row", tablet: "row" },
            gap: { mobile: 1 },

            width: { mobile: "26%", laptop: "77%", tablet: "100%" },
          }}
        >
        
          <BoxButton
            onClick={() => {
              setSelected(0);
            }}
            title={"Deposit"}
            isSelected={selected == 0}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
            labelStyle={{}}
          />
          <BoxButton
            onClick={() => {
              setSelected(1);
            }}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
            isSelected={selected == 1}
            title={"Withdraw"}
            labelStyle={{}}
          />
            {elementToUDM?.role?.roleName === "user" && (
            <BoxButton
              onClick={(e) => {
                e?.preventDefault();
                handleSettlement(elementToUDM?.userId);
              }}
              title={"C_Settlement"}
              containerStyle={{ marginLeft: "10px", flex: 1 }}
              labelStyle={{}}
            />
          )}
          <BoxButton
            onClick={() => {
              setSelected(3);
            }}
            title={"Change Password"}
            isSelected={selected == 3}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
          />
          <BoxButton
            onClick={() => {
              setSelected(4);
            }}
            title={"Lock/Unlock"}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
            isSelected={selected == 4}
          />
          <BoxButton
            onClick={() => {
              setSelected(2);
            }}
            title={"set Credit Reference"}
            isSelected={selected == 2}
            labelStyle={{}}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
          />
          <BoxButton
            onClick={() => {
              setSelected(5);
            }}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
            title={"Set Exposure Limit"}
            labelStyle={{}}
            isSelected={selected == 5}
          />
          <BoxButton
            deleteBtn={true}
            onClick={(e) => {
              setDeleteModal((prev) => !prev);
            }}
            title={"Delete User"}
            icon={
              <StyledImage src={DeleteIcon} sx={classes.BoxButtonStyledImage} />
            }
            containerStyle={classes.BoxButtonContStyle}
          />

          <Dialog
            open={deleteModal}
            onClose={() => setDeleteModal((prev) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure want to delete this user?"}
            </DialogTitle>
            {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
            <DialogActions>
              <Button onClick={() => setDeleteModal((prev) => !prev)}>
                Cancel
              </Button>
              <Button
                sx={{ color: "#E32A2A" }}
                onClick={(e) => {
                  if (
                    prevElement.credit_refer == 0 &&
                    prevElement.profit_loss == 0 &&
                    prevElement.available_balance == 0
                  ) {
                    UserDelete(userModal.id)
                      .then(({ bool, message }) => {
                        showDialogModal(true, true, message);
                      })
                      .catch(({ bool, message }) => {
                        showDialogModal(true, false, message);
                      });
                  } else {
                    let message = "First Settle Account to Delete The User";
                    toast.error(message);
                    showDialogModal(true, false, message);
                  }
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}

const BoxButton = ({
  title,
  containerStyle,
  icon,
  onClick,
  isSelected,
  deleteBtn,
  titleStyle,
}) => {
  const classes = {
    mainBox: [
      {
        background: isSelected ? "#0B4F26" : "#0B4F26",
        border:
          isSelected || deleteBtn ? "2px solid #0B4F26" : "2px solid #303030",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "45px",
        alignItems: "center",
        borderRadius: "5px",
        padding: "5px",
      },
      containerStyle,
    ],
    mainBoxTypography: [
      {
        fontSize: { mobile: "3.5vw", laptop: "0.6vw", tablet: "0.9vw" },
        fontWeight: "600",
        color: isSelected || deleteBtn ? "white" : "white",
      },
      titleStyle,
    ],
  };
  return (
    <Box onClick={onClick} sx={classes.mainBox}>
      <Typography sx={classes.mainBoxTypography}>
        {title}
        {icon}
      </Typography>
    </Box>
  );
};

const BoxButtonWithSwitch = ({
  title,
  containerStyle,
  icon,
  onClick,
  isSelected,
  deleteBtn,
  titleStyle,
  val,
  setLockUnlockObj,
  lockUnlockObj,
  elementToUDM,
  setElementToUDM,
}) => {
  const [checked, setChecked] = useState(false);
  const classes = {
    mainBox: [
      {
        background: !val ? "#0B4F26" : "#E32A2A",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "45px",
        alignItems: "center",
        borderRadius: "5px",
      },
      containerStyle,
    ],
    mainBoxTypography: [
      {
        fontSize: { mobile: "3vw", laptop: "0.9vw", tablet: "0.9vw" },
        fontWeight: "600",
        textAlign: "right",
        color: "white",
        marginRight: "10px",
        minWidth: "80px",
      },
      titleStyle,
    ],
  };
  return (
    <Box onClick={onClick} sx={classes.mainBox}>
      <MaterialUISwitch
        checked={!val}
        onChange={(e) => {
          if (title === "User") {
            setLockUnlockObj({
              ...lockUnlockObj,
              all_blocked: !val === true ? 1 : 0,
            });
            setElementToUDM({
              ...elementToUDM,
              all_blocked: !val === true ? 1 : 0,
            });
          } else {
            setLockUnlockObj({
              ...lockUnlockObj,
              bet_blocked: !val === true ? 1 : 0,
            });
            setElementToUDM({
              ...elementToUDM,
              bet_blocked: !val === true ? 1 : 0,
            });
          }
          setChecked(!checked);
        }}
      />
      <Typography sx={classes.mainBoxTypography}>
        {title} {!val ? "Unlocked" : "Locked"}
      </Typography>
    </Box>
  );
};

const DepositComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  prevElement,
  navigate,
  elementToUDM,
  setElementToUDM,
  dispatch,
  showDialogModal,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [initialBalance, setInitialBalance] = useState(
    currentUser?.current_balance
  );
  const defaultDepositObj = {
    userId: "",
    amount: "",
    trans_type: "add",
    adminTransPassword: "",
    remark: "",
  };

  const [depositObj, setDepositObj] = useState(defaultDepositObj);
  const activeWalletAmount = useSelector(
    (state) => state?.rootReducer?.user?.amount
  );

  const calculatePercentProfitLoss = (val, e) => {
    const rateToCalculatePercentage = val.rateToCalculatePercentage;
    const inputValue = Number(
      isNaN(Number(e.target.value)) ? 0 : e.target.value
    );
    const profitLoss = prevElement.profit_loss;

    let percent_profit_loss;

    if (rateToCalculatePercentage === 0) {
      percent_profit_loss = profitLoss;
    } else {
      const newVal = profitLoss + inputValue;
      percent_profit_loss = newVal * (rateToCalculatePercentage / 100);
    }
    return percent_profit_loss.toFixed(2);
  };

  const handleChange = debounce((e) => {
    setDepositObj({
      ...depositObj,
      amount: e.target.value < 0 ? 0 : Number(e.target.value),
      userId: userModal.id,
    });

    setElementToUDM({
      ...elementToUDM,
      percent_profit_loss: calculatePercentProfitLoss(prevElement, e),
      profit_loss:
        prevElement.profit_loss +
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      balance:
        prevElement.balance +
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      available_balance:
        prevElement.available_balance +
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
    });
    if (e.target.value) {
      const newUserbalance = {
        ...currentUser,
        current_balance: initialBalance - e.target.value,
      };

      setTimeout(() => {
        dispatch(setCurrentUser(newUserbalance));
      }, 51);
    } else {
      const newUserbalance = {
        ...currentUser,
        current_balance: initialBalance,
      };

      setTimeout(() => {
        dispatch(setCurrentUser(newUserbalance));
      }, 51);
    }
  }, 50);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
        borderRadius: "5px",
      }}
    >
      <Box sx={{ width: { mobile: "100%", laptop: "100%", tablet: "100%" } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Deposit Amount
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              // value={depositObj.amount}
              onChange={handleChange}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              type={"Number"}
            />
          </Box>
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Predicted Wallet</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{activeWalletAmount- Number(isNaN(depositObj.amount)?0:depositObj.amount)}</Typography>
          </Box> */}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Wallet Balance
          </Typography>
          <Box
            sx={{
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              value={currentUser?.current_balance || 0}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                disabled: true,
                placeholder: "",
                disableUnderline: true,
                type: "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              paddingLeft: "20px",
              paddingRight: "20px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
            }}
          >
            <TextField
              onChange={(e) => {
                setDepositObj({
                  ...depositObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Profit/Loss</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{profitLoss + Number(isNaN(depositObj.amount)?0:depositObj.amount)}</Typography>
          </Box> */}
        </Box>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid #26262633",
            minHeight: "80px",
            maxHeight: "115px",
            marginTop: "10px",
            paddingX: "10px",
          }}
        >
          <TextField
            onChange={(e) => {
              setDepositObj({ ...depositObj, remark: e.target.value });
            }}
            rows={4}
            sx={{ width: "100%", minHeight: "40px" }}
            multiline={true}
            variant="standard"
            InputProps={{
              placeholder: "Remark (Optional)",
              disableUnderline: true,
              style: { fontSize: "13px", minHeight: "45px", fontWeight: "600" },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(depositObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  getListOfUser();
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setDepositObj(defaultDepositObj);
              setElementToUDM({
                ...elementToUDM,
                profit_loss: prevElement.profit_loss,
                balance: prevElement.balance,
                available_balance: prevElement.available_balances,
              });
              setShowUserModal(false);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const WithDrawComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  prevElement,
  elementToUDM,
  setElementToUDM,
  dispatch,
  showDialogModal,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [initialBalance, setInitialBalance] = useState(
    currentUser?.current_balance
  );
  const activeWalletAmount = useSelector(
    (state) => state?.rootReducer?.user?.amount
  );
  const defaultWithDrawObj = {
    userId: "",
    amount: "",
    trans_type: "withdraw",
    adminTransPassword: "",
    remark: "",
  };
  const [withDrawObj, setWithDrawObj] = useState(defaultWithDrawObj);
  const calculatePercentProfitLoss = (val, e) => {
    const rateToCalculatePercentage = val.rateToCalculatePercentage;
    const inputValue = Number(
      isNaN(Number(e.target.value)) ? 0 : e.target.value
    );
    const profitLoss = prevElement.profit_loss;

    let percent_profit_loss;

    if (rateToCalculatePercentage === 0) {
      percent_profit_loss = profitLoss;
    } else {
      const newVal = profitLoss - inputValue;
      percent_profit_loss = newVal * (rateToCalculatePercentage / 100);
    }
    return percent_profit_loss.toFixed(2);
  };
  const handleChange = debounce((e) => {
    setWithDrawObj({
      ...withDrawObj,
      amount: e.target.value < 0 ? 0 : Number(e.target.value),
      userId: userModal.id,
    });
    setElementToUDM({
      ...elementToUDM,
      percent_profit_loss: calculatePercentProfitLoss(prevElement, e),
      profit_loss:
        prevElement.profit_loss -
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      balance:
        prevElement.balance -
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      available_balance:
        prevElement.available_balance -
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
    });

    if (e.target.value) {
      const newUserbalance = {
        ...currentUser,
        current_balance: initialBalance + Number(e.target.value),
      };

      setTimeout(() => {
        dispatch(setCurrentUser(newUserbalance));
      }, 51);
    } else {
      const newUserbalance = {
        ...currentUser,
        current_balance: initialBalance,
      };

      setTimeout(() => {
        dispatch(setCurrentUser(newUserbalance));
      }, 51);
    }
  }, 50);
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        borderRadius: "5px",
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Withdraw Amount
          </Typography>
          <Box
            sx={{
              background: "#E32A2A",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              display: "flex",
              gap: 2,
              alignItems: "center",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              // value={withDrawObj.amount}
              onChange={handleChange}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              type={"Number"}
            />
          </Box>
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Predicted Wallet</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{activeWalletAmount+ Number(isNaN(withDrawObj.amount)?0:withDrawObj.amount)}</Typography>
          </Box> */}
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Wallet Balance
          </Typography>
          <Box
            sx={{
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              value={currentUser?.current_balance || 0}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                disabled: true,
                placeholder: "",
                disableUnderline: true,
                type: "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              paddingLeft: "20px",
              paddingRight: "20px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
            }}
          >
            <TextField
              onChange={(e) => {
                setWithDrawObj({
                  ...withDrawObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Profit/Loss</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{profitLoss - Number(isNaN(withDrawObj.amount)?0:withDrawObj.amount)}</Typography>
          </Box> */}
        </Box>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid #26262633",
            minHeight: "80px",
            maxHeight: "115px",
            marginTop: "10px",
            paddingX: "10px",
          }}
        >
          <TextField
            onChange={(e) => {
              setWithDrawObj({ ...withDrawObj, remark: e.target.value });
            }}
            rows={4}
            sx={{ width: "100%", minHeight: "40px" }}
            multiline={true}
            variant="standard"
            InputProps={{
              placeholder: "Remark (Optional)",
              disableUnderline: true,
              style: { fontSize: "13px", minHeight: "45px", fontWeight: "600" },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(withDrawObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  getListOfUser();
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setWithDrawObj(defaultWithDrawObj);
              setElementToUDM({
                ...elementToUDM,
                profit_loss: prevElement.profit_loss,
                balance: prevElement.balance,
                available_balance: prevElement.available_balance,
              });
              setShowUserModal(false);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const NewCreditComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  elementToUDM,
  setElementToUDM,
  prevElement,
  dispatch,
  showDialogModal,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const defaultNewCreditObj = {
    userId: "",
    amount: null,
    trans_type: "credit_refer",
    adminTransPassword: "",
    remark: "",
  };
  const [newCreditObj, setNewCreditObj] = useState(defaultNewCreditObj);
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            New Credit Limit
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              value={newCreditObj.amount}
              onChange={(e) => {
                setNewCreditObj({
                  ...newCreditObj,
                  amount: e.target.value < 0 ? 0 : Number(e.target.value),
                  userId: userModal.id,
                });
                setElementToUDM({
                  ...elementToUDM,
                  credit_refer: isNaN(Number(e.target.value))
                    ? 0
                    : Number(e.target.value),
                  profit_loss:
                    prevElement.profit_loss +
                    prevElement.credit_refer -
                    Number(
                      isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                    ),
                });
              }}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              type={"Number"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            marginTop: "10px",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setNewCreditObj({
                  ...newCreditObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid #26262633",
            minHeight: "80px",
            maxHeight: "115px",
            paddingX: "10px",
          }}
        >
          <TextField
            onChange={(e) => {
              setNewCreditObj({ ...newCreditObj, remark: e.target.value });
            }}
            rows={4}
            sx={{ width: "100%", minHeight: "40px" }}
            multiline={true}
            variant="standard"
            InputProps={{
              placeholder: "Remark (Optional)",
              disableUnderline: true,
              style: { fontSize: "13px", minHeight: "45px", fontWeight: "600" },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(newCreditObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  getListOfUser();
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setNewCreditObj(defaultNewCreditObj);
              setElementToUDM({
                ...elementToUDM,
                credit_refer: prevElement.credit_refer,
                profit_loss: prevElement.profit_loss,
              });
              setShowUserModal(false);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const SetExposureComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  navigate,
  prevElement,
  elementToUDM,
  setElementToUDM,
  dispatch,
  showDialogModal,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const defaultExposureObj = {
    userId: "",
    amount: null,
    trans_type: "exposure_limit",
    adminTransPassword: "",
    remark: "",
  };
  const [exposureObj, setExposureObj] = useState(defaultExposureObj);
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            New Exposure Limit
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setExposureObj({
                  ...exposureObj,
                  amount: Number(e.target.value),
                  userId: userModal.id,
                });
                setElementToUDM({
                  ...elementToUDM,
                  exposure_limit: Number(
                    isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  ),
                });
              }}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              type={"Number"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            marginTop: "10px",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setExposureObj({
                  ...exposureObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid #26262633",
            minHeight: "80px",
            maxHeight: "115px",
            paddingX: "10px",
          }}
        >
          <TextField
            onChange={(e) => {
              setExposureObj({ ...exposureObj, remark: e.target.value });
            }}
            rows={4}
            sx={{ width: "100%", minHeight: "40px" }}
            multiline={true}
            variant="standard"
            InputProps={{
              placeholder: "Remark (Optional)",
              disableUnderline: true,
              style: { fontSize: "13px", minHeight: "45px", fontWeight: "600" },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(exposureObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  getListOfUser();
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setExposureObj(defaultExposureObj);
              setShowUserModal(false);
              setElementToUDM({
                ...elementToUDM,
                exposure_limit: elementToUDM.exposure_limit,
              });
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const ChangePasswordComponent = ({
  setShowUserModal,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  navigate,
  dispatch,
  showDialogModal,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const defaultChangePasswordObj = {
    userId: "",
    password: "",
    adminTransPassword: "",
  };
  const [changePasswordObj, setChangePasswordObj] = useState(
    defaultChangePasswordObj
  );
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            New Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "#0B4F26",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setChangePasswordObj({
                  ...changePasswordObj,
                  password: e.target.value,
                  userId: userModal.id,
                });
              }}
              sx={{ width: "100%", height: "45px", color: "white" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass1 ? "password" : "text",
                style: {
                  fontSize: "13px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
            />
            <Box
              onClick={() => {
                setShowPass1(!showPass1);
              }}
            >
              <StyledImage
                src={showPass1 ? EyeIconWhite : EyeSlashWhite}
                sx={{ height: "14px", width: "20px", fill: "white" }}
              />
            </Box>
          </Box>
        </Box>
        <p style={{ color: "#fa1e1e" }}>
          {changePasswordObj.password &&
            onChangeKeyCheck(changePasswordObj.password) !== false &&
            onChangeKeyCheck(changePasswordObj.password)}
        </p>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            marginTop: "10px",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setChangePasswordObj({
                  ...changePasswordObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdatePassword(changePasswordObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setChangePasswordObj(defaultChangePasswordObj);
              setShowUserModal(false);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const LockUnlockComponent = ({
  setShowUserModal,
  userModal,
  showDialogModal,
  elementToUDM,
  setElementToUDM,
  prevElement,
}) => {
  const [showPass, setShowPass] = useState(false);
  const defaultLockUnlockObj = {
    userId: "",
    all_blocked: userModal.all_blocked,
    adminTransPassword: "",
    bet_blocked: userModal.bet_blocked,
  };
  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              mobile: "center",
              tablet: "flex-end",
              laptop: "flex-end",
            },
            height: "45px",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BoxButtonWithSwitch
              title={"User"}
              val={lockUnlockObj.all_blocked}
              setLockUnlockObj={setLockUnlockObj}
              lockUnlockObj={lockUnlockObj}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
          >
            <BoxButtonWithSwitch
              title={"Bet"}
              val={lockUnlockObj.bet_blocked}
              setLockUnlockObj={setLockUnlockObj}
              lockUnlockObj={lockUnlockObj}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            justifyContent: "flex-end",
            marginTop: "10px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setLockUnlockObj({
                  ...lockUnlockObj,
                  adminTransPassword: e.target.value,
                  userId: userModal.id,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateLockUnlock(lockUnlockObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setShowUserModal(false);
              console.log(
                "elementToUDM.bet_blocked, elementToUDM.all_blocked",
                elementToUDM.bet_blocked,
                elementToUDM.all_blocked
              );
              setElementToUDM({
                ...elementToUDM,
                bet_blocked: prevElement.bet_blocked,
                all_blocked: prevElement.all_blocked,
              });
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const LabelAndValue = ({
  label,
  value,
  containerStyle,
  icon,
  ticon,
  labelStyle,
  valueStyle,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      display={"flex"}
      sx={[
        {
          background: "#F8C851",
          height: "45px",
          border: "2px solid #0B4F2626",
          px: "10px",
          borderRadius: "5px",
          alignItems: "center",
          justifyContent: "space-between",
        },
        containerStyle,
      ]}
    >
      <Box sx={{ flexDirection: "column" }}>
        {Boolean(label) && (
          <Typography sx={[{ fontSize: "10px", color: "#303030" }, labelStyle]}>
            {label}
          </Typography>
        )}
        <Typography sx={[{ fontWeight: "600", fontSize: "15px" }, valueStyle]}>
          {value}
          {ticon}
        </Typography>
      </Box>
      {icon}
    </Box>
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 72,
  height: 30,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    marginTop: "3px",
    marginRight: "1px",
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(40px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${LockOpen})`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#409963",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "white",
    width: 26,
    height: 26,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${LockClosed})`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#FF8484",
    borderRadius: 20,
  },
}));

const UpdateAvailableBalance = async (body) => {
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.post(
        `/fair-game-wallet/updateBalance`,
        body
      );
      resolve({
        bool: data.message === "Balance update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UpdateLockUnlock = (body) => {
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.post(
        `/fair-game-wallet/lockUnclockUser`,
        body
      );
      resolve({
        bool: data.message === "User update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UserDelete = (id) => {
  console.log("first", axios);
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.delete(`/users/deleteUser/${id}`);
      resolve({
        bool: data.message === "User update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UpdatePassword = (body) => {
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.post(
        `/fair-game-wallet/updatePassword`,
        body
      );
      resolve({
        bool: data.message === "User update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};
