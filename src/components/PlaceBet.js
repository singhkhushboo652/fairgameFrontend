import { Input, Menu, Popover, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ArrowDown, CANCEL, CancelDark } from "../assets";
import '../components/index.css'
import StyledImage from "./StyledImage";
import { useSelector } from 'react-redux'
const PlaceBet = ({ open, refs, handleClose, season, onSubmit, onCancel, back, isSessionYes, isBack, type, name, data, typeOfBet }) => {

    const [odd, setOdd] = useState("18")

    const [defaultValue, setDefaultValue] = useState("")
    const theme = useTheme()
    const selectedColorBox = useSelector(state => state.selectedColorBox)?.value
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    const CustomButton = ({ color, title, onClick }) => {
        return (
            <Box onClick={onClick} sx={{ width: { laptop: '150px', mobile: "130px" }, height: { laptop: "35px", mobile: "38px" }, borderRadius: { mobile: '7px', laptop: '5px' }, border: "2px solid white", alignItems: 'center', justifyContent: 'center', background: color, display: 'flex' }}>
                <Typography sx={{ color: 'white', fontWeight: '500', fontSize: '13px' }} >{title}</Typography>
            </Box>
        )
    }

    const [ip, setIP] = useState('');

    useEffect(() => {
        FetchIpAddress()
    }, [])

    async function FetchIpAddress() {
        const response = await fetch("https://geolocation-db.com/json/")
            .then(response => {
                return response.json();
            }, "jsonp")
            .then(res => {
                setIP(res)
            })
            .catch(err => console.log(err))
    }

    const BoxInput = ({ title, value, containerStyle, valueContainerStyle, valueTextStyle, trendingUp, trendingDown, setDefaultValue }) => {
        return (
            <Box sx={[{ display: "flex", flexDirection: "column", }, containerStyle]}>
                <Box sx={{ background: "#262626", border: "1px solid #C7B6B6", display: "flex", justifyContent: "center", alignItems: "center", height: "25px" }}>
                    <Typography sx={{ color: "white", fontSize: "11px", fontWeight: "600" }}>{title}</Typography>
                </Box>
                <Box sx={[{ background: "#0B4F26", display: "flex", justifyContent: "center", alignItems: "center", height: "37px", marginTop: "1px" }, valueContainerStyle]}>
                    <TextField
                        value={value}
                        variant="standard"
                        InputProps={{
                            sx: {
                                "& input": {
                                    textAlign: "center"
                                }
                            },
                            disableUnderline: true,
                            style: { fontSize: "16px", fontWeight: "600", color: "white" }
                        }}
                        onChange={(e) => { setDefaultValue(e.target.value) }}
                        sx={{ textAlign: 'center', alignItems: 'center' }}
                    />
                </Box>
            </Box>
        )
    }

    const TeamsOdssData = ({ input, title, value, containerStyle, valueContainerStyle, valueTextStyle }) => {
        const [oddValue, setOddValue] = useState("18")
        const selectedColorBox = useSelector(state => state.selectedColorBox)?.value
        return (
            <Box sx={[{ display: "flex", flexDirection: "column", }, containerStyle]}>
                <Box sx={{ background: "#262626", border: "2px solid #C7B6B6", display: "flex", justifyContent: "center", alignItems: "center", height: "25px" }}>
                    <Typography sx={{ color: "white", fontSize: "11px", fontWeight: "600" }}>{title}</Typography>
                </Box>
                {!input && <Box sx={[{ background: "white", border: "0px solid #C7B6B6", display: "flex", justifyContent: "center", alignItems: "center", height: "32px", marginTop: "1px" }, valueContainerStyle]}>
                    <Typography sx={[{ color: "#262626", fontSize: (title == "Back/Lay" || title == "Yes/No") ? "16px" : '13px', fontWeight: (title === "Back/Lay" || title === "Yes/No") ? "800" : "600" }, valueTextStyle]}>{title === "Back/Lay" ? isBack ? "Back" : "Lay" : title === "Team" ? name : isSessionYes ? "No" : "Yes"}</Typography>
                </Box>}
                {
                    input &&
                    <Box sx={[{ background: selectedColorBox, border: "0px solid #C7B6B6", display: "flex", justifyContent: season ? "center" : "space-between", paddingX: '4px', alignItems: "center", height: "32px", marginTop: "1px" }, valueContainerStyle]}>
                        {!season && <Box
                            onClick={() => {
                                setOddValue(i => Number(i) - 1)
                            }}
                            sx={{ width: '18px', justifyContent: 'center', alignItems: 'center', display: 'flex', borderRadius: '3px', height: '18px', background: '#319E5B' }} >
                            <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }} >-</Typography>
                        </Box>}
                        <Box sx={{ width: '30px', justifyContent: 'center', alignItems: 'center', display: 'flex', borderRadius: '3px', height: '15px' }} >
                            <Typography className="OddValue" sx={{ color: 'black', fontSize: { mobile: "18px", laptop: '16px' }, fontWeight: { mobile: '700', laptop: '600' } }} >{oddValue}</Typography>
                        </Box>
                        {!season && <Box
                            onClick={() => {
                                setOddValue(i => Number(i) + 1)
                            }}
                            sx={{ width: '18px', justifyContent: 'center', alignItems: 'center', display: 'flex', borderRadius: '3px', height: '18px', background: '#319E5B' }} >
                            <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }} >+</Typography>
                        </Box>}
                    </Box>
                }
            </Box>
        )
    }

    const MoneyBox = ({ color, trendingDown, trendingUp }) => {
        return (
            <Box sx={{ width: '100px', height: '25px', alignItems: 'center', justifyContent: 'center', background: color, borderRadius: '4px', display: 'flex' }} >
                <Typography sx={{ fontSize: { mobile: '12px', laptop: "13px" }, fontWeight: '700', color: 'white' }} >10,00,000</Typography>
                {trendingUp && <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "20px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "20px" }} />}
                {trendingDown && <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "20px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "20px" }} />}
            </Box>
        )
    }

    function setDValue(e) {
        e.preventDefault()
        setDefaultValue("")
    }

    function SubmitPayloadForPlaceBet(betOn = "teamA_back", marketType = "BOOKMAKER") {
        let payload = {
            "id": data?.id,
            "matchType": data.gameType,
            "betId": data?.betting?.[0]?.id,
            "bet_type": isBack ? "Back" : "Lay",
            "odds": document.getElementsByClassName("OddValue")?.[0]?.textContent,
            "betOn": betOn,
            "stack": defaultValue,
            "team_bet": name?.toLowerCase(),
            "country": ip?.country_name,
            "ip_address": ip?.IPv4,
            "stake": defaultValue,
            "teamA_name": data.teamA,
            "teamB_name": data.teamB,
            "marketType": marketType
        }
        if (marketType === "Session") {
            payload.bet_condition = data?.betting?.[0]?.bet_condition
            payload.rate_percent = data?.betting?.[0]?.rate_percent
        }
        return payload
    }

    return (
        <Box ref={refs} sx={[{ display: 'flex', flexDirection: 'column', border: "1px solid white", borderRadius: "5px", marginLeft: season ? "40px" : 0, overflow: "hidden", width: { mobile: "90vw", laptop: '30vw' } }, matchesMobile ? { position: "absolute", right: back ? "-16.5vw" : "0vw" } : { position: "absolute", right: back ? "-16.5vw" : "0vw" }]} >
            <Box sx={{ background: "white", width: "100%", 'overflow': "hidden" }} >
                <Box sx={[{ height: "38px", display: "flex", justifyContent: "space-between", alignItems: "center", px: "10px" }, (theme) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`
                })]}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "14px", color: "text.white" }}>Place Bet</Typography>
                    <Box sx={{ display: 'flex', marginRight: -'10px', alignItems: 'center' }}>
                        <MoneyBox trendingUp={true} color={'#10DC61'} />
                        <Box sx={{ width: '5px' }} ></Box>
                        <MoneyBox trendingDown={true} color={'#FF4D4D'} />
                        <Box sx={{ width: '5px' }} ></Box>
                        <StyledImage onClick={handleClose} src={CancelDark} sx={{ marginLeft: '5px', height: "25px", width: "25px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
                    <TeamsOdssData title={season ? "Session" : "Team"} value={season ? "6 OVER RUNS INDIA" : "INDIA"} valueContainerStyle={{ background: "#F8C851" }} containerStyle={{ flex: season ? { mobile: 2.5, laptop: 2 } : 1 }} />
                    <TeamsOdssData input={true} title={"Odds"} value={"60.00"} containerStyle={{ marginLeft: "2px", flex: 1 }} />
                    <TeamsOdssData title={season ? "Yes/No" : "Back/Lay"} value={season ? ((selectedColorBox == "#FFB5B5" || selectedColorBox == "#F6D0CB") ? "No" : "Yes") : ((selectedColorBox == "#FFB5B5" || selectedColorBox == "#F6D0CB") ? "Lay" : "Back")} valueContainerStyle={{ background: type?.color }} containerStyle={{ marginLeft: "2px", flex: 1 }} />
                    {!matchesMobile && <Box sx={{ width: '20px' }} ></Box>}
                    <BoxInput containerStyle={{ marginLeft: "2px", flex: 1.3 }} title={"Stake"} value={defaultValue} setDefaultValue={setDefaultValue} />
                </Box>
                {matchesMobile && <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />}
                {
                    <>
                        <Box sx={{ display: "flex", marginTop: "15px", marginX: "2px" }}>
                            <NumberData containerStyle={{ flex: 1 }} value={"2000"} setDefaultValue={setDefaultValue} />
                            <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"3000"} setDefaultValue={setDefaultValue} />
                            <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"5000"} setDefaultValue={setDefaultValue} />
                            <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"10000"} setDefaultValue={setDefaultValue} />
                        </Box>
                        <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
                            <NumberData containerStyle={{ flex: 1 }} value={"20000"} setDefaultValue={setDefaultValue} />
                            <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"100000"} setDefaultValue={setDefaultValue} />
                            <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"200000"} setDefaultValue={setDefaultValue} />
                            <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"500000"} setDefaultValue={setDefaultValue} />
                        </Box>
                    </>
                }
                <Box sx={{ display: 'flex', flex: 1, paddingY: '2vh', justifyContent: 'space-evenly' }}>
                    <CustomButton onClick={(e) => {
                        if (defaultValue !== "") {
                            setDValue(e)
                            return ""
                        }
                        handleClose();
                    }} title={'Reset'} color={'#FF4949'} />
                    <CustomButton onClick={() => {
                        handleClose(); onSubmit(SubmitPayloadForPlaceBet("asd", typeOfBet));
                        {/**{
                            data = {
                                match_id: data.id,
                                matchType: data.gameType,
                                sessionBet: data.apiSessionActive,
                                teamA_lay: data.bettings[0].teamA_lay,
                                teamB_lay: data.bettings[0].teamB_lay,
                                teamA_Back: data.bettings[0].teamA_Back,
                                teamB_Back: data.bettings[0].teamB_Back,
                                drawRate: data.bettnfs[0].drawRate
                            }
    "match_id": "ea46118c-501f-4e48-8ccf-d9dd9023bc2b",
    "matchType": "cricket",
    "sessionBet": false,
    "teamA_lay": 18,
    "teamB_lay": 15,
    "teamA_Back": 10,
    "teamB_Back": 4,
    "drawRate": 10
}

{
    "id": "60ffa666-1f6d-427c-943d-9f114442be43",
    "matchType": "cricket",
    "betId": "1e8cd1d2-dbe5-40b9-be0c-d9458a0f6db2",
    "bet_type": "back",
    "odds": 7,
    "betOn": "teamA_back",
    "stack": 7,
    "team_bet": "aus",
    "country": "india",
    "ip_address": "192.168,12,01",
    "stake": 20,
    "teamA_name": "india",
    "teamB_name": "aus",
    "marketType": "BOOKMAKER"
}

payload = {
    "id": data.id,
    "matchType": data.gameType,
    "betId": data.betting[0].id,
    "bet_type": isBack?"Back":"Lay",
    "odds": oddValue,
    "betOn": "teamA_back",
    "stack": defaultValue,
    "team_bet": name.toLowercase(),
    "country": ip.country_name,
    "ip_address": ip.IPv4,
    "stake": e.target.value,
    "teamA_name": data.teamA,
    "teamB_name": data.teamB,
    "marketType": "BOOKMAKER"
}

*/}
                    }} title={'Submit'} color={'#262626'} />
                </Box>
            </Box>
        </Box>
    )

}

const NumberData = ({ value, containerStyle, setDefaultValue }) => {
    return (
        <Box onClick={() => {
            setDefaultValue(value)
        }} sx={[{ display: "flex", borderRadius: "3px", justifyContent: "center", alignItems: "center", height: "35px", minWidth: "18%", background: "#0B4F26" }, containerStyle]}>
            <Typography sx={{ color: "white", fontSize: "13px", fontWeight: "500", fontWeight: '600' }}>{value}</Typography>
        </Box>
    )
}
export default PlaceBet;