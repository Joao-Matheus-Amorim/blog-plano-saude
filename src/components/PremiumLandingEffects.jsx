import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function PremiumWebGL() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    camera.position.z = 5;

    const total = window.innerWidth < 768 ? 260 : 700;
    const positions = new Float32Array(total * 3);
    for (let i = 0; i < total; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6b8c52,
      size: window.innerWidth < 768 ? 0.052 : 0.038,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.05, 0.24, 90, 16, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0x4a6b3a, metalness: 0.88, roughness: 0.08, transparent: true, opacity: 0.12 })
    );
    knot.position.set(3.5, 0.35, -3);
    scene.add(knot);

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshStandardMaterial({ color: 0x6b8c52, metalness: 0.7, roughness: 0.22, transparent: true, opacity: 0.1, wireframe: true })
    );
    ico.position.set(-3.3, 1.3, -2.2);
    scene.add(ico);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.016, 16, 90),
      new THREE.MeshBasicMaterial({ color: 0x8aab6e, transparent: true, opacity: 0.11 })
    );
    ring.position.set(1.4, -2.1, -2.2);
    ring.rotation.x = 0.5;
    scene.add(ring);

    scene.add(new THREE.AmbientLight(0x4a6b3a, 0.7));
    const light = new THREE.DirectionalLight(0x8aab6e, 0.9);
    light.position.set(5, 5, 5);
    scene.add(light);
    const point = new THREE.PointLight(0x6b8c52, 1.4, 12);
    point.position.set(0, 3, -1);
    scene.add(point);

    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;
    let time = 0;

    const move = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);
      time += 0.004;
      particles.rotation.y = time * 0.05;
      knot.rotation.x = time * 0.24;
      knot.rotation.y = time * 0.38;
      ico.rotation.x = time * 0.2;
      ico.rotation.y = time * 0.3;
      ring.rotation.z = time * 0.1;
      ring.position.y = -2.1 + Math.sin(time * 0.35 + 2) * 0.3;
      point.position.x = Math.sin(time * 0.4) * 3;
      point.position.z = Math.cos(time * 0.4) * 3 - 1;
      camera.position.x += (mouseX * 0.28 - camera.position.x) * 0.045;
      camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.045;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('resize', resize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      knot.geometry.dispose();
      knot.material.dispose();
      ico.geometry.dispose();
      ico.material.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas className="elite-webgl" ref={canvasRef} aria-hidden="true" />;
}

function PremiumCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frame = 0;

    const move = (event) => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.left = `${mx - 5}px`;
      dot.style.top = `${my - 5}px`;
    };
    const enter = () => {
      dot.classList.add('is-hot');
      ring.classList.add('is-hot');
    };
    const leave = () => {
      dot.classList.remove('is-hot');
      ring.classList.remove('is-hot');
    };
    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = `${rx - 19}px`;
      ring.style.top = `${ry - 19}px`;
      frame = requestAnimationFrame(loop);
    };

    const targets = document.querySelectorAll('a, button, [data-tilt], .elite-stack');
    document.addEventListener('mousemove', move);
    targets.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    loop();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', move);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      <div className="elite-cursor-dot" ref={dotRef} />
      <div className="elite-cursor-ring" ref={ringRef} />
    </>
  );
}

function PremiumTilt() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const stack = document.querySelector('.elite-stack');
    const cards = document.querySelectorAll('[data-tilt]');

    const moveStack = (event) => {
      if (!stack) return;
      const rect = stack.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stack.style.transform = `perspective(850px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
    };
    const leaveStack = () => {
      if (stack) stack.style.transform = '';
    };
    const moveCard = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) scale(1.01) perspective(760px) rotateY(${x * 8}deg) rotateX(${-y * 7}deg)`;
    };
    const leaveCard = (event) => {
      event.currentTarget.style.transform = '';
    };

    stack?.addEventListener('mousemove', moveStack);
    stack?.addEventListener('mouseleave', leaveStack);
    cards.forEach((card) => {
      card.addEventListener('mousemove', moveCard);
      card.addEventListener('mouseleave', leaveCard);
    });

    return () => {
      stack?.removeEventListener('mousemove', moveStack);
      stack?.removeEventListener('mouseleave', leaveStack);
      cards.forEach((card) => {
        card.removeEventListener('mousemove', moveCard);
        card.removeEventListener('mouseleave', leaveCard);
      });
    };
  }, []);

  return null;
}

function MilitaryCssAdaptation() {
  return (
    <style>{`
      .elite-page {
        --bg0: #080e06;
        --bg1: #0d160a;
        --g0: #2d4a24;
        --g1: #4a6b3a;
        --g2: #6b8c52;
        --g3: #8aab6e;
        --g4: #a8c48a;
        --text: #d8e8cc;
        --muted: rgba(216,232,204,.45);
        --glass: rgba(13,22,10,.55);
        --glass2: rgba(45,74,36,.25);
        --gb: rgba(106,140,82,.22);
        --gb2: rgba(138,171,110,.35);
        --glow: rgba(106,140,82,.25);
        --glow2: rgba(138,171,110,.12);
        background: var(--bg0);
        color: var(--text);
      }
      .elite-page::after {
        opacity: .5;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        background-size: auto;
        mix-blend-mode: normal;
      }
      .elite-nav {
        top: 22px;
        gap: 40px;
        padding: 14px 40px;
        background: var(--glass);
        border: 1px solid var(--gb2);
        border-radius: 100px;
        box-shadow: 0 8px 48px rgba(0,0,0,.55), 0 0 0 1px rgba(138,171,110,.06), inset 0 1px 0 rgba(168,196,138,.08);
      }
      .elite-nav-links { gap: 28px; }
      .elite-nav-links a {
        min-height: auto;
        padding: 0;
        font-size: .75rem;
        font-weight: 500;
        color: var(--muted);
        letter-spacing: .12em;
        position: relative;
      }
      .elite-nav-links a::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--g3);
        transition: width .3s;
      }
      .elite-nav-links a:hover {
        color: var(--g3);
        background: transparent;
      }
      .elite-nav-links a:hover::after { width: 100%; }
      .elite-nav-cta {
        min-height: auto;
        padding: 9px 24px;
        color: var(--g4);
        background: linear-gradient(135deg,var(--g1),var(--g0));
        box-shadow: 0 0 20px var(--glow), inset 0 1px 0 rgba(168,196,138,.1);
      }
      .elite-nav-cta:hover {
        background: linear-gradient(135deg,var(--g2),var(--g1));
        box-shadow: 0 0 40px var(--glow);
        transform: scale(1.05);
      }
      .elite-btn {
        min-height: auto;
        padding: 15px 38px;
        font-size: .9rem;
        font-weight: 500;
        letter-spacing: .03em;
      }
      .elite-btn.primary {
        color: var(--g4);
        background: linear-gradient(135deg,var(--g2),var(--g0));
        box-shadow: 0 0 36px var(--glow), inset 0 1px 0 rgba(168,196,138,.1);
      }
      .elite-btn.primary:hover {
        box-shadow: 0 0 60px rgba(106,140,82,.5);
      }
      .elite-btn.ghost {
        background: var(--glass);
        color: var(--text);
      }
      .elite-btn.ghost:hover {
        border-color: var(--g3);
        color: var(--g3);
        background: rgba(74,107,58,.2);
      }
      .elite-hero {
        min-height: 100vh;
        padding: 120px 60px 100px;
        gap: 80px;
        max-width: 1260px;
      }
      .elite-title {
        font-size: clamp(2.8rem,5.5vw,6rem);
        line-height: .92;
        letter-spacing: -.025em;
      }
      .elite-title em {
        background: linear-gradient(130deg,var(--g3),var(--g2));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .elite-sub {
        max-width: 420px;
        font-size: .97rem;
        line-height: 1.76;
        font-weight: 300;
      }
      .elite-metric strong { font-size: 2.4rem; }
      .elite-card-scene { height: 480px; }
      .elite-stack { width: 360px; height: 230px; }
      .elite-glass-card {
        border-radius: 24px;
        padding: 28px 32px;
        box-shadow: 0 32px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(168,196,138,.12), inset 0 -1px 0 rgba(0,0,0,.2);
      }
      .elite-card-a {
        background: rgba(13,22,10,.7);
        transform: perspective(900px) rotateX(10deg) rotateY(-8deg) translateZ(-90px) translateY(45px) translateX(-22px) scale(.92);
      }
      .elite-card-b {
        background: rgba(29,46,22,.65);
        transform: perspective(900px) rotateX(5deg) rotateY(-4deg) translateZ(-38px) translateY(22px) translateX(-10px) scale(.96);
      }
      .elite-card-c {
        background: linear-gradient(135deg,rgba(74,107,58,.55),rgba(45,74,36,.65));
      }
      .elite-stack:hover .elite-card-a {
        transform: perspective(900px) rotateX(12deg) rotateY(-10deg) translateZ(-110px) translateY(58px) translateX(-28px) scale(.9);
      }
      .elite-stack:hover .elite-card-b {
        transform: perspective(900px) rotateX(6deg) rotateY(-5deg) translateZ(-52px) translateY(30px) translateX(-14px) scale(.95);
      }
      .elite-card-name { font-size: 1.1rem; letter-spacing: .04em; }
      .elite-chip { padding: 4px 13px; font-size: .62rem; }
      .elite-card-label { font-size: .62rem; }
      .elite-card-price { font-size: 2.6rem; }
      .elite-tag { font-size: .63rem; padding: 3px 10px; }
      .elite-section {
        max-width: 1260px;
        padding: 120px 60px;
      }
      .elite-head { margin-bottom: 60px; }
      .elite-section-title {
        font-size: clamp(2rem,4vw,4.2rem);
        letter-spacing: -.025em;
      }
      .elite-head p {
        font-size: .85rem;
        max-width: 270px;
        color: var(--muted);
      }
      .elite-plan, .elite-mini, .elite-testi, .elite-coverage-main {
        border-radius: 24px;
        background: var(--glass2);
        box-shadow: inset 0 1px 0 rgba(168,196,138,.07);
      }
      .elite-plan { padding: 44px 38px; gap: 28px; }
      .elite-plan.featured {
        background: linear-gradient(160deg,rgba(74,107,58,.35),rgba(45,74,36,.4));
        box-shadow: 0 0 60px var(--glow2), inset 0 1px 0 rgba(168,196,138,.1);
      }
      .elite-plan h3 { font-size: 1.5rem; }
      .elite-plan-price { font-size: 2.35rem; }
      .elite-feature { font-size: .84rem; }
      .elite-coverage-grid { gap: 18px; }
      .elite-coverage-main { border-radius: 26px; padding: 52px; }
      .elite-mini { border-radius: 22px; padding: 34px; }
      .elite-mini h4 { font-size: 1.25rem; }
      .elite-mini p { font-size: .79rem; line-height: 1.65; }
      .elite-testi { border-radius: 22px; padding: 38px; }
      .elite-testi p { font-size: 1rem; line-height: 1.65; }
      .elite-cta-box {
        padding: 100px 90px;
        border-radius: 36px;
        box-shadow: 0 0 120px rgba(45,74,36,.25), inset 0 1px 0 rgba(168,196,138,.1);
      }
      @media(max-width:980px) {
        .elite-nav { top: 84px; left: 14px; right: 14px; transform: none; gap: 16px; padding: 12px 22px; }
        .elite-hero { padding: 100px 28px 80px; grid-template-columns: 1fr; text-align: center; }
        .elite-card-scene { display: none; }
        .elite-actions { justify-content: center; }
        .elite-metrics { justify-content: center; }
        .elite-eyebrow, .elite-kicker { justify-content: center; }
        .elite-sub { margin-left: auto; margin-right: auto; }
        .elite-section { padding-left: 28px; padding-right: 28px; }
        .elite-plan-grid, .elite-testimonials { grid-template-columns: 1fr; }
        .elite-coverage-grid { grid-template-columns: 1fr; }
        .elite-coverage-main { grid-row: span 1; }
        .elite-cta-box { grid-template-columns: 1fr; text-align: center; padding: 56px 28px; }
        .elite-cta-actions { align-items: center; }
        .elite-head { flex-direction: column; gap: 16px; align-items: center; text-align: center; }
        .elite-head p { text-align: left; }
      }
      @media(max-width:560px) {
        .elite-hero { text-align: left; }
        .elite-eyebrow, .elite-kicker, .elite-actions { justify-content: flex-start; }
        .elite-sub { margin-left: 0; margin-right: 0; }
        .elite-actions .elite-btn { width: 100%; }
      }
    `}</style>
  );
}

export default function PremiumLandingEffects() {
  return (
    <>
      <PremiumWebGL />
      <PremiumCursor />
      <PremiumTilt />
      <MilitaryCssAdaptation />
    </>
  );
}
