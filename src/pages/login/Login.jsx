import { useNavigate } from "react-router"
import { useState } from "react"
import supabase from "../../supabase/supabase-client"
import { ConfirmSchema, getFieldError, getErrors,FormSchema, ConfirmSchemaLogin, FormSchemaLogin } from "../../lib/validationForm"

export default function Login() {
    const navigate=useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const[touchedFields, setTouchedFields] = useState({});
    const[formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const onSubmit= async(event) =>{
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            let { error } = await supabase.auth.signInWithPassword ({
                email: data.email,
                password: data.password,
            });
            if (error) {
                alert("Signing up error 👎🏻!");
            } else {
                alert("Signed up 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    };
    const onBlur=(property)=>()=>{
       const message= getFieldError(FormSchemaLogin,property,formState[property]);
        setFormErrors((prev)=>({...prev,[property]:message}));
        setTouchedFields((prev)=>({...prev,[property]:true}));
    };
    const isInvalid=(property)=>{
        if(formSubmitted && touchedFields[property]){
            return !!formErrors[property];
        }
        return undefined;
    }
    const setField=(property,valueSelector)=>(e)=>{
        setFormState((prev) => ({
            ...prev,
            [property]:valueSelector? valueSelector(e):e.target.value,
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-10">Login</h1>
            <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered w-full max-w-xs"
                        value={formState.email}
                        onChange={setField("email")}
                        onBlur={onBlur("email")}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered w-full max-w-xs"
                        value={formState.password}
                        onChange={setField("password")}
                        onBlur={onBlur("password")}
                    />
                </div>
                <button type="submit" className="btn btn-custom mt-5">
                    Login
                </button>
            </form>
           
        </div>
    )
}