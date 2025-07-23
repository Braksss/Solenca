import { useState, useEffect } from 'react';
import contentData from '../locales/fr.json';  // Relatif à src/hooks : si locales est sibling de hooks, c'est '../locales/fr.json'. Teste et ajuste (ex. '@/locales/fr.json' si alias Vite).

export const useContent = () => {
  const [content, setContent] = useState(contentData);
  return content;
};