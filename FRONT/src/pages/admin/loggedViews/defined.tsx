import { useContext, useEffect } from "react";
import '../../../styles/spectator/formCP.css'
import { definedwork } from "../../../misc/interfaces/bundle.interfaces";
import styles1 from '../../../styles/admin/defined.module.css'
import { authContext } from "../../../context/admin.context";
import definedForm from "../../../hooks/forms/definedForm.hook";
import { submitFetch } from "../../../hooks/fetchs.hook";
import { environment } from "../../../misc/environment";

const DefinedUploader = () => {

    const { formState:{ name , description , link } , minAndMaxAbout ,
            onChangeEvent:onChangeFileEvent ,
            onInputChange , submitMiddleware , errors } = definedForm();

            const minAndMaxAboutBoolean = () => (
                description.length <= minAndMaxAbout[0] ||
                description.length >= minAndMaxAbout[1]
            ) ? 'red' : 'green'
            
    return(
        <div className="root_component root_contacto">
            <h2 className='my-3'>Trabajos definidos</h2>

            <form onSubmit={submitMiddleware}>

                <div className="formItem">
                    <label>Nombre</label>
                    <input name='name' type="text" autoComplete="off" value={name} onChange={onInputChange}/>
                    { (errors.name) ? <small>Nombre demasiado corto</small> : <small className="smallVoid"></small>}
                </div>

                <div>
                    <input  type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={onChangeFileEvent}
                    />
                    <br />
                    { (errors.pic) ? <small style={{color:'red'}}>Es necesario una imagen para mostrar el trabajo</small> : <small className="smallVoid"></small>}
                </div>

                <div className="formItem">
                    <label>{'Link (Puede quedar vacio) : '}</label>
                    <input name='link' type="text" autoComplete="off" value={link} onChange={onInputChange}/>
                    { (errors.link) ? <small>Debe de estar vacio o ser un link válido. Si hay texto de link, debe de contener algo</small> : <small className="smallVoid"></small>}
                </div>

                <div className="formItem">
                    <label>Descripción:</label>
                    <textarea name='description' autoComplete='off' value={description} onChange={onInputChange}/>
                    <small  style={{color:minAndMaxAboutBoolean()}}
                            className="smallVoid"> <pre> {description.length} / {minAndMaxAbout[1]} </pre> </small>
                </div>

                <div className="submit"><button type='submit'> Subir entrada </button></div>

            </form>

        </div>
    )

}

const DefinedThumb = ({definedWork}:{definedWork:definedwork}) => {

    const { getFetch , authCrud:{logout} } = useContext(authContext) ;
    const { _id:id } = definedWork ;

    const confirmErase = () => {
        if( confirm(`desea borrar [${definedWork.name}}`) ){
            submitFetch({
                route:`${environment.backendURL}definedWorks`,
                method:'DELETE',
                headers:{fieldToDelete:id},
                body:undefined
            },() => logout(true))
            .then( () => getFetch() )
        }
    }

    return(
        <div className={styles1.definedThumb}>
            <div><img src={definedWork.pic} width={100} height={100}/></div>
            <div>
                <p>{definedWork.name}</p>
                <p>{definedWork.description.slice(0,50)} ... </p>
            </div>
            <button className='btn btn-danger' onClick={confirmErase}>borrar</button>
        </div>
    )

}

interface definedgridprops {definedWorks:definedwork[]}
const DefinedGrid = ({definedWorks}:definedgridprops) => {

    return(
        <div className={styles1.definedGrid}>{ definedWorks.map( (x,i) => (<DefinedThumb key={i} definedWork={x}/>) ) }</div>
    )

}

const DefinedView = () => {

    const definedWorks = useContext(authContext).fetchData.data?.definedWorks||[]

    return(
        <div className="container">
            <div className="row"><div className="col"><DefinedUploader/></div></div>
            <div className="row"><div className="col">
                <DefinedGrid definedWorks={definedWorks}/>
            </div></div>
        </div>
    )

}

export default DefinedView