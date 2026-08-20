import { getChatGPTUser } from "../chatgpt-auth";

export async function getRequestUser(request: Request) {
  const chatGPTUser = await getChatGPTUser();
  if (chatGPTUser) return chatGPTUser;

  const authorization = request.headers.get("authorization");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY;
  if (!authorization?.startsWith("Bearer ") || !url || !key) return null;

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, authorization }, cache: "no-store",
  });
  if (!response.ok) return null;
  const user = await response.json() as { email?: string; user_metadata?: { full_name?: string; name?: string } };
  if (!user.email) return null;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || null;
  return { email: user.email, fullName, displayName: fullName || user.email.split("@")[0] };
}
