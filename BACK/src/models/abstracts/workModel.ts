import { NextFunction, Router } from "express";
import { Request , Response } from "express";
import { UploadedFile } from "express-fileupload";
import { booleanParser, checkToken, checkWorkPost } from "../../middlewares/validators";
import { Model } from "mongoose";

import movefiles from '../../helpers/movefiles';
const { uploadFile , deleteFile } = movefiles;

class WorkCrud<modelInterface> {

    private model:Model<modelInterface,{},{},{},any>;
    private modelName:string ;
    public router:Router ;

    constructor(
        model:Model<any>
    ){

        this.model = model ;
        this.router = Router() ;
        this.modelName = this.model.modelName.replace('Work','');
        
        this.router.post('/',[
            checkToken,
            checkWorkPost( this.modelName ) ,
            (this.modelName == 'undefined') ? booleanParser('undefined') : booleanParser('none'),
        ],async(req:Request,res:Response) => {
        
            try{
                let newDocument = new this.model({...req.body,uploadDate:new Date()}) ; const pic = req.files?.pic as UploadedFile ;
                await uploadFile(pic).then( routeOfTheNewFile => { newDocument.pic = routeOfTheNewFile } );
                new this.model(newDocument).save()
                .then( (resp:any) => { return res.status(200).json(resp) });
            }catch(err){ return res.status(500).json(err) }
        
        });
        
        this.router.delete('/',[
            checkToken,
            (req:Request,res:Response,next:NextFunction) => {
                const idToDelete = req.header('fieldToDelete');
                if(idToDelete){next()}else{
                    return res.status(200).json({msg:'no se ha aportado una ID valida'})
                }
            }
        ],async(req:Request,res:Response) => {
        
            try{
                await this.model.findById({_id:req.header('fieldToDelete')})
                .then( async(resp) => {
                    if(!resp){ return res.status(200).json({msg:'el elemento ya ha sido borrado'}) } ;
                    await deleteFile(resp.pic).then( async() => {
                        await this.model.findByIdAndDelete(resp._id)
                        .then(() => res.status(200).json({}) )
                    } )
                })
                .catch( () => res.status(200).json({msg:'el elemento ya ha sido borrado'}) )
        
        
            }catch(err){ return res.status(500).json(err) }
        
        });

    }

}

export default WorkCrud