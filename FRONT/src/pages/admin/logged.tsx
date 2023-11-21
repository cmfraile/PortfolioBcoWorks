import styles1 from '../../styles/admin/adminLayout.module.css'
import Menu from './adminMenu'
import { useState } from 'react'
import MiscView from './loggedViews/misc'
import DefinedView from './loggedViews/defined'
import UndefinedView from './loggedViews/undefined'

const Logged = () => {

    const [ menuIndex , setMenuIndex ] = useState<number>(0);

    return(
        <div className={`container ${styles1.adminLayout}`}><div className="row">
            <Menu menuIndex={menuIndex} setMenuIndex={setMenuIndex}/>
            <div className={`col-10 ${styles1.contentLayout}`}>
                {(menuIndex == 0) && <MiscView/>}
                {(menuIndex == 1) && <DefinedView/>}
                {(menuIndex == 2) && <UndefinedView/>}
            </div>
        </div></div>
    )

}

export default Logged