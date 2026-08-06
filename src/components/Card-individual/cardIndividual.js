import "./cardIndividual.css";
import KeywordSlider from "./KeywordSlider";

const formatCurrency = (numero) => {
    const formatado = numero.toLocaleString("pt", {
      style: "currency",
      currency: "BRL",
    });
    return formatado;
}

const imagePath = process.env.REACT_APP_IMAGE_URL;

const buildImageUrl = (path, size = "w780") => {
    if (!path) return "";

    const base = (imagePath || "").replace(/\/$/, "");
    const hasSizeSegment = /\/(w\d{2,4}|original)$/i.test(base);

    if (hasSizeSegment) {
        return `${base}${path}`;
    }

    return `${base}/${size}${path}`;
};

const CardIndividual = ({ movie, diretor, keywords, elenco }) => {
    const visibleElenco = (elenco || []).slice(0, 3);

    return(
        <div className="card-individual-modern">
          <div className="card-poster">
            <img
              src={buildImageUrl(movie.poster_path, "w780")}
              srcSet={`${buildImageUrl(movie.poster_path, "w342")} 342w, ${buildImageUrl(movie.poster_path, "w780")} 780w`}
              sizes="(max-width: 900px) 100vw, 320px"
              alt={movie.title}
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="card-content">
            <div className="card-header">
                <h1 className="movie-title">{movie.title}</h1>
                {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}
            </div>

            <div className="movie-meta">
              {diretor && (
                <div className="meta-item">
                  <span className="meta-label">Direção</span>
                  <span className="meta-value">{diretor}</span>
                </div>
              )}
              {movie.budget > 0 && (
                <div className="meta-item">
                  <span className="meta-label">Orçamento</span>
                  <span className="meta-value">{formatCurrency(movie.budget)}</span>
                </div>
              )}
              {movie.runtime > 0 && (
                <div className="meta-item">
                  <span className="meta-label">Duração</span>
                  <span className="meta-value">{movie.runtime} min</span>
                </div>
              )}
            </div>

            <div className="movie-description">
              <h3>Sinopse</h3>
              <p>{movie.overview}</p>
            </div>

            {visibleElenco.length > 0 && (
              <div className="movie-cast">
                <h3>Elenco Principal</h3>
                <div className="cast-list">
                    {visibleElenco.map(ator => (
                        <div key={ator.id} className="cast-item">
                            {ator.profile_path ? (
                                <img
                                  src={buildImageUrl(ator.profile_path, "w185")}
                                  alt={ator.name}
                                  className="cast-img"
                                  loading="lazy"
                                  decoding="async"
                                />
                            ) : (
                                <div className="cast-img placeholder">N/A</div>
                            )}
                            <div className="cast-info">
                                <span className="cast-name">{ator.name}</span>
                                <span className="cast-character">{ator.character}</span>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            )}

            <KeywordSlider keywords={keywords} />
          </div>
        </div>
    );
}

export default CardIndividual;
