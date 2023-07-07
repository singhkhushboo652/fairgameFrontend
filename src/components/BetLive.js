import { Box, Typography, useTheme } from "@mui/material";

export default function BetLive({ createSession, sessionEvent, betData }) {
    return (
        <Box sx={{ flex: 1, background: "white", borderRadius: "5px", minHeight: "740px", border: "2px solid white" }}>
            <Box sx={[{ height: "50px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", py: "5px" }, (theme) => ({
                // backgroundImage: `${theme.palette.primary.headerGradient}`
                background: "#F8C851"
            })]}>
                <Typography sx={{ color: "white", fontSize: "25px", fontWeight: "600" }}>{sessionEvent?.bet_condition}</Typography>
                <Box sx={{ height: "35px", width: "100px", background: "white", borderRadius: "5px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ color: "red", fontWeight: "700", fontSize: "12px" }}>All Bet</Typography>
                    <Typography sx={{ color: "#0B4F26", fontWeight: "700", marginTop: "-5px" }}>{betData.length}</Typography>
                </Box>
            </Box>
            <Box sx={{ flex: 1, justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                <Header />
                {betData?.length > 0 &&
                    betData?.map((i, k) => {
                        const num = betData?.length - k
                        return (
                            <Row index={num} values={i} />
                        );
                    })}
                {/* {!createSession && <>
                <Row index={1} yes={true} />
                    <Row index={2} />
                    <Row index={3} yes={true} />
                    <Row index={4} />
                    <Row yes={true} index={5} />
                    <Row index={6} />
                    <Row yes={true} index={7} />
                    <Row index={8} />
                    <Row yes={true} index={9} />
                    <Row index={10} />
                    <Row yes={true} index={11} />
                    <Row index={12} />
                    <Row yes={true} index={13} />
                </>} */}
            </Box>
        </Box>
    )
}

const Header = () => {
    return (
        <Box sx={{ display: "flex", height: "35px" }}>
            <Box sx={{ background: "#262626", width: "6%", px: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>No.</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}>User</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "10%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", color: "white", fontSize: "12px" }}>Odds</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "14%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>Time</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "10%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>Yes/No</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>Stake</Typography>
            </Box>
            <Box sx={{ background: "#262626", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "12px", color: "white", }}>My Stake</Typography>
            </Box>
        </Box>
    )
}

const Row = ({ index, values }) => {
    const getTime = (date) => {
        const now = new Date(date);
        const timeString = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return timeString;
    };


    return (
        <Box sx={{ display: "flex", height: "40px", borderTop: "2px solid white" }}>
            <Box sx={{ background: "#F8C851", width: "6%", px: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "14px" }}>{index}.</Typography>
            </Box>
            <Box sx={{ background: "#0B4F26", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ color: "white", fontWeight: "600", fontSize: "14px" }}>{values?.user?.userName || values?.userName}</Typography>
            </Box>
            {/* <Box sx={{ background: yes ? "#B3E0FF" : "#FFB5B5", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "800", color: "black", fontSize: "18px" }}>40</Typography>
            </Box> */}
            <Box sx={{ background: values.bet_type == "yes" ? "#B3E0FF" : "#FFB5B5", width: "10%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center", position: 'relative', flexDirection: "column", }} >                
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", lineHeight: 1.1, marginRight: "2px" }} > {values.odds} </Typography>
                <Typography
                    sx={{
                        fontSize: "10px",
                        marginTop: -0.4,
                        color: "black",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginRight: "2px"
                    }}
                >
                    {values?.bet_type == "no"
                        ? values?.rate?.split("-")[0]
                        : values?.rate?.split("-")[1]}
                </Typography>
            </Box>
            <Box sx={{ background: "#B3E0FF", width: "14%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "600", fontSize: { mobile: "10px", laptop: "13px" }, color: "black", position: 'static', top: 0, right: 5 }} >{getTime(values.createAt)}</Typography>
            </Box>
            <Box sx={{ background: values.bet_type == "yes" ? "#B3E0FF" : "#FFB5B5", width: "10%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", }}>{values.bet_type == "yes" ? "Yes" : "No"}</Typography>
            </Box>
            <Box sx={{ background: values.bet_type == "yes" ? "#B3E0FF" : "#FFB5B5", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "black", }}>{values.amount || values.stake}</Typography>
            </Box>
            <Box sx={{ background: "#0B4F26", width: "20%", borderLeft: "2px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "14px", color: "white", }}>{values.myStack}</Typography>
            </Box>
        </Box>
    )
}
