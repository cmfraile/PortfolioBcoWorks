import { CSSProperties, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { mainContext } from '../../context/main.context';
import styles1 from '../../styles/spectator/spectatorLayout.module.css' ;
const { spectatorContainer , midCollection } = styles1 ;

import { TopFragment , BottomFragment } from './TopAndBottomFragments';

const SpectatorLayout = ({children}:{children:React.ReactNode}) => {

    const { misc:{ backgroundIMG , topAndBottomBackgroundColor , backgroundColor } , effectsBundle } = useContext(mainContext) ;
    const [ CSS , setCSS ] = useState<CSSProperties>({})

    useLayoutEffect(() => {
        if(backgroundIMG){ setCSS({backgroundImage:`url(${backgroundIMG})`}) }else{
            setCSS({backgroundColor:backgroundColor})
        };
    },[]);

    effectsBundle(['R1','R2','R3','R4','R5']);

    return(
        <div className="backgroundFromReset" style={CSS}>
            <div className={`container ${spectatorContainer}`}>
                <TopFragment topAndBottomBackgroundColor={topAndBottomBackgroundColor as string}/>
                    <div id='midCollection' className={`row ${midCollection}`}><div className="col">{children}</div></div>
                <BottomFragment topAndBottomBackgroundColor={topAndBottomBackgroundColor as string}/>
            </div>
        </div>
    )

}

export default SpectatorLayout