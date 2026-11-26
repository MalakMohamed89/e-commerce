import { error } from "console";
import * as zod from "zod";

export const registerSchema=zod.object({
name:zod.string().nonempty("Name is required").min(3,"Min Charachters is 3").max(30,"Max Charcters is 30"),
email:zod.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email"),
password:zod.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,    "Password must contain 8 characters, uppercase, lowercase, number and special character"),
rePassword:zod.string().nonempty("rePassword is required"),
phone:zod.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/,"Invalid Egyption Number"),
}).refine((obj)=>{
    return obj.rePassword===obj.password
},
{error:"Password and rePassword are not match",
path:['rePassword']
}
)

export type  registerSchemaType=zod.infer<typeof registerSchema>