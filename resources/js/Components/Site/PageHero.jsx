import { motion } from 'motion/react';

export default function PageHero({ eyebrow, title, description }) {
    return (
        <div className="overflow-hidden bg-keynis-navy print:hidden">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {eyebrow && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-3 text-sm font-bold uppercase tracking-widest text-keynis-red"
                    >
                        {eyebrow}
                    </motion.p>
                )}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="max-w-3xl text-3xl font-extrabold text-white sm:text-4xl"
                >
                    {title}
                </motion.h1>
                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.12 }}
                        className="mt-4 max-w-2xl text-lg text-slate-300"
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    );
}
