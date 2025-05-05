'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useBrand } from '../../hooks/useBrand';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirmation';
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  closeOnClickOutside?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  type = 'info',
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  closeOnClickOutside = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { brandConfig } = useBrand();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Add event listener for escape key
    document.addEventListener('keydown', handleEscape);

    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  // Set header color based on modal type
  const headerColors = {
    info: `bg-blue-600`,
    success: `bg-green-600`,
    warning: `bg-yellow-600`,
    error: `bg-red-600`,
    confirmation: `bg-${brandConfig.primaryColor.replace('#', '')}`,
  };

  const headerColor = headerColors[type];

  // Don't render if not open
  if (!isOpen) return null;

  // Use portal to render modal on top layer
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="relative mx-4 w-full max-w-md rounded-lg bg-gray-800 shadow-lg"
        style={{
          maxHeight: '90vh',
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div className={`${headerColor} rounded-t-lg px-4 py-3`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-transparent p-1 text-white hover:bg-white hover:bg-opacity-20 focus:outline-none"
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 text-white">
          {children}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 px-4 py-3">
          <div className="flex justify-end space-x-3">
            {(type === 'confirmation' || onConfirm) && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                  style={{ backgroundColor: brandConfig.primaryColor }}
                  className="rounded px-4 py-2 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {confirmText}
                </button>
              </>
            )}
            {type !== 'confirmation' && !onConfirm && (
              <button
                type="button"
                onClick={onClose}
                style={{ backgroundColor: brandConfig.primaryColor }}
                className="rounded px-4 py-2 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
