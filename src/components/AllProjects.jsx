import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowTopRightOnSquare, HiXMark, HiChevronLeft, HiChevronRight, HiPhoto } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';

// Dynamically import all images from the easybuy assets folder
const easyBuyImages = import.meta.glob('../assets/easybuy/*.png', { eager: true, as: 'url' });

// Enhanced name mapping for better presentation
const nameMapping = {
    'AboutUS': 'About Us',
    'AddCategory': 'Add Category',
    'AddItem': 'Add Item',
    'AddSubCategory': 'Add Sub-Category',
    'AdminAccount': 'Admin Dashboard',
    'Bill': 'Invoice / Bill',
    'Buttom': 'UI Button Component',
    'ChooseAddress': 'Select Address',
    'ContactUS': 'Contact Us',
    'DarkMode': 'Dark Mode View',
    'DelateCategory': 'Delete Category Modal',
    'DeleteAdrees': 'Delete Address Confirmation',
    'EditProduct': 'Edit Product Details',
    'EditSubCategory': 'Edit Sub-Category',
    'FQS': 'Frequently Asked Questions',
    'ForgotPassword': 'Forgot Password Flow',
    'Home': 'Home Page Dashboard',
    'ItemPannel': 'Item Management Panel',
    'Location': 'Location / Map View',
    'Login': 'User Login',
    'MyAdress': 'My Addresses',
    'MyCart': 'Shopping Cart',
    'MyOrder': 'My Orders History',
    'OrderDone': 'Order Confirmation Success',
    'OrderSummary': 'Order Summary',
    'Payment': 'Payment Gateway Integration',
    'Register': 'User Registration',
    'Search': 'Search Interface',
    'SearchPage': 'Search Results Page',
    'T&C': 'Terms & Conditions',
    'UpdateCategory': 'Update Category Form',
    'UploadProduct': 'Product Upload Interface',
    'ViewProduct': 'Product Details View'
};

// Convert the imported object into an array of objects
const easyBuyImageList = Object.entries(easyBuyImages).map(([path, url]) => {
    const fileName = path.split('/').pop().replace('.png', '').trim();
    // Use mapping if available, otherwise fallback to spacing CamelCase
    const prettyName = nameMapping[fileName] || fileName.replace(/([A-Z])/g, ' $1').trim();
    return { src: url, alt: prettyName };
});

const projects = [
    {
        id: 'easybuy',
        title: 'EasyBuy - Ultra-Fast E-Commerce',
        subtitle: 'MERN Stack · Real-Time Delivery · Secure Auth Flow',
        overview: 'A high-performance e-commerce platform designed for speed and convenience, featuring an "8-minute delivery" promise. The application offers a seamless shopping experience with dynamic categorization, robust search, and a secure user authentication system.',
        challenges: [
            { title: 'Instant Search', desc: 'Implementing sub-millisecond search results for thousands of products.' },
            { title: 'Inventory Sync', desc: 'Real-time inventory updates to prevent ordering out-of-stock items during high traffic.' },
            { title: 'Secure Auth', desc: 'Building a robust authentication flow with JWT, including password recovery.' }
        ],
        solution: 'Built with a scalable MERN stack architecture. Utilizes MongoDB for flexible product data schemas and Redux for efficient client-side state management. The UI is crafted with Tailwind CSS for a premium, responsive feel across all devices.',
        tech: {
            frontend: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'Vite'],
            backend: ['Node.js', 'Express.js', 'JWT Auth', 'Multer'],
            infra: ['MongoDB', 'Cloudinary', 'Vercel', 'Render']
        },
        deployment: 'Frontend deployed on Vercel for edge performance, with backend services hosted on Render. Images optimized and served via Cloudinary.',
        flow: 'The backend handles inventory state and complex pricing rules, emitting socket events for stock updates. The frontend consumes these events to update product availability in real-time without polling.',
        color: 'green',
        link: 'https://easybuy-ecommerce-ten.vercel.app/',
        repo: '#',
        images: easyBuyImageList // Use the dynamically loaded images
    },

];

const AllProjects = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const handleBackClick = (e) => {
        e.preventDefault();
        if (location.state?.previousPath) {
            navigate(location.state.previousPath);
            // Small timeout to allow nav to happen before scrolling if needed, though Navigate usually handles URL.
            // For hash links, we might need a manual scroll if Lenis is hijacking things, but default behavior + App.jsx hash handler should work.
        } else {
            navigate('/');
        }
    };

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeProjectImages, setActiveProjectImages] = useState([]);
    // Ref for the thumbnail strip to scroll active item into view
    const thumbnailsRef = useRef(null);

    const openLightbox = (images, index) => {
        setActiveProjectImages(images);
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % activeProjectImages.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + activeProjectImages.length) % activeProjectImages.length);
    };

    // Jump to specific image
    const selectImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, activeProjectImages]);

    // Auto-scroll thumbnails when index changes
    useEffect(() => {
        if (lightboxOpen && thumbnailsRef.current) {
            const activeThumb = thumbnailsRef.current.children[currentImageIndex];
            if (activeThumb) {
                activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentImageIndex, lightboxOpen]);

    return (
        <div className="min-h-screen bg-bg-dark text-text-primary pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Header Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <a href="/" onClick={handleBackClick} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-5 mt-8 cursor-pointer">
                        <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase text-xs font-bold tracking-widest">Back to Home</span>
                    </a>

                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400">Works</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                        A deep dive into my recent engineering challenges, architectural decisions, and full-stack implementations.
                    </p>
                </motion.div>

                {/* Projects List */}
                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="group"
                        >
                            {/* Project Header */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className={`h-px w-12 bg-accent-${project.color}`}></span>
                                        <span className={`text-accent-${project.color} font-mono text-sm font-bold tracking-widest uppercase`}>{project.id}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h2>
                                    <p className="text-text-secondary text-lg leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
                                        {project.overview}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                                                <span>Visit Project</span>
                                                <HiArrowTopRightOnSquare className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Tech Stack - Right Side */}
                                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                    <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-b border-white/10 pb-4">Built With</h3>
                                    <div className="space-y-6">
                                        {Object.entries(project.tech).map(([category, techs]) => (
                                            <div key={category}>
                                                <span className="block text-xs uppercase text-gray-500 mb-3 font-semibold">{category}</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {techs.map(t => (
                                                        <span key={t} className="text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Images Section - Bento Grid Layout */}
                            {project.images && project.images.length > 0 && (
                                <div className="mb-16">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-white font-bold uppercase tracking-wider text-xl flex items-center gap-3">
                                            <HiPhoto className="w-6 h-6 text-gray-400" />
                                            Gallery
                                        </h3>
                                        <button
                                            onClick={() => openLightbox(project.images, 0)}
                                            className="text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-bold flex items-center gap-2"
                                        >
                                            View All {project.images.length}
                                            <HiChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Bento Grid: First 5 images */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                                        {project.images.slice(0, 5).map((img, i) => {
                                            const isFeatured = i === 0;
                                            const isLast = i === 4;
                                            const remaining = project.images.length - 5;

                                            // Determine classes for bento layout
                                            let gridClasses = "relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-bg-dark";
                                            if (isFeatured) gridClasses += " col-span-2 row-span-2";
                                            else gridClasses += " col-span-1 row-span-1";

                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => openLightbox(project.images, i)}
                                                    className={gridClasses}
                                                >
                                                    {/* Blur Backdrop for Context */}
                                                    <div className="absolute inset-0 bg-black/20 z-0">
                                                        <img
                                                            src={img.src}
                                                            loading="lazy"
                                                            alt=""
                                                            className="w-full h-full object-cover blur-xl opacity-50 scale-110"
                                                        />
                                                    </div>

                                                    {/* Main Image - Full Cover (No Padding) */}
                                                    <img
                                                        src={img.src}
                                                        loading="lazy"
                                                        alt={img.alt}
                                                        className="absolute inset-0 w-full h-full object-cover object-top z-10 transition-transform duration-700 group-hover:scale-105"
                                                    />

                                                    {/* Featured Badge */}
                                                    {isFeatured && (
                                                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-bold uppercase tracking-wider z-20 border border-white/10">
                                                            Featured
                                                        </div>
                                                    )}

                                                    {/* Last Item Overlay if more images exist */}
                                                    {isLast && remaining > 0 && (
                                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-white group-hover:bg-black/70 transition-colors">
                                                            <span className="text-3xl font-bold mb-1">+{remaining}</span>
                                                            <span className="text-xs uppercase tracking-widest">More</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 border-t border-white/10 pt-12">
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wider text-xl mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm">!</span>
                                        Challenges
                                    </h3>
                                    <ul className="space-y-6">
                                        {project.challenges.map((c, i) => (
                                            <li key={i} className="group">
                                                <h4 className="text-white font-bold mb-2 group-hover:text-accent-purple transition-colors">{c.title}</h4>
                                                <p className="text-text-secondary text-sm leading-relaxed">{c.desc}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wider text-xl mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">✓</span>
                                        Solution
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed mb-6">
                                        {project.solution}
                                    </p>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">Architecture Flow</h4>
                                        <p className="text-gray-400 text-sm font-mono leading-relaxed">
                                            {project.flow}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-32 text-center border-t border-white/10 pt-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Interested in building something together?</h2>
                    <button
                        onClick={() => {
                            const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

                            if (isHomePage) {
                                // If already on home, scroll directly
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    // Fallback if element not found (rare)
                                    window.location.href = '/#contact';
                                }
                            } else {
                                // If on another page, navigate to home with hash
                                // Using a timeout to ensure hash is processed if needed, or just standard nav
                                window.location.href = '/#contact';
                            }
                        }}
                        className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
                    >
                        Start a Conversation
                    </button>
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] flex flex-col bg-black/95 backdrop-blur-xl"
                        onClick={closeLightbox}
                    >

                        {/* Close Button - Moved outside for guaranteed visibility */}
                        <button
                            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/90 hover:text-white transition-colors bg-black/50 hover:bg-black/70 backdrop-blur-md p-3 md:p-4 rounded-full z-[2001] border border-white/20 shadow-lg cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                        >
                            <HiXMark className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        {/* Main Image Area */}
                        <div className="flex-1 relative flex items-center justify-center w-full h-full p-0 overflow-hidden">
                            {/* Close Button - Floating */}


                            {/* Prev Button */}
                            <button
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all bg-black/40 hover:bg-black/70 md:hover:scale-110 p-3 md:p-4 rounded-full z-40 backdrop-blur-sm border border-white/10 shadow-lg"
                                onClick={prevImage}
                            >
                                <HiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                            </button>

                            {/* Next Button */}
                            <button
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all bg-black/40 hover:bg-black/70 md:hover:scale-110 p-3 md:p-4 rounded-full z-40 backdrop-blur-sm border border-white/10 shadow-lg"
                                onClick={nextImage}
                            >
                                <HiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                            </button>

                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4 md:p-10 pt-28 pb-32"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={activeProjectImages[currentImageIndex].src}
                                    alt={activeProjectImages[currentImageIndex].alt}
                                    className="w-auto h-auto max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm"
                                />
                            </motion.div>

                            {/* Floating Caption - Glassmorphism Pill (NOW STATIC OUTSIDE MOTION DIV) */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 w-[320px] h-[80px] rounded-full flex flex-col items-center justify-center shadow-2xl z-50 pointer-events-none transform transition-all hover:bg-black/80 overflow-hidden">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute flex flex-col items-center gap-1 w-full"
                                    >
                                        <h3 className="text-white text-lg font-bold tracking-wide text-center truncate w-[90%]">
                                            {activeProjectImages[currentImageIndex].alt}
                                        </h3>
                                        <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium">
                                            {currentImageIndex + 1} <span className="mx-2 text-white/20">|</span> {activeProjectImages.length}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                        </div>

                        {/* Bottom Thumbnail Strip - Floating & Auto-hide */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-[60]" // z-index increased to be above caption interaction zone if needed
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="flex items-center gap-2 overflow-x-auto no-scrollbar px-10 max-w-4xl"
                                ref={thumbnailsRef}
                            >
                                {activeProjectImages.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => selectImage(i)}
                                        className={`flex-shrink-0 cursor-pointer transition-all duration-300 relative rounded-md overflow-hidden border-2 ${currentImageIndex === i
                                            ? 'border-white opacity-100 w-16 h-10 md:w-20 md:h-12 scale-110 shadow-lg'
                                            : 'border-white/20 opacity-50 hover:opacity-100 w-16 h-10 md:w-20 md:h-12 grayscale hover:grayscale-0'
                                            }`}
                                    >
                                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllProjects;
