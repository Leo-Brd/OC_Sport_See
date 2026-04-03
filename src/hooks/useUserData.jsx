import { useEffect, useState } from "react";

/**
 * Hook générique pour récupérer des données depuis un endpoint utilisateur.
 * @param {string|number} id - L'identifiant de l'utilisateur
 * @param {string} endpoint - Le chemin relatif après /user/:id (ex: '', '/activity', '/performance')
 * @returns {{ data: any, loading: boolean, error: any }}
 */
export function useUserData(id, endpoint = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id && id !== 0) return;
    setLoading(true);
    setError(null);
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/${id}${endpoint}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API: " + res.status);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id, endpoint]);

  return { data, loading, error };
}
