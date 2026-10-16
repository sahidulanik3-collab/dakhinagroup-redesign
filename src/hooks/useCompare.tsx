import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CompareContextType {
  compareIds: string[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dakhina_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dakhina_compare', JSON.stringify(compareIds));
    } catch {
      // storage error fallback
    }
  }, [compareIds]);

  const addToCompare = (id: string): boolean => {
    if (compareIds.includes(id)) {
      return true;
    }
    if (compareIds.length >= 3) {
      return false; // Max 3 items
    }
    setCompareIds((prev) => [...prev, id]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((item) => item !== id));
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  const isComparing = (id: string) => compareIds.includes(id);

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
