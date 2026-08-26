import { motion, useReducedMotion } from 'motion/react';

/**
 * Fades and slides content in once it scrolls into view.
 * `index` staggers siblings (e.g. cards in a grid) without extra markup.
 */
export default function Reveal({ children, as = 'div', index = 0, y = 16, className, ...props }) {
    const reduceMotion = useReducedMotion();
    const Component = motion[as] ?? motion.div;

    if (reduceMotion) {
        const Static = as;
        return <Static className={className}>{children}</Static>;
    }

    return (
        <Component
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
            {...props}
        >
            {children}
        </Component>
    );
}
