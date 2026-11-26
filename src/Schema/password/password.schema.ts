
import * as zod from "zod";

export const forgotPasswordSchema=zod.object({
email:zod.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email"),
})


export type  forgotPasswordSchemaType=zod.infer<typeof forgotPasswordSchema>


export const verifyResetCodeSchema=zod.object({
resetCode:zod.string().nonempty("code is required").length(6, "Code must be 6 digits"),
})


export type  verifyResetCodeSchemaType=zod.infer<typeof verifyResetCodeSchema>

export const resetPasswordSchema=zod.object({
email:zod.email().nonempty("Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email"),
newPassword:zod.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,    "Password must contain 8 characters, uppercase, lowercase, number and special character"),

})


export type  resetPasswordSchemaType=zod.infer<typeof resetPasswordSchema>