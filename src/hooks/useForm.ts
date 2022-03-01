import { ChangeEventHandler, useState } from "react";


export const useForm=<T extends Object>(initialState:T)=>{

    const [values, setValues] = useState(initialState);

    const reset=( newFormState=initialState )=>{
        setValues(newFormState);
    }

    const handleChange:ChangeEventHandler<HTMLInputElement>=(e)=>{
        const {name, value} = e.target as HTMLInputElement;
        setValues({
            ...values,
            [name]:value
        });
    }
    return {values,handleChange,reset,setValues};
}