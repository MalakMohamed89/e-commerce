"use server"
import { updateDataType, updatePasswordType } from "@/Schema/settings/setting.schema";
import { getMyToken } from "@/utils/getMyToken";

export async function updatePasswordForLoggedUser(values: updatePasswordType) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("please login first!");
    }

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          token:token as string
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


export async function updateDataForLoggedUser(values: updateDataType) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("please login first!");
    }

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          token:token as string
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