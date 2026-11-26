import { error } from "console";
import * as zod from "zod";

export const updatePassword=zod.object({

currentPassword:zod.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,    "Password must contain 8 characters, uppercase, lowercase, number and special character"),
password:zod.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,    "Password must contain 8 characters, uppercase, lowercase, number and special character"),
rePassword:zod.string().nonempty("rePassword is required"),

}).refine((obj)=>{
    return obj.rePassword===obj.password
},
{error:"Password and rePassword are not match",
path:['rePassword']
}
)

export type  updatePasswordType=zod.infer<typeof updatePassword>



export const updateData=zod.object({
name:zod.string().nonempty("Name is required").min(3,"Min Charachters is 3").max(30,"Max Charcters is 30"),
email:zod.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email"),
phone:zod.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/,"Invalid Egyption Number"),
})

export type  updateDataType=zod.infer<typeof updateData>