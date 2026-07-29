import { supabase } from "./supaBase";

export const buscarComentarios = async (movieId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("id, texto, nota, created_at, user_id")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

    return { data, error };
};

export const buscarComentarioPorUsuarioEFilme = async (userId, movieId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("id, texto, nota, created_at, user_id")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single(); // espera só um resultado

    return { data, error };
};

export const buscarComentarioPorUsuario = async (userId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("id, texto, nota, created_at, user_id, movie_id")
        .eq("user_id", userId)
    return { data, error };
};

export const adicionarComentario = async (userId, movieId, texto, nota) => {
    const { data, error } = await supabase
        .from("comentarios")
        .insert({ user_id: userId, movie_id: movieId, texto, nota });

    return { data, error };
};

export const removerComentario = async (comentarioId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .delete()
        .eq("id", comentarioId);

    return { data, error };
};

export const buscarMediaNotas = async (movieId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("nota")
        .eq("movie_id", movieId);

    if (error || !data.length) return null;

    const media = data.reduce((acc, c) => acc + c.nota, 0) / data.length;
    return Number(media.toFixed(1));
};