"use server";

import { UserProps } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export async function loginAction({
  token,
  user,
}: {
  token: string;
  user?: UserProps;  // Use UserProps instead of any or Record
}) {
  const cookieStore = await cookies();
  // Set secure, HttpOnly auth_token
  cookieStore.set("auth_token", token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    httpOnly: true, // can't be read by JavaScript
    sameSite: "lax",
  });
  // (Optional) If you need some safe client-accessible info
  console.log(user);
  if (user) {
    // Store user info including capabilities (for client-accessible usage)
    cookieStore.set("user_info", JSON.stringify(user), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      httpOnly: false, // accessible via JS
      sameSite: "lax",
    });
  }
  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token')
  cookieStore.delete('user_info')
  return redirect('/login'); 
}

export async function getCurrentUser(): Promise<UserProps> {
  const cookieStore = await cookies();
  const user_info = cookieStore.get('user_info')?.value || '{}';
  return JSON.parse(user_info) as UserProps;
}

export async function getCurrentUserToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}

export async function getCurrentUserAuthToken(): Promise<string> {
  const authToken = await getCurrentUserToken();
  const user = await getCurrentUser();
  // Provide fallback empty string if user_login or authToken is undefined
  const userLogin = user?.user_login || "";
  const token = authToken || "";
  return btoa(`${userLogin}:${token}`);
}
