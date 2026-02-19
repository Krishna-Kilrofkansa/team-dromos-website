import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Medal, CircuitBoard, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".about-image",
                { scale: 1.2, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(
                ".about-content > *",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-content",
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={containerRef} className="py-24 bg-neutral-950 relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Image */}
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img
                        src="/who-are-we.jpg"
                        alt="Team Dromos - Who We Are"
                        className="about-image w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </div>

                {/* Right: Content */}
                <div className="about-content space-y-8">
                    <h2 className="text-white/60 font-bold tracking-[0.2em] uppercase mb-2">Who We Are</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Reshaping the Future of Transport
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        Dromos is a passionate team of young engineers and scientists working to reshape the future of transport through advanced Hyperloop technology.
                    </p>

                    <div className="space-y-6 pt-6 border-t border-white/10">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 rounded-full bg-white/5 border border-white/10">
                                <Medal className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Global Recognition</h4>
                                <p className="text-gray-400 mt-1">We earned 2nd place at the 2025 Global Hyperloop Competition, the largest in Asia and third-largest worldwide.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="p-3 rounded-full bg-white/5 border border-white/10">
                                <CircuitBoard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Levitation Experts</h4>
                                <p className="text-gray-400 mt-1">We took 1st place in the Levitation category, proving our mastery over magnetic propulsion.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="p-3 rounded-full bg-white/5 border border-white/10">
                                <Lightbulb className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Innovation Excellence</h4>
                                <p className="text-gray-400 mt-1">Received a Certificate of Excellence for our innovative electrical systems.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
