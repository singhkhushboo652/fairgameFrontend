import { Box } from "@mui/material";
import Back from '../admin/assets/back.png'
export default function Background({ children }) {
    return (
        <Box sx={{ minHeight: "100vh", paddingBottom: '2%', width: "100%", backgroundImage: `url(${Back})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
            {children}
        </Box>
    )
}