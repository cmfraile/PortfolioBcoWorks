import { Router } from "express";
import { Request , Response } from "express";
import { jwtDecode, jwtSign, userInfoQuery } from "../helpers/googleAuth";
import { userModel } from "../models/dbModels";

const loginFail = (res:Response) => res.status(403).json({error:'El token y/o el correo es incorrecto'});

interface bundle { res:Response,token?:string }
const tokenCraft = async(bundle:bundle) => {

    const { res , token } = bundle ;

    try{
        if(!token){ return loginFail(res) };
        await userInfoQuery(token)
        .then( async({data}:any) => {
            if(!data || !data.email){ return loginFail(res) }
            await userModel.find({email:data.email}).then( ([resp]:any) => {
                if(!resp){ return loginFail(res) };
                return res.status(200).json( jwtSign(data) )
            })
        })
        .catch(() => { return loginFail(res) });

    }catch(err){console.log}
    
}

const loginWithGoogle = async(req:Request,res:Response) => {
    try{
        const bundle:bundle = {res,token:req.header('token')} ;
        return await tokenCraft(bundle)
    }catch(err){return res.status(500).json({})};

};

const checkToken = async(req:Request,res:Response) => {

    const token = req.header('token');

    try{
        await jwtDecode(token)
        .then( (resp:any) => { return res.status(200).json(resp) } )
        .catch(() => { return loginFail(res) });
    }catch(err){return res.status(500).json({})}

};

const userRouter = Router();
userRouter.post('/login',[],loginWithGoogle);
userRouter.post('/checkToken',[],checkToken);

export { userRouter };

