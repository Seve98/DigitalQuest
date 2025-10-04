import { useNavigate } from "react-router"
import { useState } from "react"
import supabase from "../../supabase/supabase-client"
import { ConfirmSchema, getFieldError, getErrors,FormSchema, ConfirmSchemaLogin, FormSchemaLogin } from "../../lib/validationForm"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faUser} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router"

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
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 ">
         <div className="max-w-md mx-auto rounded-2xl shadow-xl p-8  bg-black/50 backdrop-blur-lg">
            <div className="flex flex-col items-center my-5">
                <FontAwesomeIcon icon={faUser} size="3x" className="mb-5 icon-account" />
            <h1 className="text-4xl text-center font-bold mb-5">Bentornato</h1>
            <p className="text-center">Accedi al tuo account</p>
            </div>
            <form onSubmit={onSubmit} >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        className="w-full px-4 py-3 rounded-lg bgp"
                        value={formState.email}
                        onChange={setField("email")}
                        onBlur={onBlur("email")}
                    />
                </div>
                <div className="form-control ">
                    <label className="label mt-5">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full px-4 py-3 rounded-lg bgp"
                        value={formState.password}
                        onChange={setField("password")}
                        onBlur={onBlur("password")}
                    />
                </div>
                <button type="submit" className="w-full bga mt-10 py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5">
                    Login
                </button>
                <hr className="my-10"/>
                <div className="">
                    <p className="text-center">Non hai un account? <Link to="/register" className="font-bold ca">Registrati</Link></p>

                </div>
            </form>
           </div>
        </div>
    )
}