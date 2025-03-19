import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { SignOutConfirmationModal } from './modals/SignOutConfirmationModal';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setShowSignOutModal(false);
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    successMessage.textContent = 'Successfully signed out!';
    document.body.appendChild(successMessage);
    
    // Remove message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
        >
          <User className="h-5 w-5" />
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-[13px] font-medium tracking-wider dark:text-white truncate">
                {user.user_metadata.first_name} {user.user_metadata.last_name}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>

            {/* Sign Out */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowSignOutModal(true);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-[13px] tracking-wider text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      <SignOutConfirmationModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
      />
    </>
  );
};