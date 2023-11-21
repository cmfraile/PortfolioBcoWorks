//https://www.svgrepo.com/collection/dazzle-line-icons

import { useContext } from 'react';
import styles1 from '../styles/spectator/led.module.css' ;import { mainContext } from '../context/main.context';
 const { ledDiv , imgDiv , selected , hoverable , active } = styles1 ;

interface ledcomponentprops {index:number,img:string,isTop:boolean,onClick?:() => void}
const LedComponent = ({index,img,isTop,onClick}:ledcomponentprops) => {

    const { menuLED , setMenuLED } = useContext(mainContext);

    const onClickIconifSlider = () => {

        if(!isTop){ return }
        
        const routeList:string[] = ['R1','R2','R3','R4','R5'];
        window.location.href = `#${routeList[index + 1]}`;
        let uri = window.location.toString();
        if(uri.indexOf('#') > 0){window.history.replaceState({},document.title,uri.substring(0,uri.indexOf('#')))};

    }

    return(
        <div className={ledDiv} onClick={(isTop) ? onClickIconifSlider : onClick}>
            <img    
                    className={`
                        ${(menuLED == index+1 && isTop) ? `${active}` : ''}
                        ${imgDiv}
                    `}
                    src={`src/assets/topAndBottomIcons/${img}.png`}
            />
        </div>
    )

}

export default LedComponent