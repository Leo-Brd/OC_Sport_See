import "./Sidebar.css";
import meditationIcon from "../../assets/meditation.svg";
import swimmingIcon from "../../assets/swimming.svg";
import bikeIcon from "../../assets/bike.svg";
import dumbbellIcon from "../../assets/dumbbell.svg";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__icons">
        <button className="sidebar__icon-btn">
          <img src={meditationIcon} alt="Méditation" />
        </button>
        <button className="sidebar__icon-btn">
          <img src={swimmingIcon} alt="Natation" />
        </button>
        <button className="sidebar__icon-btn">
          <img src={bikeIcon} alt="Vélo" />
        </button>
        <button className="sidebar__icon-btn">
          <img src={dumbbellIcon} alt="Musculation" />
        </button>
      </div>
      <div className="sidebar__copyright">
        <span>Copyright, SportSee 2020</span>
      </div>
    </aside>
  );
}

export default Sidebar;
