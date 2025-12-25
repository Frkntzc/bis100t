import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, Minus, Info, AlertTriangle } from 'lucide-react';
import { Stock, StockAnalysis, TrendDirection } from '../types';
import { analyzeStock } from '../services/geminiService';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_DATA } from '../constants';

interface StockDetailProps {
  stock: Stock;
  onBack: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onBack }) => {
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await analyzeStock(stock.code, stock.name);
        setAnalysis(data);
      } catch (err) {
        setError('Hisse analizi yapılamadı. Lütfen tekrar deneyiniz.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stock]);

  const getTrendIcon = (direction: TrendDirection) => {
    switch (direction) {
      case TrendDirection.UP: return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case TrendDirection.DOWN: return <TrendingDown className="w-5 h-5 text-rose-500" />;
      default: return <Minus className="w-5 h-5 text-slate-400" />;
    }
  };

  const getTrendColor = (direction: TrendDirection) => {
    switch (direction) {
      case TrendDirection.UP: return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case TrendDirection.DOWN: return 'bg-rose-50 border-rose-100 text-rose-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const translatePeriod = (period: string) => {
    switch(period) {
      case 'Day': return 'Gün';
      case 'Week': return 'Hafta';
      case 'Month': return 'Ay';
      default: return period;
    }
  };

  const translateSignal = (signal: string) => {
    switch(signal) {
      case 'Buy': return 'Al';
      case 'Sell': return 'Sat';
      case 'Neutral': return 'Nötr';
      default: return signal;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-800">{stock.name} inceleniyor...</h2>
        <p className="text-slate-500 mt-2 text-sm">Temel veriler kontrol ediliyor, teknik analiz yapılıyor ve piyasa tahminleri oluşturuluyor.</p>
        <div className="mt-8 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg text-xs max-w-xs">
          İpucu: Yapay zeka canlı piyasa verilerini tarıyor. Bu işlem birkaç saniye sürebilir.
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <p className="text-slate-800 font-medium mb-4">{error || 'Bir hata oluştu.'}</p>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-4 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-900">{stock.code}</h1>
          <p className="text-xs text-slate-500">{stock.name}</p>
        </div>
        <button onClick={() => window.location.reload()} className="p-2 -mr-2 hover:bg-slate-100 rounded-full transition-colors">
          <RefreshCw className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="p-4 space-y-6 max-w-lg mx-auto">
        
        {/* Main Price Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-slate-500 font-medium">Güncel Fiyat</p>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{analysis.fundamentals.price}</h2>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold ${getTrendColor(TrendDirection.UP)}`}>
              BIST: {stock.code}
            </div>
          </div>
          
          {/* Mini Chart Visualization */}
          <div className="h-32 w-full mt-4 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-400 mt-1">Gün İçi Görünüm</p>
        </div>

        {/* Fundamentals */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">F/K Oranı</p>
            <p className="font-semibold text-slate-800">{analysis.fundamentals.peRatio}</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">Piyasa Değ.</p>
            <p className="font-semibold text-slate-800 text-sm">{analysis.fundamentals.marketCap}</p>
          </div>
           <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">Hacim</p>
            <p className="font-semibold text-slate-800 text-sm">{analysis.fundamentals.volume}</p>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-indigo-900 text-sm">Yapay Zeka Özeti</h3>
          </div>
          <p className="text-sm text-indigo-800 leading-relaxed">
            {analysis.summary}
          </p>
        </div>

        {/* Predictions */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-3 px-1">Tahminler</h3>
          <div className="space-y-3">
            {analysis.predictions.map((pred, idx) => (
              <div key={idx} className={`relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all ${getTrendColor(pred.direction as TrendDirection)} bg-opacity-30 border-opacity-50`}>
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold uppercase tracking-wider opacity-70">{translatePeriod(pred.period)}</span>
                    <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md">
                      {getTrendIcon(pred.direction as TrendDirection)}
                      <span className="font-bold text-sm">{pred.percentageChange}</span>
                    </div>
                 </div>
                 <p className="text-sm font-medium opacity-90 leading-snug">
                   {pred.reasoning}
                 </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Indicators */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-3 px-1">Teknik Göstergeler</h3>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-50">
            {analysis.technicals.map((tech, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{tech.name}</p>
                  <p className="text-xs text-slate-400">Değer: {tech.value}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  tech.signal === 'Buy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  tech.signal === 'Sell' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {translateSignal(tech.signal)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 text-center">
             <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
              Yasal Uyarı: Bu uygulama, mevcut verilere dayanarak analiz ve tahminler oluşturmak için yapay zeka kullanır. Bu bir yatırım tavsiyesi değildir. Piyasa verileri gecikmeli veya tahmini olabilir.
             </p>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
