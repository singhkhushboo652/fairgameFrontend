import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
const data = [
    {
        values: [
            {
                name: "John Doe",
                color: "black",
                background: "#F1C550",

            },
            {
                name: "BOOKMAKER",
                color: "black",
                background: "#F1C550",

            },
            {
                name: "INDIA",
                color: "black",
                background: "#B3E0FF",

            },
            {
                name: "1000",
                color: "black",
                background: "#B3E0FF",
                small: true

            },
            {
                name: "Back",
                color: "black",
                background: "#B3E0FF",
                small: true
            },
            {
                name: "100,000,000",
                color: "black",
                background: "#B3E0FF",
            },
            {
                name: "10,000,000",
                color: "white",
                background: "#0B4F26",
            },
            {
                name: "03:23 AM",
                color: "black",
                background: "#B3E0FF",
                time: true,
                date: "02-11-2022"
            }
        ],

    },
    {
        values: [
            {
                name: "John Doe",
                color: "white",
                background: "#319E5B",

            },
            {
                name: "MATCH ODDS",
                color: "white",
                background: "#319E5B",

            },
            {
                name: "INDIA",
                color: "black",
                background: "#FF9292",

            },
            {
                name: "1000",
                color: "black",
                background: "#FF9292",
                small: true

            },
            {
                name: "LAY",
                color: "black",
                background: "#FF9292",
                small: true,
            },
            {
                name: "100,000,000",
                color: "black",
                background: "#FF9292",
            },
            {
                name: "10,000,000",
                color: "white",
                background: "#0B4F26",
            },
            {
                name: "03:23 AM",
                color: "black",
                background: "#FF9292",
                time: true,
                date: "02-11-2022"
            }
        ],

    },
    {
        values: [
            {
                name: "John Doe",
                color: "white",
                background: "#303030",

            },
            {
                name: "6 OVER RUN INDIA",
                color: "white",
                background: "#303030",

            },
            {
                name: "",
                color: "black",
                background: "#303030",

            },
            {
                name: "1000",
                color: "black",
                background: "#B3E0FF",
                small: true

            },
            {
                name: "YES",
                color: "black",
                background: "#B3E0FF",
                small: true
            },
            {
                name: "100,000,000",
                color: "black",
                background: "#B3E0FF",
            },
            {
                name: "10,000,000",
                color: "white",
                background: "#0B4F26",
            },
            {
                name: "03:23 AM",
                color: "black",
                background: "#B3E0FF",
                time: true,
                date: "02-11-2022"
            }
        ]
    },
    {
        values: [
            {
                name: "John Doe",
                color: "black",
                background: "#F1C550",

            },
            {
                name: "BOOKMAKER",
                color: "black",
                background: "#F1C550",

            },
            {
                name: "INDIA",
                color: "black",
                background: "#B3E0FF",

            },
            {
                name: "1000",
                color: "black",
                background: "#B3E0FF",
                small: true

            },
            {
                name: "Back",
                color: "black",
                background: "#B3E0FF",
                small: true
            },
            {
                name: "100,000,000",
                color: "black",
                background: "#B3E0FF",
            },
            {
                name: "10,000,000",
                color: "white",
                background: "#0B4F26",
            },
            {
                name: "03:23 AM",
                color: "black",
                background: "#B3E0FF",
                time: true,
                date: "02-11-2022"
            }
        ],

    },
    {
        values: [
            {
                name: "John Doe",
                color: "white",
                background: "#319E5B",

            },
            {
                name: "MATCH ODDS",
                color: "white",
                background: "#319E5B",

            },
            {
                name: "INDIA",
                color: "black",
                background: "#FF9292",

            },
            {
                name: "1000",
                color: "black",
                background: "#FF9292",
                small: true

            },
            {
                name: "LAY",
                color: "black",
                background: "#FF9292",
                small: true
            },
            {
                name: "100,000,000",
                color: "black",
                background: "#FF9292",
            },
            {
                name: "10,000,000",
                color: "white",
                background: "#0B4F26",
            },
            {
                name: "03:23 AM",
                color: "black",
                background: "#FF9292",
                time: true,
                date: "02-11-2022"
            }
        ],

    },
    {
        values: [
            {
                name: "John Doe",
                color: "white",
                background: "#303030",

            },
            {
                name: "6 OVER RUN INDIA",
                color: "white",
                background: "#303030",

            },
            {
                name: "",
                color: "black",
                background: "#303030",

            },
            {
                name: "1000",
                color: "black",
                background: "#B3E0FF",
                small: true

            },
            {
                name: "YES",
                color: "black",
                background: "#B3E0FF",
                small: true
            },
            {
                name: "100,000,000",
                color: "black",
                background: "#B3E0FF",
            },
            {
                name: "10,000,000",
                color: "white",
                background: "#0B4F26",
            },
            {
                name: "03:23 AM",
                color: "black",
                background: "#B3E0FF",
                time: true,
                date: "02-11-2022"
            }
        ]
    }
]
const AllBets = ({ tag ,submit}) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: { mobile: "98%", laptop: '100%' }, marginTop: submit?"10px": '.25vh' , padding: .2, background: 'white' }}>
            <Box onClick={(e) => {
                e.stopPropagation()
                navigate('/admin/total_bets')

            }} sx={[{ width: '100%', height: "42px", justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px', paddingRight: '4px', marginBottom: '.1vh', display: 'flex', }, (theme) => ({
                backgroundImage: `${theme.palette.primary.headerGradient}`
            })]} >
                <Typography sx={{ fontWeight: '12px', color: 'white', fontWeight: '700' }} >All Bets</Typography>
                <Box sx={{ width: '100px', height: '90%', background: 'white', justifyContent: 'center', borderRadius: '3px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: '700', color: '#FF1111' }} >Total Bet</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: '700', color: "#0B4F26" }} >999</Typography>
                </Box>
            </Box>
            <HeaderRow tag={tag} />
            <Box sx={{maxHeight:submit?"200px":"400px",overflowY:"auto"}}>
            {
                data?.map((i, k) => {
                    return (
                        <div style={{ display: 'flex', position: 'relative' }} >
                            <Box sx={{ width: '5.3%', border: '1px solid white', background: 'black', height: '50px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                                <Typography sx={{ fontSize: !tag ? '10px' : '13px', fontWeight: tag ? 'bold' : '600', color: 'white' }}>{"0" + (k + 1)}</Typography>

                            </Box>
                            <Row index={k} values={i.values} />
                            {
                                !tag && k == 1 && <Box sx={{ background: 'rgba(0,0,0,0.5)', width: '100%', height: '50px', position: 'absolute', display: 'flex' }} >
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Box sx={{ width: '34%', height: '50px' }} >

                                        </Box>
                                        <Box sx={{ width: '66%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }} >
                                            {<Typography sx={{ fontSize: '10px', fontWeight: '700', color: 'white', textTransform: "uppercase" }}>Bet <span style={{ color: '#e41b23' }} >deleted</span> due to no ball</Typography>}

                                        </Box>
                                    </Box>
                                </Box>

                            }
                        </div >
                    )
                })
            }
            </Box>
        </Box >
    )
}
const HeaderRow = ({ tag }) => {
    return (
        <Box sx={{ width: '100%', display: 'flex' }} >
            <Box sx={{ width: '6%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>No</Typography>
            </Box>
            <Box sx={{ width: '15%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: tag ? "flex-start" : 'center', paddingLeft: tag ? '5px' : 0, alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>Username</Typography>
            </Box>
            <Box sx={{ width: '20%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: tag ? "flex-start" : 'center', paddingLeft: tag ? '5px' : 0, alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>Market</Typography>

            </Box>
            <Box sx={{ width: '15%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>Favourite</Typography>

            </Box>
            <Box sx={{ width: '10%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>Odds</Typography>

            </Box>
            <Box sx={{ width: '10%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>Type</Typography>

            </Box>
            <Box sx={{ width: '15%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>Stake</Typography>

            </Box>
            <Box sx={{ width: '15%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>My Stake</Typography>

            </Box>
            <Box sx={{ width: '15%', border: '1px solid white', background: 'rgba(0,0,0)', height: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
                <Typography sx={{ fontSize: '.8vw', fontWeight: '500', color: 'white' }}>Time</Typography>

            </Box>

        </Box>
    )
}
const SmallBox = ({ item }) => {
    return (
        <Box sx={{ width: '10%', border: '1px solid white', background: item?.background, height: '50px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
            <Typography sx={{ fontSize: '10px', fontWeight: '600', color: item?.color }}>{item?.name}</Typography>

        </Box>
    )
}
const LargeBox = ({ item, k }) => {
    return (
        <Box sx={{ width: k == 1 ? '20%' : '15%', border: '1px solid white', background: item?.background, height: '50px', justifyContent: 'center', alignItems: (k == 1 || k == 0) ? "flex-start" : 'center', paddingLeft: (k == 1 || k == 0) ? '5px' : 0, display: 'flex', flexDirection: 'column' }} >
            <Typography sx={{ fontSize: '.8vw', fontWeight: '600', color: item?.color, wordWrap: 'break-word', textAlign: 'center' }}>{item?.name}</Typography>
            {item?.time &&
                <Typography sx={{ fontSize: '10px', fontWeight: '600', color: item?.color }}>{item?.date}</Typography>

            }
        </Box>
    )
}
const Row = ({ values, index }) => {
    return (
        <Box sx={{ width: '100%', display: 'flex' }} >

            {values.map((item, k) => {
                if (!item?.small) {
                    return (
                        <LargeBox k={k} item={item} />
                    )
                }
                else {
                    return (
                        <SmallBox k={k} item={item} />
                    )
                }
            })
            }


        </Box>
    )
}
export default AllBets;