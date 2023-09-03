import { CircularProgress } from "@mui/material"
import './LoadingAnimation.css'


function SpeedLoadingAnimation() {
    return (
        <div className="loading_container">
            <CircularProgress color="inherit" />
        </div>
    )
}

export default SpeedLoadingAnimation 