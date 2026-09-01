import { Head, Link } from '@inertiajs/react';
import { COLORS, FONT_BODY, FONT_TITLE } from '@/lib/brand';

export function BrandFonts() {
    return (
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Semi+Condensed:wght@500;600;700&display=swap"
                rel="stylesheet"
            />
        </Head>
    );
}

export function BrandStyles() {
    return (
        <style>{`
            @keyframes kn-reveal {
                from { opacity: 0; transform: translateY(-6px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .kn-reveal { animation: kn-reveal 220ms ease-out; }
            @media (prefers-reduced-motion: reduce) {
                .kn-reveal { animation: none; }
            }
            .kn-coord-row:hover { background-color: rgba(255,255,255,0.04); }
            .kn-btn-primary { background-color: ${COLORS.marine}; }
            .kn-btn-primary:hover { background-color: ${COLORS.marineClair}; }
            .kn-maps-link:hover { color: ${COLORS.marineClair}; }
            .kn-tel-block:hover { background-color: ${COLORS.marineClair}; }
        `}</style>
    );
}

export function CurveMotif({ corner }) {
    const isTopLeft = corner === 'top-left';
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 140 140"
            className="pointer-events-none absolute h-24 w-24 sm:h-32 sm:w-32"
            style={{
                top: isTopLeft ? -8 : undefined,
                left: isTopLeft ? -8 : undefined,
                bottom: isTopLeft ? undefined : -8,
                right: isTopLeft ? undefined : -8,
                transform: isTopLeft ? undefined : 'rotate(180deg)',
            }}
        >
            <path d="M0,140 A140,140 0 0 1 140,0" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="7" />
            <path d="M18,140 A122,122 0 0 1 140,18" fill="none" stroke={COLORS.rouge} strokeWidth="7" />
        </svg>
    );
}

export function ArrowOutIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M6 3.5h6.5V10M12.5 3.5 3.5 12.5" />
        </svg>
    );
}

export function Breadcrumb({ items }) {
    return (
        <nav aria-label="Fil d'Ariane" className="mb-10 flex flex-wrap items-center gap-2 text-sm">
            {items.map((item, i) => {
                const isLast = i === items.length - 1;
                return (
                    <span key={item.label} className="flex items-center gap-2">
                        {i > 0 && (
                            <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                /
                            </span>
                        )}
                        {isLast || !item.href ? (
                            <span style={{ color: isLast ? COLORS.blanc : 'rgba(255,255,255,0.6)', fontFamily: FONT_BODY }}>
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="rounded-[2px] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: FONT_BODY }}
                            >
                                {item.label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

export function InfoBlock({ title, children }) {
    return (
        <div style={{ borderTop: `2px solid ${COLORS.marine}` }} className="pt-5">
            <h2 style={{ fontFamily: FONT_TITLE, color: COLORS.encre }} className="mb-4 text-lg font-semibold">
                {title}
            </h2>
            {children}
        </div>
    );
}

export function QuickCallBlock({ lead, phoneDisplay, phoneHref }) {
    return (
        <>
            <p className="text-sm" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY, lineHeight: 1.6 }}>
                {lead}
            </p>
            <a
                href={phoneHref}
                className="kn-tel-block mt-4 block rounded-[2px] px-5 py-4 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                style={{ backgroundColor: COLORS.marine }}
            >
                <span className="text-[22px] font-semibold" style={{ color: COLORS.blanc, fontFamily: FONT_TITLE }}>
                    {phoneDisplay}
                </span>
            </a>
        </>
    );
}
