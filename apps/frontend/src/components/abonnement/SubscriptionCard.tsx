// apps/frontend/src/components/abonnement/SubscriptionCard.tsx

type Subscription = {
     id: string;
     name: string;
     basePrice: number;
     description: string;
   };
   
   type Props = {
     subscription: Subscription;
     onSelect: (id: string) => void;
   };
   
   const SubscriptionCard = ({ subscription, onSelect }: Props) => {
     return (
       <div className="subscription-card" onClick={() => onSelect(subscription.id)}>
         <h3>{subscription.name}</h3>
         <p>{subscription.description}</p>
         <div className="price">{subscription.basePrice} €</div>
       </div>
     );
   };
   
   export default SubscriptionCard;
   