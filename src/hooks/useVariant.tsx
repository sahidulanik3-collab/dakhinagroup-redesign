import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type VariantId = 1 | 2 | 3 | 4 | 5;

export interface VariantMeta {
  id: VariantId;
  name: string;
  theme: 'heritage' | 'minimal' | 'midnight' | 'tropical' | 'editorial';
  tagline: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: string;
  personality: string;
}

export const VARIANTS: Record<VariantId, VariantMeta> = {
  1: {
    id: 1,
    name: 'Dakhina Corporate',
    theme: 'heritage',
    tagline: 'Official Live Site & Armed Forces Authority',
    palette: {
      primary: '#128341',
      secondary: '#FAF7F0',
      accent: '#f37d20',
      background: '#FFFFFF',
    },
    typography: 'Playfair Display + Inter',
    personality: 'Authentic Dakhina Group portal: Drone hero slider, BAFWT/BAF crests, 8 statutory agency seals, 3 speedometer gauges, DREL hedge video, and panoramic footer.',
  },
  2: {
    id: 2,
    name: 'Shanta Minimalist',
    theme: 'minimal',
    tagline: 'Architectural Restraint & Whitespace',
    palette: {
      primary: '#1C1C1C',
      secondary: '#F4F1EC',
      accent: '#C65D3B',
      background: '#F4F1EC',
    },
    typography: 'Manrope Geometric Sans',
    personality: 'Clean architectural lines, horizontal CAD property rows, and restrained luxury inspired by Shanta Holdings.',
  },
  3: {
    id: 3,
    name: 'Concord Midnight',
    theme: 'midnight',
    tagline: 'Cinematic Obsidian & Champagne Gold',
    palette: {
      primary: '#E8D8B0',
      secondary: '#131D31',
      accent: '#B87333',
      background: '#0B1220',
    },
    typography: 'Fraunces + Inter',
    personality: 'Deep obsidian navy, ambient luminous gold glows on hover, inspired by Concord luxury landmark developments.',
  },
  4: {
    id: 4,
    name: 'Bashundhara Eco',
    theme: 'tropical',
    tagline: 'Lakeside Township & Botanical Oasis',
    palette: {
      primary: '#0E7C7B',
      secondary: '#F6EFE4',
      accent: '#FF7A59',
      background: '#F6EFE4',
    },
    typography: 'DM Serif Display + Plus Jakarta Sans',
    personality: 'Lush lakefront township, organic curved cards, inspired by Bashundhara Housing eco masterplans.',
  },
  5: {
    id: 5,
    name: 'Institutional Prime',
    theme: 'editorial',
    tagline: 'Sovereign DAP DAP Compliance & Transparency',
    palette: {
      primary: '#111111',
      secondary: '#FFFFFF',
      accent: '#E5391B',
      background: '#F2F0EB',
    },
    typography: 'Space Grotesk + Monospace Accents',
    personality: 'Direct legal possession audit, inter-agency statutory coordination, and Swiss typographic hierarchy.',
  },
};

interface VariantContextType {
  variantId: VariantId;
  variant: VariantMeta;
  setVariantId: (id: VariantId) => void;
  isReviewMode: boolean;
  setIsReviewMode: (val: boolean) => void;
  showReviewModal: boolean;
  setShowReviewModal: (val: boolean) => void;
  showSwitcher: boolean;
  setShowSwitcher: (val: boolean) => void;
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export const VariantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize variant from query param or localStorage or default to 1
  const [variantId, setVariantIdState] = useState<VariantId>(() => {
    const params = new URLSearchParams(window.location.search);
    const paramVariant = params.get('variant');
    if (paramVariant && [1, 2, 3, 4, 5].includes(Number(paramVariant))) {
      return Number(paramVariant) as VariantId;
    }
    const saved = localStorage.getItem('dakhina_variant');
    if (saved && [1, 2, 3, 4, 5].includes(Number(saved))) {
      return Number(saved) as VariantId;
    }
    return 1;
  });

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(true);

  // Sync variant to DOM attribute and localStorage
  useEffect(() => {
    const active = VARIANTS[variantId];
    document.documentElement.setAttribute('data-theme', active.theme);
    localStorage.setItem('dakhina_variant', String(variantId));
  }, [variantId]);

  // Synchronize when query params change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramVariant = params.get('variant');
    if (paramVariant && [1, 2, 3, 4, 5].includes(Number(paramVariant))) {
      const v = Number(paramVariant) as VariantId;
      if (v !== variantId) {
        setVariantIdState(v);
      }
    }
  }, [location.search, variantId]);

  const setVariantId = useCallback((id: VariantId) => {
    setVariantIdState(id);
    const params = new URLSearchParams(window.location.search);
    params.set('variant', String(id));
    navigate({ search: params.toString() }, { replace: true });
  }, [navigate]);

  // Keyboard shortcuts 1-5 to switch variants instantaneously
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const id = Number(e.key) as VariantId;
        setVariantId(id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setVariantId]);

  return (
    <VariantContext.Provider
      value={{
        variantId,
        variant: VARIANTS[variantId],
        setVariantId,
        isReviewMode,
        setIsReviewMode,
        showReviewModal,
        setShowReviewModal,
        showSwitcher,
        setShowSwitcher,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
};

export const useVariant = () => {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error('useVariant must be used within a VariantProvider');
  }
  return context;
};
