import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ArrowDown, DELETE, MyBet } from "../assets"
import userAxios from "../axios/userAxios"
import { ARROWDOWN, ARROWUP } from "../expert/assets"
import StyledImage from './StyledImage'
const data = [
    {
        title: "Bookmaker",
        time: "03:23 AM",
        type: "Back",
        odds: "90.00",
        stake: "1000.00",
        country: 'INDIA'
    },
    {
        title: "Match odds",
        time: "03:23 AM",
        type: "Lay",
        odds: "90.00",
        stake: "1000.00",
        country: 'INDIA'
    },

]
const AllRateSeperate = ({ profit, mark, mark2, allBetsData }) => {
    const [Bets, setBets] = useState([])
    const [allRateBets, setAllRateBets] = useState([])
    function doBets() {
        allBetsData.forEach(element => {
            element.bettings.forEach(element2 => {
                Bets.push({ ...element2, marketId: element.marketId })
            });
        });
    }
    function doEmptyGetAllBets() {
        setAllRateBets([])
    }
    useEffect(() => {
        doBets()
        doEmptyGetAllBets()
        getAllBetsData()
    }, [Bets, allBetsData])
    async function getAllBetsData() {
        let allRateBetsTemp = []
        Promise.all(
            Bets.map(async element => {
                let payload = {
                    "match_id": element.match_id
                }
                try {
                    let { data } = await userAxios.post(`/betting/getPlacedBets`, payload);
                    allRateBetsTemp.push(...data.data[0])
                } catch (e) {
                    console.log(e)
                }
            })
        ).then(() => {
            setAllRateBets(allRateBetsTemp)
        });
    }
    return (
        <>
            {<Box sx={{ width: { mobile: "100%", laptop: '100%' }, marginY: { mobile: '.2vh', laptop: '1vh' }, padding: .2, background: 'white' }}>
                <Box sx={[{ width: '100%', height: "42px", justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px', paddingRight: '4px', marginBottom: '.1vh', display: 'flex', }, (theme) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`
                })]} >
                    <Typography sx={{ fontWeight: '12px', color: 'white', fontWeight: '700' }} >All Rate Bets</Typography>
                    <Box sx={{ width: '100px', height: '90%', background: 'white', justifyContent: 'center', borderRadius: '3px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: '700', color: '#FF1111' }} >All Bet</Typography>
                        <Typography sx={{ fontSize: '12px', fontWeight: '700', color: "#0B4F26" }} >999</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                    <Box sx={{ height: '30px', margin: { mobile: '1px', laptop: '0.5px' }, width: '30px', display: 'flex', background: 'black', justifyContent: 'center', alignItems: 'center' }} >
                        <Typography sx={{ fontWeight: '400', fontSize: '10px', color: 'white' }} >{"No"}</Typography>
                    </Box>
                    <RowComponent header={true} data={["Market", "Favourite", "Back/Lay", "Odds", "Stake"]} />
                    {profit &&
                        <Box sx={{ height: '30px', width: '30%', display: 'flex', background: 'black', justifyContent: 'center', alignItems: 'center', margin: { mobile: '1px', laptop: '0.4px' } }} >
                            <Typography sx={{ fontWeight: '400', fontSize: '10px', color: 'white' }} >{"Profit/Loss"}</Typography>
                        </Box>
                    }
                </Box>
                {
                    allRateBets.map((i, k) => {
                        return (
                            <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }} >
                                <Box sx={{ height: '40px', width: '30px', display: 'flex', background: 'black', margin: { mobile: '1px', laptop: '0.4px' }, justifyContent: 'center', alignItems: 'center' }} >
                                    <Typography sx={{ color: 'white', fontSize: '10px', fontWeight: '500' }} >{"0" + (k + 1)}</Typography>
                                </Box>
                                <RowComponent header={false} data={i} />
                                {k === 2 && <Box sx={{ width: { mobile: profit ? '100%' : '100%', alignItems: 'flex-end', justifyContent: 'center', display: 'flex', laptop: profit ? '100 % ' : '100% ' }, background: 'rgba(0, 0, 0, 0.5)', height: '42px', position: 'absolute' }}>
                                    <Box sx={{ width: mark2 ? '20%' : '35%' }} >
                                    </Box>
                                    <Box sx={{ width: mark2 ? '80%' : '65%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                                        {mark && <Typography sx={{ fontSize: '10px', fontWeight: '700', color: 'white', textTransform: "uppercase" }}>Bet <span style={{ color: '#e41b23' }} >deleted</span> due to no ball</Typography>}
                                    </Box>
                                </Box>}
                                {profit && k !== 2 && <Box sx={{ height: '40px', width: '30%', margin: { mobile: '1px', laptop: '0.4px' }, display: 'flex', background: k % 2 === 0 ? '#E32A2A' : "#10DC61", justifyContent: 'center', alignItems: 'center' }} >
                                    <Typography sx={{ fontSize: { mobile: '11px', laptop: '14px' }, color: 'white', fontWeight: '700' }}>{"100,000,00"}</Typography>

                                    <StyledImage sx={{ width: { mobile: '15px', laptop: "25px" }, height: { laptop: '15px', mobile: '7px' }, }} src={k % 2 === 0 ? ARROWDOWN : ARROWUP} />
                                </Box>}
                                {profit && k === 2 && <Box sx={{ height: '40px', width: '30%', margin: { mobile: '1px', laptop: '0.4px' }, display: 'flex', background: "black", justifyContent: 'center', alignItems: 'center', zIndex: 999 }} >
                                    <StyledImage sx={{ width: { mobile: '15px', laptop: "20px" }, height: { laptop: '20px', mobile: '14px' }, marginRight: '5px' }} src={DELETE} />
                                    <Typography sx={{ fontSize: { mobile: '7px', laptop: '.8vw' }, color: 'white', fontWeight: '700', width: { laptop: '65%', mobile: "55%" }, textTransform: 'uppercase' }}>Bet <span style={{ color: "#e41b23" }} >Deleted</span> Due {"\n"} to No Ball</Typography>
                                </Box>}
                            </Box>
                        )
                    })
                }
            </Box>}
        </>
    )
}

const RowComponent = ({ header, data }) => {
    const getColor = () => {

        if (header) {
            return "black"
        }
        else if (data?.bet_type === "back") {
            return "#B3E0FF"
        }
        else {
            return "#FF9292"
        }

    }
    return (
        <Box sx={{ width: '100%', height: header ? '30px' : '42px', background: 'white', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
            {!header && <>
                <SingleBox color={getColor} data={data.title} first={true} header={header} />
                <SingleBox color={getColor()} data={data} up={true} header={header} />
                <SingleBox color={getColor()} data={data?.bet_type} header={header} />
                <SingleBox color={getColor()} data={data?.odds} header={header} />
                <SingleBox color={getColor()} data={data?.amount} header={header} /></>}
            {header && <>
                <SingleBox color={getColor} data={data[0]} header={header} />
                <SingleBox color={getColor()} data={data[1]} header={header} />
                <SingleBox color={getColor()} data={data[2]} header={header} />
                <SingleBox color={getColor()} data={data[3]} header={header} />
                <SingleBox color={getColor()} data={data[4]} header={header} /></>}
        </Box>
    )
}
const SingleBox = ({ data, header, color, up, first }) => {

    return !header ? first ? (
        <Box sx={{ width: '100%', height: '40px', background: "#F1C550", marginX: { mobile: '1px', laptop: '0.4px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {data === "Bookmaker" ? <Typography sx={{ fontWeight: '700', fontSize: { mobile: '8px', laptop: '.6vw' }, color: 'black', textAlign: 'center' }} >{data}</Typography> :

                <Typography sx={{ fontWeight: '700', fontSize: { mobile: '10px', laptop: '.7vw' }, color: 'black', textAlign: 'center' }} >{"MATCH"}<span style={{ fontSize: '8px' }} ><br />odds</span></Typography>
            }
        </Box>
    ) : up ? (
        <Box sx={{ width: '100%', height: '40px', flexDirection: 'column', background: color, marginX: { mobile: '1px', laptop: '0.4px' }, display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '6px', color: 'black', textAlign: 'end', marginRight: '3px' }} >{data.time}</Typography>
            <Box sx={{ height: '.4vh' }} ></Box>
            <Typography sx={{ fontWeight: '600', fontSize: { laptop: '12px', mobile: "10px" }, color: 'black', textAlign: 'start', marginLeft: '3px' }} >{data.country}</Typography>

        </Box>
    ) : (
        <Box sx={{ width: '100%', height: '40px', background: color, marginX: { mobile: '1px', laptop: '0.4px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: '700', fontSize: { mobile: '10px', laptop: '12px' }, color: 'black' }} >{data}</Typography>
        </Box>
    ) : header &&
    (
        <Box sx={{ width: '100%', height: '30px', background: 'black', marginX: { mobile: '1px', laptop: '0.4px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: '400', fontSize: { laptop: '.7vw', mobile: '10px' }, color: 'white', flexWrap: 'wrap' }} >{data}</Typography>
        </Box>
    )
}
export default AllRateSeperate;