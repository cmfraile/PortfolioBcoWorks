//https://www.npmjs.com/package/react-responsive-carousel
import { CSSProperties , useContext, useRef, useState , useLayoutEffect } from "react";
import stylesMain from '../styles/spectator/gallerymain.module.css';
import { undefinedwork } from '../misc/interfaces/bundle.interfaces';
import { mainContext } from '../context/main.context';
import Spicy from "../assets/svg/Spicy";
import Left from "../assets/svg/Left";
import Right from "../assets/svg/Right";
import { useNavigate } from "react-router-dom";

//const styles = (mainOrGallery:mainOrGallery) => (mainOrGallery == 'main') ? stylesMain : stylesGallery ;

interface undefinedworkslargeprops {undefinedWork:undefinedwork} ;
const UndefinedWorkLarge = ({undefinedWork}:undefinedworkslargeprops) => {

    const color = useContext(mainContext).misc.color ;

    const [ style , setStyle ] = useState<CSSProperties|undefined>(undefined);
    const picDiv = useRef<HTMLDivElement>((<div/>).type);
    const img = useRef<HTMLImageElement>((<img/>).type);

    const cssDynamic = ():void => {

        const { clientHeight:picDivHeight , clientWidth:picDivWidth } = picDiv.current ;
        const { clientHeight:imgHeight , clientWidth:imgWidth } = img.current ;

        const css:CSSProperties = { maxHeight:picDivHeight , maxWidth:picDivWidth } ;

        if(imgHeight > imgWidth || imgHeight == imgWidth){css.minHeight = picDivHeight} ;
        if(imgHeight < imgWidth){css.minWidth = picDivWidth} ;

        setStyle(css);
    }

    useLayoutEffect(() => cssDynamic(),[])

    return(
        <div    
                ref={picDiv}
                className={`
                    ${stylesMain.undefinedWorkLarge} flexCenterAbsolute
                `}
                style={{
                    //backgroundImage:`url(${undefinedWork.pic})`,
                    borderColor:color
                }}
        > <img ref={img} style={style} src={undefinedWork.pic}/> </div>
    )

}

interface undefinedworkthumb {isSelected:boolean,setPosition:() => void,undefinedWork:undefinedwork}
const UndefinedWorkThumb = ({isSelected,setPosition,undefinedWork}:undefinedworkthumb) => {

    const CSS:CSSProperties = {
        border:`2px solid 
        ${  (isSelected)
            ?   'green'
            :   (undefinedWork.isSFW)
                ?   'transparent'
                :   'red'
        }`
    }

    return(
        <img    src={undefinedWork.pic} 
                className={`${stylesMain.thumb}`}
                style={CSS}
                onClick={setPosition}
        />
    )

}

interface slidebuttonprops { onClick:() => void , isForward:boolean }
const SlideButton = ({onClick,isForward}:slidebuttonprops) => {

    const color = useContext(mainContext).misc.color ;

    return(
        (!isForward) 
        ? <Left     onClick={onClick} color={color as string}/> 
        : <Right    onClick={onClick} color={color as string}/>
    )

}

interface sfwswitchprops { isSFW:boolean , changeSFW:() => void }
const SfwSwitch = ({isSFW,changeSFW}:sfwswitchprops) => {

    const onClickCallback = () => {
        if(isSFW){ if(confirm('desea cambiar la galeria a NSFW')){ changeSFW() } }else{
            changeSFW();
        }
    }

    return(
        <Spicy isSFW={isSFW} onClick={onClickCallback} />
    )

}

const LinkToGallery = () => {

    const color = useContext(mainContext).misc.color
    const nav = useNavigate() ; 
    return(<p   style={{color}}
                onClick={() => nav('gallery')}
                className={stylesMain.galleryLink}> Enlace a galeria </p>
    )

}

interface carouselProps {undefinedWorks:undefinedwork[],spectatorOrOwnView:'spectator'|'ownView'}
const CarouselOfUndefinedWorks = ({undefinedWorks,spectatorOrOwnView}:carouselProps) => {

    const [ position , setPosition ] = useState<number>(0);
    const [ isSFW , setIsSFW ] = useState<boolean>(true) ; const changeSFW = () => {setIsSFW(v => !v) ; setPosition(v => 0)} ;

    undefinedWorks = (isSFW) ? undefinedWorks
    .sort((a,b) => (a.uploadDate > b.uploadDate) ? 1 : -1)
    .sort((a,b) => (a.isSFW == b.isSFW) ? 0 : (a.isSFW) ? -1 : (b.isSFW) ? 1 : 0)
    .filter(x => x.isSFW) : undefinedWorks ;

    const { prev , next } = {
        prev: () => { if(position == 0){ setPosition(v => undefinedWorks.length - 1) } else {setPosition(v => v-1)} },
        next: () => { if(position == undefinedWorks.length - 1){ setPosition(v => 0) } else {setPosition(v => v+1)} }
    }



    return (
        (window.innerWidth < 800 && spectatorOrOwnView == 'spectator')
        
        ? <LinkToGallery/>

        : 
        
        <div className={stylesMain.gallery}>

            <UndefinedWorkLarge undefinedWork={undefinedWorks[position]}/>

            <div className={stylesMain.buttonGroup}>
                <SfwSwitch isSFW={isSFW} changeSFW={changeSFW}/>
                <SlideButton onClick={prev} isForward={false}/>
                <SlideButton onClick={next} isForward={true}/>
            </div>
            
            
            <div className={stylesMain.thumbs}>
                { undefinedWorks.map((x,i) => (<UndefinedWorkThumb  key={i} 
                                                                    undefinedWork={x}
                                                                    setPosition={() => setPosition(i)} 
                                                                    isSelected={(position == i) ? true : false}/>)) }
            </div>

        </div>

    )

}


export default CarouselOfUndefinedWorks