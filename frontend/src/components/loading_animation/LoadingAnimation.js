import { CircularProgress } from "@mui/material"
import './LoadingAnimation.css'

function LoadingAnimation() {
    return (
        <div className="overlay fade">
            <div className="loading_container">
                <CircularProgress color="inherit" />
            </div>
        </div>
    )
}


export default LoadingAnimation
