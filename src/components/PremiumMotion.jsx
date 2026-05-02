import { useEffect } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, .liquid-nav-link, .liquid-cta, .float-mirror, .glass-effect';
const TILT_SELECTOR = '.float-mirror, .glass-effect, .hero-form-3d, .hero-stat-cell, article';
const REVEAL_SELECTOR = 'section > div, article, .float-mirror, .glass-effect, .hero-stat-cell, footer > div';

export default function PremiumMotion() {
  useEffect(() => {
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
      dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      state.ringX += (state.x - state.ringX) * 0.18;
      state.ringY += (state.y - state.ringY) * 0.18;
      ring.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%) scale(${state.hovering ? 1.85 : 1})`;
      frame = requestAnimationFrame(animateRing);
    };

    const setHover = (hovering) => {
      state.hovering = hovering;
      document.documentElement.classList.toggle('cursor-is-hovering', hovering);
    };

    const onOver = (event) => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) setHover(true);
    };

    const onOut = (event) => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) setHover(false);
    };

    const tiltElements = new Set();

    const attachTilt = (element) => {
      if (!element || tiltElements.has(element)) return;
      tiltElements.add(element);
      element.classList.add('premium-tilt');

      const handleMove = (event) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const py = (event.clientY - rect.top) / Math.max(rect.height, 1);
        const rotateY = (px - 0.5) * 10;
        const rotateX = (0.5 - py) * 8;
        element.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
        element.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
        element.style.setProperty('--shine-x', `${(px * 100).toFixed(2)}%`);
        element.style.setProperty('--shine-y', `${(py * 100).toFixed(2)}%`);
      };

      const handleLeave = () => {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      };

      element.addEventListener('pointermove', handleMove, { passive: true });
      element.addEventListener('pointerleave', handleLeave);
      element.__premiumTiltCleanup = () => {
        element.removeEventListener('pointermove', handleMove);
        element.removeEventListener('pointerleave', handleLeave);
      };
    };

    document.querySelectorAll(TILT_SELECTOR).forEach(attachTilt);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll(REVEAL_SELECTOR).forEach((element, index) => {
      element.classList.add('scroll-reveal-premium');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 8, 7) * 70}ms`);
      observer.observe(element);
    });

    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll(TILT_SELECTOR).forEach(attachTilt);
      document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
        if (!element.classList.contains('scroll-reveal-premium')) {
          element.classList.add('scroll-reveal-premium');
          observer.observe(element);
        }
      });
    });

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
      observer.disconnect();
      tiltElements.forEach((element) => element.__premiumTiltCleanup?.());
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove('cursor-is-hovering');
    };
  }, []);

  return null;
}
