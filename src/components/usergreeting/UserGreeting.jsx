import './UserGreeting.css';

/**
 * Affiche le prénom de l'utilisateur et un message de félicitations.
 * @param {{ firstName: string }} props
 */
export default function UserGreeting({ firstName }) {
  return (
    <div className="user-greeting">
      <h1>
        Bonjour <span>{firstName}</span>
      </h1>
      <p>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
}
