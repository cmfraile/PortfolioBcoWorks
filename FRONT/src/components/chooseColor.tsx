import { Dispatch } from "react";
import { SetStateAction } from "react";
import styles1 from '../styles/admin/miscForm.module.css'

interface choosecolorprops { 
    color:string ,
    formDir:string,
    setColor:Dispatch<SetStateAction<any>> , 
    text:string 
}

const ChooseColor = ({color,formDir,setColor,text}:choosecolorprops) => {

    const onChangeCallback = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const newValue = e.target.value;
        setColor((v:any) => ({...v,[formDir]:newValue}) )
    }

    return(
        <div className={styles1.color}>
            <label>{text}</label>
            <input type="color" onChange={onChangeCallback} name={formDir} color={color}/>
        </div>
    )

}

export default ChooseColor