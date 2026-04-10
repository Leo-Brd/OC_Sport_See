import { useEffect, useState } from "react";
import { fetchMock } from "../mocks/mockService";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

/**
 * Hook générique pour récupérer des données depuis un endpoint utilisateur.
 * Utilise les données mock si VITE_USE_MOCK=true, sinon appelle l'API réelle.
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

    const request = USE_MOCK
      ? fetchMock(id, endpoint)
      : fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}${endpoint}`)
          .then((res) => {
            if (!res.ok) throw new Error("Erreur API: " + res.status);
            return res.json();
          });

    request
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id, endpoint]);

  return { data, loading, error };
}

