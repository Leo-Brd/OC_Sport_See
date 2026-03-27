import { useEffect, useState } from "react";

/**
 * Hook pour récupérer les données d'un utilisateur par son id.
 * @param {string|number} id - L'identifiant de l'utilisateur
 * @returns {{ data: any, loading: boolean, error: any }}
 */
export function useUser(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/${id}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API: " + res.status);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}
