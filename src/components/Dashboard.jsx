import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../styles/Dashboard.css';

const Dashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterMonth, setFilterMonth] = useState('');

  // Calcular KPIs
  const calculateKPIs = () => {
    if (!data || data.length === 0) return {};
    
    const vendas = data.reduce((sum, item) => {
      const val = parseFloat(item.Vendas) || 0;
      return sum + val;
    }, 0);

    const lucro = data.reduce((sum, item) => {
      const val = parseFloat(item.Lucro) || 0;
      return sum + val;
    }, 0);

    const usuarios = Math.max(...data.map(item => parseFloat(item.Usuários) || 0));

    return {
      totalVendas: vendas.toFixed(2),
      totalLucro: lucro.toFixed(2),
      maxUsuarios: usuarios,
      mediaVendas: (vendas / data.length).toFixed(2)
    };
  };

  const kpis = calculateKPIs();
  const filteredData = filterMonth 
    ? data.filter(item => item.Mês === filterMonth) 
    : data;

  return (
    <div className="dashboard">
      {/* KPI Cards */}
      <section className="kpi-section">
        <div className="kpi-card">
          <h3>Total de Vendas</h3>
          <p className="kpi-value">R$ {kpis.totalVendas}</p>
          <span className="kpi-label">Período Total</span>
        </div>
        <div className="kpi-card">
          <h3>Lucro Total</h3>
          <p className="kpi-value">R$ {kpis.totalLucro}</p>
          <span className="kpi-label">Período Total</span>
        </div>
        <div className="kpi-card">
          <h3>Máx. Usuários</h3>
          <p className="kpi-value">{kpis.maxUsuarios}</p>
          <span className="kpi-label">Pico de Usuários</span>
        </div>
        <div className="kpi-card">
          <h3>Média Vendas</h3>
          <p className="kpi-value">R$ {kpis.mediaVendas}</p>
          <span className="kpi-label">Por Período</span>
        </div>
      </section>

      {/* Filtros e Tabs */}
      <section className="controls">
        <div className="filter-group">
          <label htmlFor="monthFilter">Filtrar por Mês:</label>
          <select 
            id="monthFilter"
            value={filterMonth} 
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">Todos os meses</option>
            {data.map((item, idx) => (
              <option key={idx} value={item.Mês}>{item.Mês}</option>
            ))}
          </select>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Visão Geral
          </button>
          <button 
            className={`tab ${activeTab === 'vendas' ? 'active' : ''}`}
            onClick={() => setActiveTab('vendas')}
          >
            Vendas
          </button>
          <button 
            className={`tab ${activeTab === 'lucro' ? 'active' : ''}`}
            onClick={() => setActiveTab('lucro')}
          >
            Lucro
          </button>
          <button 
            className={`tab ${activeTab === 'usuarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('usuarios')}
          >
            Usuários
          </button>
        </div>
      </section>

      {/* Gráficos */}
      <section className="charts-section">
        {activeTab === 'overview' && (
          <div className="chart-container">
            <h2>📈 Visão Geral - Vendas vs Lucro</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredData || data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Mês" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Vendas" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="Lucro" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'vendas' && (
          <div className="chart-container">
            <h2>💰 Análise de Vendas</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData || data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Mês" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Vendas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'lucro' && (
          <div className="chart-container">
            <h2>💵 Análise de Lucro</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={filteredData || data}
                  dataKey="Lucro"
                  nameKey="Mês"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {(filteredData || data).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'][index % 6]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="chart-container">
            <h2>👥 Análise de Usuários</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData || data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Mês" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Usuários" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* Tabela de Dados */}
      <section className="table-section">
        <h2>📋 Dados Completos</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {data.length > 0 && Object.keys(data[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(filteredData || data).map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((value, vidx) => (
                    <td key={vidx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
