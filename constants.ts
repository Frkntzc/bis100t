import { Stock } from './types';

// A representative subset of BIST 100 for the demo. 
// In a real app, this might come from an API or a larger JSON file.
export const BIST_100_STOCKS: Stock[] = [
  { code: 'THYAO', name: 'Türk Hava Yolları', sector: 'Ulaştırma' },
  { code: 'GARAN', name: 'Garanti BBVA', sector: 'Bankacılık' },
  { code: 'EREGL', name: 'Ereğli Demir Çelik', sector: 'Metal Eşya' },
  { code: 'ASELS', name: 'Aselsan', sector: 'Savunma' },
  { code: 'KCHOL', name: 'Koç Holding', sector: 'Holding' },
  { code: 'SISE', name: 'Şişe Cam', sector: 'Cam' },
  { code: 'AKBNK', name: 'Akbank', sector: 'Bankacılık' },
  { code: 'BIMAS', name: 'BİM Mağazalar', sector: 'Perakende' },
  { code: 'TUPRS', name: 'Tüpraş', sector: 'Petrol' },
  { code: 'SAHOL', name: 'Sabancı Holding', sector: 'Holding' },
  { code: 'PETKM', name: 'Petkim', sector: 'Kimya' },
  { code: 'ISCTR', name: 'İş Bankası (C)', sector: 'Bankacılık' },
  { code: 'FROTO', name: 'Ford Otosan', sector: 'Otomotiv' },
  { code: 'YKBNK', name: 'Yapı Kredi Bankası', sector: 'Bankacılık' },
  { code: 'EKGYO', name: 'Emlak Konut GYO', sector: 'Gayrimenkul' },
  { code: 'HEKTS', name: 'Hektaş', sector: 'Tarım' },
  { code: 'SASA', name: 'SASA Polyester', sector: 'Tekstil' },
  { code: 'ENKAI', name: 'Enka İnşaat', sector: 'İnşaat' },
  { code: 'TOASO', name: 'Tofaş Oto. Fab.', sector: 'Otomotiv' },
  { code: 'ARCLK', name: 'Arçelik', sector: 'Teknoloji' },
  { code: 'KOZAL', name: 'Koza Altın', sector: 'Madencilik' },
  { code: 'KRDMD', name: 'Kardemir (D)', sector: 'Metal' },
  { code: 'VESTL', name: 'Vestel', sector: 'Teknoloji' },
  { code: 'PGSUS', name: 'Pegasus', sector: 'Ulaştırma' },
  { code: 'TCELL', name: 'Turkcell', sector: 'Telekomünikasyon' },
  { code: 'TTKOM', name: 'Türk Telekom', sector: 'Telekomünikasyon' },
  { code: 'MGROS', name: 'Migros Ticaret', sector: 'Perakende' },
  { code: 'ASTOR', name: 'Astor Enerji', sector: 'Enerji' },
  { code: 'GUBRF', name: 'Gübre Fabrikaları', sector: 'Kimya' },
  { code: 'KONTR', name: 'Kontrolmatik', sector: 'Teknoloji' }
];

export const MOCK_CHART_DATA = [
  { name: '09:00', value: 4000 },
  { name: '10:00', value: 3000 },
  { name: '11:00', value: 2000 },
  { name: '12:00', value: 2780 },
  { name: '13:00', value: 1890 },
  { name: '14:00', value: 2390 },
  { name: '15:00', value: 3490 },
  { name: '16:00', value: 3200 },
  { name: '17:00', value: 3500 },
];
