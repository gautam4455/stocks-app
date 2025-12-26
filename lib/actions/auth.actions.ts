"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";

export const signUpWithEmail = async ({
  fullName,
  email,
  password,
  country,
  investmentGoals,
  preferredIndustry,
  riskTolerance,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email: email, password: password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          preferredIndustry,
          riskTolerance,
        },
      });
    }

    return { success: true, data: response };
  } catch (error) {
    console.log("Sign up failed", error);
    return { success: false, error: "User sign up failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, data: response };
  } catch (error) {
    console.log("Sign in failed", error);
    return { success: false, error: "User sign in failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log("Sign out failed", error);
    return { success: false, error: "User sign out failed" };
  }
};
