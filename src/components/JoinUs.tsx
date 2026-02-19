import { useRef } from "react";
import { ArrowRight, Globe, Layers, Zap, Users, GraduationCap } from "lucide-react";

export default function JoinUs() {
    const features = [
        { icon: <Globe className="w-8 h-8 text-white" />, title: "Global Exposure", desc: "Gain international recognition." },
        { icon: <Layers className="w-8 h-8 text-white/70" />, title: "Real-world Engineering", desc: "Work on cutting-edge tech." },
        { icon: <Zap className="w-8 h-8 text-white" />, title: "Hands-on Innovation", desc: "Build things that matter." },
        { icon: <Users className="w-8 h-8 text-white/70" />, title: "Space to Grow", desc: "A supportive environment." },
        { icon: <GraduationCap className="w-8 h-8 text-white" />, title: "Lead & Learn", desc: "Develop leadership skills." },
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section id="join-us" ref={scrollRef} className="py-32 bg-background relative border-t border-white/5">
            {/* SECTION 1: JOIN PURPOSE */}
            <div className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="order-2 lg:order-1 space-y-8">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/60 text-sm font-bold uppercase tracking-widest">
                            Your Future Starts Here
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                            JOIN THE <br />
                            <span className="text-white/80">PURPOSE</span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                            We offer the ride of a lifetime — a space to grow, fail, learn, and lead. Be part of something bigger than yourself.
                        </p>
                        <button className="group mt-8 flex items-center gap-4 bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300">
                            Apply Now
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="order-1 lg:order-2 relative group overflow-hidden rounded-3xl h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <img
                            src="/join-the-purpose.jpg"
                            alt="Join the Purpose"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </div>
            </div>

            {/* SECTION 2: WHAT WE OFFER */}
            <div className="container mx-auto px-6">
                <div className="bg-neutral-900/50 rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden">
                    {/* Background Image Overlay */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img src="/what-we-offer.jpg" alt="Background" className="w-full h-full object-cover grayscale" />
                    </div>

                    <div className="relative z-10 text-center mb-16">
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Offer</h3>
                        <div className="w-24 h-1 bg-white mx-auto rounded-full" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 group hover:-translate-y-2">
                                <div className="mb-6 p-4 bg-white/5 rounded-full w-fit group-hover:bg-white/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
