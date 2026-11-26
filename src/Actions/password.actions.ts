"use server";

import { forgotPasswordSchemaType, resetPasswordSchemaType, verifyResetCodeSchemaType } from "@/Schema/password/password.schema";

export async function ForgotPasswordPost(values: forgotPasswordSchemaType) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: data.message,
      };
    }

    return {
      ok: true,
      message: data.message,
    };
  } catch (err) {
    console.log(err);

    return {
      ok: false,
      message: "Something went wrong. Please try again.",
    };
  }
}




export async function verifyResetCode(values: verifyResetCodeSchemaType) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: data.message,
      };
    }

    return {
      ok: true,
      message: data.message,
    };
  } catch (err) {
    console.log(err);

    return {
      ok: false,
      message: "Something went wrong. Please try again.",
    };
  }
}




export async function resetPassword(values: resetPasswordSchemaType) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: data.message,
      };
    }

    return {
      ok: true,
      message: data.message,
    };
  } catch (err) {
    console.log(err);

    return {
      ok: false,
      message: "Something went wrong. Please try again.",
    };
  }
}