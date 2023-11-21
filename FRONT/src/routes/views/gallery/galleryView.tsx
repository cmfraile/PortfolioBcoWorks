import styles1 from '../../../styles/spectator/gallery.module.css'
import CarouselOfUndefinedWorks from "../../../components/carouselOfUndefined";
import { useContext, useState , useLayoutEffect , CSSProperties } from 'react';
import { mainContext } from '../../../context/main.context';

const GalleryView = () => {

    const { undefinedWorks , misc:{ backgroundIMG , backgroundColor } } = useContext(mainContext);
    const [ CSS , setCSS ] = useState<CSSProperties>({})

    useLayoutEffect(() => {
        if(backgroundIMG){ setCSS({backgroundImage:`url(${backgroundIMG})`}) }else{
            setCSS({backgroundColor:backgroundColor})
        };
    },[]);

    return (
        <div className={`${styles1.gallery} backgroundFromReset`} style={CSS}>
            <div 
                className={'flexCenterAbsolute'}
                style={{backdropFilter:'blur(10px)',minHeight:'100vh',maxHeight:'100vh'}}>
                    <CarouselOfUndefinedWorks undefinedWorks={undefinedWorks} spectatorOrOwnView='ownView'/>
                </div>
        </div>
    )

};

export default GalleryView