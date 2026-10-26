/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CRYSTALS } from '../data/chemistryData';
import { CrystalType } from '../types/chemistry';
import { LabMascot } from './LabMascot';
import { RotateCcw, ZoomIn, Eye, Sparkles, CheckCircle2, XCircle, Info, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

export const CrystalLatticeViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCrystalId, setSelectedCrystalId] = useState<'nacl' | 'mgo' | 'cscl'>('nacl');
  const [showUnitCellOnly, setShowUnitCellOnly] = useState(false);
  const [showLatticeLines, setShowLatticeLines] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [inspectedIon, setInspectedIon] = useState<{
    symbol: string;
    charge: string;
    coordination: number;
    color: string;
    name: string;
  } | null>(null);

  // Inquiry question state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredCorrect, setAnsweredCorrect] = useState<boolean | null>(null);

  const crystal = CRYSTALS.find((c) => c.id === selectedCrystalId) || CRYSTALS[0];

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const latticeGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6, 5, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controlsRef.current = controls;

    // Studio Lighting
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xcfd8dc, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff7ed, 1.4);
    dirLight1.position.set(8, 12, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe0f2fe, 0.7);
    dirLight2.position.set(-8, -6, -8);
    scene.add(dirLight2);

    // Group for lattice
    const latticeGroup = new THREE.Group();
    scene.add(latticeGroup);
    latticeGroupRef.current = latticeGroup;

    // Raycaster for ion clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(latticeGroup.children, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData && hit.userData.symbol) {
          sound.playSnap();
          setInspectedIon({
            symbol: hit.userData.symbol,
            charge: hit.userData.charge,
            coordination: hit.userData.coordination,
            color: hit.userData.color,
            name: hit.userData.name
          });
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotate && controls) {
        latticeGroup.rotation.y += 0.004;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.dispose();
    };
  }, []);

  // Rebuild lattice when crystal or options change
  useEffect(() => {
    const group = latticeGroupRef.current;
    if (!group) return;

    // Clear old children
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      } else if (child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
    }

    // Common materials
    const cationGeo = new THREE.SphereGeometry(crystal.cationRadius, 24, 24);
    const anionGeo = new THREE.SphereGeometry(crystal.anionRadius, 24, 24);

    const cationMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(crystal.cationColor),
      roughness: 0.25,
      metalness: 0.2
    });
    const anionMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(crystal.anionColor),
      roughness: 0.25,
      metalness: 0.2
    });

    const latticeLineMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.4
    });

    const spacing = 1.35;
    const size = showUnitCellOnly ? 2 : 3;
    const offset = (size - 1) * 0.5 * spacing;

    const linePoints: THREE.Vector3[] = [];

    if (selectedCrystalId === 'nacl' || selectedCrystalId === 'mgo') {
      // Rock-salt structure: alternating FCC sublattices
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          for (let z = 0; z < size; z++) {
            const posX = x * spacing - offset;
            const posY = y * spacing - offset;
            const posZ = z * spacing - offset;

            const isCation = (x + y + z) % 2 === 0;
            const mesh = new THREE.Mesh(
              isCation ? cationGeo : anionGeo,
              isCation ? cationMat : anionMat
            );
            mesh.position.set(posX, posY, posZ);

            mesh.userData = {
              symbol: isCation ? crystal.cation : crystal.anion,
              charge: isCation
                ? selectedCrystalId === 'mgo' ? '+2' : '+1'
                : selectedCrystalId === 'mgo' ? '-2' : '-1',
              coordination: 6,
              color: isCation ? crystal.cationColor : crystal.anionColor,
              name: isCation
                ? selectedCrystalId === 'mgo' ? 'Ion Magnesium (Kation)' : 'Ion Natrium (Kation)'
                : selectedCrystalId === 'mgo' ? 'Ion Oksida (Anion)' : 'Ion Klorida (Anion)'
            };

            group.add(mesh);

            // Connect nearest neighbor lattice lines along axes
            if (showLatticeLines) {
              if (x < size - 1) {
                linePoints.push(
                  new THREE.Vector3(posX, posY, posZ),
                  new THREE.Vector3(posX + spacing, posY, posZ)
                );
              }
              if (y < size - 1) {
                linePoints.push(
                  new THREE.Vector3(posX, posY, posZ),
                  new THREE.Vector3(posX, posY + spacing, posZ)
                );
              }
              if (z < size - 1) {
                linePoints.push(
                  new THREE.Vector3(posX, posY, posZ),
                  new THREE.Vector3(posX, posY, posZ + spacing)
                );
              }
            }
          }
        }
      }
    } else if (selectedCrystalId === 'cscl') {
      // CsCl cubic coordination: 8 Cl⁻ at corners of unit cube, 1 Cs⁺ at center
      const unitCells = showUnitCellOnly ? 1 : 2;
      const csSpacing = 2.0;
      const csOffset = (unitCells * csSpacing) / 2;

      for (let cx = 0; cx <= unitCells; cx++) {
        for (let cy = 0; cy <= unitCells; cy++) {
          for (let cz = 0; cz <= unitCells; cz++) {
            // Cl- ions on vertex grid
            const px = cx * csSpacing - csOffset;
            const py = cy * csSpacing - csOffset;
            const pz = cz * csSpacing - csOffset;

            const clMesh = new THREE.Mesh(anionGeo, anionMat);
            clMesh.position.set(px, py, pz);
            clMesh.userData = {
              symbol: 'Cl⁻',
              charge: '-1',
              coordination: 8,
              color: crystal.anionColor,
              name: 'Ion Klorida (Anion)'
            };
            group.add(clMesh);

            // Cube edges
            if (showLatticeLines) {
              if (cx < unitCells) {
                linePoints.push(new THREE.Vector3(px, py, pz), new THREE.Vector3(px + csSpacing, py, pz));
              }
              if (cy < unitCells) {
                linePoints.push(new THREE.Vector3(px, py, pz), new THREE.Vector3(px, py + csSpacing, pz));
              }
              if (cz < unitCells) {
                linePoints.push(new THREE.Vector3(px, py, pz), new THREE.Vector3(px, py, pz + csSpacing));
              }
            }

            // Cs+ ion in center of cube
            if (cx < unitCells && cy < unitCells && cz < unitCells) {
              const csX = px + csSpacing / 2;
              const csY = py + csSpacing / 2;
              const csZ = pz + csSpacing / 2;

              const csMesh = new THREE.Mesh(cationGeo, cationMat);
              csMesh.position.set(csX, csY, csZ);
              csMesh.userData = {
                symbol: 'Cs⁺',
                charge: '+1',
                coordination: 8,
                color: crystal.cationColor,
                name: 'Ion Sesium (Kation)'
              };
              group.add(csMesh);
            }
          }
        }
      }
    }

    if (showLatticeLines && linePoints.length > 0) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lines = new THREE.LineSegments(lineGeo, latticeLineMat);
      group.add(lines);
    }
  }, [selectedCrystalId, showUnitCellOnly, showLatticeLines, crystal]);

  const resetCamera = () => {
    sound.playClick();
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(6, 5, 8);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
    if (latticeGroupRef.current) {
      latticeGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    sound.playClick();
    setSelectedAnswer(optionIndex);
    // Option 1 is scientifically correct
    if (optionIndex === 1) {
      sound.playSuccess();
      setAnsweredCorrect(true);
    } else {
      setAnsweredCorrect(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 4 • Struktur Kisi Kristal 3 Dimensi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Di Dalam Kristal Ionik 3D!
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Jelajahi susunan tiga dimensi tak terhingga dari ion-ion bermuatan. Perhatikan bahwa padatan ionik bukanlah molekul terpisah, melainkan kisi kristal teratur dengan bilangan koordinasi yang spesifik.
          </p>
        </div>

        {/* Crystal Model Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-teal-200 shadow-xs">
          {CRYSTALS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                setSelectedCrystalId(c.id);
                setInspectedIon(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCrystalId === c.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50'
              }`}
            >
              {c.formula} ({c.id.toUpperCase()})
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Viewport with Collapsible Bottom Dock */}
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl h-[520px]">
        {/* Three.js Canvas Container */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Floating Badge: Quick Info & Legend */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 text-xs text-white">
          <span className="font-bold text-teal-400">{crystal.name}</span>
          <span className="text-slate-400">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{ backgroundColor: crystal.cationColor }} />
            <span className="font-semibold text-slate-200">{crystal.cation} (Kation)</span>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="w-3.5 h-3.5 rounded-full inline-block border border-white/20" style={{ backgroundColor: crystal.anionColor }} />
            <span className="font-semibold text-slate-200">{crystal.anion} (Anion)</span>
          </div>
        </div>

        {/* Top-Right: Click Hint */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-[11px] text-slate-300">
          <Eye className="w-3.5 h-3.5 text-teal-400" />
          <span>Klik ion untuk inspeksi detail</span>
        </div>

        {/* Inspected Ion Overlay Card (if clicked) */}
        {inspectedIon && (
          <div className="absolute top-16 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-teal-500/50 text-white max-w-xs shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: inspectedIon.color }} />
                <span className="font-bold text-base text-teal-300">{inspectedIon.symbol}</span>
              </div>
              <button
                onClick={() => setInspectedIon(null)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <p><span className="text-slate-400">Nama:</span> <strong className="text-white">{inspectedIon.name}</strong></p>
              <p><span className="text-slate-400">Muatan:</span> <strong className="text-teal-400">{inspectedIon.charge}</strong></p>
              <p><span className="text-slate-400">Bilangan Koordinasi:</span> <strong className="text-emerald-400">{inspectedIon.coordination} ion tetangga terdekat</strong></p>
            </div>
          </div>
        )}

        {/* Unified Bottom Dock (Per Three.js Guidelines: collapsible & unobstructed) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-[94%] max-w-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700 p-2.5 sm:p-3 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Toggle Unit Cell vs Expanded */}
            <button
              onClick={() => {
                sound.playClick();
                setShowUnitCellOnly(!showUnitCellOnly);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                showUnitCellOnly ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showUnitCellOnly ? 'Unit Sel Saja' : 'Kisi Diperluas (3×3×3)'}</span>
            </button>

            {/* Toggle Lattice Lines */}
            <button
              onClick={() => {
                sound.playClick();
                setShowLatticeLines(!showLatticeLines);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                showLatticeLines ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{showLatticeLines ? 'Garis Kisi: Aktif' : 'Garis Kisi: Sembunyi'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto-Rotate Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setAutoRotate(!autoRotate);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                autoRotate ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Putar: {autoRotate ? 'ON' : 'OFF'}
            </button>

            {/* Reset Camera */}
            <button
              onClick={resetCamera}
              title="Reset Sudut Kamera"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Crystal Science Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase">
            <Info className="w-4 h-4 text-teal-600" />
            Bilangan Koordinasi
          </div>
          <div className="text-xl font-extrabold text-slate-800">{crystal.coordinationNumber}</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pada struktur {crystal.formula}, setiap ion positif dikelilingi oleh ion negatif dan sebaliknya. Kisi kristal terbentuk agar gaya elektrostatik Coulomb mencapai tingkat energi potensial minimum yang paling stabil.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Energi Kisi & Titik Leleh
          </div>
          <div className="text-xl font-extrabold text-slate-800">{crystal.meltingPoint}</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {crystal.id === 'mgo'
              ? 'Ion Mg²⁺ dan O²⁻ memiliki muatan ganda (+2 dan -2) dengan jari-jari kecil, sehingga gaya tarik Coulomb sangat masif dan titik lelehnya mencapai 2.852 °C!'
              : 'Gaya tarik elektrostatik antarion yang kokoh ke segala arah membutuhkan energi termal yang tinggi (801 °C) untuk mencairkannya menjadi lelehan ionik.'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase">
            <Layers className="w-4 h-4 text-indigo-600" />
            Tipe Kisi Kristal
          </div>
          <div className="text-xl font-extrabold text-slate-800">{crystal.latticeType}</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Garis-garis abu-abu pada model 3D di atas hanyalah visualisasi geometri kisi untuk memudahkan pengamatan, bukan ikatan kovalen lokalisir. Ikatan ionik bersifat nondireksional.
          </p>
        </div>
      </div>

      {/* Interactive Inquiry Challenge: Why NaCl and not Na2Cl2? */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <LabMascot
            mood="thinking"
            message="Pertanyaan Penting Kimia: Mengapa garam dapur selalu ditulis dengan rumus NaCl, bukan Na₂Cl₂ atau NaCl₂?"
            className="flex-shrink-0"
          />

          <div className="flex-1 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-amber-950">
              Uji Pemahaman Konsep Kisi Kristal:
            </h3>

            <div className="space-y-2">
              {[
                {
                  id: 0,
                  text: 'Karena dalam satu wadah garam hanya terdapat tepat 1 atom natrium dan 1 atom klorin.'
                },
                {
                  id: 1,
                  text: 'Karena padatan ionik adalah kisi kristal 3D berulang; NaCl adalah rumus empiris yang menyatakan rasio stoikiometri paling sederhana (1:1) agar total muatan listrik bernilai netral (0).'
                },
                {
                  id: 2,
                  text: 'Karena klorin tidak mampu berikatan dengan lebih dari satu atom natrium di laboratorium.'
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswerSubmit(opt.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition cursor-pointer flex items-start gap-3 ${
                    selectedAnswer === opt.id
                      ? opt.id === 1
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-white border-amber-200 hover:border-amber-300 text-slate-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    selectedAnswer === opt.id
                      ? opt.id === 1 ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {String.fromCharCode(65 + opt.id)}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Immediate Feedback */}
            {answeredCorrect !== null && (
              <div className={`p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm ${
                answeredCorrect
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border border-rose-300 text-rose-900'
              }`}>
                {answeredCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold mb-1">
                    {answeredCorrect ? 'Luar Biasa, Jawabanmu Tepat!' : 'Masih Kurang Tepat, Coba Pahami Konsep Ini:'}
                  </div>
                  <p className="leading-relaxed">
                    {crystal.whySimplestRatio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
