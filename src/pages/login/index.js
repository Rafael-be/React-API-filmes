import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authServices";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);

    const navigate = useNavigate();

    const fazerLogin = async (evento) => {
        evento.preventDefault();
        setErro(null);

        const { error } = await login(email, senha);

        if (error) {
            setErro(error.message);
            return;
        }

        navigate("/");
    };

    return (
        <div className="login">
            <h2>Login</h2>
            {erro && <p className="erro">{erro}</p>}
            <form onSubmit={fazerLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
    );
};

export default Login;