"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Zap, Target, Globe, Users, Lightbulb, Award } from "lucide-react";

export default function IconGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const icons = container.querySelectorAll('.floating-grid-icon');
            
            icons.forEach((icon: Element) => {
                const rect = (icon as HTMLElement).getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                const maxDistance = 200;
                const force = Math.max(0, (maxDistance - distance) / maxDistance);
                
                gsap.to(icon, {
                    x: deltaX * force * 0.3,
                    y: deltaY * force * 0.3,
                    scale: 1 + force * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const icons = [
        { Icon: Zap, label: "Real-world engineering" },
        { Icon: Globe, label: "Global exposure" },
        { Icon: Lightbulb, label: "Hands-on innovation" },
        { Icon: Users, label: "Space to grow" },
        { Icon: Target, label: "Fail and learn" },
        { Icon: Award, label: "Lead" }
    ];

    return (
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {icons.map(({ Icon, label }, index) => (
                <div key={index} className="floating-grid-icon text-center p-4">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-text-secondary text-sm">{label}</p>
                </div>
            ))}
        </div>
    );
}