import { Link, useLocation } from 'react-router-dom';

const adminLinks = [
  { href: '/admin', label: 'CRM', description: 'Leads' },
  { href: '/admin/radar', label: 'Radarplan', description: 'Prospectos' },
  { href: '/admin/organico', label: 'Orgânico', description: 'Sessões' },
  { href: '/admin/links', label: 'Links', description: 'Origens' },
];

export default function AdminDock() {
  const location = useLocation();
  if (!location.pathname.startsWith('/admin')) return null;

  return (
    <nav className="admin-dock" aria-label="Navegação administrativa">
      <style>{`
        .admin-dock {
          position: fixed;
          top: 92px;
          right: clamp(18px, 4vw, 52px);
          z-index: 80;
          display: inline-flex;
          width: max-content;
          max-width: calc(100vw - 36px);
          gap: 8px;
          padding: 8px;
          border: 1px solid rgba(168,196,138,.28);
          border-radius: 999px;
          background: rgba(7, 13, 5, .82);
          backdrop-filter: blur(24px) saturate(170%);
          -webkit-backdrop-filter: blur(24px) saturate(170%);
          box-shadow: 0 22px 70px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.08);
          pointer-events: none;
        }
        .admin-dock a {
          min-height: 42px;
          min-width: 112px;
          padding: 0 14px;
          border-radius: 999px;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: rgba(237,248,230,.66);
          border: 1px solid transparent;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .04em;
          text-transform: uppercase;
          pointer-events: auto;
          touch-action: manipulation;
        }
        .admin-dock a:focus-visible {
          outline: 3px solid rgba(168,196,138,.72);
          outline-offset: 3px;
        }
        .admin-dock a span {
          margin-top: 2px;
          color: rgba(237,248,230,.42);
          font-size: 10px;
          letter-spacing: .02em;
          text-transform: none;
        }
        .admin-dock a.is-active {
          color: #eff8e7;
          border-color: rgba(168,196,138,.34);
          background: linear-gradient(135deg, rgba(107,140,82,.92), rgba(45,74,36,.92));
          box-shadow: 0 0 28px rgba(106,140,82,.22), inset 0 1px 0 rgba(255,255,255,.13);
        }
        .admin-dock a.is-active span { color: rgba(237,248,230,.74); }
        @media (min-width: 1480px) {
          .admin-dock {
            top: 50%;
            right: 24px;
            transform: translateY(-50%);
            flex-direction: column;
            border-radius: 28px;
          }
          .admin-dock a {
            min-width: 118px;
            min-height: 56px;
          }
        }
        @media (max-width: 1120px) {
          .admin-dock {
            top: 74px;
            left: 50%;
            right: auto;
            transform: translateX(-50%);
            justify-content: center;
          }
          .admin-dock a {
            min-width: 100px;
          }
        }
        @media (max-width: 760px) {
          .admin-dock {
            top: auto;
            left: 10px;
            right: 10px;
            bottom: 10px;
            transform: none;
            width: auto;
            max-width: none;
            border-radius: 24px;
            overflow-x: auto;
            justify-content: flex-start;
            -webkit-overflow-scrolling: touch;
          }
          .admin-dock a {
            flex: 0 0 auto;
            min-width: 104px;
            min-height: 44px;
          }
        }
      `}</style>
      {adminLinks.map((link) => {
        const active = location.pathname === link.href;
        return (
          <Link className={active ? 'is-active' : ''} to={link.href} key={link.href}>
            {link.label}
            <span>{link.description}</span>
          </Link>
        );
      })}
    </nav>
  );
}
