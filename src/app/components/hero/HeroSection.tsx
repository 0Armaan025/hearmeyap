'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
  const texts = [
    "Read people's thoughts and stories here...",
    "Or you are free to share yours...",
    "Maybe no one will read this...",
    "But yeah, it's cool."
  ];

  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [particles, setParticles] = useState<Array<{id: number, x: string, y: string, size: number}>>([]);
  const typingSpeed = 50; // ms per character
  const pauseDuration = 2000; // ms to wait before changing text

  // Ref for the animated background
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Generate particles only on client-side to avoid hydration issues
  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 80 + 30
    }));
    setParticles(generatedParticles);
  }, []);

  // Handle the typing animation
  useEffect(() => {
    if (isTyping) {
      if (charIndex < texts[index].length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + texts[index][charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(true);
          setDisplayText('');
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % texts.length);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, index, texts, isTyping]);

  // Handle the animated background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate the position as a percentage of the viewport
      const xPos = clientX / innerWidth;
      const yPos = clientY / innerHeight;
      
      // Use these values to slightly move the background
      backgroundRef.current.style.backgroundPosition = `${xPos * 5}% ${yPos * 5}%`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Button hover animation variants
  const buttonVariants = {
    initial: { scale: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' },
    hover: { 
      scale: 1.05, 
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  // Feature item animation variants
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + (i * 0.1),
        duration: 0.6
      }
    })
  };

  return (
    <>
      <section 
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
        ref={backgroundRef}
        id="heroSection"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 transition-all duration-300 ease-in-out z-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>
        </div>
        
        {/* Client-side rendered particles/circles */}
        <div className="absolute inset-0 z-10">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white opacity-10"
              initial={{ 
                x: particle.x, 
                y: particle.y,
                scale: 0.5 + Math.random() * 0.5
              }}
              animate={{ 
                x: [
                  particle.x, 
                  `${parseInt(particle.x) + (Math.random() * 20 - 10)}%`,
                  particle.x
                ],
                y: [
                  particle.y, 
                  `${parseInt(particle.y) + (Math.random() * 20 - 10)}%`,
                  particle.y
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10 + Math.random() * 20,
                ease: "linear"
              }}
              style={{ 
                width: `${particle.size}px`, 
                height: `${particle.size}px` 
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hear People Yap
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Where thoughts become stories and ideas find their audience
          </motion.p>

          <motion.div
            className="min-h-[120px] mb-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={index}
                className="text-2xl md:text-3xl font-medium text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {displayText}
                <motion.span
                  className="inline-block w-[2px] h-[1em] bg-white ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { 
                icon: "📝", 
                title: "Share Your Thoughts", 
                description: "Express yourself through text and connect with others" 
              },
              { 
                icon: "👥", 
                title: "Follow Creators", 
                description: "Stay updated with your favorite writers and thinkers" 
              },
              { 
                icon: "🔍", 
                title: "Discover Stories", 
                description: "Find content that resonates with your interests" 
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <ScrollLink
              to="nextSection"
              smooth={true}
              duration={800}
              offset={-50}
              className="focus:outline-none"
            >
              <motion.button
                className="px-8 py-4 bg-teal-500 text-white font-bold rounded-full text-lg"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                Start Yapping
              </motion.button>
            </ScrollLink>
            
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Explore Content
            </motion.button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1.5, duration: 1 },
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
          >
            <ScrollLink
              to="nextSection"
              smooth={true}
              duration={800}
              className="flex flex-col items-center cursor-pointer"
            >
              <span className="text-white/70 text-sm mb-2">Scroll Down</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/70"
              >
                <path 
                  d="M12 5L12 19M12 19L19 12M12 19L5 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </ScrollLink>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section (appears when scrolled down) */}
      <section id="nextSection" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with Yap is simple. Follow these steps to begin your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Account",
                description: "Sign up in seconds and customize your profile to reflect your personality.",
                icon: (
                  <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )
              },
              {
                step: "02",
                title: "Discover Content",
                description: "Browse through trending yaps and find creators that match your interests.",
                icon: (
                  <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                step: "03",
                title: "Follow Favorites",
                description: "Subscribe to creators you enjoy to build a personalized feed of content.",
                icon: (
                  <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                step: "04",
                title: "Create Your Yaps",
                description: "Share your thoughts, stories, or expertise with the world.",
                icon: (
                  <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8 relative"
              >
                <div className="absolute -top-4 -left-4 bg-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="mb-4 text-teal-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 text-center"
          >
            <motion.button
              className="px-8 py-4 bg-teal-500 cursor-pointer text-white font-bold rounded-full text-lg shadow-lg"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      
    </>
  );
};

export default HeroSection;