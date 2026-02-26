# ⚙️ Configuración de Background Interactivo - BACKUP

**Fecha de backup:** 26 de febrero de 2026  
**Archivo:** Configuración antes de ajustes de sutileza y legibilidad

---

## 📄 InteractiveGradientAI.jsx (BACKUP)

```jsx
import { useEffect, useRef } from 'react';

/**
 * InteractiveGradientAI - Fondo interactivo con gradiente azul corporativo
 * 
 * Paleta Corporativa:
 * - Primary: #3A7BD5
 * - Accent: #5EA8FF
 * - Glow: #0FE0FF
 * 
 * Características:
 * - Gradiente radial que sigue el mouse
 * - Opacidades sutiles (5-18%)
 * - Optimizado para rendimiento
 * - Estilo corporativo tech profesional
 */
export default function InteractiveGradientAI() {
  const gradientRef = useRef(null);
  const rafRef = useRef(null);
  const mousePos = useRef({ x: 50, y: 50 }); // Posición inicial (centro en %)

  useEffect(() => {
    const updateGradientPosition = (e) => {
      // Cancelar el frame anterior si existe
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Programar actualización en el próximo frame
      rafRef.current = requestAnimationFrame(() => {
        if (!gradientRef.current) return;

        // Calcular posición del mouse como porcentaje
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        // Actualizar variables CSS
        gradientRef.current.style.setProperty('--mouse-x', `${x}%`);
        gradientRef.current.style.setProperty('--mouse-y', `${y}%`);
        
        // Guardar posición actual
        mousePos.current = { x, y };
      });
    };

    // Listener con passive para mejor rendimiento
    window.addEventListener('mousemove', updateGradientPosition, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateGradientPosition);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="interactive-gradient-ai"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
      aria-hidden="true"
    >
      {/* Capa de gradiente interactivo */}
      <div className="gradient-layer"></div>
      
      {/* Capa de fondo base */}
      <div className="base-layer"></div>
    </div>
  );
}
```

---

## 🎨 index.css - Estilos del Gradiente (BACKUP)

```css
/* ========================================
   🌌 INTERACTIVE GRADIENT AI - FONDO INTERACTIVO
   ======================================== */

/* Container principal del gradiente */
.interactive-gradient-ai {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; /* No interfiere con clicks */
  z-index: 0; /* Detrás de todo el contenido */
}

/* Capa de fondo base - Color corporativo oscuro */
.base-layer {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0B0E13 0%, #141821 100%);
  z-index: 1;
}

/* Capa de gradiente interactivo - Paleta corporativa azul tech */
.gradient-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle 650px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(58, 123, 213, 0.18) 0%,      /* #3A7BD5 - Primary */
    rgba(94, 168, 255, 0.12) 30%,     /* #5EA8FF - Accent */
    rgba(15, 224, 255, 0.06) 60%,     /* #0FE0FF - Glow */
    transparent 100%
  );
  z-index: 2;
  transition: opacity 0.18s ease-out;
  filter: blur(90px);
  mix-blend-mode: screen;
}

/* Efecto hover para intensificar el gradiente */
.interactive-gradient-ai:hover .gradient-layer {
  opacity: 1;
}

/* Optimización de rendimiento */
.gradient-layer,
.base-layer {
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Responsive: Reducir tamaño del gradiente en móviles */
@media (max-width: 768px) {
  .gradient-layer {
    background: radial-gradient(
      circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(58, 123, 213, 0.12) 0%,
      rgba(94, 168, 255, 0.06) 25%,
      rgba(145, 193, 255, 0.02) 50%,
      transparent 100%
    );
    filter: blur(60px);
  }
}

/* Prefers-reduced-motion: Desactivar efectos para usuarios sensibles */
@media (prefers-reduced-motion: reduce) {
  .gradient-layer {
    transition: none;
    animation: none;
  }
}
```

---

## 📊 Valores a Modificar

### Opacidades actuales del gradiente:
- Primary (0%): `rgba(58, 123, 213, 0.18)` → **18%**
- Accent (30%): `rgba(94, 168, 255, 0.12)` → **12%**
- Glow (60%): `rgba(15, 224, 255, 0.06)` → **6%**

### Blur actual:
- Desktop: `blur(90px)`
- Mobile: `blur(60px)`

### Transición:
- `transition: opacity 0.18s ease-out`

---

## 🔄 Cambios Planeados

1. **Reducir opacidades del gradiente** (hover más sutil):
   - Primary: 0.18 → 0.10
   - Accent: 0.12 → 0.07
   - Glow: 0.06 → 0.03

2. **Aumentar opacidad de componentes de datos**:
   - Cards: bg-surface/80 → bg-surface/95
   - Sidebar: bg-lpr-800/80 → bg-lpr-800/95
   - Topbar: bg-lpr-800/80 → bg-lpr-800/95

3. **Ajustar blur** (más sutil):
   - Desktop: blur(90px) → blur(100px)
   - Mobile: blur(60px) → blur(70px)

---

**Nota:** Este backup permite restaurar la configuración original si es necesario.
