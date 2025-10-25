import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import SEO from '../components/SEO.jsx';

const supabaseUrl = "https://jdrglgiyyjxyytjcfzbj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmdsZ2l5eWp4eXl0amNmemJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDA2NTQsImV4cCI6MjA3NTkxNjY1NH0.RPoOtFDmxGSscfn1tIET055miHdOW25w0K7vqA7NT98";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PaginaAdmin() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState('todos'); // todos, simulador, formulario
  const [busca, setBusca] = useState('');

  const SENHA_ADMIN = 'jpm2025'; // ⚠️ MUDE ESTA SENHA!

  const handleLogin = (e) => {
    e.preventDefault();
    if (senha === SENHA_ADMIN) {
      setAutenticado(true);
      localStorage.setItem('admin_auth', 'true');
      carregarLeads();
    } else {
      alert('Senha incorreta!');
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setAutenticado(true);
      carregarLeads();
    }
  }, []);

  const carregarLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lead')
        .select('*')
        .order('data_envio', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      alert('Erro ao carregar leads');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAutenticado(false);
    localStorage.removeItem('admin_auth');
    setSenha('');
  };

  const leadsFiltrados = leads.filter(lead => {
    // Filtro por origem
    if (filtro === 'simulador' && !lead.vidas) return false;
    if (filtro === 'formulario' && lead.vidas) return false;

    // Filtro por busca
    if (busca) {
      const termoBusca = busca.toLowerCase();
      return (
        lead.nome?.toLowerCase().includes(termoBusca) ||
        lead.email?.toLowerCase().includes(termoBusca) ||
        lead.telefone?.includes(termoBusca)
      );
    }

    return true;
  });

  const stats = {
    total: leads.length,
    simulador: leads.filter(l => l.vidas).length,
    formulario: leads.filter(l => !l.vidas).length,
    valorTotal: leads.filter(l => l.custo).reduce((acc, l) => acc + Number(l.custo), 0)
  };

  // Tela de Login
  if (!autenticado) {
    return (
      <>
        <SEO title="Admin - Login" />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'white',
              padding: '48px',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              maxWidth: '400px',
              width: '100%'
            }}
          >
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#2D3748',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              🔐 Admin Dashboard
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Área restrita para gestão de leads
            </p>

            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #E2E8F0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  marginBottom: '20px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              />

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Entrar
              </button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  // Dashboard Principal
  return (
    <>
      <SEO title="Admin - Dashboard de Leads" />
      
      <div style={{
        minHeight: '100vh',
        background: '#F7FAFC',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: '700',
                color: '#2D3748',
                marginBottom: '8px'
              }}>
                📊 Dashboard de Leads
              </h1>
              <p style={{ fontSize: '14px', color: '#718096' }}>
                Gestão completa dos seus contatos
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={carregarLeads}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? '⏳' : '🔄'} Atualizar
              </button>

              <button
                onClick={logout}
                style={{
                  padding: '12px 24px',
                  background: '#E53E3E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🚪 Sair
              </button>
            </div>
          </div>

          {/* Estatísticas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {[
              { label: 'Total de Leads', value: stats.total, icon: '📋', color: '#667eea' },
              { label: 'Do Simulador', value: stats.simulador, icon: '🧮', color: '#48BB78' },
              { label: 'Do Formulário', value: stats.formulario, icon: '📝', color: '#ED8936' },
              { label: 'Valor Total', value: `R$ ${stats.valorTotal.toFixed(2)}`, icon: '💰', color: '#9F7AEA' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  border: `2px solid ${stat.color}20`
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: stat.color,
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', fontWeight: '500' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filtros */}
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['todos', 'simulador', 'formulario'].map(f => (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  style={{
                    padding: '10px 20px',
                    background: filtro === f ? '#667eea' : '#E2E8F0',
                    color: filtro === f ? 'white' : '#4A5568',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontSize: '14px'
                  }}
                >
                  {f === 'todos' ? '📋 Todos' : f === 'simulador' ? '🧮 Simulador' : '📝 Formulário'}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="🔍 Buscar por nome, email ou telefone..."
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '12px 16px',
                border: '2px solid #E2E8F0',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Tabela de Leads */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            overflow: 'hidden'
          }}>
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                <p style={{ color: '#718096' }}>Carregando leads...</p>
              </div>
            ) : leadsFiltrados.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <p style={{ color: '#718096' }}>Nenhum lead encontrado</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead style={{
                    background: '#F7FAFC',
                    borderBottom: '2px solid #E2E8F0'
                  }}>
                    <tr>
                      {['Nome', 'Email', 'Telefone', 'Origem', 'Detalhes', 'Data', 'Ações'].map(h => (
                        <th key={h} style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#4A5568',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leadsFiltrados.map((lead, index) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          borderBottom: '1px solid #E2E8F0',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#F7FAFC'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                      >
                        <td style={{ padding: '16px', fontWeight: '600', color: '#2D3748' }}>
                          {lead.nome || '-'}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#4A5568' }}>
                          {lead.email || '-'}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#4A5568' }}>
                          {lead.telefone || '-'}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: lead.vidas ? '#48BB7820' : '#ED893620',
                            color: lead.vidas ? '#48BB78' : '#ED8936'
                          }}>
                            {lead.vidas ? '🧮 Simulador' : '📝 Formulário'}
                          </span>
                        </td>
                        <td style={{ padding: '16px', fontSize: '13px', color: '#4A5568' }}>
                          {lead.vidas ? (
                            <>
                              <div>{lead.operadora}</div>
                              <div>{lead.tipo} - {lead.vidas} vidas</div>
                              <div style={{ fontWeight: '700', color: '#48BB78' }}>
                                R$ {Number(lead.custo || 0).toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <div>{lead.mensagem?.substring(0, 50) || '-'}...</div>
                          )}
                        </td>
                        <td style={{ padding: '16px', fontSize: '13px', color: '#718096' }}>
                          {new Date(lead.data_envio).toLocaleDateString('pt-BR')}
                          <div style={{ fontSize: '11px' }}>
                            {new Date(lead.data_envio).toLocaleTimeString('pt-BR')}
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <a
                            href={`https://wa.me/55${lead.telefone?.replace(/\D/g, '')}?text=Olá ${lead.nome}, vi sua solicitação!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              padding: '8px 16px',
                              background: '#25D366',
                              color: 'white',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            💬 WhatsApp
                          </a>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#718096',
            fontSize: '14px'
          }}>
            Mostrando {leadsFiltrados.length} de {leads.length} leads
          </div>
        </div>
      </div>
    </>
  );
}
