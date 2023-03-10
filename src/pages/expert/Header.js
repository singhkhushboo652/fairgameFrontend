import { Typography, Box, useMediaQuery, useTheme, Menu, MenuItem, Drawer, AppBar, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, Draw, logo, Logout, Money, MoneyBag, } from "../../assets";
import SearchInput from "../../components/SearchInput";
import StyledImage from "../../components/StyledImage";
import { NotiBadge, Down, Users, ArrowLeft } from "../../expert/assets";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../store/activeUser";
import { stateActions } from "../../store/stateActions";
import SessionTimeOut from "../../components/SessionTimeOut";
import AddNotificationModal from "../../components/AddNotificationModal";

const CustomHeader = ({ }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    // const [currentSelected, setCurrentSelected] = useState(0)
    const [mobileOpen, setMobileOpen] = useState(false);
    const [visible, setVisible] = useState(false)
    const [anchor, setAnchor] = React.useState(null)
    const activeUser = useSelector(state => state?.activeUser?.activeUser)
    const currentSelected = useSelector(state => state?.activeUser?.selected)
    const dispatch = useDispatch()
    const location = useLocation();
    const [active, setActiveAdmin] = useState(0)
    useEffect(() => {
        if (!matchesMobile) {
            setMobileOpen(false)
        }
    }, [matchesMobile])
    useEffect(() => {
        if (location.pathname.includes("home1")) {
            dispatch(setSelected(0))
        } else if (location.pathname.includes("match")) {
            dispatch(setSelected(1))
        } else if (location.pathname.includes("betodds")) {
            dispatch(setSelected(2))
        }
    }, [location])
    return (
        <>
            <SessionTimeOut />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <AddNotificationModal setVisible={setVisible} visible={visible} />
                <Box sx={[{
                    width: "100%", minHeight: { laptop: 90, tablet: 80, mobile: 60 },
                    display: "flex",
                    flexDirection: matchesMobile ? "column" : "row",
                    alignItems: !matchesMobile ? "center" : "flex-start",
                    justifyContent: "space-between",
                    paddingX: { laptop: "0.5%", mobile: "1%" },
                    paddingY: matchesMobile ? "15px" : "0px",
                    paddingBottom: matchesMobile ? "10px" : "0px"
                }, (theme) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`
                })]}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", flex: 1, }}>
                        <Box sx={{ display: "flex", alignItems: "center", marginRight: "12px" }}>
                            <StyledImage onClick={() => {
                                setMobileOpen(!mobileOpen)
                            }} src={Draw} sx={{ height: { laptop: "24px", mobile: "20px" }, width: "auto" }} />
                            <StyledImage src={logo} sx={{ height: { laptop: "45px", mobile: "40px" }, width: "auto", marginLeft: { laptop: "20px", mobile: "10px" } }} />
                        </Box>
                        {activeUser != 1 && activeUser != '2' && <ButtonHead onClick={(e) => {
                            dispatch(setSelected(0))
                            navigate("/expert/home1")
                        }} title={"ADD MATCH"} boxStyle={{ backgroundColor: currentSelected == 0 ? "white" : "transparent", py: "5px", borderRadius: "5px", marginLeft: "15px" }} titleStyle={{ color: currentSelected == 0 ? "green" : "white" }} />}
                        {(activeUser == 1 || activeUser == '2' || activeUser == "3") && <>
                            <ButtonHead onClick={(e) => {
                                dispatch(setSelected(1))
                                if (activeUser == "3") {
                                    navigate("/expert/match")
                                    return
                                }
                                setAnchor(e.currentTarget)
                            }} title={"ALL MATCH"} boxStyle={{ backgroundColor: currentSelected == 1 ? "white" : "transparent", py: "5px", borderRadius: "5px", marginLeft: "15px" }} titleStyle={{ color: currentSelected == 1 ? "green" : "white" }} />
                            {activeUser != "3" && <ButtonHead
                                onClick={(e) => {
                                    dispatch(setSelected(5))
                                    // setAnchor(e.currentTarget)
                                }} title={"ALL BET"} boxStyle={{ backgroundColor: currentSelected == 5 ? "white" : "transparent", py: "5px", borderRadius: "5px", marginLeft: "15px" }} titleStyle={{ color: currentSelected == 5 ? "green" : "white" }} />}
                        </>
                        }

                        {activeUser != 1 && activeUser !== '2' && <><ButtonHead selected={currentSelected == 2} onClick={(e) => {
                            dispatch(setSelected(2))

                            navigate("/expert/betodds")
                        }} title={"BETFAIR ODDS"} boxStyle={{ backgroundColor: currentSelected == 2 ? "white" : "transparent", py: "5px", borderRadius: "5px", marginLeft: "15px" }} titleStyle={{ color: currentSelected == 2 ? "green" : "white" }} />
                            <ButtonHead onClick={() => {
                                dispatch(setSelected(3))

                            }} title={"MANUAL BOOKMAKER"} boxStyle={{ backgroundColor: currentSelected == 3 ? "white" : "transparent", py: "5px", borderRadius: "5px", marginLeft: "15px" }} titleStyle={{ color: currentSelected == 3 ? "green" : "white" }} />
                            <ButtonHead onClick={() => {
                                dispatch(setSelected(4))

                            }} title={"MANUAL SESSION"} boxStyle={{ backgroundColor: currentSelected == 4 ? "white" : "transparent", py: "5px", borderRadius: "5px", marginLeft: "15px" }} titleStyle={{ color: currentSelected == 4 ? "green" : "white" }} />
                        </>
                        }
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", minWidth: matchesMobile ? "100%" : "0px", alignItems: "center", marginTop: matchesMobile ? "15px" : "0px" }}>
                        <Box onClick={() => {
                            setVisible(true)
                        }} sx={{ height: "50px", width: "50px", borderRadius: "35px", display: "flex", justifyContent: "center", alignItems: "center", background: "white" }}>
                            <StyledImage src={NotiBadge} sx={{ height: "25px", width: "25px" }} />
                        </Box> <Box>
                            <ActiveUsers containerStyle={{}} image={Users} value={"73,689"} />
                            <BoxProfile containerStyle={{ marginTop: "5px" }} image={"https://picsum.photos/200/300"} value={activeUser == 1 ? "Session" : (activeUser == 2 ? "Bookmaker" : "Betfair")} value1={"Expert"} />
                        </Box>
                    </Box>
                </Box>
            </AppBar>
            <Box sx={{ minHeight: { laptop: 90, mobile: 60 + 32 + 42 } }} />
            <DropdownMenu1 anchorEl={anchor} open={Boolean(anchor)} handleClose={() => {
                setAnchor(null)
            }} />
        </>
    )
}
const ButtonHead = ({ title, boxStyle, titleStyle, onClick, report, selected }) => {
    return (
        <Box onClick={(e) => onClick(e)} sx={[{ paddingX: "12.5px", justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row' }, boxStyle]}>
            <Typography sx={[{ fontSize: "11px", fontWeight: "bold", fontFamily: "Montserrat" }, titleStyle]}>{title}</Typography>

            {
                selected && report && <img src={Down} style={{ width: '10px', height: '6px', marginLeft: '4px' }} />
            }
        </Box>
    )
}
const menutItems1 = [{ title: "India vs Pakistan" }, { title: "Australia vs England" }, , { title: "Srilanka vs England" }]
const DropdownMenu1 = ({ anchorEl, open, handleClose }) => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(0)

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ marginTop: '2px', padding: 0 }}

            MenuListProps={{
                'aria-labelledby': 'basic-button',
                padding: 0,
            }}
            PaperProps={{
                sx: {
                    width: "230px",
                    padding: 0,
                }
            }}
        >
            {menutItems1.map((x, i) => <MenutItemsComponent handleClose={handleClose} setSelected={setSelected} index={i} selected={selected} x={x} />)}
        </Menu>
    )
}
const MenutItemsComponent = ({ x, selected, index, setSelected, handleClose }) => {
    const activeUser = useSelector(state => state?.activeUser?.activeUser)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    return (<>
        <MenuItem dense={true}
            sx={{
                fontSize: { laptop: "12px", mobile: "10px" },
                fontWeight: "500",
                marginX: "0px",
                width: { laptop: "240px", mobile: "210px" },
                borderBottomWidth: 0,
                borderColor: "#EAEFEC",
                paddingY: "0px",
                borderStyle: "solid",
                backgroundColor: selected == index ? "primary.main" : "white",
                color: selected == index ? "white" : "black",
                marginLeft: '-10px',
                marginTop: index == 0 && '-8px',
                "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "white",
                    // borderRadius: "5px",
                    // transform: "scale(1.02)"
                }
            }} onClick={() => {
                // navigate(x.link)
                // handleClose()
                if (index == selected) {
                    setSelected(null)
                }
                else {
                    setSelected(index)

                }
                // setShow(!show)
            }}>{x.title}</MenuItem>
        {selected == index && <Box sx={{ background: "#F8C851", width: "80%", marginLeft: "20%", borderRadius: "5px", paddingX: "5px", paddingY: "5px" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{activeUser == '1' ? "Current Live Session" : "Current Live Bookmaker"}</Typography>
            <Box onClick={(e) => {
                if (activeUser == '1') {
                    navigate("/expert/live", { state: { createSession: false } })
                }
                else if (activeUser == '2') {
                    navigate("/expert/market")
                }
                handleClose()
            }} sx={{ marginLeft: "10px", marginTop: "3px" }}>
                <Typography sx={{ fontSize: "12px", }}>{activeUser == '1' ? "India v/s Pak Session 1" : "India v/s Pak Bookmaker 1"}</Typography>
                <Typography sx={{ fontSize: "12px", marginTop: "3px" }}>{activeUser == '1' ? "India v/s Pak Session 1" : "India v/s Pak Bookmaker 2"}</Typography>
            </Box>
            <Box onClick={e => {
                if (activeUser == '1') {
                    navigate("/expert/live", { state: { createSession: true } })
                }
                else if (activeUser == '2') {
                    navigate("/expert/add_book_maker")
                }
                handleClose()
            }} sx={{ marginTop: "5px", display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{activeUser == '1' ? "Create Session" : "Add Bookmaker"}</Typography>
                <StyledImage src={ArrowLeft} sx={{ width: "15px", height: "10px", marginLeft: "10px" }} />
            </Box>
        </Box>}
    </>
    )
}
const BoxProfile = ({ image, value, containerStyle, value1 }) => {
    const theme = useTheme()

    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        console.log(anchorEl)
    }, [anchorEl])
    const handleClose = () => {
        setAnchorEl(0);
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: { laptop: "120px", } }}>
            <Box onClick={(event) => { }} sx={[{ backgroundColor: "primary.main", minWidth: { laptop: "120px", mobile: "90px" }, marginLeft: "1vw", display: "flex", alignItems: "center", boxShadow: "0px 3px 10px #B7B7B726", justifyContent: "space-between", height: { laptop: "40px", mobile: "35px" }, overflow: "hidden", paddingX: "2px", borderRadius: "35px" }, containerStyle]}>
                <StyledImage src={image} sx={{ height: { laptop: "33px", mobile: '27px' }, width: { laptop: "33px", mobile: '27px' }, borderRadius: "150px" }} />
                <Box style={{ flex: 1, marginLeft: "5px" }}>
                    <Typography sx={{ fontSize: "10px", color: "text.white", fontWeight: "600" }}>{value}</Typography>
                    <Typography sx={{ fontSize: "10px", color: "text.white", fontWeight: "600" }}>{value1}</Typography>
                </Box>
                <StyledImage src={ArrowDown} sx={{ height: "6px", width: "10px", marginRight: '5px' }} />
            </Box>
            <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />

        </Box>
    )
}

const ActiveUsers = ({ image, value, containerStyle }) => {
    const theme = useTheme()

    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        console.log(anchorEl)
    }, [anchorEl])
    const handleClose = () => {
        setAnchorEl(0);
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: { laptop: "120px", } }}>
            <Box onClick={(event) => { }} sx={[{ backgroundColor: "white", minWidth: { laptop: "120px", mobile: "90px" }, marginLeft: "1vw", display: "flex", alignItems: "center", boxShadow: "0px 3px 10px #B7B7B726", justifyContent: "space-between", height: { laptop: "40px", mobile: "35px" }, overflow: "hidden", paddingX: "2px", borderRadius: "35px" }, containerStyle]}>
                <Box sx={{ height: "35px", width: "35px", borderRadius: "35px", display: "flex", justifyContent: "center", alignItems: "center", background: "#175731" }}>
                    <StyledImage src={image} sx={{ height: "20px", width: "20px" }} />
                </Box>
                <Box style={{ flex: 1, marginLeft: "5px" }}>
                    <Typography sx={{ fontSize: "8px", color: "text.primary", fontWeight: "500" }}>Active Users</Typography>
                    <Typography sx={{ fontSize: '14px', color: "#27AC1E", fontWeight: "700" }}>{value}</Typography>
                </Box>
                <StyledImage src={ArrowDown} sx={{ height: "6px", width: "10px", marginRight: '5px' }} />
            </Box>
            <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />

        </Box>
    )
}
const menutItems = [{ title: "Account Statement" }, { title: "Profile Loss Report" }, { title: "Bet History" }, { title: "Unsetteled Bet" }, { title: "Casino Report History" }, { title: "Set Button Values" }, { title: "Security Auth Verfication" }, { title: "Change Password" }]
const DropdownMenu = ({ anchorEl, open, handleClose }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutProcess = () => {
        dispatch(stateActions.logout());
        navigate("/")
        handleClose()
    }
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{ marginRight: "-15px" }}
        >
            {menutItems.map(x => <MenuItem dense={true} sx={{

                fontSize: { laptop: "12px", mobile: "10px" },
                fontWeight: "500",
                marginX: "5px",
                width: { laptop: "200px", mobile: "200px" },
                borderBottomWidth: 1,
                borderColor: "#EAEFEC",
                paddingY: "2px",
                borderStyle: "solid",
                "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "white",
                    borderRadius: "5px",
                    transform: "scale(1.02)"
                }
            }} onClick={handleClose}>{x.title}</MenuItem>)}
            <Box onClick={() => {
                logoutProcess()
            }} sx={{ borderRadius: "5px", height: { laptop: "38px", mobile: "34px" }, width: "200px", marginLeft: "5px", marginTop: "10px", backgroundColor: "#F1C550", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <StyledImage src={Logout} sx={{ width: "35%", height: "auto" }} />
            </Box>
        </Menu>
    )
}
const MobileSideBar = ({ mobileOpen, setMobileOpen }) => {

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}

            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "300px" },

            }}
        >
            <Box sx={{ minHeight: { laptop: 90, mobile: 60 + 32 } }} />
            <Box sx={{ height: "100vh" }}>
            </Box>
        </Drawer>
    )
}

export default CustomHeader;