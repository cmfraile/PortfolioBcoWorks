import { useState } from "react"

const errorHook = (initialFormKeys:string[]) => {

    let initialFormErrors:{[key:string]:boolean} = {};
    initialFormKeys.map(x => initialFormErrors[x] = false);

    const [ errors , setErrors ] = useState<typeof initialFormErrors>(initialFormErrors) ;
    const setError = (errorLocation:string) => setErrors(v => ({...v,[errorLocation]:true})) ;
    const resetErrors = () => setErrors(v => initialFormErrors) ;

    return ({errors,setError,resetErrors})

}

export default errorHook