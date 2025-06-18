import '../../styles/abonnement/abonnement.scss';

type Option = {
  id: string;
  label: string;
  price: number;
};

type Feature = {
  id: number;
  label: string;
};

type Abonnement = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: Feature[];
  options: Option[];
};

type Props = {
  abonnement: Abonnement;
  selectedOptions: Record<string, boolean>;
  toggleOption: (id: string) => void;
  totalPrice: number;
  onClose: () => void;
};

const SubscriptionConfigurator = ({
  abonnement,
  selectedOptions,
  toggleOption,
  totalPrice,
  onClose,
}: Props) => {
  return (
    <div className="configurator-container" onClick={onClose}>
      <div className="configurator-card" onClick={(e) => e.stopPropagation()}>
        <div className="configurator-left">
          <div className="fake-3d-model" />
        </div>

        <div className="configurator-right">
          <button className="close-btn" onClick={onClose}>✕</button>
          <h2 className="configurator-title">{abonnement.name}</h2>
          <p className="configurator-desc">{abonnement.description}</p>

          <div className="features-section">
            {abonnement.features.map((f) => (
              <div key={f.id} className="feature-item">✅ {f.label}</div>
            ))}
          </div>

          <div className="options-section">
            <p className="options-label">Options supplémentaires :</p>
            {abonnement.options.map((opt) => (
              <label key={opt.id} className="option-checkbox">
                <input
                  type="checkbox"
                  checked={!!selectedOptions[opt.id]}
                  onChange={() => toggleOption(opt.id)}
                />
                {opt.label} <span className="option-price">+{opt.price} €</span>
              </label>
            ))}
          </div>

          <button className="pay-btn">Souscrire à {totalPrice.toFixed(2)} € / mois</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionConfigurator;
