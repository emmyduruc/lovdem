import { useMemo } from 'react';
import { useSupabase } from './useSupabase';
import { createServices } from '../services';

export function useServices() {
  const db = useSupabase();
  return useMemo(() => createServices(db), [db]);
}
