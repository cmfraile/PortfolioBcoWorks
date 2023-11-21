import express , { Application , Router } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import * as controllers from '../controllers';
import { dataBaseConnection } from '../database/configdb';

const controllersIndexed:{[key:string]:any} = {...controllers};

class Server {

    private app:Application;
    private port:string;

    constructor(){
        this.app    =   express();
        this.port   =   process.env.PORT || '8000';
        this.middlewares() ; this.databaseTasks() ; this.routes() ;
    }

    private middlewares(){
        this.app.use(express.json({}));
        this.app.use(cors({origin:process.env.ORIGIN}));
        this.app.use(fileUpload({useTempFiles:true,tempFileDir:'/tmp/',createParentPath:true}));
    };

    private async databaseTasks() { await dataBaseConnection() }

    private routes() {
        let pathCrafter:{[key:string]:{route:string,router:Router}} = {} ;
        const apiPointer = ['bundle','misc','user','file','undefinedWorks','definedWorks'] ;
        apiPointer.map( x => { pathCrafter[x] = { route : `/api/${x}` , router:controllersIndexed[`${x}Router`] } });
        Object.keys(pathCrafter).map( x => {
            const { route , router } = pathCrafter[x];
            this.app.use( route , router );
        }) ;
    }

    public listen(){ 
        this.app.listen(this.port) ;
        if( !process.env.ORIGIN ){ console.log('Fallo con las .env') } else { console.log('BCOWORKS BACKEND - ON') } ;
    }

}

export default Server

