import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        const textElements = textRef.current?.querySelectorAll(".hero-text");

        if (textElements && imageRef.current) {
            tl.fromTo(
                textElements,
                { y: 100, opacity: 0, rotateX: -20 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
            )
                .fromTo(
                    imageRef.current,
                    { y: 100, opacity: 0, scale: 1.2 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
                    "-=0.5"
                );
        }

        // Parallax effect on scroll
        gsap.to(imageRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }, []);

    return (
        <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div ref={textRef} className="perspective-text">
                    <div className="overflow-hidden mb-2">
                        <h2 className="hero-text text-white/60 font-bold tracking-[0.2em] uppercase text-sm md:text-base">
                            The Future of Transportation
                        </h2>
                    </div>
                    <div className="overflow-hidden mb-4">
                        <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9]">
                            TEAM <br />
                            <span className="text-white/80">
                                DROMOS
                            </span>
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-8">
                        <p className="hero-text text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
                            Pioneering Hyperloop technology at VIT Chennai. We are building the fastest ground transportation system the world has ever seen.
                        </p>
                    </div>
                    <div className="hero-text flex gap-4">
                        <button
                            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                            className="bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                        >
                            Explore Our Tech
                        </button>
                        <button
                            onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}
                            className="border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
                        >
                            Meet the Team
                        </button>
                    </div>
                </div>

                <div className="relative h-[60vh] lg:h-[80vh] w-full flex items-center justify-center">
                    <img
                        ref={imageRef}
                        src="/hyperloop.png"
                        alt="Hyperloop Pod"
                        className="w-full max-w-[800px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    />
                </div>
            </div>
        </section>
    );
}
