import { authContext } from "../../context/admin.context";
import { environment } from "../../misc/environment";
import regularExpressions from "../../misc/regularExpressions";
import { submitFetch } from "../fetchs.hook";
import { definedFileHook } from "../file.hook";
import useForm from "../form.hook";
import { useContext, useState } from "react";

const initialDefinedForm = { pic:{} , name:'' , description:'' , link:'' }
const initialDefinedFormErrors:{ [key:string]:boolean } = { pic:false , name:false , description:false , link:false }

const definedForm = () => {

    const { pic , ...rest } = initialDefinedForm ;
    const { formState , onInputChange , onResetForm } = useForm(rest);
    const { getFetch , authCrud:{logout} } = useContext(authContext);

    const minAndMaxAbout:[number,number] = [15,700];

    const { file , onChangeEvent , resetValue } = definedFileHook() ;

    const [ errors , setErrors ] = useState<typeof initialDefinedFormErrors>(initialDefinedFormErrors) ;
    const setError = (x:string) => setErrors(v => ({...v,[x]:true})) ; const resetErrors = () => setErrors(v => initialDefinedFormErrors) ;

    const fullReset = () => { onResetForm() ; resetErrors() ; getFetch() } ;

    const submitMiddleware =
    (e:React.FormEvent<HTMLFormElement>) => {
        
        const { urlRegExp } = regularExpressions ;
        e.preventDefault() ; resetErrors() ;

        const formToUpload = new FormData() ;

        const definedItem:any = { pic:file , ...formState };
        Object.keys(definedItem).map( (x) => {
            if(x == 'pic'){ const item:File|null = file ;
                if(item !== null){ formToUpload.append(x,item) } else { setError(x) } 
            };
            if( ['name','description'].includes(x) ){ const item:string = definedItem[x].trim() ;
                if(x == 'name'){ if(item.length >= 6){ formToUpload.append(x,item)} else { setError(x) } } ;
                if(x == 'description'){ if(item.length >= minAndMaxAbout[0] && item.length <= minAndMaxAbout[1]){ formToUpload.append(x,item) } else { setError(x) } } ;
            }
            if(x == 'link'){ 
                const item:string = definedItem[x].trim() ; let success = false ; 
                if( urlRegExp.test(item) ){ formToUpload.append(x,item) ; success = true }
                if( item == '' ){ success = true };
                if(!success){ setError(x) }
            }
        });

        const pass = [ ...Object.keys(errors).filter(x => errors[x]) ];
        if(pass.length == 0){
            submitFetch({
                route:`${environment.backendURL}definedWorks`,
                method:'POST',
                body:formToUpload
            },() => logout(true))
            .then(fullReset)
        }
        onResetForm() ;
    }

    return({
        formState , onInputChange , minAndMaxAbout ,
        file , onChangeEvent ,
        submitMiddleware ,
        errors
    })

}

export default definedForm