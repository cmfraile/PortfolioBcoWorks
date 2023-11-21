import styles1 from '../styles/spectator/spectatorLayout.module.css' ; const { midFragment } = styles1 ;
import '../styles/spectator/formCP.css'
import contactForm from '../hooks/forms/contactForm.hook';
import { useContext , useLayoutEffect } from 'react';
import { mainContext } from '../context/main.context';

const RootContacto = () => {

    const { formState : {email,name,subject,body} , onInputChange , submitMiddleware , errors , isEnabled } = contactForm() ;
    const { misc:{color} } = useContext(mainContext) ;

    useLayoutEffect(() => {
        const formBot = document.getElementById('formBot') as HTMLElement ;
        [
            ...formBot.querySelectorAll('label'),
            ...formBot.querySelectorAll('input'),
            ...formBot.querySelectorAll('textarea'),
            ...formBot.querySelectorAll('button')
        ].map(x => { x.style.color = color||'black' ; x.style.borderColor = color||'black' });
    },[])

    return(
        <div className="root_component root_contacto" id='R5'>

            <form id='formBot' onSubmit={submitMiddleware}>

                <div className="formItem">
                    <label>Nombre :</label>
                    <input name='name' type="text" autoComplete="off" value={name} onChange={onInputChange}/>
                    { (errors.name) ? <small>Nombre demasiado corto</small> : <small className="smallVoid"></small>}
                </div>

                <div className="formItem">
                    <label>Correo electrónico :</label>
                    <input name='email' type="text" autoComplete="off" value={email} onChange={onInputChange}/>
                    { (errors.email) ? <small>Correo incorrecto</small> : <small className="smallVoid"></small>}
                </div>

                <div className="formItem">
                    <label>Asunto :</label>
                    <input name='subject' type="text" autoComplete="off" value={subject} onChange={onInputChange}/>
                    { (errors.subject) ? <small>Asunto demasiado corto</small> : <small className="smallVoid"></small>}
                </div>

                <div className="formItem">
                    <label>Mensaje :</label>
                    <textarea name='body' autoComplete='off' value={body} onChange={onInputChange}/>
                    { (errors.body) ? <small className="form-text">Mensaje demasiado corto</small> : <small className="smallVoid"></small> }
                </div>

                <div className="submit"><button type='submit' disabled={!isEnabled}>Enviar</button></div>

            </form>

        </div>
    )
    
}

export default RootContacto