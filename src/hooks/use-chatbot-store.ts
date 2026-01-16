
"use client";

import { create } from 'zustand';

interface UiState {
  isChatbotOpen: boolean;
  setChatbotOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

export const useChatbotStore = create<UiState>((set) => ({
  isChatbotOpen: false,
  setChatbotOpen: (isOpen) => set({ isChatbotOpen: isOpen }),
  isMenuOpen: false,
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));

export const useUiStore = useChatbotStore;
