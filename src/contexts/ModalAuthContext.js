import { createContext, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const ModalAuthContext = createContext();

export const ModalAuthProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const telaAtiva = searchParams.get("auth");

  const abrirLogin = () => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.set("auth", "login");
    setSearchParams(novosParams);
  };

  const abrirCadastro = () => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.set("auth", "cadastro");
    setSearchParams(novosParams);
  };

  const fecharModal = () => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.delete("auth");
    setSearchParams(novosParams);
  };

  const valor = useMemo(() => ({ telaAtiva, abrirLogin, abrirCadastro, fecharModal }), [telaAtiva]);

  return (
    <ModalAuthContext.Provider value={valor}>
      {children}
    </ModalAuthContext.Provider>
  );
};

export const useModalAuth = () => useContext(ModalAuthContext);
