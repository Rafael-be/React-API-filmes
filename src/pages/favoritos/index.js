import { useEffect, useState } from "react";
import { useFavoritos } from "../../contexts/FavoritosContext";

import { MovieList, Container } from "../style";
import ContainerFilmes from "../../components/Container-filmes/Container-filmes";
import Spinner from "../../components/Spinner";

const Favoritos = () => {
    const { idsFavoritos, carregandoFavoritos } = useFavoritos();
    const [favoritos, setFavoritos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        let ativo = true;

        if (carregandoFavoritos) {
            setCarregando(true);
            return () => {
                ativo = false;
            };
        }

        if (idsFavoritos.length === 0) {
            setFavoritos([]);
            setCarregando(false);
            return () => {
                ativo = false;
            };
        }

        const buscarFavoritos = async () => {
            setCarregando(true);

            try {
                const resultados = await Promise.all(
                    idsFavoritos.map((id) =>
                        fetch(`${URL}${id}?api_key=${KEY}&language=pt-BR`)
                            .then((res) => res.ok ? res.json() : null)
                    )
                );

                if (ativo) setFavoritos(resultados.filter(Boolean));
            } catch {
                if (ativo) setFavoritos([]);
            } finally {
                if (ativo) setCarregando(false);
            }
        };

        buscarFavoritos();

        return () => {
            ativo = false;
        };
    }, [carregandoFavoritos, idsFavoritos, KEY, URL]);

    return (
        <Container>
            <h1><span>FAVORITOS</span></h1>
            {carregando ? (
                <Spinner />
            ) : favoritos.length === 0 ? (
                <h1>Nenhum favorito encontrado</h1>
            ) : (
                <MovieList>
                    {favoritos.map((movie) => (<ContainerFilmes key={movie.id} movie={movie} />))}
                </MovieList>
            )}
        </Container>
    );
};

export default Favoritos;
