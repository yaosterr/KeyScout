import React, { createContext, useState, useEffect, useContext } from 'react';
import { designs } from '../components/RightSideDesign';

const DesignContext = createContext();

export function DesignProvider({ children }) {
  const [currentDesign, setCurrentDesign] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDesign((prev) => (prev + 1) % designs.length);
    }, 5000); // Change design every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <DesignContext.Provider value={{ currentDesign, designs }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  return useContext(DesignContext);
}
