import React from "react";

const PALETA_AVATAR = ["#F3FD6B", "#F7D354", "#4EA8DE", "#FF6B6B", "#9B5DE5", "#00BBF9"];

const gerarCorAvatar = (nome) => {
  const hash = Array.from(nome || "").reduce((acc, char) => acc + (char.codePointAt(0) || 0), 0);
  return PALETA_AVATAR[hash % PALETA_AVATAR.length];
};

const AvatarUsuario = ({ nome, tamanho = 38 }) => {
  const inicial = nome?.charAt(0)?.toUpperCase() || "?";
  const cor = gerarCorAvatar(nome);

  return (
    <div
      className="avatar-usuario"
      style={{
        width: tamanho,
        height: tamanho,
        backgroundColor: cor,
        fontSize: `${Math.max(12, tamanho * 0.45)}px`,
      }}
    >
      {inicial}
    </div>
  );
};

export default AvatarUsuario;
