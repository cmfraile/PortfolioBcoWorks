import { useContext } from 'react';
import LedComponent from '../../components/LedComponent';
import styles1 from '../../styles/spectator/spectatorLayout.module.css';
import { mainContext } from '../../context/main.context';
import regularExpressions from '../../misc/regularExpressions';

const iconList:{[index: number]: string[]} = [
    ['about','works','prices','contact'],
    ['tw','ig'],
    ['credits']
]

interface topAndBottomProps { topAndBottomBackgroundColor : string }

const TopFragment = ({topAndBottomBackgroundColor}:topAndBottomProps) => {

    return(
        <div    className={`row ${styles1.topAndBottom}`}
                style={{backgroundColor:topAndBottomBackgroundColor}}>
            <div className={`col flexCenterAbsolute ${styles1.topAndBottom}`}>
            { iconList[0].map( (x,i) => (<LedComponent key={i} index={i} img={x} isTop={true}/>) )}
            </div>
        </div>
    )

}

const BottomFragment = ({topAndBottomBackgroundColor}:topAndBottomProps) => {

    const test = useContext(mainContext) ; const { urlRegExp } = regularExpressions

    const rrss:{[key:string]:string|undefined} = { tw : test.misc.tw , ig : test.misc.ig } ;

    return (
    <div className={`row ${styles1.topAndBottom}`} style={{backgroundColor:topAndBottomBackgroundColor}}>

        <div    className={`col flexCenterAbsolute ${styles1.subBottom}`}>{iconList[1]
        .filter( x => urlRegExp.test(rrss[x] as string) )
        .map( (x,i) => (<LedComponent key={i} index={i} img={x} isTop={false} onClick={() => window.open(rrss[x],'_blank')}/>) )}</div>

        <div    className={`col flexCenterAbsolute ${styles1.subBottom}`}>{iconList[2]
        .map( (x,i) => <LedComponent key={i} index={i} img={x} isTop={false} onClick={() => window.open('https://cmfg.dev/','_blank')} /> )}</div>

    </div>
    )

}


export { iconList , TopFragment , BottomFragment }