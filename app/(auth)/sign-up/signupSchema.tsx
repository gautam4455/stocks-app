import * as z from "zod";

export const SignupSchema = z.object({
  fullName: z
    .string("Name is required")
    .trim()
    .min(2, "Please enter valid name"),

  email: z.email("Please enter valid email").trim(),

  password: z
    .string("Password is required")
    .trim()
    .min(8, "Password should have atleast 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),

  country: z
    .string("Country is required")
    .trim()
    .min(1, "Please select country"),

  investmentGoals: z
    .string("Investment Goals is required")
    .trim()
    .min(1, "Please select investment goals"),

  riskTolerance: z
    .string("Risk Tolerance is required")
    .trim()
    .min(1, "Please select risk tolerance"),

  preferredIndustry: z
    .string("Preferred Industry is required")
    .trim()
    .min(1, "Please select preferred industry"),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export const singupDefaultValues = {
  fullName: "",
  email: "",
  password: "",
  country: "",
  investmentGoals: "",
  riskTolerance: "",
  preferredIndustry: "",
};
