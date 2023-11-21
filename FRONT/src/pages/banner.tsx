import styles1 from '../styles/spectator/spectatorLayout.module.css' ; const { midFragment } = styles1 ;
import styles2 from '../styles/spectator/banner.module.css' ; const { bannerImage } = styles2 ;
import { useContext } from 'react';
import { mainContext as spectatorContext } from '../context/main.context';

const BannerPage = () => {

    const { misc:{bannerIMG:banner} } = useContext(spectatorContext) ;

    return(
        (banner)
        ?
        
            <div className={midFragment} id='R1'>
                <img src={banner} className={bannerImage}/>
            </div>
        
        : 
            <div className={midFragment} id='R1'> <h5>Banner void</h5> </div>
    )


}

export default BannerPage