import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRouter = ({children}) => {
    let {user} = useSelector(state => state.user)
    if (!user) {
        console.log('idi nahui usera net')
        return <Navigate to='/login' replace></Navigate>
    }
  
    return children
  };


  export default PrivateRouter;