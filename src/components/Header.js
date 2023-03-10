import { Typography, Box, useMediaQuery, useTheme, Menu, MenuItem, Drawer, AppBar, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, DownArrow, Draw, logo, Logout, Money, MoneyBag, DownIcon } from "../assets";
import { stateActions } from "../store/stateActions";
import SearchInput from "./SearchInput";
import SessionTimeOut from "./SessionTimeOut";
import SideBar from "./SideBar";
import StyledImage from "./StyledImage";

const CustomHeader = ({ }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    const location = useLocation()
    const navigate = useNavigate()

    const [showSideBarMobile, setShowSideBarMobile] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (!matchesMobile) {
            setMobileOpen(false)
        }
    }, [matchesMobile])

    useEffect(() => {
        if (location?.pathname.includes("change_password") || location?.pathname?.includes("change_button_value") || location?.pathname?.includes("account_statement") ||
            location?.pathname?.includes('profit_loss') || location?.pathname?.includes('bet_history')) {
            setShowSideBarMobile(true)
        } else {
            setShowSideBarMobile(false)
        }
    }, [location])

    return (
        <>
            <SessionTimeOut />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Box sx={[{
                    width: "100%", minHeight: { laptop: 90, tablet: 80, mobile: 40 },
                    display: "flex",
                    flexDirection: matchesMobile ? "column" : "row",
                    alignItems: !matchesMobile ? "center" : "flex-start",
                    justifyContent: "space-between",
                    // paddingLeft: { laptop: "6.5%" },
                    paddingRight: { laptop: "1%" },
                    paddingX: { mobile: "2%", laptop: "1%" },
                    paddingY: matchesMobile ? "5px" : "0px",
                    paddingBottom: matchesMobile ? "5px" : "0px",
                }, (theme) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`
                })]}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flex: 1, }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StyledImage onClick={() => {
                                if (matchesMobile || showSideBarMobile) {
                                    setMobileOpen(!mobileOpen)
                                }
                            }} src={Draw} sx={{ height: { laptop: "24px", mobile: "20px" }, width: "auto" }} />
                            <StyledImage onClick={(e) => {
                                navigate('/matches')
                                e.stopPropagation()
                            }} src={logo} sx={{ height: { laptop: "45px", mobile: "45px" }, width: "auto", marginLeft: { laptop: "20px", mobile: "10px" } }} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { mobile: "column-reverse", laptop: "row" }, alignItems: 'center' }}>
                            <NewBoxData containerStyle={{ marginTop: matchesMobile ? "5px" : "0px" }} valueStyle={{}} title={"Exposure"} value="100,000,000" />
                            <NewBoxData showDropDown={true} title={"John Doe"} valueStyle={{ color: "white" }} titleStyle={{ color: "white" }} value="100,000,000" containerStyle={{ background: "#0B4F26" }} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ height: "32px", display: "flex", background: "#202020", alignItems: "center" }}>
                    <marquee loop={true}><Typography sx={{ color: "text.white", fontSize: "10px", fontStyle: "italic", letterSpacing: "1px", overflow: "hidden", whiteSpace: "nowrap", "text-overflow:": "ellipsis" }}>This is a demo notification highlight. This is a demo notification highlight.This is a demo notification highlight. This is a demo notification highlight.This is a demo notification highlight. This is a demo notification highlight.This is a demo notification highlight.</Typography></marquee>
                </Box>
                {(matchesMobile || showSideBarMobile) && <MobileSideBar showSideBarMobile={showSideBarMobile} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />}
            </AppBar>
            <Box sx={{ minHeight: { laptop: 90 + 32, mobile: 60 + 32 + 21 } }} />
        </>
    )
}

const BoxMobile = ({ value }) => {

    return (
        <Box
            sx={{
                width: '130px',
                height: '23px',
                background: 'red',
                borderRadius: '12px',
                // justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                display: 'flex'
            }}
        >
            <Typography sx={{ fontSize: '11px', color: 'black', fontWeight: '500', marginLeft: '5px' }}>{value}:<span style={{ color: '#27AC1E', fontWeight: '700' }} >10,000,00</span></Typography>
        </Box>
    )
}

const NewBoxData = ({ title, value, showDropDown, containerStyle, valueStyle, titleStyle }) => {
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
        <Box>
            <Box onClick={(event) => {
                if (title != "Exposure") {
                    handleClick(event)

                }
            }} sx={[{ backgroundColor: "white", minWidth: { laptop: "120px", mobile: '110px' }, marginLeft: "1vw", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 3px 10px #B7B7B726", height: { laptop: "35px", mobile: "33px" }, overflow: "hidden", paddingX: "3px", borderRadius: "5px" }, containerStyle]}>
                <Box sx={{ marginLeft: { laptop: "5px", mobile: '5px' }, justifyContent: { mobile: 'center' }, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={[{ fontSize: { laptop: "8px", mobile: "8px" }, fontWeight: { mobile: "bold", laptop: '500px' }, marginLeft: .5, color: 'black' }, titleStyle]}>{title}</Typography>
                    <Typography sx={[{ fontWeight: "bold", color: "#27AC1E", fontSize: { mobile: '12px', laptop: '12px' }, marginLeft: .5 }, valueStyle]}>{value}</Typography>
                </Box>
                {showDropDown &&
                    <Box>
                        <StyledImage src={DownIcon} sx={{ height: "10px", width: "10px", marginRight: "5px" }} />
                    </Box>
                }
            </Box>
            <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />
        </Box>
    )
}
const BoxMoney = ({ image, title, value, containerStyle }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={[{ backgroundColor: "white", minWidth: { laptop: "120px", mobile: '120px' }, marginLeft: "1vw", display: "flex", alignItems: "center", boxShadow: "0px 3px 10px #B7B7B726", height: { laptop: "35px", mobile: "35px" }, overflow: "hidden", paddingX: "3px", borderRadius: "40px" }, containerStyle]}>
            <Box sx={{ height: { mobile: "30px", laptop: '30px' }, width: { laptop: "30px", mobile: '28px' }, borderRadius: "25px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#FEFEFE", boxShadow: "0px 0px 5px #00000026" }}>
                <StyledImage src={image} sx={{ height: "50%", width: "auto" }} />
            </Box>
            <Box sx={{ marginLeft: { laptop: "5px", mobile: '5px' }, justifyContent: { mobile: 'center' }, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: { laptop: "8px", mobile: "8px" }, fontWeight: { mobile: "bold", laptop: '500px' }, marginLeft: .5, color: 'black' }}>{title}</Typography>
                <Typography sx={{ fontWeight: "bold", color: "#27AC1E", fontSize: { mobile: '12px', laptop: '12px' }, marginLeft: .5 }}>{value}</Typography>
            </Box>
        </Box>
    )
}

const BoxProfile = ({ image, value, containerStyle }) => {
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
            <Box onClick={(event) => handleClick(event)} sx={[{ backgroundColor: "primary.main", minWidth: { laptop: "120px", mobile: "90px" }, marginLeft: "1vw", display: "flex", alignItems: "center", boxShadow: "0px 3px 10px #B7B7B726", justifyContent: "space-between", height: { laptop: "35px", mobile: "30px" }, overflow: "hidden", paddingX: "2px", borderRadius: "35px" }, containerStyle]}>
                <StyledImage src={image} sx={{ height: { laptop: "30px", mobile: '27px' }, width: { laptop: "30px", mobile: '27px' }, borderRadius: "150px" }} />
                <Box style={{}}>
                    <Typography sx={{ fontSize: { laptop: '11px', mobile: "8px" }, color: "text.white", fontWeight: "600" }}>{value}</Typography>
                </Box>
                <StyledImage src={ArrowDown} sx={{ height: "6px", width: "10px", marginRight: '5px' }} />
            </Box>
            <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />
        </Box>
    )
}

const menutItems = [{ title: "Account Statement", link: "/account_statement" }, { title: "Profile/Loss Report", link: "/profit_loss" }, { title: "Bet History", link: '/bet_history' }, { title: "Casino Report History" }, { title: "Set Button Values", link: "/change_button_value" }, { title: "Security Auth Verification" }, { title: "Change Password", link: "/change_password" }, { title: "Rules", link: "/rules" }]
const DropdownMenu = ({ anchorEl, open, handleClose }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutProcess = () => {
        dispatch(stateActions.logout("role1"));
        navigate("/")
        handleClose()
    }
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
                sx: {
                    marginLeft: matchesMobile ? "7px" : "2px"
                }
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
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
            }} onClick={() => {
                if (x.link) {
                    navigate(x.link)
                }
                handleClose()
            }}>{x.title}</MenuItem>)}
            <Box onClick={() => {
                logoutProcess()
            }} sx={{ borderRadius: "5px", height: { laptop: "38px", mobile: "34px" }, width: "200px", marginLeft: "5px", marginTop: "10px", backgroundColor: "#F1C550", display: "flex", border: "2px solid #2626264D", justifyContent: "center", alignItems: "center" }}>
                <StyledImage src={Logout} sx={{ width: "35%", height: "auto" }} />
            </Box>
        </Menu>
    )
}

const MobileSideBar = ({ mobileOpen, setMobileOpen, showSideBarMobile }) => {

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
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { laptop: "300px", mobile: "190px" } },

            }}
        >
            <Box sx={{ minHeight: { laptop: showSideBarMobile ? (50 + 32 + 40) : (90 + 32 + 40), mobile: 60 + 32 + 21 } }} />
            <Box sx={{ height: "100vh" }}>
                <SideBar mobileShow={true} />
            </Box>
        </Drawer>
    )
}

export default CustomHeader;