import * as z from "zod";

export const SigninSchema = z.object({
  email: z.email("Please enter valid email").trim(),

  password: z
    .string("Password is required")
    .trim()
    .min(8, "Password should have atleast 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;

export const signinDefaultValues = {
  email: "",
  password: "",
};
