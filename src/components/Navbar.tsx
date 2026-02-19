import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set(navRef.current, { y: -100, opacity: 0 });
        gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 5
        });
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.out"
            });
            gsap.fromTo(".menu-item",
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2 }
            );
        } else {
            gsap.to(menuRef.current, {
                x: "-100%",
                duration: 0.5,
                ease: "power3.in"
            });
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const scrollToSection = (id: string) => {
        setIsMenuOpen(false);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 600); // Wait for menu close animation
    };

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
            >
                {/* Left: Hamburger Menu */}
                <button
                    onClick={toggleMenu}
                    className="z-50 text-white hover:opacity-70 transition-opacity p-2"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Right: Logo only */}
                <a href="#home" className="z-50">
                    <img src="/dromos-white.jpg" alt="Dromos Logo" className="h-12 w-auto rounded-full" />
                </a>
            </nav>

            {/* Full Screen Menu Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-black/95 z-40 transform -translate-x-full flex items-center justify-center backdrop-blur-xl"
            >
                <div className="flex flex-col items-center gap-8">
                    {[
                        { label: "Home", id: "home" },
                        { label: "About", id: "about" },
                        { label: "Achievements", id: "achievements" },
                        { label: "Join Us", id: "join-us" },
                        { label: "Team", id: "team" },
                        { label: "Contact", id: "contact" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="menu-item text-4xl md:text-6xl font-black text-white hover:opacity-50 transition-opacity uppercase tracking-tight"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
