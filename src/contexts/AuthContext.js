import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supaBaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // pega sessão ativa ao carregar o app
    supabase.auth.getSession()
    .then(({ data }) => {
      if (data.session && data.session.user)
        setUsuario(data.session.user);
      else
        setUsuario(null);

      setCarregando(false);
    });

    // escuta mudanças de login/logout em tempo real
    supabase.auth.onAuthStateChange((_event, session) => {
        if (session && session.user)
            setUsuario(session.user);
        else 
            setUsuario(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook pra usar em qualquer componente
export const useAuth = () => useContext(AuthContext);