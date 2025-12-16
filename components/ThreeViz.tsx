import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ZoomIn, ZoomOut, RotateCw, RefreshCw } from 'lucide-react';

export const ThreeViz = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  const [rotationSpeed, setRotationSpeed] = useState({ x: 0.001, y: 0.002 });
  const [cameraZoom, setCameraZoom] = useState(20);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050505, 0.05);

    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = cameraZoom;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Particles (Vectors)
    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x00d4ff); // Primary
    const color2 = new THREE.Color(0xa855f7); // Secondary
    const color3 = new THREE.Color(0xef4444); // Danger (Critical)

    for (let i = 0; i < count * 3; i += 3) {
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      // Mix colors based on "threat severity" (random distribution)
      const rand = Math.random();
      let chosenColor = color1;
      if (rand > 0.8) chosenColor = color3; // Critical
      else if (rand > 0.5) chosenColor = color2; // Warning

      colors[i] = chosenColor.r;
      colors[i + 1] = chosenColor.g;
      colors[i + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ 
      size: 0.15, 
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      
      if (!isDragging.current && pointsRef.current) {
        pointsRef.current.rotation.y += rotationSpeed.y;
        pointsRef.current.rotation.x += rotationSpeed.x;
      }

      // Pulse effect
      const time = Date.now() * 0.001;
      material.size = 0.15 + Math.sin(time * 2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Update zoom when state changes
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = cameraZoom;
    }
  }, [cameraZoom]);

  // Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !pointsRef.current) return;

    const deltaX = e.clientX - previousMouse.current.x;
    const deltaY = e.clientY - previousMouse.current.y;

    pointsRef.current.rotation.y += deltaX * 0.005;
    pointsRef.current.rotation.x += deltaY * 0.005;

    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleZoom = (delta: number) => {
    setCameraZoom(prev => Math.max(5, Math.min(50, prev + delta)));
  };

  return (
    <div 
      className="w-full h-full min-h-[400px] relative group cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => { e.stopPropagation(); handleZoom(-5); }}
          className="p-2 glass-panel rounded-lg hover:bg-white/10 text-white"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleZoom(5); }}
          className="p-2 glass-panel rounded-lg hover:bg-white/10 text-white"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (pointsRef.current) {
              pointsRef.current.rotation.set(0,0,0);
              setCameraZoom(20);
            }
          }}
          className="p-2 glass-panel rounded-lg hover:bg-white/10 text-cyber-primary"
          title="Reset View"
        >
          <RotateCw className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
           <span className="w-2 h-2 rounded-full bg-cyber-primary"></span> Normal
           <span className="w-2 h-2 rounded-full bg-cyber-secondary"></span> Suspicious
           <span className="w-2 h-2 rounded-full bg-cyber-danger animate-pulse"></span> Critical
        </div>
      </div>
    </div>
  );
};
