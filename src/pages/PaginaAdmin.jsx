import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminLogin from '../components/AdminLogin.jsx';

const supabaseUrl = "https://jdrglgiyyjxyytjcfzbj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l5eWp4eXl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDA2NTQsImV4cCI6MjA3NTkxNjY1NH0.RPoOtFDmxGSscfn1tIET055miHdOW25w0K7vqA7NT98";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PaginaAdmin() {
  const [autenticado, setAutenticado] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('adminAutenticado');
    if (auth === 'true') {
      setAutenticado(true);
      carregarLeads();
    } else {
      setLoading(false);
    }
  }, []);

  const carregarLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('lead')
        .select('*')
        .order('data_envio', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAutenticado');
    setAutenticado(false);
  };

  const deletarLead = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este lead?')) return;
    
    try {
      const { error } = await supabase
        .from('lead')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLeads(leads.filter(lead => lead.id !== id));
    } catch (error) {
      console.error('Erro ao deletar lead:', error);
      alert('Erro ao deletar lead');
    }
  };

  const exportarCSV = () => {
    const csv = [
      ['Nome', 'Email', 'Telefone', 'Operadora', 'Mensagem', 'Vidas', 'Data'],
      ...leads.map(lead => [
        lead.nome,
        lead.email,
        lead.telefone,
        lead.operadora || '',
        lead.mensagem || '',
        lead.vidas || '',
        new Date(lead.data_envio).toLocaleString('pt-BR')
      ])
    ].map(row => row.join(';')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toLocaleDateString('pt-BR')}.csv`;
    a.click();
  };

  const leadsFiltrados = leads.filter(lead =>
    lead.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    lead.email?.toLowerCase().includes(busca.toLowerCase()) ||
    lead.telefone?.includes(busca) ||
    lead.operadora?.toLowerCase().includes(busca.toLowerCase())
  );

  if (!autenticado) {
    return <AdminLogin onLoginSuccess={() => {
      setAutenticado(true);
      carregarLeads();
    }} />;
  }

  return (
    <div style={{
      paddingTop: 'clamp(100px, 12vh, 140px)',
      background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)',
      minHeight: '100vh'
    }}>
      {/* HEADER */}
      <section style={{
        padding: 'clamp(40px, 6vh, 60px) clamp(40px, 8vw, 100px)',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '300',
              color: '#8B7E74',
              margin: '0 0 8px',
              fontFamily: "'Playfair Display', serif"
            }}>
              Dashboard Admin 📊
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              color: '#9B9289',
              margin: 0
            }}>
              {leads.length} leads capturados no total
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={exportarCSV}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
              }}
            >
              📥 Exportar CSV
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.3)';
              }}
            >
              🔓 Sair
            </button>
          </div>
        </div>

        {/* BUSCA */}
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Buscar por nome, email, telefone ou operadora..."
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '15px',
            border: '2px solid rgba(197, 188, 181, 0.3)',
            borderRadius: '12px',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#A8877A'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(197, 188, 181, 0.3)'}
        />
      </section>

      {/* ESTATÍSTICAS */}
      <section style={{
        padding: '0 clamp(40px, 8vw, 100px) 40px',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
            padding: '24px',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              {leads.length}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Total de Leads</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
            padding: '24px',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              {leads.filter(l => {
                const date = new Date(l.data_envio);
                const today = new Date();
                return date.toDateString() === today.toDateString();
              }).length}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Hoje</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
            padding: '24px',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(230, 126, 34, 0.3)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              {leads.filter(l => {
                const date = new Date(l.data_envio);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return date >= weekAgo;
              }).length}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Últimos 7 dias</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
            padding: '24px',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 12px rgba(155, 89, 182, 0.3)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              {leadsFiltrados.length}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Filtrados</div>
          </div>
        </div>
      </section>

      {/* TABELA */}
      <section style={{
        padding: '0 clamp(40px, 8vw, 100px) clamp(80px, 12vh, 120px)',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <p style={{ color: '#8B7E74' }}>Carregando leads...</p>
          </div>
        ) : leadsFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ color: '#8B7E74' }}>
              {busca ? 'Nenhum lead encontrado' : 'Nenhum lead capturado ainda'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(139, 126, 116, 0.1)'
            }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)' }}>
                  <th style={{ padding: '18px 16px', textAlign: 'left', color: 'white', fontWeight: '600', fontSize: '14px' }}>Nome</th>
                  <th style={{ padding: '18px 16px', textAlign: 'left', color: 'white', fontWeight: '600', fontSize: '14px' }}>Email</th>
                  <th style={{ padding: '18px 16px', textAlign: 'left', color: 'white', fontWeight: '600', fontSize: '14px' }}>Telefone</th>
                  <th style={{ padding: '18px 16px', textAlign: 'left', color: 'white', fontWeight: '600', fontSize: '14px' }}>Operadora</th>
                  <th style={{ padding: '18px 16px', textAlign: 'left', color: 'white', fontWeight: '600', fontSize: '14px' }}>Vidas</th>
                  <th style={{ padding: '18px 16px', textAlign: 'left', color: 'white', fontWeight: '600', fontSize: '14px' }}>Data</th>
                  <th style={{ padding: '18px 16px', textAlign: 'center', color: 'white', fontWeight: '600', fontSize: '14px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {leadsFiltrados.map((lead, i) => (
                  <tr key={lead.id} style={{
                    borderBottom: '1px solid rgba(197, 188, 181, 0.1)',
                    background: i % 2 === 0 ? 'white' : 'rgba(250, 248, 245, 0.5)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(168, 135, 122, 0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = i % 2 === 0 ? 'white' : 'rgba(250, 248, 245, 0.5)'}
                  >
                    <td style={{ padding: '16px', color: '#333', fontWeight: '600', fontSize: '14px' }}>{lead.nome}</td>
                    <td style={{ padding: '16px', color: '#666', fontSize: '13px' }}>{lead.email}</td>
                    <td style={{ padding: '16px', color: '#666', fontSize: '13px', fontFamily: 'monospace' }}>{lead.telefone}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px',
                        background: 'rgba(168, 135, 122, 0.1)',
                        color: '#A8877A',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {lead.operadora || 'N/A'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#9B9289', fontSize: '13px', textAlign: 'center' }}>{lead.vidas || '-'}</td>
                    <td style={{ padding: '16px', color: '#9B9289', fontSize: '12px', whiteSpace: 'nowrap' }}>
                      {new Date(lead.data_envio).toLocaleString('pt-BR')}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => deletarLead(lead.id)}
                        style={{
                          padding: '8px 16px',
                          background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.3)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        🗑️ Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
