import styles1 from '../styles/spectator/spectatorLayout.module.css' ; const { midFragment } = styles1 ;
import styles2 from '../styles/spectator/works.module.css' ;
const { definedSection , undefinedSection , worksGroup } = styles2 ;
import CarouselOfUndefinedWorks from '../components/carouselOfUndefined';
import DefinedWork from '../components/definedWork';
import { useContext  } from 'react';
import { mainContext } from '../context/main.context'; 

const WorksPage = () => {

    const data = useContext(mainContext);
    const { definedWorks , undefinedWorks } = data ;

    return(
        <div className={`${midFragment} ${worksGroup}`} id='R3'>

            {   (definedWorks) &&
                    <div className={definedSection}>
                        {   definedWorks
                            .sort((a,b) => (a.link == b.link) ? 0 : (a.link) ? -1 : (b.link) ? 1 : 0)
                            .map((x,i) => <DefinedWork key={i} definedWork={x} borderColor={data.misc.color||'black'}/> ) }
                    </div>
            }

            {   (undefinedWorks) &&
                <div className={undefinedSection}>
                    <CarouselOfUndefinedWorks undefinedWorks={undefinedWorks} spectatorOrOwnView='spectator'/>
                </div>
            }

            {   
                (!definedWorks && !undefinedWorks || definedWorks.length == 0 && undefinedWorks.length == 0)
                && <h5>Works void</h5>
            }

        </div>
    )

}

export default WorksPage