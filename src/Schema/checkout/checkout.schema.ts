import { error } from "console";
import * as zod from "zod";

export const checkoutSchema=zod.object({
phone:zod.string().nonempty("Phone is required !").regex(/^01[0125][0-9]{8}$/,"Invalid Egyption Number"),
details:zod.string().nonempty("Address details is required !"),
city:zod.string().nonempty("City is required !")
})


export type  checkoutSchemaType=zod.infer<typeof checkoutSchema>