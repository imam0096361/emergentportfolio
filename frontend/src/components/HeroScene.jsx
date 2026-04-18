/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

const h = React.createElement;

/* --- Distorted Core (shader material) ------------------------------------ */
const DistortCore = ({ mouseRef }) => {
  const meshRef = useRef();
  const matRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#00f0ff") },
      uColorB: { value: new THREE.Color("#ff00e5") }
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    varying vec3 vNormal;

    vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 hh = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(hh, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, hh.x);
      vec3 p1 = vec3(a0.zw, hh.y);
      vec3 p2 = vec3(a1.xy, hh.z);
      vec3 p3 = vec3(a1.zw, hh.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m*m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vNormal = normal;
      float n = snoise(position * 1.4 + uTime * 0.22);
      float displacement = n * 0.24 + sin(uTime * 0.8 + position.y * 3.0) * 0.04;
      vec3 newPos = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec3 vNormal;
    void main() {
      float fres = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.6);
      vec3 col = mix(vec3(0.0, 0.02, 0.04), uColorB * 0.35, fres);
      col += uColorA * fres * 0.6;
      col += vec3(0.0, 0.015, 0.03);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1 + mouseRef.current.x * 0.3;
      meshRef.current.rotation.x = mouseRef.current.y * 0.2;
    }
  });

  return h(
    "mesh",
    { ref: meshRef },
    h("icosahedronGeometry", { args: [1.25, 48] }),
    h("shaderMaterial", {
      ref: matRef,
      uniforms,
      vertexShader,
      fragmentShader
    })
  );
};

/* --- Wireframe shell ------------------------------------------------------ */
const WireShell = ({ mouseRef }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.15 + mouseRef.current.y * 0.4;
      ref.current.rotation.y = t * 0.2 + mouseRef.current.x * 0.4;
    }
  });
  return h(
    "mesh",
    { ref },
    h("icosahedronGeometry", { args: [1.75, 2] }),
    h("meshBasicMaterial", { wireframe: true, color: "#00f0ff", transparent: true, opacity: 0.25 })
  );
};

/* --- Orbiting torus rings ------------------------------------------------- */
const Rings = () => {
  const g1 = useRef();
  const g2 = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g1.current) {
      g1.current.rotation.x = t * 0.4;
      g1.current.rotation.y = t * 0.25;
    }
    if (g2.current) {
      g2.current.rotation.x = -t * 0.3;
      g2.current.rotation.z = t * 0.15;
    }
  });
  return h(
    React.Fragment,
    null,
    h(
      "mesh",
      { ref: g1 },
      h("torusGeometry", { args: [2.1, 0.006, 16, 140] }),
      h("meshBasicMaterial", { color: "#00f0ff", transparent: true, opacity: 0.7 })
    ),
    h(
      "mesh",
      { ref: g2 },
      h("torusGeometry", { args: [2.45, 0.004, 16, 140] }),
      h("meshBasicMaterial", { color: "#ff00e5", transparent: true, opacity: 0.55 })
    ),
    h(
      "mesh",
      null,
      h("torusGeometry", { args: [2.75, 0.002, 16, 160] }),
      h("meshBasicMaterial", { color: "#00f0ff", transparent: true, opacity: 0.25 })
    )
  );
};

/* --- Starfield ----------------------------------------------------------- */
const Stars = ({ count = 1000 }) => {
  const geometry = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      arr[i * 3 + 2] = r * Math.cos(ph);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return h(
    "group",
    { ref },
    h(
      "points",
      { geometry },
      h("pointsMaterial", {
        size: 0.035,
        color: "#00f0ff",
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false
      })
    )
  );
};

/* --- Camera parallax ------------------------------------------------------ */
const CameraRig = ({ mouseRef }) => {
  const { camera } = useThree();
  useFrame(() => {
    // Offset scene to the right so hero text reads clearly on the left
    camera.position.x += (mouseRef.current.x * 0.6 - 1.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouseRef.current.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(-1.6, 0, 0);
  });
  return null;
};

const Scene = ({ mouseRef }) =>
  h(
    React.Fragment,
    null,
    h(CameraRig, { mouseRef }),
    h("ambientLight", { intensity: 0.5 }),
    h("pointLight", { position: [4, 4, 4], intensity: 1.2, color: "#00f0ff" }),
    h("pointLight", { position: [-4, -2, 2], intensity: 0.6, color: "#ff00e5" }),
    h(Stars, null),
    h(DistortCore, { mouseRef }),
    h(WireShell, { mouseRef }),
    h(Rings, null),
    h(
      EffectComposer,
      { multisampling: 0 },
      h(Bloom, { intensity: 0.75, luminanceThreshold: 0.25, luminanceSmoothing: 0.9, mipmapBlur: true }),
      h(ChromaticAberration, { blendFunction: BlendFunction.NORMAL, offset: [0.0014, 0.001] }),
      h(Noise, { premultiply: true, opacity: 0.1 }),
      h(Vignette, { eskil: false, offset: 0.25, darkness: 0.8 })
    )
  );

const HeroScene = () => {
  const mouseRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
