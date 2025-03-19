import React, { useState } from 'react';
import { Copy, CreditCard, Wallet, Building2, Banknote } from 'lucide-react';

export const PaymentContent: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const paymentAccounts = [
    {
      type: 'GoTyme',
      name: 'Alysha Jhean S. Bolaños',
      number: '017859742527'
    },
    {
      type: 'BDO',
      name: 'Alysha Jhean S. Bolaños',
      number: '000880311924'
    },
    {
      type: 'BPI',
      name: 'Alysha Jhean S. Bolaños',
      number: '0329042371'
    },
    {
      type: 'Maya',
      name: 'Alysha Jhean S. Bolaños',
      number: '09060588369'
    },
    {
      type: 'GCash',
      name: 'Alysha Jhean S. Bolaños',
      number: '09060588369'
    }
  ];

  const handleCopyAccount = (account: string) => {
    navigator.clipboard.writeText(account);
    setCopiedAccount(account);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* E-Wallets */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Wallet className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">E-Wallets</h2>
        </div>

        <div className="space-y-4">
          {paymentAccounts.filter(acc => ['GCash', 'Maya'].includes(acc.type)).map((account) => (
            <div
              key={account.type}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div>
                <p className="text-[15px] font-medium tracking-wider dark:text-white">
                  {account.type}
                </p>
                <p className="text-[13px] text-gray-500 dark:text-gray-400">
                  {account.name}
                </p>
                <p className="text-[15px] tracking-wider font-medium dark:text-white mt-1">
                  {account.number}
                </p>
              </div>
              <button
                onClick={() => handleCopyAccount(account.number)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Copy account number"
              >
                <Copy className={`h-5 w-5 ${
                  copiedAccount === account.number
                    ? 'text-green-500'
                    : 'text-gray-400 dark:text-gray-500'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bank Transfer */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Bank Transfer</h2>
        </div>

        <div className="space-y-4">
          {paymentAccounts.filter(acc => ['BDO', 'BPI', 'GoTyme'].includes(acc.type)).map((account) => (
            <div
              key={account.type}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div>
                <p className="text-[15px] font-medium tracking-wider dark:text-white">
                  {account.type}
                </p>
                <p className="text-[13px] text-gray-500 dark:text-gray-400">
                  {account.name}
                </p>
                <p className="text-[15px] tracking-wider font-medium dark:text-white mt-1">
                  {account.number}
                </p>
              </div>
              <button
                onClick={() => handleCopyAccount(account.number)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Copy account number"
              >
                <Copy className={`h-5 w-5 ${
                  copiedAccount === account.number
                    ? 'text-green-500'
                    : 'text-gray-400 dark:text-gray-500'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Money Transfer */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Banknote className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Money Transfer</h2>
        </div>

        <div className="space-y-4">
          <p className="text-[15px] tracking-wider dark:text-white">
            We accept money transfers through the following services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-[15px] tracking-wider dark:text-white">LBC</li>
            <li className="text-[15px] tracking-wider dark:text-white">Cebuana Lhuillier</li>
            <li className="text-[15px] tracking-wider dark:text-white">M Lhuillier</li>
            <li className="text-[15px] tracking-wider dark:text-white">Palawan Express</li>
            <li className="text-[15px] tracking-wider dark:text-white">Western Union</li>
          </ul>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-4">
            Please contact us for the complete money transfer details.
          </p>
        </div>
      </section>

      {/* Credit Card */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Credit Card</h2>
        </div>

        <div className="space-y-4">
          <p className="text-[15px] tracking-wider dark:text-white">
            We accept credit card payments through PayPal (Guest Checkout - no PayPal account needed):
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-[15px] tracking-wider dark:text-white">Mastercard</li>
            <li className="text-[15px] tracking-wider dark:text-white">Visa</li>
          </ul>
        </div>
      </section>
    </div>
  );
};