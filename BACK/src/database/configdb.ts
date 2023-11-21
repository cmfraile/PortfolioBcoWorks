import { connect as MongoConnect, ConnectOptions } from "mongoose";

export const dataBaseConnection = async() => {
    try{
        const options:ConnectOptions = {
            user:process.env.USERDATABASE,
            pass:process.env.PASSDATABASE,
            dbName:process.env.DATABASENAME
        };
        await MongoConnect(`mongodb://${process.env.DATABASEIP}/${options.dbName}`,options);
    }catch(err){console.log(err);throw new Error('No se logro establecer la conexión')};
}
