import { Box, Typography, useMediaQuery } from "@mui/material"
import SearchInput from "./SearchInput"
import { Excel, LockIcon, Pdf, UnLockIcon } from "../assets"
import SmallDropDown from "./smallDropDown"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import constants from "./helper/constants"
import { setRole } from "../newStore"
import { toast } from "react-toastify"
import YellowHeader from "./yellowheader"
import { formatDate } from "./helper/Dateconverter.js";
import jwtDecode from "jwt-decode";
import YellowHeaderAdmin from "./YellowHeaderAdmin"
import { useTheme } from "@emotion/react"



const AccountStatementList = ({ user }) => {
    const theme = useTheme()

    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    const adminToken = sessionStorage.getItem("JWTadmin")
    const userToken = sessionStorage.getItem("JWTuser")

    const decodedTokenAdmin = adminToken !== null && jwtDecode(adminToken);
    const decodedTokenUser = userToken !== null && jwtDecode(userToken);

    const { currentUser } = useSelector((state) => state?.currentUser);

    const [pageLimit, setPageLimit] = useState(constants.pageLimit);
    const [currentPage, setCurrentPage] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([])
    const [data, setData] = useState('');
    const handleChildData = (childData) => {
        setData(childData);
    };
    const getLimitEntries = (childLimitData) => {
        setPageLimit(childLimitData);
    };
    function callPage(val) {
        // dispatch(setPage(parseInt(val)));
        setCurrentPage(parseInt(val));
      }
    async function getAccountStatement() {
        const userId = currentUser.id
        const originalDatefrom = formatDate(data[0]);
        const originalDateto = formatDate(data[1])
        if (data !== '') {
            var payload = {
                limit: pageLimit,
                skip: currentPage,
                fromDate: originalDatefrom,
                toDate: originalDateto,
            };
        } else {
            var payload = {
                limit: pageLimit,
                skip: currentPage,
            };
        }
        console.log(payload)
        let { axios } = setRole();
        try {
            const { data } = await axios.post(
                `/fair-game-wallet/transactionHistory/${userId}`, payload
            );
            // console.log(data.data[0], 'datadatadatadata')
            setTransactionHistory(data.data[0])
            //   toast.success(data?.message);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAccountStatement()
    }, []);

    

    // const Footer = () => {
    //     return (
    //         <>
    //         <Box sx={{ height: "50px", display: "flex", alignItems: "center", px: { mobile: "5px", laptop: "10px" }, justifyContent: "space-between", background: "#FAFAFA", }}>
    //             <Typography sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}>Showing 1 to 6</Typography>
    //             <Box sx={{ display: "flex", alignItems: "center" }}>
    //                 <Box sx={{ height: "35px", width: { mobile: "80px", laptop: "100px" }, background: "#0B4F26", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}>
    //                     <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>Previous</Typography>
    //                 </Box>
    //                 <Box sx={{ height: "35px", marginX: { laptop: "10px", mobile: "5px" }, width: "40px", background: "#262626", display: "flex", borderRadius: "5px", justifyContent: "center", alignItems: "center" }}>
    //                     <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>1</Typography>
    //                 </Box>
    //                 <Box sx={{ height: "35px", width: { mobile: "80px", laptop: "100px" }, background: "#0B4F26", display: "flex", borderRadius: "5px", justifyContent: "center", alignItems: "center" }}>
    //                     <Typography sx={{ color: "white", fontSize: { laptop: "14px", mobile: "12px" } }}>Next</Typography>
    //                 </Box>
    //             </Box>
    //         </Box>
    //         </>
    //     )
    // }
    
const Footer = ({ currentPage, pages, callPage }) => {
    return ( 
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          px: { mobile: "5px", laptop: "10px" },
          justifyContent: "space-between",
          background: "#FAFAFA",
        }}
      >
        <Typography
          sx={{ fontSize: { mobile: "12px", laptop: "14px" }, fontWeight: "600" }}
        >
          Showing 1 to {pages}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              height: "35px",
              width: { mobile: "80px", laptop: "100px" },
              background: "#0B4F26",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
            }}
            onClick={() => {
              callPage(
                parseInt(currentPage) - 1 === 0 ? 1 : parseInt(currentPage) - 1
              );
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "14px", mobile: "12px" },
              }}
            >
              Previous
            </Typography>
          </Box>
          <Box
            sx={{
              height: "35px",
              marginX: { laptop: "10px", mobile: "5px" },
              width: "40px",
              background: "#262626",
              display: "flex",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "14px", mobile: "12px" },
              }}
            >
              {currentPage}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "35px",
              width: { mobile: "80px", laptop: "100px" },
              background: "#0B4F26",
              display: "flex",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              callPage(
                parseInt(currentPage) === pages
                  ? pages
                  : parseInt(currentPage) + 1
              );
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { laptop: "14px", mobile: "12px" },
              }}
            >
              Next
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  
    return (
        <>
            {decodedTokenUser.role === "user" && (
                <YellowHeader onChildData={handleChildData} getAccountStatement={getAccountStatement} />
            )}
            {decodedTokenAdmin.role === "admin" && (
              <YellowHeader onChildData={handleChildData} getAccountStatement={getAccountStatement} />  
                // <YellowHeaderAdmin onChildData={handleChildData} getAccountStatement={getAccountStatement} />
            )}
                {/* <YellowHeader onChildData={handleChildData} getAccountStatement={getAccountStatement} /> */}


            <Box sx={[{ marginX: "0.5%", minHeight: "100px", borderRadius: "2px", border: "2px solid white", borderTopRightRadius: { mobile: "10px", laptop: '0px', tablet: '10px' }, borderTopLeftRadius: { mobile: "10px", laptop: '0px', tablet: '10px' } }, (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`
            })]}>
                <ListH onChildData={getLimitEntries}/> 
                    <Box sx={{ overflowX: 'scroll', minWidth: '900px' }}>
                        <ListHeaderT />
                        {decodedTokenUser.role === "user" ?
                             transactionHistory.map((item) => (
                                <Row
                                    index={item?.id}
                                    containerStyle={{ background: "#FFE094" }}
                                    profit={true}
                                    fContainerStyle={{ background: "#0B4F26" }}
                                    fTextStyle={{ color: "white" }}
                                    date={item?.createAt}
                                    closing={item?.current_amount}
                                    trans_type={item?.trans_type}
                                    amount={item?.amount}
                                    touserName={item?.action_by.userName}
                                    fromuserName={item?.user.userName}
                                    {...(item.trans_type === "withdraw" ? { debit: item.amount } : { credit: item.amount })}
                                    {...(item.trans_type === "add" ? { fromuserName: item.action_by.userName, touserName: item.user.userName } : { fromuserName: item.user.userName, touserName: item.action_by.userName })}
                                />
                            )):
                            transactionHistory.map((item) => (
                                <Row
                                    index={item?.id}
                                    containerStyle={{ background: "#FFE094" }}
                                    profit={true}
                                    fContainerStyle={{ background: "#0B4F26" }}
                                    fTextStyle={{ color: "white" }}
                                    date={item?.createAt}
                                    closing={item?.current_amount}
                                    trans_type={item?.trans_type}
                                    amount={item?.amount}
                                    touserName={item?.action_by.userName}
                                    fromuserName={item?.user.userName}
                                    {...(item.trans_type === "win" || item.trans_type === "add" ? { credit: item.amount } : { debit: item.amount })}
                                    {...(item.trans_type === "add" || item.trans_type === "win" ? { fromuserName: item.action_by.userName, touserName: item.user.userName } : { fromuserName: item.user.userName, touserName: item.action_by.userName })}
                                />
                            ))
                        }

                        {transactionHistory.length === 0 && (
                             <EmptyRow containerStyle={{ background: "#FFE094" }}/>
                        )}
                        
                        {/* {transactionHistory.map((item) => (
                            <Row
                                index={item?.id}
                                containerStyle={{ background: "#FFE094" }}
                                profit={true}
                                fContainerStyle={{ background: "#0B4F26" }}
                                fTextStyle={{ color: "white" }}
                                date={item?.createAt}
                                closing={item?.current_amount}
                                trans_type={item?.trans_type}
                                amount={item?.amount}
                                
                                touserName={item?.action_by.userName}
                                fromuserName={item?.user.userName}
                                {...(item.trans_type === "withdraw" ? { debit: item.amount } : { credit: item.amount })}
                                {...(item.trans_type === "add" ? { fromuserName: item.action_by.userName, touserName: item.user.userName } : { fromuserName: item.user.userName, touserName: item.action_by.userName })}
                            />
                        ))} */}
                    </Box>
                <Footer
        currentPage={currentPage}
        pages={pageLimit}
        callPage={callPage}
      />
            </Box>
        </>
    )
}

const ListH = ({getLimitEntries}) => {
    return (<Box display={"flex"} sx={{ justifyContent: "space-between", px: "10px", py: "6px" }}>
        <Box display={"flex"} alignItems="center">
            <Typography sx={{ fontSize: '10px', color: 'white', fontWeight: '500' }}>Show</Typography>
            <SmallDropDown onChildData={getLimitEntries}/>
            <Typography sx={{ fontSize: '10px', color: 'white', fontWeight: '500' }}>Entries</Typography>
        </Box>
        <SearchInput placeholder={"Search..."} />
    </Box>)
}

const ListHeaderT = () => {
    return (
        <Box sx={{ display: "flex", height: "35px", background: "#262626", alignItems: "center", borderTop: "2px solid white", borderBottom: "2px solid white" }}>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Date</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Credit</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Debit</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Closing</Typography>
            </Box>
            <Box sx={{ width: "36%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Description</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", justifyContent: 'center', alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>From</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", justifyContent: "center", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>To</Typography>
            </Box>
        </Box>
    )
}

const EmptyRow = ({containerStyle}) => {
    return (
        <Box sx={[{ display: "flex", height: "45px", background: "#0B4F26", alignItems: "center", overflow: "hidden", borderBottom: "2px solid white",justifyContent:"center" }, containerStyle]}>
           <Typography>No Results found</Typography>
        </Box>
    )
}


const Row = ({ containerStyle, fContainerStyle, fTextStyle, profit, index, date, closing, description, touserName, fromuserName, trans_type, amount, debit, credit }) => {

    const dateString = date;
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    return (
        <Box sx={[{ display: "flex", height: "45px", background: "#0B4F26", alignItems: "center", overflow: "hidden", borderBottom: "2px solid white" }, containerStyle]}>
            <Box sx={[{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white" }, fContainerStyle]}>
                <Typography sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}>{formattedDate}</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", background: "#27AC1E", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}>{credit}</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: { laptop: "10px", mobile: "5px" }, background: "#E32A2A", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}>{debit}</Typography>
            </Box>
            <Box sx={{ width: "14%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white", background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{closing}</Typography>
            </Box>
            <Box sx={{ width: "36%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white", background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>{trans_type}</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white", justifyContent: 'center', background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{fromuserName}</Typography>
            </Box>
            <Box sx={{ width: "11%", display: "flex", justifyContent: "center", alignItems: "center", height: "45px", borderRight: "2px solid white", background: index % 2 != 0 ? "#FFE094" : '#ECECEC' }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{touserName}</Typography>
            </Box>
        </Box>
    )
}
export default AccountStatementList;