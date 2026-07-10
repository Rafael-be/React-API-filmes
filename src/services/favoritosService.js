import { supabase } from "./supaBase";

export const adicionarFavorito = async (userId, movieId) => {
    const { data, error } = await supabase
        .from("favoritos")
        .insert({ user_id: userId, movie_id: movieId });
    return { data, error };
};

export const removerFavorito = async (userId, movieId) => {
    const { data, error } = await supabase
        .from("favoritos")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId);
    return { data, error };
};

export const verificarFavorito = async (userId, movieId) => {
    const { data, error } = await supabase
        .from("favoritos")
        .select()
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();
    return { data, error };
};