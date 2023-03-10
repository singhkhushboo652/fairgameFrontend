import { Input, Menu, Popover, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ArrowDown, CANCEL, CancelDark } from "../assets";
import '../components/index.css'
import StyledImage from "./StyledImage";
import { useSelector } from 'react-redux'
const PlaceBet = ({ open, refs, handleClose, season, onSubmit, onCancel, back }) => {
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
                        onChange={(e)=>{setDefaultValue(e.target.value)}}
                        sx={{ textAlign: 'center', alignItems: 'center' }}
                    />
                </Box>
            </Box>
        )
    }
    const TeamsOdssData = ({ input, title, value, containerStyle, valueContainerStyle, valueTextStyle, trendingUp, trendingDown }) => {
        const selectedColorBox = useSelector(state => state.selectedColorBox)?.value
        console.log(selectedColorBox)
        const [oddValue, setOddValue] = useState("18")
        return (
            <Box sx={[{ display: "flex", flexDirection: "column", }, containerStyle]}>
                <Box sx={{ background: "#262626", border: "2px solid #C7B6B6", display: "flex", justifyContent: "center", alignItems: "center", height: "25px" }}>
                    <Typography sx={{ color: "white", fontSize: "11px", fontWeight: "600" }}>{title}</Typography>
                </Box>
                {!input && <Box sx={[{ background: "white", border: "0px solid #C7B6B6", display: "flex", justifyContent: "center", alignItems: "center", height: "32px", marginTop: "1px" }, valueContainerStyle]}>
                    <Typography sx={[{ color: "#262626", fontSize: (title == "Back/Lay" || title == "Yes/No") ? "16px" : '13px', fontWeight: (title == "Back/Lay" || title == "Yes/No") ? "800" : "600" }, valueTextStyle]}>{value}</Typography>

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
                            <Typography sx={{ color: 'black', fontSize: { mobile: "18px", laptop: '16px' }, fontWeight: { mobile: '700', laptop: '600' } }} >{oddValue}</Typography>
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

    return (

        <Box ref={refs} sx={[{ display: 'flex', flexDirection: 'column', border: "1px solid white", borderRadius: "5px", marginLeft: season ? "40px" : 0, overflow: "hidden", width: { mobile: "90vw", laptop: '30vw' } }, matchesMobile ? { position: "absolute", right: back ? "-16.5vw" : "0vw" } : {}]} >
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
                    <TeamsOdssData title={season ? "Yes/No" : "Back/Lay"} value={season ? ((selectedColorBox == "#FFB5B5" || selectedColorBox == "#F6D0CB") ? "No" : "Yes") : ((selectedColorBox == "#FFB5B5" || selectedColorBox == "#F6D0CB") ? "Lay" : "Back")} valueContainerStyle={{ background: (selectedColorBox == "#FFB5B5" || selectedColorBox == "#F6D0CB") ? "#FF7D7D" : "#00C0F9" }} containerStyle={{ marginLeft: "2px", flex: 1 }} />
                    {!matchesMobile && <Box sx={{ width: '20px' }} ></Box>}
                    <BoxInput containerStyle={{ marginLeft: "2px", flex: 1.3 }} title={"Stake"} value={defaultValue} setDefaultValue={setDefaultValue} />
                </Box>
                {matchesMobile && <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
                </Box>}
                {<><Box sx={{ display: "flex", marginTop: "15px", marginX: "2px" }}>
                    <NumberData containerStyle={{ flex: 1 }} value={"2000"} setDefaultValue={setDefaultValue} />
                    <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"3000"} setDefaultValue={setDefaultValue} />
                    <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"5000"} setDefaultValue={setDefaultValue} />
                    <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"10,000"} setDefaultValue={setDefaultValue} />
                </Box>
                    <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }}>
                        <NumberData containerStyle={{ flex: 1 }} value={"20,000"} setDefaultValue={setDefaultValue} />
                        <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"1,00,000"} setDefaultValue={setDefaultValue} />
                        <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"2,00,000"} setDefaultValue={setDefaultValue} />
                        <NumberData containerStyle={{ marginLeft: "2px", flex: 1 }} value={"5,00,000"} setDefaultValue={setDefaultValue} />
                    </Box></>}

                <Box sx={{ display: 'flex', flex: 1, paddingY: '2vh', justifyContent: 'space-evenly' }}>
                    <CustomButton onClick={() => { handleClose(); onCancel(); }} title={'Reset'} color={'#FF4949'} />
                    <CustomButton onClick={() => {
                        if (defaultValue == "") {
                            return
                        }
                        handleClose(); onSubmit();
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