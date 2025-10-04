import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Modal State
  modals: Record<string, boolean>;
  
  // Navigation State
  mobileMenuOpen: boolean;
  headerScrolled: boolean;
  
  // Component-specific State
  techStackAutoScroll: boolean;
  techStackScrollPosition: number;
  
  // Actions
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setHeaderScrolled: (scrolled: boolean) => void;
  setTechStackAutoScroll: (autoScroll: boolean) => void;
  setTechStackScrollPosition: (position: number) => void;
  reset: () => void;
}

const initialState = {
  modals: {},
  mobileMenuOpen: false,
  headerScrolled: false,
  techStackAutoScroll: true,
  techStackScrollPosition: 0,
};

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      ...initialState,
      
      openModal: (modalId) =>
        set((state) => ({
          modals: { ...state.modals, [modalId]: true },
        })),
      
      closeModal: (modalId) =>
        set((state) => ({
          modals: { ...state.modals, [modalId]: false },
        })),
      
      toggleModal: (modalId) =>
        set((state) => ({
          modals: { ...state.modals, [modalId]: !state.modals[modalId] },
        })),
      
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      
      setHeaderScrolled: (scrolled) => set({ headerScrolled: scrolled }),
      
      setTechStackAutoScroll: (autoScroll) => set({ techStackAutoScroll: autoScroll }),
      
      setTechStackScrollPosition: (position) => set({ techStackScrollPosition: position }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'ui-store',
    }
  )
);