import axios, { AxiosRequestConfig } from "axios";
import { sign , verify } from 'jsonwebtoken'

export interface oauthDecoded {email:string,given_name:string,picture:string}
const jwtSign = ({email,given_name,picture}:oauthDecoded) => {

    const secret:any = process.env.JWTKEY;
    const token = sign({email,given_name,picture},secret,{expiresIn:'1h'});
    const bundle = {
        user:{email,name:given_name,picture},
        token
    };
    return bundle
    
};

const jwtDecode = async(token?:string) => new Promise( async(resolve,reject) => {

    const secret:any = process.env.JWTKEY;
    if(!token){return reject()};
    await verify(token,secret,(err:any,decode:any) => {
        if(err){return reject()}
        if(decode){return resolve(jwtSign(decode))};
    });

})

const userInfoQuery = async(token:string) => {

    try{

        const url:string = "https://www.googleapis.com/oauth2/v3/userinfo";
        const config:AxiosRequestConfig = {
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json',
                'Accept-Encoding':'application/json',
            }
        };
        return axios.get(url,config);

    }catch(err){console.log}

};

export { jwtDecode , jwtSign , userInfoQuery } ;

