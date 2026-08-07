import { supabase } from "./supaBase";
import { criarPerfil } from "./perfilService";

export const cadastrar = async (email, senha, nome) => {
  const { data, error } = await supabase.auth.signUp({ email, password: senha });

  if (error) {
    return { data, error };
  }

  if (data?.user && nome?.trim()) {
    const { error: perfilError } = await criarPerfil(data.user.id, nome.trim());

    if (perfilError) {
      return { data, error: perfilError };
    }
  }

  return { data, error: null };
};

export const login = (email, senha) =>
  supabase.auth.signInWithPassword({ email, password: senha });

export const alterarSenha = async (email, senhaAtual, novaSenha) => {
  const { error: erroAuth } = await supabase.auth.signInWithPassword({
    email,
    password: senhaAtual,
  });

  if (erroAuth) {
    return { data: null, error: { message: "Senha atual incorreta." } };
  }

  const { data, error } = await supabase.auth.updateUser({ password: novaSenha });
  return { data, error };
};

export const logout = () =>
  supabase.auth.signOut();

export const getUsuarioAtual = () =>
  supabase.auth.getUser();
