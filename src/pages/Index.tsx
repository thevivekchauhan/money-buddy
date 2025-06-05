import React, { useState } from 'react';
import { BarChart3, DollarSign, TrendingUp, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Dashboard from '../components/Dashboard';
import TransactionManager from '../components/TransactionManager';
import InvestmentTracker from '../components/InvestmentTracker';
import Auth from '../components/Auth';

const Index = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'investments', label: 'Investments', icon: TrendingUp }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionManager />;
      case 'investments':
        return <InvestmentTracker />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen gradient-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white text-purple-600 p-2 sm:p-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Navigation */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block mb-6 sm:mb-8`}>
          <nav className="bg-white rounded-2xl p-2 shadow-xl inline-flex flex-wrap gap-2 sm:gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
