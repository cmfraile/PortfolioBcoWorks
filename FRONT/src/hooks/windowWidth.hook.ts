import { useState , useEffect } from "react";

const windowWidthHook = (windowInnerWidth:number) => {

    const widthValue:number = 800 ;
    const callback = 
    (init:boolean):boolean|void => {
        let initValue:boolean|undefined = undefined ;
        if( windowInnerWidth >= widthValue && !showSpectatorGallery ){ setShowSpectatorGallery(true) ; initValue = true }
        if( windowInnerWidth < widthValue && showSpectatorGallery ){ setShowSpectatorGallery(false) ; initValue = false }
        if(init){return initValue};
    };
    const [ showSpectatorGallery , setShowSpectatorGallery ] = useState<boolean>(callback(true) as boolean) ;

    useEffect(() => {
        window.addEventListener('resize',() => callback(false));
        return () => window.removeEventListener('resize',() => callback(false));
    },[]);

    return showSpectatorGallery

}

export default windowWidthHook