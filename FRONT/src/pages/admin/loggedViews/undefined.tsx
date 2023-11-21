import styles1 from '../../../styles/admin/undefined.module.css';
import { undefinedwork } from '../../../misc/interfaces/bundle.interfaces';
import { useContext , useState } from 'react';
import { undefinedFileHook } from '../../../hooks/file.hook';
import UploaderInForm from '../../../components/uploaderInForm';
import { authContext } from '../../../context/admin.context';
import { submitFetch } from '../../../hooks/fetchs.hook';
import { environment } from '../../../misc/environment';
import MainAdmin from '../main';
import { useNavigate } from 'react-router-dom';

interface undefinedgridprops {undefinedWorks:undefinedwork[]}

const UndefinedUploader = () => {

    const { onChangeEvent } = undefinedFileHook() ;
    return <UploaderInForm onChangeEvent={onChangeEvent}/>

}

const UndefinedItem = ({undefinedWork}:{undefinedWork:undefinedwork}) => {

    const { _id:id , pic , isSFW , uploadDate } = undefinedWork ;
    const [ mouseIsIn , setMouseIsIn ] = useState<boolean>(false);
    const { getFetch , authCrud:{logout} } = useContext(authContext);

    const confirmErase = () => {
        if( confirm('desea borrar la foto?') ){
            submitFetch({
                route:`${environment.backendURL}undefinedWorks`,
                method:'DELETE',
                headers:{fieldToDelete:id},
                body:undefined
            },() => logout(true))
            .then(() => getFetch())
        }
    }

    return(
        <div
            className={`backgroundFromReset ${styles1.undefinedItem}`}
            style={{
                borderColor:(isSFW) ? 'blue' : 'red',
                backgroundImage:`url(${pic})`    
            }}
            onMouseEnter={() => setMouseIsIn(true)}
            onMouseLeave={() => setMouseIsIn(false)}
            onClick={confirmErase}
        >{(mouseIsIn) && <p className={styles1.undefinedEraseAdvice}>BORRAR</p>}</div>
    )
    
}

const UndefinedGrid = ({undefinedWorks}:undefinedgridprops) => {


    return(
        <div className={styles1.undefinedGrid}>
        {   
            undefinedWorks
            .sort( (a,b) => {
                const dateA = a.uploadDate.getDate ; const dateB = b.uploadDate.getDate;
                if(dateA > dateB){ return 1 } ; if(dateB > dateA){ return -1 } ; return 0 ;
            })
            .sort( (a,b) => {
                if(a.isSFW && !b.isSFW){return -1} ; if(b.isSFW && !a.isSFW){return 1} ; return 0 ;
            })
            .map( (x,i) => (<UndefinedItem key={i} undefinedWork={x} />))
        }
        </div>
    )

}

const UndefinedView = () => {

    const undefinedWorks = useContext(authContext).fetchData.data?.undefinedWorks||[];

    return(
        <div className="container">
            <h2 className='my-3'>Trabajos Indefinidos</h2>
            <div className="row"><div className="col"><UndefinedUploader/></div></div>
            <div className="row"><div className="col">
                <UndefinedGrid undefinedWorks={undefinedWorks}/>
            </div></div>
        </div>
    )

}

export default UndefinedView