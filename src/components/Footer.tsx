import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [time, setTime] = useState("");

    useEffect(() => {
        // Clock
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Parallax/Reveal effect for the big title
        gsap.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <footer ref={containerRef} className="relative bg-black pt-20 pb-10 px-6 overflow-hidden border-t border-white/10">

            {/* Big Title */}
            <div className="mb-20 overflow-hidden">
                <h1
                    ref={titleRef}
                    className="text-[12vw] leading-none font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 uppercase tracking-tighter"
                >
                    TEAM DROMOS
                </h1>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm uppercase tracking-wider text-gray-400">

                {/* FIND US */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold mb-6">Find Us</h3>
                    <p>
                        VIT Chennai Campus,<br />
                        Vandalur, Kelambakkam Road,<br />
                        Chennai - 600127, Tamil Nadu, India
                    </p>
                    <div className="pt-4">
                        <p className="text-white font-bold">Team Captain</p>
                        <p>+91 98765 43210</p>
                    </div>
                    <div>
                        <p className="text-white font-bold">General Manager</p>
                        <p>+91 98765 43210</p>
                    </div>
                    <a href="mailto:contact@teamdromos.com" className="block text-primary hover:underline pt-2">
                        contact@teamdromos.com
                    </a>
                </div>

                {/* LINKS */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold mb-6">Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                    </ul>
                </div>

                {/* LOCAL TIME */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold mb-6">Local Time</h3>
                    <p className="text-2xl font-mono text-white">{time}</p>
                    <div className="text-[100px] leading-none opacity-20 font-black">
                        N<span className="text-primary">S</span>
                    </div>
                </div>

                {/* MADE BY */}
                <div className="flex flex-col justify-between">
                    <div></div> {/* Spacer */}
                    <div className="space-y-2 text-right md:text-left">
                        <p>Made By <span className="text-white font-bold">Aakarshak Swaraj</span></p>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="container mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                <p>Copyright {new Date().getFullYear()} © Team Dromos. All Rights Reserved.</p>
                <p>Privacy Policy | Terms of Use</p>
            </div>
        </footer>
    );
}
