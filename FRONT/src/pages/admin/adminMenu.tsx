interface menubuttonprops { name:string , index:number , selectedIndex:number , selectCallback:(index:number) => void }
interface menuProps { menuIndex:number , setMenuIndex:(value:number) => void }
import { useContext } from 'react';
import styles2 from '../../styles/admin/menu.module.css';
import MainAdmin from './main';
import { authContext } from '../../context/admin.context';

const Menu = ({menuIndex,setMenuIndex}:menuProps) => {

    const MenuButton = ({name,index,selectedIndex,selectCallback}:menubuttonprops) => {

        return(
            <button type="button"
                    className={`btn
                                ${styles2.menuButton}
                                ${(index == selectedIndex) ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => selectCallback(index)}
            >{name}</button>
        )

    }

    const LogOutButton = () => {

        const logoutCallback = useContext(authContext).authCrud.logout ;
        const onClick = () => { logoutCallback(true) }

        return( <div className={styles2.menuSection}> 
                    <button className={`btn btn-danger ${styles2.menuButton}`}
                            onClick={onClick}> LOG OUT </button>
                </div> )

    }

    const { session:{user} } = useContext(authContext);

    return(
        <div className={`col-2 ${styles2.menu}`}>

            <div className={styles2.menuSection}>
                {['miscelaneo','T.definidos','T.Indefinidos'].map( (x,i) => (
                    <MenuButton key={i} name={x} index={i} selectedIndex={menuIndex} selectCallback={() => setMenuIndex(i)} />
                ))}
            </div>

            {(user) &&
                <div className={`${styles2.logged}`}>
                    <img src={user.picture} width={30}/>
                    <p>{user.name}</p>
                </div>
            }

            <LogOutButton/>

        </div>
    )

}

export default Menu