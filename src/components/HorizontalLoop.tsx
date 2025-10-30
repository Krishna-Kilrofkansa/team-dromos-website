import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HorizontalLoopProps {
    images: string[];
}

export default function HorizontalLoop({ images }: HorizontalLoopProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = gsap.utils.toArray(".loop-item");
        
        gsap.set(items, { xPercent: (i) => i * 100 });

        const loop = gsap.timeline({ repeat: -1, paused: true });
        const totalWidth = items.length * 100;

        loop.to(items, {
            xPercent: `-=${totalWidth}`,
            duration: 20,
            ease: "none"
        });

        loop.play();

        return () => {
            loop.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-64 overflow-hidden">
            <div className="flex absolute inset-0">
                {images.map((src, index) => (
                    <div key={index} className="loop-item flex-shrink-0 w-80 h-full mx-4">
                        <img
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}