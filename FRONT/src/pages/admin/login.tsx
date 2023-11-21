import { useGoogleLogin } from '@react-oauth/google'
import styles1 from '../../styles/admin/adminLayout.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../context/admin.context';

const Login = () => {

    const { authCrud:{loginAuth} } = useContext(authContext) ;
    const navigate = useNavigate() ;
    const onSuccess = async({access_token}:{access_token:string}) => {
        loginAuth(access_token)
        .catch(() => { navigate('/') })
    };
    const login = useGoogleLogin({onSuccess});
    

    return(
        <div className={`${styles1.login} ${styles1.adminLayout}`}>
            <button className="btn btn-primary" onClick={() => {login()}}>
                <p>Logear con Gmail</p>
            </button>
        </div>
    )

}

/*
export const LoginPage = ():JSX.Element => {

    const { loginAuth } = useContext(authContext).authCrud;
    const navigate = useNavigate();
    
    const onSuccess = async({access_token}:{access_token:string}) => {
        loginAuth(access_token)
        .catch(() => { navigate('/') })
    };
    const login = useGoogleLogin({onSuccess});

    return(
        <div className="root_loginpage">
            <div className="googleLogin" onClick={() => {login()}}>
                <i className="fab fa-google"></i>
                <p>Logear con Gmail</p>
            </div>
        </div>
    )
}
*/

export default Login