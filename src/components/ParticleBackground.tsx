
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-primary rounded-full opacity-20';
            
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 10;
            const endY = -10;
            const duration = Math.random() * 10 + 5;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            container.appendChild(particle);

            gsap.to(particle, {
                y: endY - startY,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                duration: duration,
                ease: "none",
                onComplete: () => {
                    particle.remove();
                }
            });

            // Pulsing effect
            gsap.to(particle, {
                scale: Math.random() * 2 + 0.5,
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        };

        // Create particles at intervals
        const interval = setInterval(createParticle, 200);

        // Create initial burst
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, Math.random() * 2000);
        }

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        />
    );
}