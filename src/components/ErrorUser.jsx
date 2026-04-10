
export default function ErrorUser() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>Utilisateur introuvable</h2>
      <p>Veuillez vérifier l'URL ou sélectionner un utilisateur valide.</p>
      <button style={{
        marginTop: "2rem",
        padding: "0.75rem 2rem",
        background: "#ff0101",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem"
      }}
        onClick={() => window.location.href = "/"}
      >
        Retour au menu
      </button>
    </div>
  );
}
