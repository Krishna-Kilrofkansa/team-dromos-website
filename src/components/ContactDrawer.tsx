import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../lib/utils";
import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";

export default function ContactDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.6,
                ease: "power3.out",
            });
            gsap.fromTo(
                formRef.current?.children || [],
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
            );
        } else {
            gsap.to(drawerRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    }, [isOpen]);

    // Handle recursive mouse enter/leave logic to avoid flickering
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <>
            {/* Visual Trigger - Contact Icon */}
            {!isOpen && (
                <div
                    className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary p-3 rounded-l-xl cursor-pointer hover:pr-4 transition-all duration-300 shadow-lg shadow-primary/20"
                    onMouseEnter={handleMouseEnter}
                >
                    <Mail className="w-6 h-6 text-black" />
                    <span className="sr-only">Contact Us</span>
                </div>
            )}

            {/* The Drawer */}
            <div
                ref={drawerRef}
                className={cn(
                    "fixed top-0 right-0 h-screen w-full md:w-[400px] bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 shadow-2xl transform translate-x-full",
                    "flex flex-col p-8 pt-24"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                    <p className="text-gray-400">
                        Have questions about our technology or want to join the team?
                    </p>
                </div>

                <form ref={formRef} className="space-y-6 flex-1 text-white">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-primary uppercase tracking-wider">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors hover:bg-white/10"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-primary uppercase tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors hover:bg-white/10"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-primary uppercase tracking-wider">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors hover:bg-white/10 resize-none"
                            placeholder="How can we help you?"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Send Message
                    </button>
                </form>

                {/* Social Links & Close Hint */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex gap-6">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors transform hover:scale-110">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors transform hover:scale-110">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors transform hover:scale-110">
                            <Twitter className="w-6 h-6" />
                        </a>
                    </div>
                    <div className="text-gray-500 text-sm">
                        Move cursor away to close
                    </div>
                </div>
            </div>
        </>
    );
}
