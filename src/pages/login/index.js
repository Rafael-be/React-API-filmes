import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useModalAuth } from "../../contexts/ModalAuthContext";
import { login } from "../../services/authServices";

import "../cadastroLogin.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState(null);
    const { fecharModal, abrirCadastro } = useModalAuth();

    const fazerLogin = async (evento) => {
        evento.preventDefault();
        setErro(null);

        const { error } = await login(email, senha);

        if (error) {
            setErro(error.message);
            return;
        }

        fecharModal();
    };

    return (
        <div className="login">
            <div className="card">
                <h2>Login</h2>
                {erro && <p className="erro">{erro}</p>}
                <form onSubmit={fazerLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="input-senha-auth">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarSenha((valor) => !valor)}
                            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <p>
                    Não tem conta?{' '}
                    <button type="button" className="link-botao" onClick={abrirCadastro}>clique aqui</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
