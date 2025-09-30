import z from "zod";
const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError= "Password must be at least 8 characters long and contain at least one letter and one number.";

export const FormSchema=z.object({
    email:z.string().email(),
    firstName:z.string().min(1),
    lastName:z.string().min(1),
    username:z.string().min(1),
    password:z.string().min(8).regex(passwordRegex,passwordError),  
});

export const ConfirmSchema=FormSchema.refine((data) => data);
export function getFieldError(property,value){
    const {error}=FormSchema.shape[property].safeParse(value);
    return error?error.issues.map((issue)=>issue.message).join(", "):undefined;
}

export const getErrors=(error)=>error.issues.reduce((all,issue)=>{
    const {path}=issue.path.join("");
    const message= all[path]?all[path]+",":"";
    all[path]=message+issue.message;
    return all;
});

export const FormSchemaLogin=z.object({
    email:z.string().email(),
    password:z.string().min(8).regex(passwordRegex,passwordError),  
});
export const ConfirmSchemaLogin=FormSchemaLogin.refine((data) => data);