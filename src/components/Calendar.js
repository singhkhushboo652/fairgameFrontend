import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment'
import { CalendarImage } from "../admin/assets";
const Calendar = ({ title, containerStyle, DatePickerProps, pickerStyles }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    return (
        <Box sx={[{
            zIndex: 100, width: '19%',
            position: 'relative',
            height: "35px",
        }, containerStyle]} onClick={() => {
            setOpen(!open)
        }}>
            <Typography sx={{ fontSize: '12px', fontWeight: '600', marginBottom: '.3vh' }}>{title}</Typography>
            <Box sx={[{ position: 'absolute', height: "35px", }, pickerStyles]}>
                <DatePicker open={open} selected={startDate} onChange={(date) => {
                    setOpen(false)
                    setStartDate(date)
                }} {...DatePickerProps}
                    customInput={<Box sx={[{ width: "10vw" }]}></Box>}
                />
            </Box>
            <Box onClick={() => {
                setOpen(!open)
            }} sx={[{ width: '100%', height: '37px', justifyContent: "space-between", alignItems: 'center', display: 'flex', background: 'white', borderRadius: '3px', border: '2px solid #DEDEDE', paddingX: '7px', position: 'absolute' }, pickerStyles]}>
                <Typography sx={{ fontSize: '11px', fontWeight: '500' }}>{moment(startDate).format('YYYY-MM-DD')}</Typography>
                <img src={CalendarImage} style={{ width: '12px', height: '13px' }} />
            </Box>
        </Box>
    );
};
export default Calendar;