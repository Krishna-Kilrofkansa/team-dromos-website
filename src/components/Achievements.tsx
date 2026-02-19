import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Zap, ChevronLeft, ChevronRight, Award, Cpu, Flame, Cog, CircuitBoard } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COMPETITIONS = [
    {
        year: "2026",
        title: "Global Hyperloop Competition '26",
        subtitle: "DesignX",
        venue: "Indian Institute of Technology, Madras",
        tagline: "Once again, Team DROMOS delivers. 🚄⚡",
        description:
            "Team DROMOS from VIT Chennai showcased engineering excellence at GHC '26 – DesignX, hosted at IIT Madras, competing against 10 national and 2 international student teams in the final round.",
        achievements: [
            { icon: <Trophy className="w-5 h-5" />, text: "Highest Overall Score among all finalist teams" },
            { icon: <Zap className="w-5 h-5" />, text: "Best Electrical System Award" },
            { icon: <Cpu className="w-5 h-5" />, text: "Best Embedded System Award" },
            { icon: <Award className="w-5 h-5" />, text: "First Runner-Up — InnoQuest Competition" },
        ],
        images: [
            "/achievementsimg/2026 ghc/img1.jpeg",
            "/achievementsimg/2026 ghc/img2.jpeg",
            "/achievementsimg/2026 ghc/img3.jpeg",
        ],
    },
    {
        year: "2025",
        title: "Global Hyperloop Competition 2025",
        subtitle: "DesignX Blueprint",
        venue: "IIT Madras · 21–24 February",
        tagline: "A milestone 1.5 years in the making.",
        description:
            "Team Dromos achieved a significant milestone at GHC 2025 — the culmination of 1.5 years of rigorous research, engineering, and problem-solving by a dedicated team of 15 members.",
        achievements: [
            { icon: <Trophy className="w-5 h-5" />, text: "First Runner-Up — DesignX Blueprint Category" },
            { icon: <Award className="w-5 h-5" />, text: "1st Place — Levitation & Stabilization Category" },
            { icon: <Zap className="w-5 h-5" />, text: "Special Mention — Electrical Subsystem" },
        ],
        subsystems: [
            { icon: <Award className="w-4 h-4" />, name: "Levitation", desc: "High-efficiency levitation system" },
            { icon: <Zap className="w-4 h-4" />, name: "Electrical", desc: "Optimized power distribution" },
            { icon: <Flame className="w-4 h-4" />, name: "Propulsion", desc: "Efficient propulsion mechanism" },
            { icon: <Cog className="w-4 h-4" />, name: "Mechanical", desc: "Aerodynamic pod structure" },
            { icon: <CircuitBoard className="w-4 h-4" />, name: "Embedded", desc: "Real-time automation" },
            { icon: <Flame className="w-4 h-4" />, name: "Thermal", desc: "Temperature regulation" },
        ],
        images: [
            "/achievementsimg/2025 ghc/img1.jpeg",
            "/achievementsimg/2025 ghc/img2.jpeg",
            "/achievementsimg/2025 ghc/img3.jpeg",
            "/achievementsimg/2025 ghc/img4.jpeg",
            "/achievementsimg/2025 ghc/img5.jpeg",
            "/achievementsimg/2025 ghc/img6.jpeg",
            "/achievementsimg/2025 ghc/img7.jpeg",
        ],
    },
];

function ImageGallery({ images, year }: { images: string[]; year: string }) {
    const [current, setCurrent] = useState(0);
    const imgRef = useRef<HTMLImageElement>(null);

    const go = (dir: number) => {
        setCurrent((prev) => (prev + dir + images.length) % images.length);
    };

    useEffect(() => {
        if (imgRef.current) {
            gsap.fromTo(imgRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [current]);

    return (
        <div className="relative group">
            {/* Main image — object-contain so nothing gets cropped */}
            <div className="relative w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden">
                <img
                    ref={imgRef}
                    src={images[current]}
                    alt={`GHC ${year} - ${current + 1}`}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Arrows */}
            <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm p-2.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm p-2.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
            >
                <ChevronRight size={18} />
            </button>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-300 ${i === current
                                ? "border-white opacity-100"
                                : "border-transparent opacity-40 hover:opacity-70"
                            }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function Achievements() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".ach-block").forEach((block) => {
                gsap.fromTo(
                    block,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top 80%",
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="achievements" ref={containerRef} className="py-28 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <h2 className="text-white/50 font-bold tracking-[0.3em] uppercase mb-4 text-sm">
                        Our Track Record
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight">
                        Achievements
                    </h3>
                    <div className="w-16 h-[2px] bg-white/30 mx-auto mt-8" />
                </div>

                {/* Competition Blocks */}
                <div className="space-y-32">
                    {COMPETITIONS.map((comp, idx) => (
                        <div key={comp.year} className="ach-block">
                            {/* Year & Title Header */}
                            <div className="flex items-end gap-6 mb-10">
                                <span className="text-8xl md:text-9xl font-black text-white/[0.06] leading-none -mb-2">
                                    {comp.year}
                                </span>
                                <div className="pb-2">
                                    <h4 className="text-2xl md:text-3xl font-bold text-white">
                                        {comp.title}
                                    </h4>
                                    <p className="text-white/40 text-sm mt-1">{comp.subtitle} · {comp.venue}</p>
                                </div>
                            </div>

                            {/* Main Layout */}
                            <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 ${idx % 2 === 1 ? "direction-rtl" : ""}`}>
                                {/* Gallery — takes 3 cols */}
                                <div className={`lg:col-span-3 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <ImageGallery images={comp.images} year={comp.year} />
                                </div>

                                {/* Content — takes 2 cols */}
                                <div className={`lg:col-span-2 flex flex-col justify-center space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <p className="text-lg text-white/70 font-medium italic">
                                        "{comp.tagline}"
                                    </p>

                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        {comp.description}
                                    </p>

                                    {/* Achievements */}
                                    <div className="space-y-3 pt-4">
                                        <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-bold mb-3">
                                            🏆 Accolades
                                        </p>
                                        {comp.achievements.map((ach, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all group"
                                            >
                                                <span className="text-white/50 group-hover:text-white transition-colors">
                                                    {ach.icon}
                                                </span>
                                                <span className="text-white/80 text-sm font-medium">
                                                    {ach.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Subsystems */}
                                    {comp.subsystems && (
                                        <div className="pt-2">
                                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-bold mb-3">
                                                Key Subsystems
                                            </p>
                                            <div className="grid grid-cols-3 gap-2">
                                                {comp.subsystems.map((sub, i) => (
                                                    <div
                                                        key={i}
                                                        className="text-center py-3 px-2 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-colors"
                                                    >
                                                        <span className="text-white/40 flex justify-center mb-1">{sub.icon}</span>
                                                        <p className="text-white/70 text-[11px] font-bold">{sub.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Divider between competitions */}
                            {idx < COMPETITIONS.length - 1 && (
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
