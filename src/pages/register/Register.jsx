
import { ConfirmSchema, getFieldError, getErrors } from "../../lib/validationForm";
import { useState } from "react";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faUser} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


export default function Register(){
    const navigate=useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const[touchedFields, setTouchedFields] = useState({});
    const[formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp ({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username
          }
        }
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
        const message= getFieldError(property,formState[property]);
        setFormErrors((prev)=>({...prev,[property]:message}));
        setTouchedFields((prev)=>({...prev,[property]:true}));
      };
      const isInvalid=(property)=>{
        if(formSubmitted || touchedFields[property]){
            return !!formErrors[property];
        }
           return undefined;
        
      };
      const setField=(property,valueSelector)=>(e)=>{
        setFormState((prev) => ({
          ...prev,
          [property]:valueSelector? valueSelector(e):e.target.value,
        }));
      };
    return(
        <>
                 <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
                    <div className="max-w-md mx-auto rounded-2xl shadow-xl p-8 bg-black/50 backdrop-blur-lg">
                    
                     <div className="flex flex-col items-center my-5">
                       <FontAwesomeIcon icon={faUser} size="3x" className="mb-5 icon-account" />
                       <h1 className="text-4xl text-center font-bold ">Benvenuto</h1>
                       <p className="text-center text-2xl mt-2">Crea il tuo account</p>
                    </div>
                    <form onSubmit={onSubmit}>
                    

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg bgp" id="email" value={formState.email} onChange={setField("email")} onBlur={onBlur("email")} />
                           <label htmlFor="error"> {isInvalid("email") && <p className="text-red-500">{formErrors.email}</p>}</label>
                        </div>
                        
                        
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">Nome</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg bgp" id="firstName" value={formState.firstName} onChange={setField("firstName")} onBlur={onBlur("firstName")} />
                            {isInvalid("firstName") && <p className="text-red-500">{formErrors.firstName}</p>}
                        </div>
                    
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Cognome</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg bgp" id="lastName" value={formState.lastName} onChange={setField("lastName")} onBlur={onBlur("lastName")} />
                            {isInvalid("lastName") && <p className="text-red-500">{formErrors.lastName}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg bgp" id="username" value={formState.username} onChange={setField("username")} onBlur={onBlur("username")} />
                            {isInvalid("username") && <p className="text-red-500">{formErrors.username}</p>}
                        </div>
                       
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="w-full px-4 py-3 rounded-lg bgp" id="password" value={formState.password} onChange={setField("password")} onBlur={onBlur("password")} />
                            {isInvalid("password") && <p className="text-red-500">{formErrors.password}</p>}
                        </div>
                        
                        <button type="submit" className="w-full bga mt-5  py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5">Registrati</button>
                    
                    <hr className="my-4 cs" />

                    <p className="text-center">Hai già un account? <Link to="/login" className="ca">Accedi</Link></p>
                    
                    </form>
                  
                  </div>
                </div>
        </>
    )
}