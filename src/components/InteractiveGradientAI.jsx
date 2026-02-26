import { useEffect, useRef } from 'react';

/**
 * InteractiveGradientAI - Fondo interactivo con gradiente azul AI
 * 
 * Características:
 * - Gradiente radial azul frío que sigue el mouse
 * - Efecto glow suave y profesional
 * - Optimizado para rendimiento
 * - Estilo minimalista y tecnológico
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
