import { UploadedFile } from "express-fileupload" ;
import { existsSync , unlinkSync } from 'fs' ;
import { v4 } from 'uuid' ;
import path from 'path' ;

const uploadFile = (file:UploadedFile,validExtensionFile:string[]):Promise<string> => {

    const storage = `${process.env.STORAGE}` ;

    return new Promise((rs,rj) => {
        const extension = file.name.split('.')[file.name.split('.').length - 1];
        const nameOfNewFile = `${v4()}.${extension}`;
        const uploadPath = path.join(storage,nameOfNewFile);
        if(!validExtensionFile.includes(extension)){
            rj(`La extensión [${extension}] no esta permitida`);
        };
        file.mv(uploadPath,(error) => {
            if(error){rj(error)};
            rs(nameOfNewFile);
        })
    });
}

const deleteFile = (place:string,validExtensionFile:string[]):Promise<void> => {

    const storage = `${process.env.STORAGE}` ;

    return new Promise((rs,rj) => {
        const uploadedPath:string = path.join(storage,place);
        const extension = place.split('.')[place.split('.').length - 1];
        if( existsSync(uploadedPath) && validExtensionFile.includes(extension) ){rs(unlinkSync(uploadedPath))};
    });

}

const environmentFile = (route:string) => `http://${process.env.ENVIRONMENT}:${process.env.PORT}/api/file/${route}`;

const validExtensions = ['png','jpg','jpeg'];
const modifyFileHandlersForThisBackend = {
    environmentFile,
    uploadFile:(file:UploadedFile) => uploadFile(file,validExtensions),
    deleteFile: (place:string) => deleteFile(place,validExtensions)
}

export default modifyFileHandlersForThisBackend