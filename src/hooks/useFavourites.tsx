import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavouritesContextType {
  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  count: number;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dakhina_favourites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dakhina_favourites', JSON.stringify(favourites));
    } catch {
      // storage error fallback
    }
  }, [favourites]);

  const toggleFavourite = (id: string) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavourite = (id: string) => favourites.includes(id);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
        count: favourites.length,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
