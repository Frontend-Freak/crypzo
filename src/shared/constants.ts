import { supabase } from "./supabase";

export const COINS_PER_PAGE = 100;
export const apiKey = import.meta.env.VITE_API_KEY;

export async function getUserId(): Promise<string> {
	const { data } = await supabase.auth.getUser();
	if (!data.user?.id) throw new Error("Пользователь не авторизован");
	return data.user.id;
}
