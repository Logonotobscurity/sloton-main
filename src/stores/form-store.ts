import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface FormData {
  businessNeeds: string;
  companySize: string;
  industry: string;
  budget: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

interface FormState {
  // Form Data
  formData: FormData;
  
  // Form States
  submitting: boolean;
  submitted: boolean;
  errors: Record<string, string>;
  
  // Multi-step Forms
  currentStep: number;
  
  // Actions
  setFormData: (data: Partial<FormData>) => void;
  setFormField: (field: keyof FormData, value: string) => void;
  setSubmitting: (submitting: boolean) => void;
  setSubmitted: (submitted: boolean) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearErrors: () => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  reset: () => void;
}

const initialFormData: FormData = {
  businessNeeds: '',
  companySize: '',
  industry: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  message: '',
};

const initialState = {
  formData: initialFormData,
  submitting: false,
  submitted: false,
  errors: {},
  currentStep: 1,
};

export const useFormStore = create<FormState>()(
  devtools(
    (set) => ({
      ...initialState,
      
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      
      setFormField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      
      setSubmitting: (submitting) => set({ submitting }),
      
      setSubmitted: (submitted) => set({ submitted }),
      
      setError: (field, error) =>
        set((state) => ({
          errors: { ...state.errors, [field]: error },
        })),
      
      clearError: (field) =>
        set((state) => {
          const newErrors = { ...state.errors };
          delete newErrors[field];
          return { errors: newErrors };
        }),
      
      clearErrors: () => set({ errors: {} }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      resetForm: () => set({ formData: initialFormData, errors: {}, currentStep: 1 }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'form-store',
    }
  )
);