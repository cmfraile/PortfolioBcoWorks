import { useContext } from "react"
import { authContext } from "../../context/admin.context"
import { session } from "../../hooks/user.hook";
import Login from "./login";
import Logged from "./logged";

const NotAllowInMobile = () => 
    <div    style={{backgroundColor:'lightblue' , minWidth:'100vw' , minHeight:'100vh' }} 
            className='flexCenterAbsolute'> 
                <p style={{fontWeight:'700', color:'red'}}>Vista de administración no compatible con móviles!</p>
            </div>

const MainAdmin = () => {

    const { session:sessionToType } = useContext(authContext) ; const session:session = sessionToType ;

    return (
        (window.innerWidth > 800) 
        ?
        <div style={{backgroundColor:'lightblue'}}>
            { (session.userState == 'checkingUser') && <></> }
            { (session.userState == 'user') && <Logged/> }
            { (session.userState == 'guest') && <Login/> }
        </div>
        : <NotAllowInMobile/>
    )

}

export default MainAdmin