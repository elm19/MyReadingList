"use client";

import { signout } from "@/app/(auth)/actions";
const SignOut = () => {
    // This component is used to handle the sign-out action


  return (
    <button onClick={signout}>
        Sign Out
    </button>
  )
}
export default SignOut