import { NextFunction } from "express";
import { Request , Response } from "express";
import path from 'path';
import { existsSync } from 'fs';
import { validationResult } from "express-validator";
import { verify } from "jsonwebtoken";

const validRoute = async(req:Request,res:Response,next:NextFunction) => {

    const storage:string = `${process.env.STORAGE}` ;

    const { route } = req.params;
    const pathImage = path.join(storage,route);
    if(existsSync(pathImage)){req.body.route = pathImage}else{req.body.route = undefined};
    next();

};

/*
const validMaster = async(req:Request,res:Response,next:NextFunction) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){return res.status(400).json(errors)};
    next();
    
};
*/


const checkWorkFields:{[key:string]:string[]} = {
    undefined:      [ 'pic' , 'isSFW' ].sort(),
    minDefined:     [ 'pic' , 'name' , 'description' ].sort(),
    maxDefined:     [ 'linkText' , 'link' ].sort()
};
checkWorkFields['defined'] = new Array().concat( checkWorkFields.minDefined , checkWorkFields.maxDefined ).sort();

const checkWorkPost =
    (undefinedOrDefined:string) =>
    async(req:Request,res:Response,next:NextFunction) => {

        if(!['undefined','defined'].includes(undefinedOrDefined)){ throw new Error('el tipo no esta bien implementado') };

        const queryKeys = Object.keys({...req.body,...req.files}).sort() ;

        const conditions:{[key:string]:boolean} = {
            undefined : (
                JSON.stringify( queryKeys ) == 
                JSON.stringify(checkWorkFields[undefinedOrDefined])
            ),
            defined : (
                checkWorkFields.minDefined.every( x => queryKeys.includes(x) ) &&
                queryKeys.every( x => checkWorkFields.defined.includes(x) )
            )
        };
       
        if( conditions[undefinedOrDefined] ){ return next() }else{
            return res.status(200).json({msg:`error en los campos [${undefinedOrDefined}]`})
        } ;

    }

const booleanParser =
    (whereParse:'undefined'|'misc'|'none') =>
    async(req:Request,res:Response,next:NextFunction) => {

        if(whereParse == 'misc'){ const toParse = req.body.isOpen ;
            if(toParse == 'true'){ req.body.isOpen = true } ;
            if(toParse == 'false'){ req.body.isOpen = false } ;
            return next();
        }

        if(whereParse == 'undefined'){ const toParse = req.body.isSFW ;
            if(toParse == 'true'){ req.body.isSFW = true } ;
            if(toParse == 'false'){ req.body.isSFW = false } ;
            return next();
        }

        if(whereParse == 'none'){ return next() }

        throw new Error('boolean parse esta incorrectamente implantado');

    }

const fieldToDelete =
    (criteriaArray:string[]) =>
    (req:Request,res:Response,next:NextFunction) => {
        try{
            if(
                req.header('fieldToDelete') &&
                criteriaArray.includes( req.header('fieldToDelete') as string )
            ){ next() } else { return res.status(200).json({msg:'no es un criterio de borrado correcto'}) }
        }catch(err){ res.status(500).json(err) }
    }

const checkToken = async(req:Request,res:Response,next:NextFunction) => {

    if(
        //check token
        false
    ){ return next() }
    const token = req.header('token') ;
    const secret = process.env.JWTKEY ;

    try {
        await verify(`${token}`,`${secret}`,(err:any,decoded:any) => {
            if( err ){ return res.status(403).json({validToken:false}) }
            return next();
        })
    } catch( err ){ return res.status(500).json({err}) }

}

export { validRoute , checkWorkPost , booleanParser , checkToken , fieldToDelete }
