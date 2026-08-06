import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { adicionarComentario } from "../../services/comentarioService";

import { ContainerForm, Form, TextArea, AcoesForm, SelectLabel, BotaoEnviar } from './Style'; // Ajuste o caminho até o seu arquivo styles.js

const AdicionarComentario = ({ movieId, title, posterPath, onComentarioAdicionado }) => {

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
        const { error } = await adicionarComentario(usuario.id, movieId, texto, nota, title, posterPath);
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
        <ContainerForm>
            <h3>Deixe seu comentário</h3>
            {erro && <p className="erro">{erro}</p>}
            
            <Form onSubmit={handleEnviar}>
            <TextArea
                placeholder="Escreva seu comentário..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            
            <AcoesForm>
                <SelectLabel>
                Nota:
                <select
                    value={nota}
                    onChange={(e) => setNota(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>★ {n}</option>
                    ))}
                </select>
                </SelectLabel>

                <BotaoEnviar type="submit" disabled={carregando}>
                {carregando ? "Enviando..." : "Comentar"}
                </BotaoEnviar>
            </AcoesForm>
            </Form>
        </ContainerForm>
    );
};

export default AdicionarComentario;