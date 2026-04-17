import React, { useEffect, useRef } from "react";

// Lightweight canvas "WebGL-feel" hero: orbiting wireframe + particle field + radial pulses
const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    let raf;
    let t = 0;

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouseRef.current.ty = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    // particles
    const N = 140;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 1 + 0.2,
      r: Math.random() * 1.5 + 0.4
    }));

    // wireframe points (icosahedron-like)
    const verts = [];
    const rings = 5;
    const perRing = 14;
    for (let i = 0; i < rings; i++) {
      const phi = (Math.PI * (i + 1)) / (rings + 1) - Math.PI / 2;
      const y = Math.sin(phi);
      const r = Math.cos(phi);
      for (let j = 0; j < perRing; j++) {
        const th = (Math.PI * 2 * j) / perRing;
        verts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
      }
    }

    const draw = () => {
      t += 0.006;
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      // background radial glow
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      grad.addColorStop(0, "rgba(0, 240, 255, 0.12)");
      grad.addColorStop(0.4, "rgba(255, 0, 229, 0.04)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // particle starfield
      for (const p of particles) {
        p.x += (0.15 + p.z * 0.4) * window.devicePixelRatio;
        if (p.x > w) p.x = 0;
        ctx.globalAlpha = 0.3 + p.z * 0.5;
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // wireframe sphere
      const cx = w * 0.68 + mouseRef.current.x * 60 * window.devicePixelRatio;
      const cy = h / 2 + mouseRef.current.y * 40 * window.devicePixelRatio;
      const R = Math.min(w, h) * 0.26;

      const cosA = Math.cos(t * 0.7 + mouseRef.current.x * 0.8);
      const sinA = Math.sin(t * 0.7 + mouseRef.current.x * 0.8);
      const cosB = Math.cos(t * 0.4 + mouseRef.current.y * 0.8);
      const sinB = Math.sin(t * 0.4 + mouseRef.current.y * 0.8);

      const projected = verts.map(([x, y, z]) => {
        // rotate Y
        const x1 = x * cosA - z * sinA;
        const z1 = x * sinA + z * cosA;
        // rotate X
        const y1 = y * cosB - z1 * sinB;
        const z2 = y * sinB + z1 * cosB;
        const perspective = 1.6 / (1.6 + z2);
        return { px: cx + x1 * R * perspective, py: cy + y1 * R * perspective, z: z2 };
      });

      // connect rings
      ctx.lineWidth = 1 * window.devicePixelRatio;
      for (let i = 0; i < rings; i++) {
        for (let j = 0; j < perRing; j++) {
          const a = projected[i * perRing + j];
          const b = projected[i * perRing + ((j + 1) % perRing)];
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + (a.z + 1) * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.stroke();
        }
      }
      // connect between rings (fewer to keep airy)
      for (let i = 0; i < rings - 1; i++) {
        for (let j = 0; j < perRing; j += 2) {
          const a = projected[i * perRing + j];
          const b = projected[(i + 1) * perRing + j];
          ctx.strokeStyle = `rgba(255, 0, 229, ${0.08 + (a.z + 1) * 0.08})`;
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.stroke();
        }
      }

      // vertex glows
      for (const p of projected) {
        const a = 0.2 + (p.z + 1) * 0.4;
        ctx.fillStyle = `rgba(0, 240, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 1.5 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      // scan ring
      const ringR = R * (1.35 + Math.sin(t * 1.2) * 0.03);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.lineWidth = 1 * window.devicePixelRatio;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();

      // animated arc
      ctx.strokeStyle = "rgba(255, 0, 229, 0.9)";
      ctx.lineWidth = 2 * window.devicePixelRatio;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, t * 1.4, t * 1.4 + 0.6);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
};

export default HeroCanvas;
