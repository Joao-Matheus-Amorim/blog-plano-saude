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
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px clamp(14px, 4vw, 52px);
          border-bottom: 1px solid rgba(168,196,138,.20);
          background: rgba(7, 13, 5, .94);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          box-shadow: 0 18px 46px rgba(0,0,0,.22);
          box-sizing: border-box;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .admin-dock a {
          min-height: 46px;
          min-width: 126px;
          padding: 0 16px;
          border-radius: 999px;
          display: inline-flex;
          flex: 0 0 auto;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: rgba(237,248,230,.68);
          border: 1px solid rgba(168,196,138,.18);
          background: rgba(5,8,5,.24);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .04em;
          text-transform: uppercase;
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
          border-color: rgba(168,196,138,.36);
          background: linear-gradient(135deg, rgba(107,140,82,.92), rgba(45,74,36,.92));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.13);
        }
        .admin-dock a.is-active span { color: rgba(237,248,230,.74); }
        @media (min-width: 1180px) {
          .admin-dock {
            justify-content: flex-end;
          }
        }
        @media (max-width: 760px) {
          .admin-dock {
            justify-content: flex-start;
            padding: 10px;
          }
          .admin-dock a {
            min-width: 104px;
            min-height: 44px;
            padding: 0 12px;
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
