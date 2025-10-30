"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const handleMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseEnter = () => {
            gsap.to([cursor, follower], {
                scale: 1.5,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to([cursor, follower], {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div 
                ref={cursorRef}
                className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
            <div 
                ref={followerRef}
                className="fixed w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-40"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
        </>
    );
}