import "./UserKeyData.css";

// Import des icônes
import calorieIcon from "../../../assets/fire.svg";
import proteinIcon from "../../../assets/chicken.svg";
import carbIcon from "../../../assets/apple.svg";
import lipidIcon from "../../../assets/burger.svg";

const keyDataList = [
  {
    key: "calorieCount",
    label: "Calories",
    unit: "kCal",
    icon: calorieIcon,
    className: "calorie-bg",
  },
  {
    key: "proteinCount",
    label: "Protéines",
    unit: "g",
    icon: proteinIcon,
    className: "protein-bg",
  },
  {
    key: "carbohydrateCount",
    label: "Glucides",
    unit: "g",
    icon: carbIcon,
    className: "carb-bg",
  },
  {
    key: "lipidCount",
    label: "Lipides",
    unit: "g",
    icon: lipidIcon,
    className: "lipid-bg",
  },
];

export default function UserKeyData({ keyData }) {
  return (
    <div className="user-key-data-container">
      {keyDataList.map((item) => (
        <div className="key-data-card" key={item.key}>
          <div className={`icon-container ${item.className}`}>
            <img src={item.icon} alt={item.label} />
          </div>
          <div className="key-data-info">
            <div className="key-data-value">
              {keyData[item.key]}
              {item.unit}
            </div>
            <div className="key-data-label">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
