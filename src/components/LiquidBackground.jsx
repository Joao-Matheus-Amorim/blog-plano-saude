import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.24, 'rgba(160,232,218,0.72)');
  gradient.addColorStop(0.62, 'rgba(194,178,128,0.22)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);
  return new THREE.CanvasTexture(canvas);
}

export default function LiquidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f0e6, 0.045);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8.2);

    const group = new THREE.Group();
    const objectGroup = new THREE.Group();
    const gridGroup = new THREE.Group();
    scene.add(group, gridGroup, objectGroup);

    const environment = new THREE.CanvasTexture(Object.assign(document.createElement('canvas'), { width: 16, height: 16 }));
    const materialMirror = new THREE.MeshPhysicalMaterial({
      color: 0xdff7ef,
      metalness: 0.84,
      roughness: 0.16,
      transmission: 0.08,
      thickness: 0.65,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      ior: 1.42,
      emissive: 0x5fd2c5,
      emissiveIntensity: 0.055,
      envMap: environment,
      envMapIntensity: 0.7
    });

    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.82, 0.22, 156, 18),
      materialMirror
    );
    torus.position.set(1.85, 0.64, -0.55);
    torus.rotation.set(0.4, 0.18, 0.2);
    objectGroup.add(torus);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 64, 64),
      materialMirror.clone()
    );
    sphere.material.color.set(0xf6fff8);
    sphere.material.emissive.set(0xc2b280);
    sphere.material.emissiveIntensity = 0.045;
    sphere.position.set(-2.2, -0.18, -0.35);
    objectGroup.add(sphere);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.08, 0.018, 10, 160),
      new THREE.MeshBasicMaterial({ color: 0x8ceadd, transparent: true, opacity: 0.34 })
    );
    ring.position.copy(sphere.position);
    ring.rotation.set(1.22, 0.28, 0.14);
    objectGroup.add(ring);

    const particleCount = window.matchMedia('(max-width: 768px)').matches ? 360 : 800;
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.5 + Math.random() * 4.8;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 2.5;
      seeds[i] = Math.random() * Math.PI * 2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.055,
      map: createParticleTexture(),
      color: 0xb8fff1,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x6bdccc,
      transparent: true,
      opacity: 0.18
    });
    const gridSize = 14;
    const gridDivisions = 22;
    for (let i = 0; i <= gridDivisions; i += 1) {
      const t = -gridSize / 2 + (gridSize / gridDivisions) * i;
      const horizontal = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize / 2, -1.9, t - 5),
        new THREE.Vector3(gridSize / 2, -1.9, t - 5)
      ]);
      const vertical = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(t, -1.9, -gridSize - 5),
        new THREE.Vector3(t, -1.9, 2)
      ]);
      gridGroup.add(new THREE.Line(horizontal, gridMaterial));
      gridGroup.add(new THREE.Line(vertical, gridMaterial));
    }
    gridGroup.rotation.x = -0.18;
    gridGroup.position.y = -0.45;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(1.8, 3.4, 4.2);
    const tealLight = new THREE.PointLight(0x64ffe7, 2.6, 10);
    tealLight.position.set(-2.4, 1.5, 3);
    const goldLight = new THREE.PointLight(0xc2b280, 1.2, 8);
    goldLight.position.set(2.6, -1.5, 2.2);
    scene.add(ambientLight, keyLight, tealLight, goldLight);

    const mouse = { x: 0, y: 0 };
    const scrollProxy = { y: window.scrollY || 0 };

    const resize = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
    };

    const onScroll = () => {
      gsap.to(scrollProxy, {
        y: window.scrollY || 0,
        duration: 0.85,
        ease: 'power3.out',
        overwrite: true
      });
    };

    const clock = new THREE.Clock();
    const tick = () => {
      const time = clock.getElapsedTime();
      const scrollFactor = scrollProxy.y * 0.00042;

      group.rotation.y = time * 0.045 + mouse.x * 0.16 + scrollFactor;
      group.rotation.x = mouse.y * 0.055;

      objectGroup.rotation.y += ((mouse.x * 0.12) - objectGroup.rotation.y) * 0.035;
      objectGroup.rotation.x += ((-mouse.y * 0.08) - objectGroup.rotation.x) * 0.035;

      torus.rotation.x = time * 0.34 + scrollFactor;
      torus.rotation.y = time * 0.22;
      torus.position.y = 0.64 + Math.sin(time * 0.9) * 0.12;

      sphere.rotation.y = -time * 0.32;
      sphere.position.y = -0.18 + Math.cos(time * 0.82) * 0.10;
      ring.rotation.z = time * 0.32;
      ring.position.y = sphere.position.y;

      const positionAttribute = particleGeometry.attributes.position;
      for (let i = 0; i < particleCount; i += 1) {
        const ix = i * 3;
        const seed = seeds[i];
        const x = positions[ix];
        const z = positions[ix + 2] + 2.5;
        const radius = Math.sqrt(x * x + z * z);
        const angle = Math.atan2(z, x) + time * (0.035 + (seed % 0.04));
        positionAttribute.array[ix] = Math.cos(angle) * radius;
        positionAttribute.array[ix + 1] = positions[ix + 1] + Math.sin(time * 0.65 + seed) * 0.12;
        positionAttribute.array[ix + 2] = Math.sin(angle) * radius - 2.5;
      }
      positionAttribute.needsUpdate = true;

      camera.position.x += (mouse.x * 0.28 - camera.position.x) * 0.045;
      camera.position.y += (0.2 - mouse.y * 0.16 - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tick);
      particleMaterial.map?.dispose();
      particleMaterial.dispose();
      particleGeometry.dispose();
      materialMirror.dispose();
      sphere.material.dispose();
      torus.geometry.dispose();
      sphere.geometry.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
      gridGroup.children.forEach((line) => line.geometry.dispose());
      gridMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="liquid-webgl-canvas"
      aria-hidden="true"
    />
  );
}
