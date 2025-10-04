import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // User State
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
  } | null;
  
  // Loading State
  globalLoading: boolean;
  loadingStates: Record<string, boolean>;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: AppState['user']) => void;
  setGlobalLoading: (loading: boolean) => void;
  setLoadingState: (key: string, loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  sidebarOpen: false,
  theme: 'light' as const,
  user: null,
  globalLoading: false,
  loadingStates: {},
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        
        setTheme: (theme) => set({ theme }),
        
        setUser: (user) => set({ user }),
        
        setGlobalLoading: (loading) => set({ globalLoading: loading }),
        
        setLoadingState: (key, loading) => 
          set((state) => ({
            loadingStates: {
              ...state.loadingStates,
              [key]: loading,
            },
          })),
        
        reset: () => set(initialState),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          theme: state.theme,
          user: state.user,
        }),
      }
    )
  )
);