"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import {
  SignupSchema,
  SignupSchemaType,
  singupDefaultValues,
} from "./signupSchema";

const SignUp = () => {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    defaultValues: singupDefaultValues,
    resolver: zodResolver(SignupSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);

      if (!result.success) {
        toast.error("Sign up failed", { description: result.error });
      }

      if (result.success) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign up failed", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to create an account",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name*"
          placeholder="Enter your full name"
          register={register}
          error={errors.fullName}
          disabled={isSubmitting}
        />

        <InputField
          name="email"
          label="Email*"
          placeholder="Enter your email"
          type="email"
          register={register}
          error={errors.email}
          disabled={isSubmitting}
        />

        <InputField
          name="password"
          label="Password*"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          disabled={isSubmitting}
        />

        {/* TODO: Optimize this its laggy now and flag is not showing in chrome fix this later */}
        <CountrySelectField
          name="country"
          label="Country*"
          control={control}
          error={errors.country}
          required
          disabled={isSubmitting}
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals*"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
          disabled={isSubmitting}
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance*"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
          disabled={isSubmitting}
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry*"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign In"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;
