
import { ConfirmSchema, getFieldError, getErrors } from "../../lib/validationForm";
import { useState } from "react";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router-dom";


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
                <div className="grid grid-cols-1 justify-items-center">
                    <form className="form" onSubmit={onSubmit}>
                    <h1 className="text-3xl text-center mb-20">Registrati</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control input" id="email" value={formState.email} onChange={setField("email")} onBlur={onBlur("email")} aria-describedby="email" />
                            {isInvalid("email") && <p className="text-red-500">{formErrors.email}</p>}
                        </div>  
                        
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control input" id="firstName" value={formState.firstName} onChange={setField("firstName")} onBlur={onBlur("firstName")} />
                            {isInvalid("firstName") && <p className="text-red-500">{formErrors.firstName}</p>}
                        </div>
                    
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label ">Last Name</label>
                            <input type="text" className="form-control input" id="lastName" value={formState.lastName} onChange={setField("lastName")} onBlur={onBlur("lastName")} />
                            {isInvalid("lastName") && <p className="text-red-500">{formErrors.lastName}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control input" id="username" value={formState.username} onChange={setField("username")} onBlur={onBlur("username")} />
                            {isInvalid("username") && <p className="text-red-500">{formErrors.username}</p>}
                        </div>
                       
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control input" id="password" value={formState.password} onChange={setField("password")} onBlur={onBlur("password")} />
                            {isInvalid("password") && <p className="text-red-500">{formErrors.password}</p>}
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Registrati</button>
                    </form>

                </div>
        </>
    )
}