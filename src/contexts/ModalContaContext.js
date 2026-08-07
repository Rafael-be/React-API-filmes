import { createContext, useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const ModalContaContext = createContext();

export const ModalContaProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const aberto = searchParams.get("conta") === "ver";

  const abrirConta = useCallback(() => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.delete("auth");
    novosParams.set("conta", "ver");
    setSearchParams(novosParams);
  }, [searchParams, setSearchParams]);

  const fecharConta = useCallback(() => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.delete("conta");
    setSearchParams(novosParams);
  }, [searchParams, setSearchParams]);

  const valor = useMemo(
    () => ({ aberto, abrirConta, fecharConta }),
    [aberto, abrirConta, fecharConta]
  );

  return (
    <ModalContaContext.Provider value={valor}>
      {children}
    </ModalContaContext.Provider>
  );
};

export const useModalConta = () => useContext(ModalContaContext);
