// src/components/ChecklistForm.tsx
import React from 'react';

const items = [
  'Piscine vérifiée',
  'Portes fermées',
  'Fenêtres intactes',
  'Courrier relevé',
  'Extérieur propre'
];

type Props = {
  checklist: string[];
  setChecklist: (items: string[]) => void;
};

const ChecklistForm = ({ checklist, setChecklist }: Props) => {
  const toggleItem = (item: string) => {
    if (checklist.includes(item)) {
      setChecklist(checklist.filter((i) => i !== item));
    } else {
      setChecklist([...checklist, item]);
    }
  };

  return (
    <div className="checklist-form">
      {items.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={checklist.includes(item)}
            onChange={() => toggleItem(item)}
          />{' '}
          {item}
        </label>
      ))}
    </div>
  );
};

export default ChecklistForm;