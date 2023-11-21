import { ChangeEvent } from "react"

interface uploaderinFormProps {
    onChangeEvent:(e:ChangeEvent<HTMLInputElement>) => void
}

const UploaderInForm = ({onChangeEvent}:uploaderinFormProps) =>
    <div className='my-2'>
        <input  type="file"
                accept=".png, .jpg, .jpeg"
                onChange={onChangeEvent}
        />
    </div>

export default UploaderInForm