const KEY = process.env.REACT_APP_KEY;
const URL = process.env.REACT_APP_URL;

export const obterFilmePorId = async (id) => {
    const res = await fetch(`${URL}${id}?api_key=${KEY}&language=pt-BR`);
    const dados = await res.json();
    return dados;
};

export const buscarKeywords = async (id) => {
    const res = await fetch(
        `${URL}${id}/keywords?api_key=${KEY}&language=pt-BR`
    );
    const dados = await res.json();
    return dados.keywords || [];
};

export const buscarCredits = async (id) => {
    const res = await fetch(
        `${URL}${id}/credits?api_key=${KEY}&language=pt-BR`
    );
    const dados = await res.json();
    return dados;
};

export const buscarDiretor = async (id) => {
    const credits = await buscarCredits(id);
    if (!credits || !credits.crew) return null;
    const diretores = credits.crew.filter((pessoa) => pessoa.job === "Director");
    return diretores.length > 0 ? diretores.map((d) => d.name).join(", ") : null;
};

export const buscarElenco = async (id) => {
    const credits = await buscarCredits(id);
    if (!credits || !credits.cast) return [];
    // Retorna os 5 ou 10 primeiros atores (principais)
    return credits.cast.slice(0, 8).map(ator => ({
        id: ator.id,
        name: ator.name,
        character: ator.character,
        profile_path: ator.profile_path
    }));
};
