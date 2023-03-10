import { Box, Typography, useTheme } from "@mui/material";
import StyledImage from "./StyledImage";

export default function SessionResult({createSession}) {
    return (
        <Box sx={{ flex: 1, background: "#F8C851", marginTop: "5px", borderRadius: "5px", minHeight: "300px", py: "30px", px: "20px" }}>
            <Typography sx={{ color: "#0B4F26", fontSize: "25px", fontWeight: "600" }}>Session Result</Typography>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
                <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <Overs createSession={createSession} />
                    <Box sx={{ display: "flex", justifyContent: "center",marginTop:"30px" }}>
                        <Box sx={{ width: "30%", display: "flex",maxWidth:"120px", background: "#FF4D4D", justifyContent: "center", alignItems: "center", height: "35px", borderRadius: "5px" }}>
                            <Typography sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}>Un Declare</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const Overs = ({createSession}) => {
    return (
        <Box sx={{ border: "2px solid #FFFFFF" }}>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>Overs</Typography>
                </Box>
                <Box sx={{ background: "#303030", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>RESULT</Typography>
                </Box>
                <Box sx={{ background: "#303030", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>PROFIT/LOSS</Typography>
                </Box>
            </Box>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                    <Box sx={{ background: "#FFFFFF", width: "60%" }}>
                        <Typography sx={{ fontWeight: "600", fontSize: "14px", px: "5px" }}>{createSession?"":"6 Over runs INDIA..."}</Typography>
                    </Box>
                    <Box sx={{ background: "#ECECEC", width: "20%", display: "flex", height: "30px", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>{createSession?"":39}</Typography>
                    </Box>
                    <Box sx={{ background: createSession?"#ECECEC":"#10DC61", width: "20%", borderLeft: "2px solid white", display: "flex", height: "30px", justifyContent: "center", alignItems: "center" }}>
                        {!createSession&&<Typography sx={{ fontWeight: "600", fontSize: "14px",color:"white" }}>4,02,350<StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} /></Typography>}
                    </Box>
                </Box>
                <Box display={"flex"} sx={{ borderTop: "2px solid white" }}>
                <Box sx={{ background: "#FFFFFF", width: "60%" }}>
                        {!createSession&&<Typography sx={{ fontWeight: "600", fontSize: "14px", px: "5px" }}>6 Over runs INDIA...</Typography>}
                    </Box>
                    <Box sx={{ background: "#ECECEC", width: "20%", display: "flex", height: "30px", justifyContent: "center", alignItems: "center" }}>
                        {!createSession&&<Typography sx={{ fontWeight: "600", fontSize: "14px" }}>39</Typography>}
                    </Box>
                    <Box sx={{ background:  createSession?"#ECECEC":"#FF4D4D", width: "20%", borderLeft: "2px solid white", display: "flex", height: "30px", justifyContent: "center", alignItems: "center" }}>
                       {!createSession&&<Typography sx={{ fontWeight: "600", fontSize: "14px" ,color:"white"}}>4,02,350<StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} /></Typography>}
                    </Box>
                </Box>
        </Box>
    )
}


const RunsAmountBox = ({ anchorEl, open, handleClose }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                borderRadius: "5px",
                border: "1px solid #306A47",
                overflow: "hidden",
            }}
        >
            <Box sx={{ minHeight: "120px", flexDirection: "column", backgroundColor: "white", display: "flex" }}>
                <Box sx={{ display: "flex", height: "30px" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Runs</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>Amount</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>40</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>41</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#10DC61", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>42</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>43</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#F8C851", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", height: "30px", borderTop: "1px solid #306A47" }}>
                    <Box sx={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "bold", fontSize: "14px" }}>44</Typography>
                    </Box>
                    <Box sx={{ width: "100px", display: "flex", borderLeft: "1px solid #306A47", background: "#DC3545", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ color: "#306A47", fontWeight: "500", fontSize: "14px", color: "white" }}>4,02,350</Typography>
                        <StyledImage src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg" sx={{ height: "15px", marginLeft: "5px", filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);", width: "15px" }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}