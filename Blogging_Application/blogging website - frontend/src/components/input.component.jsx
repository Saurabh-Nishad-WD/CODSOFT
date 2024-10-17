import { useState } from "react";


const InputBox = ({name,type,id,value,placeholder,icon}) =>{
    const [seePassword,setSeePassword] = useState(false)
    return(
        <>
            <div className="relative w-[100%] mb-4">
        <input
        
        name={name}
        type={type == "password" ? seePassword ? "text" : "password" : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"

         />
         <i className={`fi ${icon} input-icon`}></i>

        {
            type == "password" ?

            <i class={`fi fi-rr-eye${(!seePassword ? "-crossed " : " ")} input-icon cursor-pointer left-[auto] right-4`}
            onClick={() => setSeePassword(value => !value)}
            ></i>
            :""
        }

            </div>
        </>
    )

}

export default InputBox;