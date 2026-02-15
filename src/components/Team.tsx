import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MEMBER_IDS = [
    1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29
];

const TEAM_MEMBERS = MEMBER_IDS.map((id) => ({
    id,
    name: `Member ${id}`,
    role: "Engineer",
    image: `/images/${id}.jpg`
}));

export default function Team() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create the infinite loop animation
            // We animate xPercent to -50 which moves exactly half the width (one full set)
            tweenRef.current = gsap.to(rowRef.current, {
                xPercent: -50,
                ease: "none",
                duration: 40, // Adjust speed (seconds for one full loop)
                repeat: -1,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        tweenRef.current?.timeScale(0.2); // Slow down
    };

    const handleMouseLeave = () => {
        tweenRef.current?.timeScale(1); // Resume normal speed
    };

    // Helper to render a card
    const renderCard = (member: typeof TEAM_MEMBERS[0]) => (
        <div
            key={member.id}
            className="team-card group relative bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 w-[250px] md:w-[300px] flex-shrink-0 aspect-[3/4]"
        >
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                loading="lazy"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Member+${member.id}&background=0D8ABC&color=fff`;
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                </h4>
                <p className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {member.role}
                </p>
            </div>
        </div>
    );

    return (
        <section id="team" ref={containerRef} className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.1)_0%,rgba(0,0,0,0)_70%)] opacity-50 pointer-events-none" />

            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-primary font-bold tracking-[0.2em] uppercase mb-4">Our People</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Meet the Team</h3>
                <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full" />
            </div>

            {/* Marquee Wrapper */}
            <div
                className="w-full overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* The moving "row" contains TWO sets of items */}
                <div ref={rowRef} className="flex w-max">
                    {/* Set 1 */}
                    <div className="flex gap-6 pr-6">
                        {TEAM_MEMBERS.map((member) => renderCard(member))}
                    </div>
                    {/* Set 2 (Duplicate) */}
                    <div className="flex gap-6 pr-6">
                        {TEAM_MEMBERS.map((member) => (
                            <div key={`dup-${member.id}`}>
                                {renderCard(member)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
