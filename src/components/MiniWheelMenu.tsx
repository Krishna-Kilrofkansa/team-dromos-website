"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Home, Users, Cog, Award, Mail, Info } from "lucide-react";

export default function MiniWheelMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const menu = menuRef.current;
        if (!menu) return;

        const items = menu.querySelectorAll('.wheel-item');
        
        if (isOpen) {
            gsap.to(items, {
                scale: 1,
                opacity: 1,
                rotation: (i) => i * 60,
                transformOrigin: "center center",
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)"
            });
        } else {
            gsap.to(items, {
                scale: 0,
                opacity: 0,
                rotation: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in"
            });
        }
    }, [isOpen]);

    const menuItems = [
        { Icon: Home, label: "Home", href: "#hero" },
        { Icon: Info, label: "About", href: "#about" },
        { Icon: Users, label: "Team", href: "#team" },
        { Icon: Cog, label: "Systems", href: "#systems" },
        { Icon: Award, label: "Awards", href: "#awards" },
        { Icon: Mail, label: "Contact", href: "#contact" }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div ref={menuRef} className="relative">
                {menuItems.map(({ Icon, label, href }, index) => (
                    <a
                        key={index}
                        href={href}
                        className="wheel-item absolute w-12 h-12 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center hover:bg-primary/40 transition-colors scale-0 opacity-0"
                        style={{
                            transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-60px) rotate(-${index * 60}deg)`
                        }}
                        title={label}
                    >
                        <Icon className="w-5 h-5 text-primary" />
                    </a>
                ))}
                
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-14 h-14 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors shadow-glow-cyan"
                >
                    <div className={`w-6 h-6 flex flex-col justify-center items-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                        <span className="block w-4 h-0.5 bg-background mb-1"></span>
                        <span className="block w-4 h-0.5 bg-background"></span>
                    </div>
                </button>
            </div>
        </div>
    );
}