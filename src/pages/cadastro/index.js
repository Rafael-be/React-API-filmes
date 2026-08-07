import { useState } from "react";
import { useModalAuth } from "../../contexts/ModalAuthContext";
import { cadastrar } from "../../services/authServices";

import "../cadastroLogin.css";

const Cadastro = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [erro, setErro] = useState(null);
    const { fecharModal, abrirLogin } = useModalAuth();

    const fazerCadastro = async (evento) => {
        evento.preventDefault();
        setErro(null);

        const { error } = await cadastrar(email, senha, nome);

        if (error) {
            setErro(error.message);
            return;
        }

        fecharModal();
    };

    return (
        <div className="cadastro">
            <div className="card">
                <h2>Cadastro</h2>
                {erro && <p className="erro">{erro}</p>}
                <form onSubmit={fazerCadastro}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(resposta) => setNome(resposta.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(resposta) => setEmail(resposta.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(resposta) => setSenha(resposta.target.value)}
                    />
                    <button type="submit">Entrar</button>
                </form>
                <p>
                    Já tem conta?{' '}
                    <button type="button" className="link-botao" onClick={abrirLogin}>clique aqui</button>
                </p>
            </div>
        </div>
    );
};

export default Cadastro;