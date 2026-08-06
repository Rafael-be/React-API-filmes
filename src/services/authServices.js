import { supabase } from "./supaBase";

const isSchemaError = (error) =>
  Boolean(error?.message && /(does not exist|relation|column)/i.test(error.message));

export const cadastrar = async (email, senha, nome) => {
  const { data, error } = await supabase.auth.signUp({ email, password: senha });

  if (data?.user && !error && nome?.trim()) {
    const { error: perfilError } = await supabase
      .from("perfis")
      .insert({ id: data.user.id, nome: nome.trim() });

    if (perfilError && !isSchemaError(perfilError)) {
      return { data, error: perfilError };
    }
  }

  return { data, error };
};

export const login = (email, senha) =>
  supabase.auth.signInWithPassword({ email, password: senha });

export const logout = () =>
  supabase.auth.signOut();

export const getUsuarioAtual = () =>
  supabase.auth.getUser();