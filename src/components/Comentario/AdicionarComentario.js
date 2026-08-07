import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { adicionarComentario } from "../../services/comentarioService";

import { ContainerForm, Form, TextArea, AcoesForm, SelectLabel, BotaoEnviar } from "./Style";

const AdicionarComentario = ({ movieId, title, posterPath, onComentarioAdicionado }) => {
    const { usuario } = useAuth();
    const [texto, setTexto] = useState("");
    const [nota, setNota] = useState(0);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);

    if (!usuario) return null;

    const handleEnviar = async (e) => {
        e.preventDefault();
        setErro(null);

        if (!texto.trim()) {
            setErro("O comentario nao pode estar vazio.");
            return;
        }

        if (Number.isNaN(nota) || nota < 0 || nota > 10) {
            setErro("A nota deve estar entre 0 e 10.");
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
        setNota(0);
        onComentarioAdicionado();
    };

    return (
        <ContainerForm>
            <h3>Deixe seu comentario</h3>
            {erro && <p className="erro">{erro}</p>}

            <Form onSubmit={handleEnviar}>
                <TextArea
                    placeholder="Escreva seu comentario..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />

                <AcoesForm>
                    <SelectLabel>
                        Nota:
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={nota}
                            onChange={(e) => setNota(Number(e.target.value))}
                            placeholder="Nota (0 a 10)"
                        />
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
