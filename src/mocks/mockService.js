import users from "./users.json";
import activity from "./activity.json";
import averageSessions from "./averageSessions.json";
import performance from "./performance.json";

const mockData = {
  "": users,
  "/activity": activity,
  "/average-sessions": averageSessions,
  "/performance": performance,
};

/**
 * Simule un appel API avec les données mock.
 * @param {string|number} id - L'identifiant de l'utilisateur
 * @param {string} endpoint - Le chemin relatif après /user/:id
 * @returns {Promise<any>}
 */
export function fetchMock(id, endpoint) {
  return new Promise((resolve, reject) => {
    const dataset = mockData[endpoint];
    if (!dataset) {
      reject(new Error(`Mock: endpoint inconnu "${endpoint}"`));
      return;
    }
    const data = dataset[String(id)];
    if (!data) {
      reject(new Error(`Mock: aucune donnée pour l'utilisateur ${id} sur "${endpoint}"`));
      return;
    }
    resolve(data);
  });
}
