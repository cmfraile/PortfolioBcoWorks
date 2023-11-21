import styles1 from '../styles/spectator/spectatorLayout.module.css' ; const { midFragment } = styles1 ;
import styles2 from '../styles/spectator/banner.module.css' ; const { bannerImage } = styles2;
import { useContext } from 'react';
import { mainContext } from '../context/main.context';

const PricesPage = () => {

    const { misc:{pricesIMG} } = useContext(mainContext);

    return(
        <div className={midFragment} id='R4'>
            { (pricesIMG)
                ?   <img src={pricesIMG} className={bannerImage}/>
                :   <h5>Prices void</h5>
            }
        </div>
    )


}

export default PricesPage