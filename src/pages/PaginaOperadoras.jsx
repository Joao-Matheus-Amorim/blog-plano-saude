function PaginaOperadoras() {
  return (
    <div style={{
      paddingTop: '140px',
      minHeight: '100vh',
      background: '#FAF8F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px'
    }}>
      <div>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          color: '#8B7E74',
          fontFamily: "'Playfair Display', serif",
          marginBottom: '20px'
        }}>
          Página Operadoras
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6B6662',
          marginBottom: '30px'
        }}>
          Em construção... 🏗️
        </p>
        <a href="/" style={{
          padding: '14px 32px',
          background: 'linear-gradient(135deg, #A8877A 0%, #8B7E74 100%)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          Voltar para Home
        </a>
      </div>
    </div>
  );
}

export default PaginaOperadoras;
