import { useEffect, useRef, useState } from 'react';
import '../vita.css';

// ── lazy load Three.js ──────────────────────────────────
function loadThreeScript(cb) {
  if (window.THREE) { cb(); return; }
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload = cb;
  document.head.appendChild(s);
}

// ── counter animation ───────────────────────────────────
function countUp(el, end, sfx) {
  const t0 = performance.now();
  (function f(now) {
    const p = Math.min((now - t0) / 1800, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * end) + sfx;
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}

export default function PaginaVita() {
  const canvasRef    = useRef(null);
  const stackRef     = useRef(null);
  const navRef       = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── init Three.js (idle / lazy) ─────────────────────
  useEffect(() => {
    const reduced  = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const lowEnd   = navigator.hardwareConcurrency <= 2;
    if (reduced || lowEnd) return;

    const init = () => {
      if (!canvasRef.current || !window.THREE) return;
      const THREE  = window.THREE;
      const scene  = new THREE.Scene();
      const cam    = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
      const rdr    = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      rdr.setSize(window.innerWidth, window.innerHeight);
      rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      cam.position.z = 5;

      const N = 500, pArr = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pArr[i * 3]     = (Math.random() - 0.5) * 24;
        pArr[i * 3 + 1] = (Math.random() - 0.5) * 24;
        pArr[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
      scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
        color: 0xc8b89a, size: 0.032, transparent: true, opacity: 0.35,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })));

      const gem = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.8, 1),
        new THREE.MeshStandardMaterial({ color: 0xc8b89a, metalness: 0.95, roughness: 0.05, transparent: true, opacity: 0.1 })
      );
      gem.position.set(3.5, 0, -3); scene.add(gem);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.018, 16, 80),
        new THREE.MeshBasicMaterial({ color: 0xc8b89a, transparent: true, opacity: 0.12 })
      );
      ring.position.set(-3, -1, -2); ring.rotation.x = 0.4; scene.add(ring);

      const sph = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x8b7355, metalness: 1, roughness: 0, transparent: true, opacity: 0.08 })
      );
      sph.position.set(-2, 2.5, -2); scene.add(sph);

      const grd = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0x8b7355, wireframe: true, transparent: true, opacity: 0.015 })
      );
      grd.rotation.x = -Math.PI / 2.6; grd.position.y = -5; scene.add(grd);

      scene.add(new THREE.AmbientLight(0xc8b89a, 0.5));
      const dl = new THREE.DirectionalLight(0xf0ebe3, 0.8);
      dl.position.set(5, 5, 5); scene.add(dl);

      let gx = 0, gy = 0, t = 0, alive = true;
      const onMouse = (e) => {
        gx = (e.clientX / window.innerWidth  - 0.5) * 2;
        gy = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouse);

      const onResize = () => {
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
        rdr.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize, { passive: true });

      (function anim() {
        if (!alive) return;
        requestAnimationFrame(anim); t += 0.003;
        gem.rotation.x = t * 0.18; gem.rotation.y = t * 0.27;
        gem.position.y = Math.sin(t * 0.5) * 0.3;
        ring.rotation.z = t * 0.12;
        ring.position.y = -1 + Math.sin(t * 0.4 + 1) * 0.25;
        sph.position.y = 2.5 + Math.sin(t * 0.45 + 2) * 0.22;
        cam.position.x += (gx * 0.25 - cam.position.x) * 0.04;
        cam.position.y += (gy * 0.15 - cam.position.y) * 0.04;
        cam.lookAt(scene.position);
        rdr.render(scene, cam);
      })();

      return () => {
        alive = false;
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        rdr.dispose();
      };
    };

    let cleanup;
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadThreeScript(() => { cleanup = init(); }), { timeout: 2000 });
    } else {
      setTimeout(() => loadThreeScript(() => { cleanup = init(); }), 1500);
    }
    return () => cleanup && cleanup();
  }, []);

  // ── card parallax ───────────────────────────────────
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const stack = stackRef.current;
    if (!stack) return;
    const onMouse = (e) => {
      const rx =  (e.clientY / window.innerHeight - 0.5) * 12;
      const ry = -(e.clientX / window.innerWidth  - 0.5) * 12;
      stack.style.transform  = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      stack.style.transition = 'transform .08s ease';
    };
    const onLeave = () => {
      stack.style.transform  = '';
      stack.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)';
    };
    window.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── scroll reveal ───────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.vita-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ── counters ─────────────────────────────────────────
  useEffect(() => {
    const metrics = document.querySelector('.vita-h-metrics');
    if (!metrics) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('[data-vcount]').forEach(el => {
          const raw = el.dataset.vcount;
          const num = parseInt(raw);
          const sfx = raw.replace(String(num), '');
          countUp(el, num, sfx);
        });
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(metrics);
    return () => obs.disconnect();
  }, []);

  // ── bar animation ─────────────────────────────────────
  useEffect(() => {
    const barSec = document.querySelector('.vita-cov-bars');
    if (!barSec) return;
    document.querySelectorAll('.vita-bar-fill').forEach(b => b.style.animationPlayState = 'paused');
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.vita-bar-fill').forEach(b => b.style.animationPlayState = 'running');
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(barSec);
    return () => obs.disconnect();
  }, []);

  // ── nav scroll class ─────────────────────────────────
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── drawer: fechar com ESC ───────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // ── bloquear scroll do body quando drawer aberto ─────
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <div className="vita-root">
      {/* cursor */}
      <div className="vita-cursor-dot"  id="vita-c"  />
      <div className="vita-cursor-ring" id="vita-cr" />

      {/* canvas */}
      <canvas ref={canvasRef} className="vita-canvas" />

      {/* ── NAV ── */}
      <nav className="vita-nav" ref={navRef}>
        <div className="vita-logo">Vi<span>ta</span></div>
        <div className="vita-nav-r">
          <div className="vita-nav-links">
            <a href="#vita-planos">Planos</a>
            <a href="#vita-cobertura">Cobertura</a>
            <a href="#">Rede</a>
            <a href="#">Sobre</a>
          </div>
          <button className="vita-nav-btn">Entrar</button>
          <button
            className={`vita-ham${drawerOpen ? ' open' : ''}`}
            onClick={() => setDrawerOpen(v => !v)}
            aria-label="Abrir menu de navegação"
            aria-expanded={drawerOpen}
            aria-controls="vita-drawer"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        id="vita-drawer"
        className={`vita-drawer${drawerOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <a href="#vita-planos"    onClick={() => setDrawerOpen(false)}>Planos</a>
        <a href="#vita-cobertura" onClick={() => setDrawerOpen(false)}>Cobertura</a>
        <a href="#"               onClick={() => setDrawerOpen(false)}>Rede</a>
        <a href="#"               onClick={() => setDrawerOpen(false)}>Sobre</a>
        <button className="vita-drawer-btn" onClick={() => setDrawerOpen(false)}>Entrar</button>
      </div>

      {/* ── HERO ── */}
      <section className="vita-hero vita-section">
        <div className="vita-hero-left">
          <div className="vita-h-eyebrow">Cuidado de excelência</div>
          <h1 className="vita-h-title">Saúde que<br />cabe no seu<br /><em>estilo de vida</em></h1>
          <p className="vita-h-sub">Um plano de saúde pensado para quem não aceita o mínimo. Cobertura completa, rede premium e tecnologia que antecipa o que você precisa.</p>
          <div className="vita-h-actions">
            <button className="vita-btn-main">Ver meu plano ideal</button>
            <button className="vita-btn-out">Simular cobertura</button>
          </div>
          <div className="vita-h-metrics">
            <div className="vita-metric">
              <div className="vita-metric-n" data-vcount="380">380</div>
              <div className="vita-metric-l">Hospitais na rede</div>
            </div>
            <div className="vita-metric">
              <div className="vita-metric-n" data-vcount="24">24h</div>
              <div className="vita-metric-l">Suporte médico</div>
            </div>
            <div className="vita-metric">
              <div className="vita-metric-n" data-vcount="98">98%</div>
              <div className="vita-metric-l">Aprovação NPS</div>
            </div>
          </div>
        </div>

        {/* card stack — só visível em lg+ via CSS */}
        <div className="vita-hero-right">
          <div className="vita-card-stack" ref={stackRef}>

            <div className="vita-plan-card vita-pc-essential">
              <div className="vita-pc-top">
                <div><div className="vita-pc-label">Plano</div><div className="vita-pc-tier">Essential</div></div>
                <div className="vita-pc-chip">Base</div>
              </div>
              <div className="vita-pc-price"><sup>R$</sup>189<sub>/mês</sub></div>
              <div className="vita-pc-features"><span>Consultas</span><span>Exames</span><span>Urgência</span></div>
            </div>

            <div className="vita-plan-card vita-pc-plus">
              <div className="vita-pc-top">
                <div><div className="vita-pc-label">Plano</div><div className="vita-pc-tier">Plus</div></div>
                <div className="vita-pc-chip">Popular</div>
              </div>
              <div className="vita-pc-price"><sup>R$</sup>349<sub>/mês</sub></div>
              <div className="vita-pc-features"><span>Tudo Essential</span><span>Internação</span><span>Cirurgias</span></div>
            </div>

            <div className="vita-plan-card vita-pc-elite">
              <div className="vita-pc-top">
                <div>
                  <div className="vita-pc-label" style={{ color: 'rgba(17,16,9,.55)' }}>Plano</div>
                  <div className="vita-pc-tier"  style={{ color: 'var(--ink)' }}>Elite</div>
                </div>
                <div className="vita-pc-chip" style={{ background: 'rgba(17,16,9,.12)', borderColor: 'rgba(17,16,9,.18)', color: 'var(--ink)' }}>Premium</div>
              </div>
              <div className="vita-pc-price" style={{ color: 'var(--ink)' }}>
                <sup style={{ color: 'rgba(17,16,9,.55)' }}>R$</sup>689<sub style={{ color: 'rgba(17,16,9,.5)' }}>/mês</sub>
              </div>
              <div className="vita-pc-features">
                <span style={{ background: 'rgba(17,16,9,.08)', borderColor: 'rgba(17,16,9,.12)', color: 'rgba(17,16,9,.7)' }}>Cobertura total</span>
                <span style={{ background: 'rgba(17,16,9,.08)', borderColor: 'rgba(17,16,9,.12)', color: 'rgba(17,16,9,.7)' }}>Internacional</span>
                <span style={{ background: 'rgba(17,16,9,.08)', borderColor: 'rgba(17,16,9,.12)', color: 'rgba(17,16,9,.7)' }}>Concierge</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className="vita-plans vita-section" id="vita-planos">
        <div className="vita-section-head vita-reveal">
          <div className="vita-sh-l">
            <div className="vita-sh-eyebrow">Escolha seu plano</div>
            <h2>Proteção em<br />três dimensões</h2>
          </div>
          <p className="vita-sh-r">Cada plano foi desenhado para um momento de vida diferente. Sem letras miúdas, sem surpresas.</p>
        </div>

        <div className="vita-plans-grid">
          {/* Essential */}
          <div className="vita-plan-tile vita-reveal vita-d1" role="article" aria-labelledby="plan-essential-title">
            <div>
              <div className="vita-pt-name" id="plan-essential-title">Essential</div>
              <div className="vita-pt-price"><span className="vita-pt-currency">R$</span><span className="vita-pt-amount">189</span><span className="vita-pt-period">/mês por pessoa</span></div>
            </div>
            <p className="vita-pt-desc">Cobertura essencial para consultas, exames de rotina e atendimento de urgência em toda a rede credenciada.</p>
            <div className="vita-pt-features">
              <div className="vita-pt-feat">Consultas ilimitadas na rede</div>
              <div className="vita-pt-feat">Exames laboratoriais básicos</div>
              <div className="vita-pt-feat">Pronto-socorro 24h</div>
              <div className="vita-pt-feat">Telemedicina inclusa</div>
              <div className="vita-pt-feat dim">Internação hospitalar</div>
              <div className="vita-pt-feat dim">Cobertura internacional</div>
            </div>
            <button className="vita-pt-btn" aria-label="Contratar plano Essential por R$189 ao mês">Contratar Essential</button>
          </div>

          {/* Plus */}
          <div className="vita-plan-tile featured vita-reveal vita-d2" role="article" aria-labelledby="plan-plus-title">
            <div className="vita-feat-badge">Mais escolhido</div>
            <div>
              <div className="vita-pt-name" id="plan-plus-title">Plus</div>
              <div className="vita-pt-price"><span className="vita-pt-currency">R$</span><span className="vita-pt-amount">349</span><span className="vita-pt-period">/mês por pessoa</span></div>
            </div>
            <p className="vita-pt-desc">A escolha certa para famílias. Internação completa, cirurgias eletivas e cobertura ambulatorial sem carências longas.</p>
            <div className="vita-pt-features">
              <div className="vita-pt-feat">Tudo do Essential</div>
              <div className="vita-pt-feat">Internação hospitalar</div>
              <div className="vita-pt-feat">Cirurgias eletivas</div>
              <div className="vita-pt-feat">Parto normal e cesariana</div>
              <div className="vita-pt-feat">Fisioterapia e nutrição</div>
              <div className="vita-pt-feat dim">Cobertura internacional</div>
            </div>
            <button className="vita-pt-btn" aria-label="Contratar plano Plus por R$349 ao mês">Contratar Plus</button>
          </div>

          {/* Elite */}
          <div className="vita-plan-tile vita-reveal vita-d3" role="article" aria-labelledby="plan-elite-title">
            <div>
              <div className="vita-pt-name" id="plan-elite-title">Elite</div>
              <div className="vita-pt-price"><span className="vita-pt-currency">R$</span><span className="vita-pt-amount">689</span><span className="vita-pt-period">/mês por pessoa</span></div>
            </div>
            <p className="vita-pt-desc">Experiência sem compromisso. Cobertura internacional, concierge médico pessoal e acesso a clínicas parceiras no exterior.</p>
            <div className="vita-pt-features">
              <div className="vita-pt-feat">Tudo do Plus</div>
              <div className="vita-pt-feat">Cobertura internacional</div>
              <div className="vita-pt-feat">Concierge médico 24h</div>
              <div className="vita-pt-feat">Check-up executivo anual</div>
              <div className="vita-pt-feat">Saúde mental inclusa</div>
              <div className="vita-pt-feat">Quarto privativo sempre</div>
            </div>
            <button className="vita-pt-btn" aria-label="Contratar plano Elite por R$689 ao mês">Contratar Elite</button>
          </div>
        </div>
      </section>

      {/* ── COVERAGE ── */}
      <section className="vita-coverage vita-section" id="vita-cobertura">
        <div className="vita-cov-grid">
          <div className="vita-cov-main vita-reveal">
            <div className="vita-cov-title">Cobertura <em>ampla</em> onde você mais precisa</div>
            <div className="vita-cov-bars">
              {[
                { label: 'Consultas & Exames',    val: '100%', w: '100%' },
                { label: 'Internação hospitalar', val: '100%', w: '100%' },
                { label: 'Saúde mental',          val: '92%',  w: '92%'  },
                { label: 'Medicina preventiva',   val: '85%',  w: '85%'  },
                { label: 'Cobertura internacional', val: '75%', w: '75%' },
              ].map((b, i) => (
                <div key={i} className="vita-bar-row">
                  <div className="vita-bar-label"><span>{b.label}</span><strong>{b.val}</strong></div>
                  <div className="vita-bar-track">
                    <div className="vita-bar-fill" style={{ '--w': b.w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {[
            { ico: '🏥', title: '380 hospitais',       desc: 'Rede credenciada nas principais capitais e cidades do Brasil, com hospitais de referência.', delay: 'vita-d1' },
            { ico: '⚡', title: 'Autorização rápida',  desc: 'Procedimentos autorizados em até 2 horas via app. Sem burocracia, sem espera.',              delay: 'vita-d2' },
            { ico: '📱', title: 'App inteligente',     desc: 'Consultas por vídeo, carteirinha digital, histórico de saúde e lembretes personalizados.',    delay: 'vita-d1' },
            { ico: '🌍', title: 'Cobertura global',    desc: 'Plano Elite com assistência médica em mais de 120 países sem custo adicional.',               delay: 'vita-d2' },
          ].map((c, i) => (
            <div key={i} className={`vita-cov-small vita-reveal ${c.delay}`}>
              <div className="vita-cov-ico">{c.ico}</div>
              <div className="vita-cov-small-t">{c.title}</div>
              <p className="vita-cov-small-p">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="vita-tstrip vita-section">
        <div className="vita-tstrip-inner vita-reveal">
          {[
            { text: '"Migrei de um plano tradicional e a diferença foi imediata. Em 3 anos, nunca tive problema de cobertura."', av: 'MF', name: 'Mariana Figueiredo', role: 'Plano Elite · 3 anos' },
            { text: '"Atendimento de madrugada pelo app, resultado de exame em 4 horas. Isso é o que eu chamo de saúde moderna."',  av: 'CS', name: 'Carlos Souza',       role: 'Plano Plus · 1 ano'  },
            { text: '"Contratei o Plus para toda a família. O nascimento da minha filha foi coberto 100%, sem nenhuma surpresa na fatura."', av: 'RB', name: 'Renata Barros', role: 'Plano Plus · 2 anos' },
          ].map((t, i) => (
            <>
              {i > 0 && <div key={`d${i}`} className="vita-tstrip-divider" />}
              <div key={i} className="vita-tq">
                <p className="vita-tq-text">{t.text}</p>
                <div className="vita-tq-author">
                  <div className="vita-tq-av">{t.av}</div>
                  <div>
                    <div className="vita-tq-name">{t.name}</div>
                    <div className="vita-tq-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="vita-cta vita-section">
        <div className="vita-cta-box vita-reveal">
          <div className="vita-cta-l">
            <div className="vita-cta-eyebrow">Comece agora</div>
            <h2 className="vita-cta-title">Seu plano pronto<br />em 5 minutos</h2>
            <p className="vita-cta-sub">Sem médicos, sem exames prévios, sem carência para urgências. Preencha seus dados e ative hoje.</p>
          </div>
          <div className="vita-cta-r">
            <button className="vita-btn-main">Contratar agora</button>
            <button className="vita-btn-out">Falar com um consultor</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="vita-footer vita-section">
        <div className="vita-f-logo">Vi<span>ta</span></div>
        <p className="vita-f-copy">© 2026 Vita Saúde. ANS 123456. Todos os direitos reservados.</p>
        <ul className="vita-f-links">
          <li><a href="#">Privacidade</a></li>
          <li><a href="#">ANS</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </footer>
    </div>
  );
}
