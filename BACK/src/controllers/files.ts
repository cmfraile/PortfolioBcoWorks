import { Router } from 'express';
import { param } from 'express-validator';
import { validRoute } from '../middlewares/validators';
import { Response , Request } from "express";

const fileRouter = Router();

const serveFile = async(req:Request,res:Response) => {
    try{
        const routeFile = req.body.route;
        if(!routeFile){ return res.status(500).send() }else{ return res.sendFile(routeFile) }
    }catch(err){return res.status(500).json(err)}
}

fileRouter.get('/:route',[

    param('route').not().isEmpty(),
    validRoute
    
],serveFile);

export { fileRouter }

