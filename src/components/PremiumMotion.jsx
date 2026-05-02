import { useEffect } from 'react';
import { animate, inView, stagger } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], .liquid-nav-link, .liquid-cta, .premium-floating-cta, .float-mirror, .glass-effect';
const TILT_SELECTOR = '.float-mirror, .glass-effect, .hero-form-3d, .hero-stat-cell, article, section [style*="border-radius"], footer a';
const REVEAL_SELECTOR = 'main section, main article, main section > div, .float-mirror, .glass-effect, .hero-stat-cell, footer > div, footer h3, footer h4, footer p, footer a';
const GROUP_SELECTOR = 'main section, footer';

export default function PremiumMotion() {
  useEffect(() => {
    const cleanupFns = [];
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (motionReduced) return undefined;

    animate(
      'body',
      { opacity: [0, 1], filter: ['blur(8px)', 'blur(0px)'] },
      { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    );

    const dot = document.createElement('span');
    const ring = document.createElement('span');
    dot.className = 'custom-cursor-dot';
    ring.className = 'custom-cursor-ring';
    document.body.append(dot, ring);

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      ringX: window.innerWidth / 2,
      ringY: window.innerHeight / 2,
      hovering: false
    };

    const moveCursor = (event) => {
      state.x = event.clientX;
      state.y = event.clientY;
      animate(dot, {
        x: state.x,
        y: state.y,
        scale: state.hovering ? 1.7 : 1
      }, { duration: 0.08, ease: 'linear' });
    };

    const animateRing = () => {
      state.ringX += (state.x - state.ringX) * 0.22;
      state.ringY += (state.y - state.ringY) * 0.22;
      animate(ring, {
        x: state.ringX,
        y: state.ringY,
        scale: state.hovering ? 2.05 : 1
      }, { duration: 0.12, ease: 'linear' });
      frame = requestAnimationFrame(animateRing);
    };

    const setHover = (hovering) => {
      state.hovering = hovering;
      document.documentElement.classList.toggle('cursor-is-hovering', hovering);
    };

    const onOver = (event) => {
      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (!target) return;

      setHover(true);
      animate(target, {
        y: -3,
        scale: 1.025,
        filter: 'brightness(1.04)'
      }, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
    };

    const onOut = (event) => {
      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (!target) return;

      setHover(false);
      animate(target, {
        y: 0,
        scale: 1,
        filter: 'brightness(1)'
      }, { duration: 0.24, ease: [0.16, 1, 0.3, 1] });
    };

    const tiltElements = new Set();
    const revealElements = new WeakSet();
    const groupElements = new WeakSet();

    const attachTilt = (element) => {
      if (!element || tiltElements.has(element)) return;
      tiltElements.add(element);
      element.classList.add('premium-tilt');

      const handleMove = (event) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const py = (event.clientY - rect.top) / Math.max(rect.height, 1);
        const rotateY = (px - 0.5) * 16;
        const rotateX = (0.5 - py) * 12;

        element.style.setProperty('--shine-x', `${(px * 100).toFixed(2)}%`);
        element.style.setProperty('--shine-y', `${(py * 100).toFixed(2)}%`);

        animate(element, {
          rotateX,
          rotateY,
          scale: 1.018
        }, { duration: 0.18, ease: 'easeOut' });
      };

      const handleLeave = () => {
        animate(element, {
          rotateX: 0,
          rotateY: 0,
          scale: 1
        }, { duration: 0.34, ease: [0.16, 1, 0.3, 1] });
      };

      element.addEventListener('pointermove', handleMove, { passive: true });
      element.addEventListener('pointerleave', handleLeave);

      element.__premiumTiltCleanup = () => {
        element.removeEventListener('pointermove', handleMove);
        element.removeEventListener('pointerleave', handleLeave);
      };
    };

    const attachReveal = (element, index = 0) => {
      if (!element || revealElements.has(element)) return;
      revealElements.add(element);

      element.style.opacity = '0';
      element.style.transformOrigin = 'center top';

      const stop = inView(
        element,
        () => {
          animate(
            element,
            {
              opacity: [0, 1],
              y: [46, 0],
              scale: [0.965, 1],
              filter: ['blur(12px)', 'blur(0px)']
            },
            {
              duration: 0.82,
              delay: Math.min(index % 8, 7) * 0.055,
              ease: [0.16, 1, 0.3, 1]
            }
          );
        },
        { margin: '0px 0px -12% 0px', amount: 0.12 }
      );

      cleanupFns.push(stop);
    };

    const attachGroupMotion = (element) => {
      if (!element || groupElements.has(element)) return;
      groupElements.add(element);

      const children = Array.from(element.querySelectorAll('h1, h2, h3, p, a, button, article, li')).slice(0, 18);
      if (!children.length) return;

      children.forEach((child) => {
        child.style.opacity = child.style.opacity || '0';
      });

      const stop = inView(
        element,
        () => {
          animate(
            children,
            { opacity: [0, 1], y: [22, 0], filter: ['blur(8px)', 'blur(0px)'] },
            { duration: 0.62, delay: stagger(0.045), ease: [0.16, 1, 0.3, 1] }
          );
        },
        { margin: '0px 0px -18% 0px', amount: 0.1 }
      );

      cleanupFns.push(stop);
    };

    const applySiteMotion = () => {
      document.querySelectorAll(TILT_SELECTOR).forEach(attachTilt);
      document.querySelectorAll(REVEAL_SELECTOR).forEach(attachReveal);
      document.querySelectorAll(GROUP_SELECTOR).forEach(attachGroupMotion);
    };

    applySiteMotion();

    const mutationObserver = new MutationObserver(() => applySiteMotion());

    let frame = requestAnimationFrame(animateRing);
    window.addEventListener('pointermove', moveCursor, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      mutationObserver.disconnect();
      cleanupFns.forEach((cleanup) => cleanup?.());
      tiltElements.forEach((element) => element.__premiumTiltCleanup?.());
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove('cursor-is-hovering');
    };
  }, []);

  return null;
}
