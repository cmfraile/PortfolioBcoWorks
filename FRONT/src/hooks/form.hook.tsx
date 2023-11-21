import { useState } from "react";
//import { EmailJSResponseStatus , init , send } from "@emailjs/browser";

const useForm = (initialForm?:{[key:string]:string},regexp?:RegExp) => {

    const [ formState , setFormState ] = useState(initialForm||{});

    const onInputChange = ( {target}:{target:{name:string,value:string}} ) => {
        const { name , value } = target ;
        const setFormStateCallback = () => setFormState({...formState,[ name ]:value});
        setFormStateCallback();
        
    }

    const onResetForm = () => {setFormState(initialForm||{})};
    
    return({ formState , onInputChange , onResetForm , setFormState });

}

export default useForm