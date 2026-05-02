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

    scene.add(new THREE.AmbientLight(0x4a6b3a, 0.7));
    const light = new THREE.DirectionalLight(0x8aab6e, 0.9);
    light.position.set(5, 5, 5);
    scene.add(light);

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

export default function PremiumLandingEffects() {
  return (
    <>
      <PremiumWebGL />
      <PremiumCursor />
      <PremiumTilt />
    </>
  );
}
