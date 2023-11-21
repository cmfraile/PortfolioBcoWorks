import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { environment } from "../misc/environment";
import userHook from "../hooks/user.hook";
import { mainGetFetch } from "../hooks/fetchs.hook";
import { session } from "../hooks/user.hook";
import { getData } from "../hooks/fetchs.hook";
import { bundle } from "../misc/interfaces/bundle.interfaces";

//https://www.npmjs.com/package/@react-oauth/google

interface authcontext {
    session:session,
    authCrud:{
        loginAuth: (token: string) => Promise<void>;
        checkAuth: (token: string) => Promise<void>;
        logout: (getOut:boolean) => void;
    }
    fetchData:getData<bundle>,
    getFetch():Promise<void>
}
export const authContext = createContext({} as authcontext);
export const authProvider = ({children}:{children:React.ReactNode}) => {

    const { session , authCrud } = userHook();
    const { fetchData , getFetch } = mainGetFetch();

    return(
        <GoogleOAuthProvider clientId={environment.googleClientID}>
            <authContext.Provider 
                value={{session,authCrud,fetchData,getFetch}}
            >
                { (session.userState !== 'checkingUser') && children }
            </authContext.Provider>
        </GoogleOAuthProvider>
    );

}
