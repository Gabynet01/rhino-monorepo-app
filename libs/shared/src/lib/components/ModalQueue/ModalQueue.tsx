'use client';

import React from 'react';
import { useModalQueue } from '../../contexts/ModalQueueContext';
import Modal from '../Modal/Modal';

export const ModalQueue: React.FC = () => {
  const { modals, closeModal } = useModalQueue();

  if (modals.length === 0) {
    return null;
  }

  // Always render the first modal in the queue
  const currentModal = modals[0];

  return (
    <Modal
      isOpen={true}
      onClose={() => closeModal(currentModal.id)}
      title={currentModal.title}
      type={currentModal.type}
      onConfirm={currentModal.onConfirm}
      confirmText={currentModal.confirmText}
      cancelText={currentModal.cancelText}
      closeOnClickOutside={currentModal.closeOnClickOutside}
    >
      {currentModal.content}
    </Modal>
  );
};

export default ModalQueue;
