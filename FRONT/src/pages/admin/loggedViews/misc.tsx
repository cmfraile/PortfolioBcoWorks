import '../../../styles/spectator/formCP.css'
import styles1 from '../../../styles/admin/miscForm.module.css';
import UploaderInForm from '../../../components/uploaderInForm';
import miscForm, { miscFormInitial } from '../../../hooks/forms/miscForm.hook';
import { memo, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { authContext } from '../../../context/admin.context';

interface isopenprops { isOpen:boolean , setIsOpen:() => void }
const IsOpenSwitch = memo( ({isOpen,setIsOpen}:isopenprops) => {

    return(
        <button type='button'
                onClick={setIsOpen}
                className={ `${styles1.isOpenSwitch} btn
                            btn-${(isOpen) ? 'primary' : 'danger'}`}>
                {`${(isOpen) ? 'WEB ABIERTA' : 'WEB CERRADA'}`}
        </button>
    )

},)

const MiscView = () => {

    //const fetchedform = useContext(authContext).fetchData.data?.misc||{} as misc ;

    const { getFetch , authCrud:{ logout } , fetchData:{ data } } = useContext(authContext);

    const {
        form:{ formState , setFormState , onInputChange , submitMiddleware },
        open:{ isOpen , setIsOpen },
        errors , minAndMaxAbout ,
        miscImagesFromQuery , setMiscImagesFromQuery ,
        onChangesPics:{ onChangeAbout , onChangePrices , onChangeBackground , onChangeBanner } ,
        deleteIMGCallback,
    } = miscForm(logout,getFetch);

    const minAndMaxAboutBoolean = () => (
        formState.about.length <= minAndMaxAbout[0] ||
        formState.about.length >= minAndMaxAbout[1]
    ) ? 'red' : 'green'

    const colorOnChange = 
    (formDirection:'color'|'topAndBottomBackgroundColor') =>
    (e:React.ChangeEvent<HTMLInputElement>) => { onInputChange({target:{name:formDirection,value:e.target.value}}) };

    useLayoutEffect(() => {

        if(!data?.misc){ return }
        const bundle = data.misc as any ;

        setIsOpen(v => bundle.isOpen||false) ;
        
        Object.keys(miscFormInitial).forEach( (x:string) => {
            const value = bundle[x] ;
            if( value ){ onInputChange({target:{name:x,value}}) } ;
        });

        const { isOpen , backgroundIMG , bannerIMG , aboutIMG ,pricesIMG , ...rest } = bundle ;
        setFormState({...miscFormInitial,...rest});

        Object.keys(bundle)
        .filter(x => new RegExp('IMG').test(x))
        .forEach(x => { if(bundle[x]){ setMiscImagesFromQuery(v => ({...v,[x]:bundle[x]})) } });

    },[data?.misc,getFetch])

    return(
        (data?.misc) ?
        <div className="root_component root_contacto py-3">

            <form onSubmit={submitMiddleware}>

            <h2 className='my-3'>Miscelaneo</h2>

                <IsOpenSwitch isOpen={isOpen} setIsOpen={() => setIsOpen(v => !v)}/>

                    <div className={styles1.color}>
                        <label>color de texto</label>
                        <input  type="color"
                                value={formState.color}
                                onChange={colorOnChange('color')}
                                name='color'/>
                    </div>

                    <div className={styles1.color}>
                        <label>color de franjas</label>
                        <input  type="color"
                                value={formState.topAndBottomBackgroundColor}
                                onChange={colorOnChange('topAndBottomBackgroundColor')} 
                                name='topAndBottomBackgroundColor'/>
                    </div>

                <div className={`my-3`}>

                    <h3>Enlaces y presentación</h3>
                    
                    <div className="formItem">
                        <label>{'Enlace a twitter :'}</label>
                        <input name='tw' type="text" autoComplete="off" value={formState.tw} onChange={onInputChange}/>
                        {(errors.tw) ? <small>El enlace debe de estar vacio o ser un enlace válido</small> : <small className="smallVoid"></small>}
                    </div>

                    <div className="formItem">
                        <label>{'Enlace a instagram :'}</label>
                        <input name='ig' type="text" autoComplete="off" value={formState.ig} onChange={onInputChange}/>
                        {(errors.ig) ? <small>El enlace debe de estar vacio o ser un enlace válido</small> : <small className="smallVoid"></small>}
                    </div>

                    <div className="formItem">
                        <label>Sobre Mi:</label>
                        <textarea name='about' autoComplete='off' value={formState.about} onChange={onInputChange}/>
                        <small  style={{color:minAndMaxAboutBoolean()}}
                                className="smallVoid"> <pre> {formState.about.length} / {minAndMaxAbout[1]} </pre> </small>
                    </div>

                </div>

                <div className={`my-3`} >
                    <h3>Imágenes miscelaneas</h3>

                    <div className={styles1.uploader}>
                        <p>Imagen de presentacion</p>
                        <img src={miscImagesFromQuery.bannerIMG} width={70}/>
                        <UploaderInForm onChangeEvent={onChangeBanner}/>
                        <button type='button' className='btn btn-danger' onClick={() => deleteIMGCallback('banner')}>Borrar</button>
                    </div>

                    <div className={styles1.uploader}>
                        <p>Imagen del "sobre mi":</p>
                        <img src={miscImagesFromQuery.aboutIMG} width={70}/>
                        <UploaderInForm onChangeEvent={onChangeAbout}/>
                        <button type='button' className='btn btn-danger' onClick={() => deleteIMGCallback('about')}>Borrar</button>
                    </div>

                    <div className={styles1.uploader}>
                        <p>Imagen del 'precios':</p>
                        <img src={miscImagesFromQuery.pricesIMG} width={70}/>
                        <UploaderInForm onChangeEvent={onChangePrices}/>
                        <button type='button' className='btn btn-danger' onClick={() => deleteIMGCallback('prices')}>Borrar</button>
                    </div>

                    <div className={styles1.uploader}>
                        <p>Fondo de app</p>
                        <img src={miscImagesFromQuery.backgroundIMG} width={70}/>
                        <UploaderInForm onChangeEvent={onChangeBackground}/>
                        <button type='button' className='btn btn-danger' onClick={() => deleteIMGCallback('background')}>Borrar</button>
                    </div>



                </div>

                <button className='btn btn-primary' type='submit'>Guardar cambios</button>

                </form>

        </div>
        : <></>
    )

}

export default MiscView