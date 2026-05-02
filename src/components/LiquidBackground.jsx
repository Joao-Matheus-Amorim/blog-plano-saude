import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);

    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p = rot * p * 2.05 + 0.17;
      amp *= 0.48;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * aspect;
    vec2 mouse = (uMouse - 0.5) * vec2(0.42, -0.32);

    float t = uTime * 0.18;
    float scrollWave = uScroll * 0.00042;

    vec2 flow = p;
    flow.x += 0.10 * sin((p.y + t + scrollWave) * 6.0);
    flow.y += 0.10 * cos((p.x - t * 0.8) * 5.0);
    flow += mouse;

    float liquid = fbm(flow * 2.55 + vec2(t, -t * 0.8));
    float liquid2 = fbm(flow * 4.10 - vec2(t * 0.65, t * 0.45));

    float orbA = smoothstep(0.52, 0.03, distance(p, vec2(-0.34, -0.04) + mouse * 0.35));
    float orbB = smoothstep(0.44, 0.04, distance(p, vec2(0.38, 0.08) - mouse * 0.28));
    float orbC = smoothstep(0.38, 0.04, distance(p, vec2(0.02, -0.30) + mouse * 0.18));

    vec3 cream = vec3(0.960, 0.925, 0.850);
    vec3 ivory = vec3(1.000, 0.988, 0.965);
    vec3 forest = vec3(0.145, 0.275, 0.137);
    vec3 sage = vec3(0.560, 0.632, 0.520);
    vec3 sand = vec3(0.760, 0.698, 0.502);

    vec3 color = mix(cream, ivory, uv.y * 0.64);
    color = mix(color, sage, (liquid * 0.18 + orbA * 0.18));
    color = mix(color, sand, (liquid2 * 0.13 + orbB * 0.16));
    color = mix(color, forest, orbC * 0.10);

    float shine = smoothstep(0.60, 0.98, liquid + liquid2 * 0.35);
    color += vec3(0.18, 0.16, 0.10) * shine * 0.20;

    float vignette = smoothstep(1.15, 0.18, length(p));
    color = mix(color * 0.88, color, vignette);

    gl_FragColor = vec4(color, 0.88);
  }
`;

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

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });

    scene.add(new THREE.Mesh(geometry, material));

    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    const scrollProxy = { y: window.scrollY || 0 };

    const resize = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseTarget.set(
        (event.clientX - rect.left) / Math.max(rect.width, 1),
        (event.clientY - rect.top) / Math.max(rect.height, 1)
      );
    };

    const onScroll = () => {
      gsap.to(scrollProxy, {
        y: window.scrollY || 0,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: true
      });
    };

    const tick = (time) => {
      uniforms.uTime.value = time;
      uniforms.uScroll.value = scrollProxy.y;
      uniforms.uMouse.value.lerp(mouseTarget, 0.055);
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
      geometry.dispose();
      material.dispose();
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
