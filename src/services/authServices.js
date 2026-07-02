import { supabase } from "./supaBase";

export const cadastrar = (email, senha) =>
  supabase.auth.signUp({ email, password: senha });

export const login = (email, senha) =>
  supabase.auth.signInWithPassword({ email, password: senha });

export const logout = () =>
  supabase.auth.signOut();

export const getUsuarioAtual = () =>
  supabase.auth.getUser();