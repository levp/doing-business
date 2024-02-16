import {createContext, useContext, ReactNode} from 'react';
import {Business} from '@doing-business/core/dist/business';

const BusinessContext = createContext<Business | null>(null);

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness() must be called within a BusinessContext.');
  }
  return context;
}

export function BusinessProvider({business, children}: BusinessProviderProps) {
  return (
    <BusinessContext.Provider value={business}>
      {children}
    </BusinessContext.Provider>
  );
}

export type BusinessProviderProps = {
  business: Business;
  children: ReactNode;
}
