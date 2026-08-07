import { supabase } from "./supaBase";

const isSchemaError = (error) =>
    Boolean(error?.message && /(does not exist|relation|column)/i.test(error.message));

const enriquecerComPerfis = async (comentarios = []) => {
    if (!comentarios.length) return [];

    const idsUsuarios = [...new Set(comentarios
        .map((comentario) => comentario?.user_id)
        .filter(Boolean))];

    if (!idsUsuarios.length) return comentarios;

    const { data: perfisData } = await supabase
        .from("perfis")
        .select("id, nome")
        .in("id", idsUsuarios);

    const perfisPorUsuario = {};
    (perfisData || []).forEach((perfil) => {
        perfisPorUsuario[perfil.id] = perfil;
    });

    return comentarios.map((comentario) => ({
        ...comentario,
        perfil_nome: comentario?.perfis?.nome || perfisPorUsuario[comentario.user_id]?.nome || comentario?.nome || comentario?.user?.nome || null,
    }));
};

export const buscarComentarios = async (movieId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("id, texto, nota, created_at, user_id, movie_id, perfis(nome)")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

    if (error && isSchemaError(error)) {
        const fallback = await supabase
            .from("comentarios")
            .select("id, texto, nota, created_at, user_id, movie_id")
            .eq("movie_id", movieId)
            .order("created_at", { ascending: false });

        const comentariosEnriquecidos = await enriquecerComPerfis(fallback.data || []);
        return { data: comentariosEnriquecidos, error: fallback.error };
    }

    const comentariosEnriquecidos = await enriquecerComPerfis(data || []);
    return { data: comentariosEnriquecidos, error };
};

export const buscarComentarioPorUsuarioEFilme = async (userId, movieId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("id, texto, nota, created_at, user_id, movie_id, perfis(nome)")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

    if (error && isSchemaError(error)) {
        const fallback = await supabase
            .from("comentarios")
            .select("id, texto, nota, created_at, user_id, movie_id")
            .eq("user_id", userId)
            .eq("movie_id", movieId)
            .maybeSingle();

        if (!fallback.data) {
            return { data: fallback.data, error: fallback.error };
        }

        const comentarioEnriquecido = (await enriquecerComPerfis([fallback.data]))[0];
        return { data: comentarioEnriquecido, error: fallback.error };
    }

    if (!data) {
        return { data, error };
    }

    const comentarioEnriquecido = (await enriquecerComPerfis([data]))[0];
    return { data: comentarioEnriquecido, error };
};

export const buscarComentarioPorUsuario = async (userId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("id, texto, nota, created_at, user_id, movie_id, title, poster_path")
        .eq("user_id", userId);

    if (error && isSchemaError(error)) {
        const fallback = await supabase
            .from("comentarios")
            .select("id, texto, nota, created_at, user_id, movie_id")
            .eq("user_id", userId);

        const comentariosEnriquecidos = await enriquecerComPerfis(fallback.data || []);
        return { data: comentariosEnriquecidos, error: fallback.error };
    }

    const comentariosEnriquecidos = await enriquecerComPerfis(data || []);
    return { data: comentariosEnriquecidos, error };
};

export const buscarComentariosPorUsuarioId = async (userId) => {
    const { data, error } = await supabase
        .from("comentarios")
        .select("id, texto, nota, created_at, user_id, movie_id, title, poster_path")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error && isSchemaError(error)) {
        const fallback = await supabase
            .from("comentarios")
            .select("id, texto, nota, created_at, user_id, movie_id")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        const comentariosEnriquecidos = await enriquecerComPerfis(fallback.data || []);
        return { data: comentariosEnriquecidos, error: fallback.error };
    }

    const comentariosEnriquecidos = await enriquecerComPerfis(data || []);
    return { data: comentariosEnriquecidos, error };
};

export const adicionarComentario = async (userId, movieId, texto, nota, title, posterPath) => {
    const payload = { user_id: userId, movie_id: movieId, texto, nota };

    if (title) payload.title = title;
    if (posterPath) payload.poster_path = posterPath;

    const { data, error } = await supabase
        .from("comentarios")
        .insert(payload);

    if (error && isSchemaError(error)) {
        const fallbackPayload = { user_id: userId, movie_id: movieId, texto, nota };
        const fallbackResult = await supabase
            .from("comentarios")
            .insert(fallbackPayload);

        return fallbackResult;
    }

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

    if (error || !data?.length) return null;

    const media = data.reduce((acc, c) => acc + c.nota, 0) / data.length;
    return Number(media.toFixed(1));
};