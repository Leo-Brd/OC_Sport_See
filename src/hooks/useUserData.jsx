import { useEffect, useReducer } from "react";
import { fetchMock } from "../mocks/mockService";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const initialState = { data: null, loading: true, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'loading': return { data: null, loading: true, error: null };
    case 'success': return { data: action.data, loading: false, error: null };
    case 'error':   return { data: null, loading: false, error: action.error };
    default:        return state;
  }
}

/**
 * Hook générique pour récupérer des données depuis un endpoint utilisateur.
 * Utilise les données mock si VITE_USE_MOCK=true, sinon appelle l'API réelle.
 * @param {string|number} id - L'identifiant de l'utilisateur
 * @param {string} endpoint - Le chemin relatif après /user/:id (ex: '', '/activity', '/performance')
 * @returns {{ data: any, loading: boolean, error: any }}
 */
export function useUserData(id, endpoint = '') {
  const [{ data, loading, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!id && id !== 0) return;

    dispatch({ type: 'loading' });

    const request = USE_MOCK
      ? fetchMock(id, endpoint)
      : fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}${endpoint}`)
          .then((res) => {
            if (!res.ok) throw new Error("Erreur API: " + res.status);
            return res.json();
          });

    request
      .then((data) => dispatch({ type: 'success', data }))
      .catch((error) => dispatch({ type: 'error', error }));
  }, [id, endpoint]);

  return { data, loading, error };
}

