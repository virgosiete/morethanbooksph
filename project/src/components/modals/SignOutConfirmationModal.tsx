import React from 'react';
import { LogOut } from 'lucide-react';

interface SignOutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SignOutConfirmationModal: React.FC<SignOutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm animate-scale-in">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3">
            <LogOut className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-center mb-2 dark:text-white">
          Sign Out Confirmation
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-[15px] tracking-wider text-center mb-6">
          Are you sure you want to sign out?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-[13px] tracking-wider hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-[13px] tracking-wider hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};