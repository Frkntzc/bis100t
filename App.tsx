import React, { useState } from 'react';
import StockList from './components/StockList';
import StockDetail from './components/StockDetail';
import { Stock, ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LIST');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setView('DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('LIST');
    setSelectedStock(null);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen shadow-2xl overflow-hidden">
      {view === 'LIST' ? (
        <StockList onSelectStock={handleSelectStock} />
      ) : (
        selectedStock && (
          <StockDetail 
            stock={selectedStock} 
            onBack={handleBack} 
          />
        )
      )}
    </div>
  );
};

export default App;
