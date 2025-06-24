import '../../styles/abonnement/abonnement.scss';

type Feature = {
  id: string;
  label: string;
  included: boolean;
  price?: number;
};

type Abonnement = {
  id: string;
  name: string;
  basePrice: number;
  tagline: string;
  features: Feature[];
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
          <p className="configurator-desc">{abonnement.tagline}</p>

          <div className="features-section">
            {Array.isArray(abonnement.features) && abonnement.features.map((f) => (
              <div
                key={f.id}
                className={`feature-item ${f.included ? 'included' : 'upsell'}`}
              >
                {f.included ? (
                  <>✅ {f.label}</>
                ) : (
                  <label className="option-checkbox">
                    <input
                      type="checkbox"
                      checked={!!selectedOptions[f.id]}
                      onChange={() => toggleOption(f.id)}
                    />
                    {f.label} <span className="option-price">+{f.price} €</span>
                  </label>
                )}
              </div>
            ))}
          </div>

          <button className="pay-btn">
            Souscrire à {totalPrice.toFixed(2)} € / mois
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionConfigurator;
