import { createContext, useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const ModalAuthContext = createContext();

export const ModalAuthProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const telaAtiva = searchParams.get("auth");

  const abrirLogin = useCallback(() => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.set("auth", "login");
    setSearchParams(novosParams);
  }, [searchParams, setSearchParams]);

  const abrirCadastro = useCallback(() => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.set("auth", "cadastro");
    setSearchParams(novosParams);
  }, [searchParams, setSearchParams]);

  const fecharModal = useCallback(() => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.delete("auth");
    setSearchParams(novosParams);
  }, [searchParams, setSearchParams]);

  const valor = useMemo(
    () => ({ telaAtiva, abrirLogin, abrirCadastro, fecharModal }),
    [telaAtiva, abrirLogin, abrirCadastro, fecharModal]
  );

  return (
    <ModalAuthContext.Provider value={valor}>
      {children}
    </ModalAuthContext.Provider>
  );
};

export const useModalAuth = () => useContext(ModalAuthContext);
