
import { Navigate } from 'react-router-dom';

export default function ProtectRoute(props) {
  // let {token}=useContext(UserContext);
 let token = localStorage.getItem("token");

  if(!token){
    return <Navigate to="/login"/>
  }

  return (
    props.children
  )
}
