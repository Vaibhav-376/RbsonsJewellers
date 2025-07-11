import {z} from "zod";

export const registerSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8,"Password must be at least 8 characters long"),
    name:z.string().min(3,"Name must be at least 3 characters long")
})

export default registerSchema