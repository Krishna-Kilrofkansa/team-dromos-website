import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".achievement-reveal",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-background relative border-y border-white/5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <div className="container mx-auto px-6 text-center">
                <div className="achievement-reveal mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-6">
                        Excellence
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Official Hyperloop Special Team
                    </h2>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Vellore Institute of Technology, Chennai Campus
                    </p>
                </div>

                <div className="achievement-reveal relative p-8 md:p-12 mt-12 bg-black/40 border border-white/10 rounded-2xl max-w-4xl mx-auto overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                    {/* Glow Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full border border-yellow-500/30">
                            <Trophy className="w-12 h-12 text-yellow-500" />
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">First Runner Up</h3>
                            <p className="text-lg text-primary font-medium">Global Hyperloop Competition 2025</p>
                        </div>
                    </div>

                    {/* Placeholder for future images */}
                    <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/10">
                                <span className="text-xs text-gray-500 flex items-center gap-2">
                                    <Award className="w-4 h-4" /> Achievement Image {i}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500 italic">
                        (Images coming soon)
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        </section>
    );
}
