
import { create } from 'zustand';

interface ChatbotState {
  isChatbotOpen: boolean;
  setChatbotOpen: (isOpen: boolean) => void;
}

export const useChatbotStore = create<ChatbotState>()((set) => ({
  isChatbotOpen: false,
  setChatbotOpen: (isOpen) => set({ isChatbotOpen: isOpen }),
}));
