import { supabase } from "./supaBase";

export const gerarSlug = (nome) => {
  const nomeFormatado = (nome || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const sufixo = Math.random().toString(36).substring(2, 6);
  return `${nomeFormatado || "usuario"}-${sufixo}`;
};

export const criarPerfil = async (userId, nome) => {
  const slug = gerarSlug(nome);
  const payload = {
    id: userId,
    nome: nome.trim(),
    slug,
    lista_publica: false,
  };

  const { data, error } = await supabase.from("perfis").insert(payload);

  return { data, error };
};

export const buscarPerfilPorSlug = async (slug) => {
  const { data, error } = await supabase
    .from("perfis")
    .select("id, nome, slug, lista_publica")
    .eq("slug", slug)
    .maybeSingle();

  return { data, error };
};

export const buscarMeuPerfil = async (userId) => {
  const { data, error } = await supabase
    .from("perfis")
    .select("id, nome, slug, lista_publica")
    .eq("id", userId)
    .maybeSingle();

  return { data, error };
};

export const atualizarVisibilidade = async (userId, publica) => {
  const { data, error } = await supabase
    .from("perfis")
    .update({ lista_publica: publica })
    .eq("id", userId);

  return { data, error };
};
