import { TextField, Typography, useTheme, useMediaQuery, createStyles, withStyles } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";

const Input = ({ props, title, value, containerStyle, placeholder, imgstyle, titleStyle, inputStyle, inputContainerStyle, img, inputProps, setDetail, Detail, setError, error, place, type, typeOfRead, autoMaticFillValue }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('tablet'));
    const [showPass, setShowPass] = useState(true)

    return (
        <Box sx={[{}, containerStyle]}>
            <Typography variant="inputHeader" sx={[{ marginLeft: "10px", fontSize: { laptop: "10px", mobile: "12px" }, fontWeight: '500' }, titleStyle]}>{title}</Typography>
            <Box sx={[{ backgroundColor: "white", display: "flex", alignItems: "center", height: { laptop: "45px", mobile: "50px" }, overflow: "hidden", paddingX: "10px", marginTop: "1px", borderRadius: "10px" }, inputContainerStyle]}>
                {autoMaticFillValue ? <TextField variant="standard"
                    placeholder={placeholder}
                    value={autoMaticFillValue ? autoMaticFillValue : value}
                    InputProps={{
                        disableUnderline: true,
                        justifyContent: 'center',
                        ...inputProps,
                        type: showPass && String(title).toLowerCase().includes("password") ? "password" : (type === "Number") ? "number" : "text",
                        sx: [{ fontSize: { laptop: '12px', mobile: '14px' } }, inputStyle],
                    }}
                    sx={{ borderColor: "white", display: "flex", flex: 1, fontSize: { laptop: "1px", mobile: "5px" } }}
                    onChange={(e) => {
                        console.log(autoMaticFillValue)
                        String(title).toLowerCase().includes("password") ? setDetail({
                            ...Detail, [place]: {
                                ...Detail[place],
                                val: autoMaticFillValue
                            }
                        }) : setDetail({
                            ...Detail, [place]: {
                                ...Detail[place],
                                val: type === "Number" ? parseInt(autoMaticFillValue) : autoMaticFillValue
                            }
                        });
                        console.log(autoMaticFillValue)
                        setError({
                            ...error, [place]: {
                                ...Detail[place],
                                val: type === "Number" ? Detail[place].val === 0 : Detail[place].val === ""
                            }
                        })
                        console.log(error)
                    }}
                    disabled
                /> : <TextField variant="standard"
                    placeholder={placeholder}
                    value={value}
                    InputProps={{
                        disableUnderline: true,
                        justifyContent: 'center',
                        ...inputProps,
                        type: showPass && String(title).toLowerCase().includes("password") ? "password" : (type === "Number") ? "number" : "text",
                        sx: [{ fontSize: { laptop: '12px', mobile: '14px' } }, inputStyle],
                    }}
                    sx={{ borderColor: "white", display: "flex", flex: 1, fontSize: { laptop: "1px", mobile: "5px" } }}
                    onChange={(e) => {
                        String(title).toLowerCase().includes("password") ? setDetail({
                            ...Detail, [place]: {
                                ...Detail[place],
                                val: e.target.value
                            }
                        }) : setDetail({
                            ...Detail, [place]: {
                                ...Detail[place],
                                val: type === "Number" ? parseInt(e.target.value) : e.target.value
                            }
                        });
                        console.log(Detail)
                        setError({
                            ...error, [place]: {
                                ...Detail[place],
                                val: type === "Number" ? Detail[place].val === 0 : Detail[place].val === ""
                            }
                        })
                        console.log(error)
                    }}
                />}
                {img && <img src={img} onClick={() => {
                    setShowPass(!showPass)
                }} alt="side input" style={{ height: matches ? "0.5em" : "0.6rem", width: "auto", marginRight: ".5em", ...imgstyle }} />}
            </Box>
        </Box>
    )
}

export default Input