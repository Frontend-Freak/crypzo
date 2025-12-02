import { supabase } from "./supabase";

export type FavoriteItem = { coin_id: string };

export async function getFavorites(userId: string): Promise<FavoriteItem[]> {
	const { data, error } = await supabase.from("favorites").select("coin_id").eq("user_id", userId);

	if (error) return [];
	return (data as FavoriteItem[]) ?? [];
}

export async function addFavorite(userId: string, coinId: string) {
	await supabase.from("favorites").insert({
		user_id: userId,
		coin_id: coinId,
	});
}

export async function removeFavorite(userId: string, coinId: string) {
	await supabase.from("favorites").delete().eq("user_id", userId).eq("coin_id", coinId);
}
