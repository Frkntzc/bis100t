import React, { useState, useMemo } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { BIST_100_STOCKS } from '../constants';
import { Stock } from '../types';

interface StockListProps {
  onSelectStock: (stock: Stock) => void;
}

const StockList: React.FC<StockListProps> = ({ onSelectStock }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = useMemo(() => {
    return BIST_100_STOCKS.filter(stock => 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">BIST 100 Analiz</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Sembol veya şirket ara..."
            className="w-full bg-slate-100 text-slate-900 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => (
            <button
              key={stock.code}
              onClick={() => onSelectStock(stock)}
              className="w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="text-left">
                <div className="text-lg font-bold text-slate-900">{stock.code}</div>
                <div className="text-sm text-slate-500 font-medium">{stock.name}</div>
              </div>
              <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                {stock.sector}
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400">
            <p>Hisse bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;
