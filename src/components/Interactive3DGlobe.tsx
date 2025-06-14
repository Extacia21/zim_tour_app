
import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Destination {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

const Interactive3DGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameId = useRef<number>();

  const destinations: Destination[] = [
    { name: 'Victoria Falls', lat: -17.9243, lng: 25.8572, color: '#3B82F6' },
    { name: 'Great Zimbabwe', lat: -20.2676, lng: 30.9388, color: '#EF4444' },
    { name: 'Hwange National Park', lat: -18.6297, lng: 26.1612, color: '#10B981' },
    { name: 'Mana Pools', lat: -15.7394, lng: 29.3953, color: '#F59E0B' },
    { name: 'Eastern Highlands', lat: -18.5, lng: 32.5, color: '#8B5CF6' },
    { name: 'Lake Kariba', lat: -16.5167, lng: 28.8667, color: '#06B6D4' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = 400;
    const height = canvas.height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 150;

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw globe base
      const gradient = ctx.createRadialGradient(centerX - 50, centerY - 50, 0, centerX, centerY, radius);
      gradient.addColorStop(0, '#1f2937');
      gradient.addColorStop(0.7, '#374151');
      gradient.addColorStop(1, '#111827');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw glowing edge
      ctx.strokeStyle = '#F97316';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#F97316';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw destinations
      destinations.forEach((dest, index) => {
        const angle = (rotation + index * 60) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * (radius * 0.8);
        const y = centerY + Math.sin(angle) * (radius * 0.8);
        
        // Destination marker
        ctx.fillStyle = dest.color;
        ctx.shadowColor = dest.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Pulsing effect
        ctx.fillStyle = dest.color + '40';
        ctx.beginPath();
        ctx.arc(x, y, 12 + Math.sin(Date.now() * 0.01 + index) * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(dest.name, x, y + 20);
      });

      // Particle effects
      for (let i = 0; i < 50; i++) {
        const particleAngle = (rotation * 0.5 + i * 7.2) * Math.PI / 180;
        const particleRadius = radius + 20 + Math.sin(Date.now() * 0.003 + i) * 10;
        const px = centerX + Math.cos(particleAngle) * particleRadius;
        const py = centerY + Math.sin(particleAngle) * particleRadius;
        
        ctx.fillStyle = `rgba(249, 115, 22, ${0.3 + Math.sin(Date.now() * 0.005 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      rotation += 0.5;
      frameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30 p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-white mb-2">Explore Zimbabwe</h3>
        <p className="text-orange-300">Interactive 3D destination map</p>
      </div>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="rounded-lg shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
          style={{ background: 'radial-gradient(circle, #1f2937 0%, #111827 100%)' }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {destinations.map((dest, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dest.color }}
            ></div>
            <span className="text-gray-300">{dest.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Interactive3DGlobe;
