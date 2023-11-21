import FungiLink from '../assets/svg/Link';
import { definedwork } from '../misc/interfaces/bundle.interfaces';
import styles1 from '../styles/spectator/works.module.css' ; 
import { CSSProperties } from 'react';

interface definedworkprops {definedWork:definedwork,borderColor:string}
const DefinedWork = ({definedWork:{pic,name,link,description},borderColor}:definedworkprops) => {

    const setBorderColor = ():CSSProperties => ({borderColor,color:borderColor});

    const onClickCallback = () => window.open(link,'_blank')

    return(
        <div className={styles1.definedWork}>
            <div    className={`backgroundFromReset ${styles1.imgdiv} flexCenterAbsolute`} 
                    style={{backgroundImage:`url(${pic})`,...setBorderColor()}}></div>
            <div className={styles1.definedWorkContent} style={setBorderColor()}>
                <p style={setBorderColor()} className={` ${styles1.title} flexCenterAbsolute `}>
                    {name}
                </p>
                <p style={setBorderColor()} className={styles1.description}>
                    {description} 
                    { (link) && <FungiLink color={borderColor} onClick={onClickCallback}/> }
                </p>
            </div>
        </div>
    )

}

//{ (link) && <FungiLink color={borderColor} onClick={ () => window.open(link,'_blank') }/>}

export default DefinedWork