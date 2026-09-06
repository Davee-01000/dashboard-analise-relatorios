import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Carregando dados da Google Sheets via CSV export
        const spreadsheetId = '1ZkwnnudT1TuK6dXjt897RvnNhExYgL0-CbcxEzINOb0';
        const gid = '808369732';
        const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
        
        const response = await fetch(csvUrl);
        const csv = await response.text();
        
        // Parse CSV
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const parsedData = [];
        
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const obj = {};
            const values = lines[i].split(',');
            headers.forEach((header, index) => {
              obj[header] = values[index]?.trim() || '';
            });
            parsedData.push(obj);
          }
        }
        
        setData(parsedData);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados da planilha');
        // Dados de exemplo para demonstração
        setData([
          { Mês: 'Janeiro', Vendas: 4000, Lucro: 2400, Usuários: 2400 },
          { Mês: 'Fevereiro', Vendas: 3000, Lucro: 1398, Usuários: 2210 },
          { Mês: 'Março', Vendas: 2000, Lucro: 9800, Usuários: 2290 },
          { Mês: 'Abril', Vendas: 2780, Lucro: 3908, Usuários: 2000 },
          { Mês: 'Maio', Vendas: 1890, Lucro: 4800, Usuários: 2181 },
          { Mês: 'Junho', Vendas: 2390, Lucro: 3800, Usuários: 2500 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Dashboard de Análise e Relatórios</h1>
        <p>Análise de dados em tempo real</p>
      </header>
      
      {loading && <div className="loading">Carregando dados...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && <Dashboard data={data} />}
    </div>
  );
}

export default App;
