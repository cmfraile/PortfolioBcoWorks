import { useEffect , useReducer } from "react";
import { environment } from "../misc/environment" ;import { useNavigate } from "react-router-dom";
 const url:string = environment.backendURL;

enum authTypes { login = '[AUTH] Login' , check = '[AUTH] Check' , logout = '[AUTH] Logout' };
export type userLoading = 'user'|'checkingUser'|'guest';
export interface session {userState:userLoading,user?:{email:string,name:string,picture:string},token?:string};
interface action {type:authTypes,payload?:session};
const initialState:session = {userState:'checkingUser'};

const customFetch = ({route,headers}:{route:string,headers:any}) => new Promise<any>( async(rs,rj) => {
    await fetch(route,{method:'POST',body:undefined,headers}).then( resp => resp.json() )
    .then(rs)
    .catch(rj)
});

const userHook = () => {

    const fetchCallback = async(token:string,loginOrCheck:'LOGIN'|'CHECK'):Promise<void> => {

        const route = ():string => {
            let string = `${environment.backendURL}user/`
            switch(loginOrCheck){
                case 'LOGIN' : string = string+'login' ; break ;
                case 'CHECK' : string = string+'checkToken' ; break ;
            }
            return string
        }

        try{
            const headers = { token };
            if(loginOrCheck == 'CHECK'){dispatchSession({type:authTypes.check})}
            await customFetch({route:route(),headers})
            .then( (payload:any) => { dispatchSession({type:authTypes.login,payload}) })
            .catch( () => { dispatchSession({type:authTypes.logout}) })
        }catch(err){console.log}

    }

    const AuthReducer = (state:session = initialState,action:action) => {
        
        if(!action){return state};
        
        const { type , payload } = action ; 
        const { login , check , logout } = authTypes;
        
        switch(type){
            case login  : {
                const newState = { userState:'user' , ...payload };
                localStorage.setItem('session',JSON.stringify(newState));
                return newState;
            };
            case check  : {
                return { ...state , userState:'checkingUser' };
            };
            case logout : {
                localStorage.removeItem('session');
                return { userState:'guest' };
            };
            default : return state ;
        }
        
    }

    const [ session , dispatchSession ] = useReducer<React.Reducer<any,any>>(AuthReducer,initialState);
    const nav = useNavigate()

    const authCrud = {
        loginAuth:async(token:string) => {try{await fetchCallback(token,'LOGIN')}catch(err){console.log}},
        checkAuth:async(token:string) => {try{await fetchCallback(token,'CHECK')}catch(err){console.log}},
        logout:(getOut:boolean) => { dispatchSession({type:authTypes.logout}) ; if(getOut){ nav('/') } },
    }

    const initCallback = () => {
        const caso = localStorage.getItem('session');
        if(!caso){authCrud.logout(false)}else{
            const { token , error } = JSON.parse(caso);
            if(!token || error){authCrud.logout(true)}else{authCrud.checkAuth(token)}
        }
    }

    useEffect(() => initCallback(),[]);

    return({ session , authCrud })

}

export default userHook