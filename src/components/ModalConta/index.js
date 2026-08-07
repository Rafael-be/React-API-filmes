import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AvatarUsuario from "../AvatarUsuario";
import { useAuth } from "../../contexts/AuthContext";
import { useModalConta } from "../../contexts/ModalContaContext";
import { alterarSenha } from "../../services/authServices";
import "./modalConta.css";

const CampoSenha = ({ label, valor, onChange, mostrar, onToggleMostrar }) => (
  <label className="campo-senha">
    <span>{label}</span>
    <div className="campo-senha-input">
      <input
        type={mostrar ? "text" : "password"}
        value={valor}
        onChange={onChange}
        placeholder={label}
      />
      <button type="button" onClick={onToggleMostrar} aria-label={mostrar ? "Ocultar senha" : "Mostrar senha"}>
        {mostrar ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </label>
);

const ModalConta = () => {
  const { aberto, fecharConta } = useModalConta();
  const { usuario, perfil } = useAuth();
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mostrarAtual, setMostrarAtual] = useState(false);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [salvando, setSalvando] = useState(false);

  if (!aberto || !usuario) return null;

  const validar = () => {
    if (!senhaAtual || !novaSenha) return "Preencha todos os campos.";
    if (novaSenha.length < 6) return "A nova senha deve ter pelo menos 6 caracteres.";
    if (novaSenha === senhaAtual) return "A nova senha deve ser diferente da atual.";
    return null;
  };

  const handleAlterarSenha = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(false);

    const mensagemValidacao = validar();
    if (mensagemValidacao) {
      setErro(mensagemValidacao);
      return;
    }

    setSalvando(true);
    const { error } = await alterarSenha(usuario.email, senhaAtual, novaSenha);
    setSalvando(false);

    if (error) {
      setErro(error.message);
      return;
    }

    setSucesso(true);
    setSenhaAtual("");
    setNovaSenha("");
  };

  return (
      <div className="modal-conta-overlay" onClick={fecharConta}>

        <div className="modal-conta" onClick={(e) => e.stopPropagation()}>

          <button type="button" className="modal-conta-fechar" onClick={fecharConta} aria-label="Fechar">x</button>

          <div className="modal-conta-header">
            <AvatarUsuario nome={perfil?.nome || usuario.email} tamanho={64} />
            <div className="modal-conta-identidade">
              <h2>{perfil?.nome || "Minha conta"}</h2>
              <p>{usuario.email}</p>
            </div>
          </div>

          <div className="modal-conta-links">
            <Link to="/favoritos" onClick={fecharConta}>Ver favoritos</Link>
            <Link to={perfil?.slug ? `/comentarios/${perfil.slug}` : "/comentarios"} onClick={fecharConta}>Ver comentários</Link>
          </div>

          {!editandoSenha ? (
            <button type="button" className="botao-alterar-senha" onClick={() => setEditandoSenha(true)}>
              Alterar senha
            </button>
          ) : (
            <form className="form-alterar-senha" onSubmit={handleAlterarSenha}>
              {erro && <span className="mensagem erro">{erro}</span>}
              {sucesso && <span className="mensagem sucesso">Senha alterada com sucesso.</span>}
              <CampoSenha
                label="Senha atual"
                valor={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                mostrar={mostrarAtual}
                onToggleMostrar={() => setMostrarAtual((valor) => !valor)}
              />
              <CampoSenha
                label="Nova senha"
                valor={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                mostrar={mostrarNova}
                onToggleMostrar={() => setMostrarNova((valor) => !valor)}
              />
              <div className="modal-conta-acoes">
                <button type="button" onClick={() => setEditandoSenha(false)}>Cancelar</button>
                <button type="submit" disabled={salvando}>{salvando ? "Salvando..." : "Salvar"}</button>
              </div>
            </form>
          )}

        </div>

      </div>
  );
};

export default ModalConta;
