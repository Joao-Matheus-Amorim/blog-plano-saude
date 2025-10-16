import { useState } from 'react';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        href="https://wa.me/5521977472141?text=Olá!%20Gostaria%20de%20uma%20cotação%20de%20plano%20de%20saúde."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered 
            ? '0 12px 32px rgba(37, 211, 102, 0.5)' 
            : '0 8px 24px rgba(37, 211, 102, 0.4)',
          zIndex: 9999,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
          animation: 'pulse 2s infinite'
        }}
        aria-label="Fale no WhatsApp"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Tooltip ao passar o mouse */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            right: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#FFFFFF',
            color: '#2D3748',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            animation: 'slideIn 0.3s ease'
          }}>
            💬 Fale conosco no WhatsApp
            <div style={{
              position: 'absolute',
              right: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid #FFFFFF',
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent'
            }} />
          </div>
        )}
      </a>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          50% {
            box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4), 0 0 0 16px rgba(37, 211, 102, 0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        /* Mobile: ajustar posição */
        @media (max-width: 768px) {
          a[aria-label="Fale no WhatsApp"] {
            bottom: 16px !important;
            right: 16px !important;
            width: 56px !important;
            height: 56px !important;
          }
          
          a[aria-label="Fale no WhatsApp"] svg {
            width: 32px !important;
            height: 32px !important;
          }
        }
      `}</style>
    </>
  );
}
