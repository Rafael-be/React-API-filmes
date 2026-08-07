import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supaBase";
import { buscarMeuPerfil } from "../services/perfilService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarSessao = async () => {
      const { data } = await supabase.auth.getSession();
      const sessaoUsuario = data.session?.user ?? null;
      setUsuario(sessaoUsuario);

      if (sessaoUsuario) {
        const { data: perfilData } = await buscarMeuPerfil(sessaoUsuario.id);
        setPerfil(perfilData);
      } else {
        setPerfil(null);
      }

      setCarregando(false);
    };

    carregarSessao();

    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessaoUsuario = session?.user ?? null;
      setUsuario(sessaoUsuario);

      if (sessaoUsuario) {
        const { data: perfilData } = await buscarMeuPerfil(sessaoUsuario.id);
        setPerfil(perfilData);
      } else {
        setPerfil(null);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const valor = useMemo(() => ({ usuario, perfil, carregando }), [usuario, perfil, carregando]);

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);