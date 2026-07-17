import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { adicionarComentario } from "../../services/comentarioService";

const AdicionarComentario = ({ movieId, onComentarioAdicionado }) => {

    const { usuario } = useAuth();
    const [texto, setTexto] = useState("");
    const [nota, setNota] = useState(1);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);

    if (!usuario) return null; // não exibe o formulário se não estiver logado

    const handleEnviar = async (e) => {
        e.preventDefault();
        setErro(null);

        if (!texto.trim()) {
            setErro("O comentário não pode estar vazio.");
            return;
        }

        setCarregando(true);
        const { error } = await adicionarComentario(usuario.id, movieId, texto, nota);
        setCarregando(false);

        if (error) {
            setErro(error.message);
            return;
        }

        setTexto("");
        setNota(1);
        onComentarioAdicionado(); // avisa a página pai pra recarregar os comentários
    };

    return (
        <div>
            <h3>Deixe seu comentário</h3>
            {erro && <p className="erro">{erro}</p>}
            <form onSubmit={handleEnviar}>
                <textarea
                    placeholder="Escreva seu comentário..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                <label>
                    Nota:
                    <select
                        value={nota}
                        onChange={(e) => setNota(Number(e.target.value))}
                    >
                        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </label>
                <button type="submit" disabled={carregando}>
                    {carregando ? "Enviando..." : "Comentar"}
                </button>
            </form>
        </div>
    );
};

export default AdicionarComentario;