import { useContext, useEffect, useState } from "react"
import { ChangeEvent } from "react"
import { random } from "underscore";
import { submitFetch } from "./fetchs.hook";
import { authContext } from "../context/admin.context";
import { environment } from "../misc/environment";


const fileHookDependency = () => {
    const [ file , setFile ] = useState<File|null>(null);
    const resetValue = (e:ChangeEvent<HTMLInputElement>) => { e.target.value = '' ; setFile(null) };
    return{ file , setFile , resetValue }
};

const undefinedFileHook = () => {

    const { file ,setFile , resetValue } = fileHookDependency();
    const { getFetch , authCrud:{logout} } = useContext(authContext)

    const onChangeEvent = (e:ChangeEvent<HTMLInputElement>) => {

        e.preventDefault() ;

        if(e.target.files !== null && e.target.files[0] !== null){
            const file = e.target.files[0] as any

            if( confirm(`Desea subir la imagen ${file.name}`) && file ){
                setFile(file);
                const isSFW = confirm('Confirma si la imagen es SFW, cancela si no lo es');
                const body = new FormData() ; body.append('pic',file) ; body.append('isSFW',`${isSFW}`);
                submitFetch({
                    route:`${environment.backendURL}undefinedWorks`,
                    method:'POST',body
                },() => logout(true))
                .then(getFetch)
                resetValue(e);
            } else { resetValue(e) ; return } ; 
        }

    }

    return { onChangeEvent }

}

const definedFileHook = () => {

    const { file , setFile , resetValue } = fileHookDependency();

    const onChangeEvent = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null && e.target.files[0] !== null){
            if(file){ resetValue(e) }
            e.preventDefault();
            const newFile = e.target.files[0] ?? undefined ; if(newFile){ setFile(newFile) };
        }
    }
    
    return { file , onChangeEvent , resetValue }

}

export { undefinedFileHook , definedFileHook }