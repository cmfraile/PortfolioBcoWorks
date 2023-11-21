import styles1 from '../styles/spectator/spectatorLayout.module.css' ; const { midFragment } = styles1 ;
import styles2 from '../styles/spectator/aboutAndPrices.module.css' ; const { aboutCentered , aboutImage , aboutText } = styles2 ;
import { useContext } from 'react';
import { mainContext } from '../context/main.context';


const AboutPage = () => {

    const { misc:{color,aboutIMG:image,about} } = useContext(mainContext) ;

    return(
        <div className={midFragment} id='R2'>
            <div className={aboutCentered}>
                { ( image ) && <img className={aboutImage} src={image}/> }
                { ( about ) &&
                    <p  className={aboutText}
                    style={{color}}
                    dangerouslySetInnerHTML={{ __html: `${about}`.replace(/\n/g, "<br>") }}></p>
                }
                { (!image && !about) && <h5>About void</h5> }
            </div>
        </div>
    )

}

export default AboutPage