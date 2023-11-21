import { useEffect, useLayoutEffect, useState } from "react";

const sliderHook = () => {

    const [ menuLED , setMenuLED ] = useState<number>(0) ;
    const [
        clientDimensionYStateObject,
        setClientDimensionYStateObject
    ] = useState<{[key:string]:number}|undefined>(undefined) ;

    const setLED = (currentScrollPosition:number) => {
        setClientDimensionYStateObject((v:any) => {

            let cuts1 = Object.keys(v).filter(x => x !== 'scroll').sort().map(x => v[x]);
            cuts1 = cuts1.map((x,i,a) => (a.slice(0,i).reduce((a,b) => a+b,0)));
            const leds:boolean[] = [];
            cuts1.forEach( x => (v.scroll+10 > x) ? leds.push(true) : leds.push(false) ) ; leds.push(false) ;
            const ledPosition = leds.indexOf(false)-1;
            if( ledPosition !== menuLED 
                //&& ledPosition !== -1
            ){ setMenuLED(v => ledPosition) };

            return {...v,scroll:currentScrollPosition}

        });
    }

    const effectsBundle = (menuChilds:string[],fetchDeps?:any[]) => {

        const clientDimensionYState = (menuChildsAndScroll:string[]) => {
            let caso:{[key:string]:number} = {};
            menuChildsAndScroll.map(x => caso[x] = document.getElementById(x)?.clientHeight || 0);
            return caso;
        }

        useLayoutEffect( () => {
            setClientDimensionYStateObject(clientDimensionYState([...menuChilds,'scroll']));
            const scrollElement = document.getElementById('midCollection');
            const callback = () => {
                const scroll = scrollElement?.scrollTop||0 ; 
                setLED(scroll);
            };
            scrollElement?.addEventListener('scroll',callback);
            return () => scrollElement?.removeEventListener('scroll',callback);
        },(fetchDeps) ? [...fetchDeps] : []);

    }

    return({
        menuLED,setMenuLED,
        effectsBundle
    });

};

export default sliderHook