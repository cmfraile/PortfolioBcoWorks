import React, { createContext, useEffect, useLayoutEffect } from "react";
import { mainGetFetch } from "../hooks/fetchs.hook";
import sliderHook from "../hooks/slider.hook";
import { bundle } from "../misc/interfaces/bundle.interfaces";
import WeAreClosed from "../pages/weAreClosed";

interface mainContextProps extends bundle { 
    getFetch:() => void ,
    effectsBundle:(menuChilds: string[], fetchDeps?: any[] | undefined) => void 
    setMenuLED:(value:number) => void , menuLED:number
};
export const mainContext = createContext( {} as mainContextProps ) ;
export const mainProvider = ({children}:{children:React.ReactNode}) => {

    const { fetchData , getFetch } = mainGetFetch();
    const { effectsBundle , menuLED , setMenuLED } = sliderHook();

    useEffect(() => { localStorage.clear() },[])

    return(
        <mainContext.Provider value={ 
            {...fetchData.data,
            effectsBundle,menuLED,setMenuLED,
            getFetch} as mainContextProps
        }>
            <>
            {   
                (
                    fetchData.data?.misc.isOpen
                    && !fetchData.isLoading
                    && true
                )
                ? children 
                : <WeAreClosed/>
            }
            </>
        </mainContext.Provider>
    )

}