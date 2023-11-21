import { Router } from "express";
import { Request , Response } from "express";
import { miscModel , undefinedWorkModel , definedWorkModel } from "../models/dbModels";
import { bundle } from "../interfaces/general";

import modifyFileHandlersForThisBackend from "../helpers/movefiles";
import { filesPaths } from "./misc";
const { environmentFile:environment } = modifyFileHandlersForThisBackend ;

const bundleRouter = Router();

const putTheEnviromentInPicFields = (bundle:bundle):bundle => {

    bundle.definedWorks = bundle.definedWorks.map( ({_doc}:any) => ({..._doc,pic:environment(_doc.pic)}) );
    bundle.undefinedWorks = bundle.undefinedWorks.map( ({_doc}:any) => ({..._doc,pic:environment(_doc.pic)}) );

    if(bundle.misc){
        filesPaths
        .map( x => { if(bundle.misc[x]){ bundle.misc[x] = environment(bundle.misc[x]) } } );
    }

    return bundle

}

bundleRouter.get('/',[],async(req:Request,res:Response) => {

    let bundle:bundle = {misc:{},undefinedWorks:[],definedWorks:[]};

    try {

        await miscModel.find().limit(1).then( ([resp]) => { if(resp){ bundle.misc = resp } } );
        await undefinedWorkModel.find().sort({uploadDate:1}).then( resp => { bundle.undefinedWorks = resp } );
        await definedWorkModel.find().sort({uploadDate:1}).then( resp => { bundle.definedWorks = resp } );

        bundle = putTheEnviromentInPicFields(bundle);

        return res.status(200).json({...bundle});

    } catch (err) { console.log(err) ; return res.status(500).json(err) }

})

export { bundleRouter }