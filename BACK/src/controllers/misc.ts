import { NextFunction, Router } from "express";
import { Request , Response } from "express";
import { miscModel , userModel } from "../models/dbModels";
import movefiles from '../helpers/movefiles';

import { booleanParser, checkToken, fieldToDelete } from "../middlewares/validators";
import fileUpload, { UploadedFile } from "express-fileupload";
const { uploadFile , deleteFile } = movefiles ;

export const filesPaths = ['bannerIMG','aboutIMG','backgroundIMG','pricesIMG'];
const miscRouter = Router();

interface overwritebody { routeOfFile:string , body : {[key:string]:any} , files : {[key:string]:any}|null|undefined , res : Response }
const overWriteBody = 
    ({routeOfFile,body,files,res}:overwritebody) =>
    new Promise<[string,string|undefined]>( async(rs,rj) => {

        const oldFile:string|undefined = (body.miscRaw) 
            ? (body.miscRaw[routeOfFile]) ? body.miscRaw[routeOfFile] : undefined
            : undefined
        const newFile = (files) 
            ?   (files[routeOfFile]) ? files[routeOfFile] as UploadedFile : undefined
            :   undefined ;

        try{
            if(newFile){
                if(oldFile){ deleteFile(oldFile) }
                await uploadFile(newFile).then( routeOfTheNewFile => { return rs([routeOfFile,routeOfTheNewFile]) });
            }else{ return rs([routeOfFile,undefined]) }
        }catch(err){return res.status(500).json({where:'putMisc',err})} ;
            
    });

miscRouter.put('/',[
    checkToken,
    booleanParser('misc'),
    (req:Request,res:Response,next:NextFunction) => {
        ['tw','ig','topAndBottomBackgroundColor','color'].map( x => { if(req.body[x] == ''){req.body[x] = undefined} } );
        return next();
    },
],async(req:Request,res:Response) => {

    try {

        let miscRaw:any = undefined ;
        await miscModel.find().limit(1).then( ([resp]) => { miscRaw = resp } ) ;
        let body:{[key:string]:any} = {miscRaw,body:req.body} ;
        const arrayOfPromises:Promise<[string,string|undefined]>[] = 
            filesPaths.map( x => overWriteBody({routeOfFile:x,body:body,files:req.files,res}) ) ;

        await Promise.all(arrayOfPromises).then( resp => resp.map( x => {

            const { direction , newFile , oldFile } = { 
                direction:x[0] , newFile:x[1] , 
                oldFile:(miscRaw) ? (miscRaw[x[0]]) ? miscRaw[x[0]] : undefined : undefined 
            } ;

            if( newFile ){ body.body[direction] = newFile } else {
                if( oldFile ){ body.body[direction] = oldFile }
            }

        }));

        const newDocument = new miscModel(body.body);

        await miscModel.deleteMany({}).then( async() => {
            await newDocument.save().then(() => {
                return res.status(200).json({});
            })
        });

    } catch(err) { console.log(err) ; return res.status(500).json(err) }

});

miscRouter.delete('/',[
    checkToken,
    fieldToDelete(filesPaths)
],async(req:Request,res:Response) => {
    try {
        const field = req.header('fieldToDelete') as string ;
        await miscModel.find().limit(1).then( async([resp]:any) => {
            if(resp[field]){
                await miscModel.findByIdAndUpdate(resp._id,{$unset:{[field]:1}}).then(() => {deleteFile(resp[field])})
            }
        });
        return res.status(200).json({})
    } catch(err){ return res.status(500).json(err) }
    
})



export { miscRouter };