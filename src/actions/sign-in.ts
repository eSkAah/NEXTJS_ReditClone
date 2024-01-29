"use server";

import * as auth from "@/auth";
/* AUTH */
export async function signIn() {
  return auth.signIn("github");
}
