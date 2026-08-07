import React from "react";
import { useModalAuth } from "../../contexts/ModalAuthContext";
import Login from "../../pages/login";
import Cadastro from "../../pages/cadastro";

const ModalAuth = () => {
  const { telaAtiva, fecharModal } = useModalAuth();

  if (!telaAtiva) return null;

  return (
    <div className="modal-auth-overlay" onClick={fecharModal}>
      <div className="modal-auth-container" onClick={(e) => e.stopPropagation()}>
        {telaAtiva === "login" && <Login />}
        {telaAtiva === "cadastro" && <Cadastro />}
      </div>
    </div>
  );
};

export default ModalAuth;
