'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

type ModalType = 'info' | 'success' | 'warning' | 'error' | 'confirmation';

interface ModalOptions {
  title: string;
  content: React.ReactNode;
  type?: ModalType;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  closeOnClickOutside?: boolean;
}

interface ModalItem extends ModalOptions {
  id: string;
}

interface ModalQueueContextType {
  modals: ModalItem[];
  pushModal: (options: ModalOptions) => string;
  closeModal: (id: string) => void;
  clearAllModals: () => void;
}

const ModalQueueContext = createContext<ModalQueueContextType | undefined>(
  undefined
);

export const ModalQueueProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const generateId = () =>
    `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const pushModal = useCallback((options: ModalOptions): string => {
    const id = generateId();

    setModals((prev) => {
      return [...prev, { ...options, id }];
    });

    return id;
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => {
      return prev.filter((modal) => modal.id !== id);
    });
  }, []);

  const clearAllModals = useCallback(() => {
    setModals([]);
  }, [modals.length]);

  const value = {
    modals,
    pushModal,
    closeModal,
    clearAllModals,
  };

  return (
    <ModalQueueContext.Provider value={value}>
      {children}
    </ModalQueueContext.Provider>
  );
};

export const useModalQueue = (): ModalQueueContextType => {
  const context = useContext(ModalQueueContext);

  if (context === undefined) {
    throw new Error('useModalQueue must be used within a ModalQueueProvider');
  }

  return context;
};
