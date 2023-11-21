import useForm from "../form.hook";
import { useEffect, useState } from "react";
import regularExpressions from "../../misc/regularExpressions";
import { EmailJSResponseStatus , init , send } from "@emailjs/browser";
import { environment } from "../../misc/environment";

const initialForm = { email:'', name:'' , subject:'' , body:'' };
const initialErrors:{ [key:string]:boolean } = { email:false , subject:false , body:false , name:false };
const contactForm = () => {

    const { service , template , publicKey } = environment.emailJS ;
    const { formState ,
            onInputChange , onResetForm } = useForm(initialForm);

    const [ errors , setErrors ] = useState<typeof initialErrors>(initialErrors) ;
    const [ isEnabled , setIsEnabled ] = useState<boolean>(true) ;

    const submitMiddleware =
    (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() ;
        const { emailRegExp } = regularExpressions ; setErrors( v => ({...initialErrors}) ) ; let errors = {...initialErrors} ;
    
        Object.keys(formState).map( x => {
            if( formState[x].trim().length <= 6 ){ errors[x] = true };
            if( x == 'body' && formState['body'].length <= 15 ){ errors[x] = true } ;
            if( x == 'email' && !emailRegExp.test(formState['email']) ){ errors[x] = true } ;
        })
    
        
        if( Object.keys(formState).filter(x => errors[x]).length > 0 ){

            setErrors({...errors})
            //No se envia

        }else{
            
            
            setIsEnabled(v => false);
            send(service,template,formState,publicKey)
            .then((res:EmailJSResponseStatus) => {
                setErrors({...initialErrors});
                alert(`Su mensaje ha sido enviado`);
                onResetForm();
                //window.scroll(0,0);
                setTimeout(() => setIsEnabled(v => true),30000);
            })
            .catch(() => { 
                alert('no se mando su mensaje. Inténtelo de nuevo mas tarde');
                setTimeout(() => setIsEnabled(v => true),30000);
            });

        }

    }

    useEffect(() => init(publicKey),[])

    return({    
                formState , onInputChange ,
                submitMiddleware ,
                errors,isEnabled
            })
                

}

export default contactForm