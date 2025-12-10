"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- SERVICE CONFIGURATION (Expanded List) ---
const ALL_SERVICES_CONFIG = {
    // High Tier Services (Required for Promo Logic)
    videoProduction: { cost: 400, label: "Video Production (High Tier)" },
    websiteDevelopment: { cost: 500, label: "Website Development (High Tier)" },
    adsManagement: { cost: 300, label: "Targeted Ads Mgmt" },
    
    // Core Services (Additional options for scrollability)
    seoOptimization: { cost: 100, label: "SEO Optimization" },
    contentStrategy: { cost: 200, label: "Content Strategy" },
    socialShop: { cost: 120, label: "Social Shop Setup" },
    ugcProgram: { cost: 110, label: "UGC Program" },
    brandMonitoring: { cost: 80, label: "Brand Monitoring" },
    performanceReporting: { cost: 60, label: "Performance Reporting" },
    channelAudit: { cost: 50, label: "Channel Audit" },
    customerSupport: { cost: 70, label: "Customer Support Mgmt" },
    quickHitContent: { cost: 90, label: "Quick-Hit Content" },
    emailMarketing: { cost: 150, label: "Email Marketing" },
    influencerOutreach: { cost: 250, label: "Influencer Outreach" },
};

type ServiceKey = keyof typeof ALL_SERVICES_CONFIG;
type ActiveServices = Record<ServiceKey, boolean>;

// --- VISUAL STYLING CONSTANTS ---
const accentColor = "#D9403B"; 
const cardBgColor = "rgba(255, 255, 255, 0.08)"; 
const inputBgColor = "rgba(255, 255, 255, 0.12)";
const primaryTextColor = "#FFFFFF";
const trackColor = "#FFFFFF30"; 
const inputBorderColor = "rgba(255, 255, 255, 0.2)"; 
const scrollContainerBg = "rgba(255, 255, 255, 0.05)";

interface CustomCSSProperties extends React.CSSProperties {
    [key: `--${string}`]: string;
}

// --- DROPDOWN OPTION COMPONENT ---
interface DropdownOptionProps {
    serviceKey: ServiceKey;
    label: string;
    isActive: boolean;
    toggleService: (serviceKey: ServiceKey) => void;
}

const DropdownOption: React.FC<DropdownOptionProps> = React.memo(({ serviceKey, label, isActive, toggleService }) => {
    const [isPulsing, setIsPulsing] = useState(false);

    const handleClick = () => {
        if (!isActive) {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 300);
        }
        toggleService(serviceKey);
    };

    const optionStyle: CustomCSSProperties = {
        backgroundColor: isActive ? 'rgba(217, 64, 59, 0.9)' : 'rgba(255, 255, 255, 0.05)', 
        color: primaryTextColor,
        padding: "0.75rem 1rem",
        cursor: "pointer",
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.9rem',
        backdropFilter: 'blur(10px)',
    };
    
    const checkmarkStyle: CustomCSSProperties = {
        backgroundColor: accentColor,
        color: primaryTextColor,
        width: '18px',
        height: '18px',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        transition: 'transform 0.15s ease-out, background-color 0.3s ease',
        transform: isPulsing ? 'scale(1.3)' : 'scale(1)',
        boxShadow: isPulsing ? `0 0 8px ${accentColor}` : 'none',
    }

    return (
        <div
            style={optionStyle}
            onClick={handleClick}
            className="hover:bg-white/10" 
        >
            <span>{label}</span>
            <div style={checkmarkStyle}>
                {isActive && (
                    <span>✔</span>
                )}
            </div>
        </div>
    );
});
DropdownOption.displayName = 'DropdownOption';


export default function CustomPlanBuilder() {
    const sectionRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // --- State Variables ---
    const initialActiveServices: ActiveServices = (Object.keys(ALL_SERVICES_CONFIG) as ServiceKey[]).reduce((acc, key) => {
        acc[key] = false; 
        return acc;
    }, {} as ActiveServices);

    const [activeServices, setActiveServices] = useState<ActiveServices>(initialActiveServices);
    const [isVisible, setIsVisible] = useState(false); 
    const [isPromoActive, setIsPromoActive] = useState(false);
    const [isHovering, setIsHovering] = useState(false); 
    
    const closeTimeoutRef = useRef<number | null>(null);

    // Input fields state
    const [clientBudgetInput, setClientBudgetInput] = useState('500'); 

    const maxBudgetSlider = 1000;
    const currentBudget = Number(clientBudgetInput) || 0;

    // Derived State for Promo Toggle Logic
    const activeServiceCount = Object.values(activeServices).filter(Boolean).length;
    
    // Promo is enabled if TWO OR MORE High Tier Services are selected
    const highTierServiceKeys: ServiceKey[] = ['videoProduction', 'websiteDevelopment', 'adsManagement'];
    const highTierActiveCount = highTierServiceKeys.filter(key => activeServices[key]).length;
    const isPromoToggleEnabled = highTierActiveCount >= 2;


    // --- Price Calculation Logic ---
    const calculateFinalPrice = useCallback(() => {
        const targetPrice = (Object.keys(ALL_SERVICES_CONFIG) as ServiceKey[])
            .filter(key => activeServices[key])
            .reduce((sum, key) => sum + ALL_SERVICES_CONFIG[key].cost, 0);

        let finalPrice = targetPrice;
        
        // 1. Apply Competitive Pricing Rule
        if (currentBudget > 0 && currentBudget < targetPrice) {
            const budgetSurplus = currentBudget * (1 + (Math.random() * 0.4 + 0.1)); 
            finalPrice = Math.round(budgetSurplus); 
        }

        // 2. Apply Promo Discount
        if (isPromoToggleEnabled && isPromoActive) {
             finalPrice = Math.round(finalPrice * 0.80); 
        }
        
        // 3. Apply Final Digit Rule (Must end in an even digit)
        const lastDigit = finalPrice % 10;
        if (lastDigit % 2 !== 0) {
            finalPrice += 1; 
        }
        
        return Math.max(10, finalPrice); 
    }, [activeServices, currentBudget, isPromoActive, isPromoToggleEnabled]);
    
    // --- Effects and Handlers ---

    // Scroll-Triggered Animation Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); 
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.1, }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, []); 

    // Toggle service state
    const toggleService = useCallback((serviceKey: ServiceKey) => {
        setActiveServices(prev => ({
            ...prev,
            [serviceKey]: !prev[serviceKey]
        }));
    }, []);

    // Handle price calculation and display in an alert
    const handleComputePrice = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (activeServiceCount === 0) {
             alert("Please select at least one service to compute the price.");
             return;
        }

        const finalComputedPrice = calculateFinalPrice();
        const selectedServicesLabels = (Object.keys(ALL_SERVICES_CONFIG) as ServiceKey[])
            .filter(k => activeServices[k])
            .map(k => ALL_SERVICES_CONFIG[k].label);
            
        alert(`PRICE COMPUTATION COMPLETE\n\nEstimated Monthly Investment: $${finalComputedPrice.toLocaleString('en-US')}\n(Price always ends in an even digit, currently: ${finalComputedPrice % 10})\n\nServices Included:\n- ${selectedServicesLabels.join('\n- ')}`);
    };
    
    const handleMouseLeave = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = window.setTimeout(() => {
            setIsHovering(false);
        }, 150);
    };

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsHovering(true);
    };

    // --- Styling Components ---

    // Budget Slider Styling
    const budgetPercentage = Math.min(100, (currentBudget / maxBudgetSlider) * 100);
    const rangeSliderStyle: CustomCSSProperties = {
        '--accent-color': accentColor,
        '--track-color': trackColor,
        background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${budgetPercentage}%, var(--track-color) ${budgetPercentage}%, var(--track-color) 100%)`,
        height: '0.25rem',
        borderRadius: '0.25rem',
        outline: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
    };
    
    // Complex Animation Styles
    const animationStyles: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)', 
        transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
    };

    // Dropdown open/close transition styles
    const dropdownMenuStyles: React.CSSProperties = {
        opacity: isHovering ? 1 : 0,
        transform: isHovering ? 'scaleY(1)' : 'scaleY(0.95)',
        transformOrigin: 'top',
        transition: 'opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
        pointerEvents: isHovering ? 'auto' : 'none', 
        maxHeight: isHovering ? '250px' : '0px',
        overflowY: isHovering ? 'auto' : 'hidden', 
    };

    // Helper for selected services summary text
    const selectedServiceSummary = activeServiceCount === 0 
        ? "Select Options" 
        : `${activeServiceCount} Service${activeServiceCount > 1 ? 's' : ''} Selected`;
    
    return (
        <section
            ref={sectionRef} 
            className="relative py-20"
            style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            {/* Animated Background Circles */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '10%',
                width: '250px',
                height: '250px',
                background: 'rgba(217, 64, 59, 0.15)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 10s ease-in-out infinite reverse'
            }} />
            
            {/* EMBEDDED SCROLLBAR CSS for WebKit browsers */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: ${scrollContainerBg};
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>

            <div className="container mx-auto px-4 max-w-xl text-center" style={animationStyles}>
                
                {/* Central Card - Form UI/UX */}
                <form
                    onSubmit={handleComputePrice}
                    className="rounded-3xl p-8 shadow-2xl mx-auto text-left relative"
                    style={{
                        backgroundColor: cardBgColor, 
                        backdropFilter: "blur(20px) saturate(180%)", 
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        border: `1px solid rgba(255, 255, 255, 0.18)`, 
                        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 
                                    inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`,
                        maxWidth: '480px'
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 7.5C19.5 6.42 18.66 5.58 17.58 5.58H6.42C5.34 5.58 4.5 6.42 4.5 7.5V16.5C4.5 17.58 5.34 18.42 6.42 18.42H17.58C18.66 18.42 19.5 17.58 19.5 16.5V7.5ZM17.25 10.12L12.75 14.62C12.33 15.04 11.67 15.04 11.25 14.62L6.75 10.12C6.46 9.83 6.7 9.38 7.11 9.38H16.89C17.3 9.38 17.54 9.83 17.25 10.12Z" fill={accentColor}/>
                        </svg>
                        <h2 className="text-2xl font-extrabold" style={{ color: primaryTextColor }}>
                            Build Your <span style={{ color: accentColor }}>Custom Plan</span>
                        </h2>
                    </div>

                    <p className="text-sm mb-6" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        Select the services you need, set your budget, and compute your custom price.
                    </p>
                    
                    {/* Close Button (X) */}
                    <button type="button" className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors" aria-label="Close">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    {/* Service Selection (Dropdown UI) */}
                    <h3 className="text-lg font-bold mb-4" style={{ color: primaryTextColor }}>
                        Select All Services
                    </h3>
                    
                    <div 
                        className="relative mb-8" 
                        ref={dropdownRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Dropdown Header/Selector */}
                        <div 
                            style={{
                                backgroundColor: inputBgColor,
                                color: activeServiceCount > 0 ? primaryTextColor : 'rgba(255, 255, 255, 0.7)',
                                padding: '0.875rem 1.25rem',
                                borderRadius: '12px',
                                border: `1px solid ${inputBorderColor}`,
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)',
                            }}
                            className="hover:shadow-lg"
                        >
                            <span>{selectedServiceSummary}</span>
                            {/* Arrow rotates on hover */}
                            <span style={{ transform: isHovering ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                        </div>

                        {/* Dropdown Menu List */}
                        <div 
                            className="absolute z-10 w-full mt-2 rounded-xl shadow-2xl custom-scrollbar"
                            style={{
                                ...dropdownMenuStyles,
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                        >
                            {(Object.keys(ALL_SERVICES_CONFIG) as ServiceKey[]).map(key => (
                                <DropdownOption 
                                    key={key}
                                    serviceKey={key} 
                                    label={ALL_SERVICES_CONFIG[key].label} 
                                    isActive={activeServices[key]} 
                                    toggleService={toggleService} 
                                />
                            ))}
                        </div>
                    </div>


                    {/* Budget Input Section */}
                    <h3 className="text-lg font-bold mb-4 mt-8" style={{ color: primaryTextColor }}>
                        Your Estimated Monthly Budget ($)
                    </h3>
                    <div className="mb-8 p-4 rounded-xl" style={{ 
                        backgroundColor: inputBgColor,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        
                        <div className="flex items-center mb-3">
                            <span className="text-xl font-bold mr-2" style={{ color: primaryTextColor }}>$</span>
                            <input
                                type="number"
                                value={clientBudgetInput}
                                onChange={(e) => setClientBudgetInput(e.target.value)}
                                min="0"
                                max={maxBudgetSlider}
                                placeholder="500"
                                className="w-full text-xl font-bold bg-transparent focus:outline-none text-white"
                            />
                        </div>

                        {/* Slider for visual range feedback */}
                        <div className="flex items-center mt-2">
                            <span className="text-sm mr-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>$0</span>
                            <input
                                type="range"
                                min="0"
                                max={maxBudgetSlider}
                                value={currentBudget > maxBudgetSlider ? maxBudgetSlider : currentBudget}
                                onChange={(e) => setClientBudgetInput(e.target.value)}
                                className="flex-grow h-2 rounded-lg appearance-none cursor-pointer"
                                style={rangeSliderStyle}
                            />
                            <span className="text-sm ml-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>${maxBudgetSlider}</span>
                        </div>
                    </div>
                    
                    {/* New Client Ads Promo Toggle (Conditional Logic) */}
                    <div className="flex items-center justify-between mb-8 pt-4 border-t" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
                        <label
                            className={`text-lg font-medium transition-opacity duration-300 ${isPromoToggleEnabled ? 'text-white' : 'text-gray-500'}`}
                            htmlFor="promo-toggle"
                        >
                            New Client Ads Promo
                        </label>
                        {/* Custom Toggle Switch (Disabled unless condition met) */}
                        <div
                            id="promo-toggle"
                            className={`relative inline-block w-14 h-8 rounded-full transition-colors duration-300 ${isPromoToggleEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                            style={{ 
                                backgroundColor: (isPromoToggleEnabled && isPromoActive) ? accentColor : 'rgba(255, 255, 255, 0.2)',
                                boxShadow: (isPromoToggleEnabled && isPromoActive) ? `0 0 10px ${accentColor}` : 'none'
                            }}
                            onClick={() => isPromoToggleEnabled && setIsPromoActive(prev => !prev)}
                        >
                            <div
                                className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out transform ${isPromoActive && isPromoToggleEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                            ></div>
                        </div>
                    </div>


                    {/* Compute Price Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="font-bold px-10 py-4 rounded-xl transition w-full text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                backgroundColor: accentColor,
                                fontSize: "1.125rem",
                                boxShadow: `0 8px 20px rgba(217, 64, 59, 0.4)`,
                                transition: 'all 0.3s ease'
                            }}
                            disabled={activeServiceCount === 0}
                        >
                            COMPUTE PRICE
                        </button>
                    </div>

                </form>

                {/* Footer Text */}
                <p className="text-sm mt-6" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    Terms and conditions apply. Your final price will be computed based on selected services and budget.
                </p>
            </div>
        </section>
    );
}