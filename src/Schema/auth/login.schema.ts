import { error } from "console";
import * as zod from "zod";

export const loginSchema=zod.object({
email:zod.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email"),
password:zod.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,    "Password must contain 8 characters, uppercase, lowercase, number and special character"),

})

export type  loginSchemaType=zod.infer<typeof loginSchema>