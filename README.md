# 📊 Dashboard de Análise e Relatórios

Um dashboard interativo e responsivo criado com **React** e **Recharts** para análise e visualização de dados em tempo real a partir de uma planilha Google Sheets.

## ✨ Características

- 📈 **Gráficos Interativos**: Linha, Barra e Pizza
- 💡 **KPIs em Tempo Real**: Vendas, Lucro, Usuários e Média
- 🔍 **Filtros Dinâmicos**: Filtrar por período
- 📱 **Design Responsivo**: Funciona em desktop, tablet e mobile
- 🎨 **Interface Moderna**: Tema gradiente com cores atrativas
- 📋 **Tabela de Dados**: Visualização completa dos dados
- 🔄 **Integração Google Sheets**: Sincronização automática

## 🚀 Como Usar

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Davee-01000/dashboard-analise-relatorios.git

# Entre no diretório
cd dashboard-analise-relatorios

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

O dashboard abrirá automaticamente em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

## 📊 Estrutura de Dados

O dashboard espera os seguintes dados da planilha Google Sheets:

| Mês | Vendas | Lucro | Usuários |
|-----|--------|-------|----------|
| Janeiro | 4000 | 2400 | 2400 |
| Fevereiro | 3000 | 1398 | 2210 |

### Customizar Fonte de Dados

Edite o arquivo `src/App.jsx` e altere o `spreadsheetId` e `gid`:

```javascript
const spreadsheetId = 'SEU_ID_AQUI';
const gid = 'SEU_GID_AQUI';
```

## 🎨 Componentes Principais

### App.jsx
- Componente principal
- Fetching de dados da Google Sheets
- Gerenciamento de estado global

### Dashboard.jsx
- Renderização dos KPIs
- Sistema de abas para diferentes visualizações
- Gráficos com Recharts
- Tabela de dados

### Estilos
- `App.css`: Estilos globais
- `Dashboard.css`: Estilos específicos do dashboard

## 📦 Dependências

- **React 18**: Biblioteca UI
- **Recharts**: Gráficos interativos
- **Vite**: Build tool
- **Axios** (opcional): Para requisições HTTP

## 🔧 Personalizações

### Alterar Cores

Edite as cores no arquivo `src/styles/Dashboard.css`:

```css
/* Cor primária */
#667eea

/* Cor secundária */
#764ba2
```

### Adicionar Novas Abas

No `Dashboard.jsx`, adicione:

```javascript
<button 
  className={`tab ${activeTab === 'nova' ? 'active' : ''}`}
  onClick={() => setActiveTab('nova')}
>
  Nova Aba
</button>
```

### Adicionar Novos KPIs

No `Dashboard.jsx`, adicione um novo card:

```javascript
<div className="kpi-card">
  <h3>Seu KPI</h3>
  <p className="kpi-value">Valor</p>
  <span className="kpi-label">Descrição</span>
</div>
```

## 📱 Responsividade

O dashboard é totalmente responsivo e se adapta a:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🐛 Troubleshooting

### Erro: "Falha ao carregar dados"
- Verifique se a Google Sheet está compartilhada publicamente
- Confirme o ID e GID da planilha
- Verifique a conexão com a internet

### Gráficos não aparecem
- Verifique se os dados estão no formato correto
- Confirme se as colunas são nomeadas corretamente
- Abra o console (F12) para ver erros

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Criado por **Davee-01000**

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

**Feito com ❤️ usando React e Vite**
