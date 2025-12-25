"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

/* ---------------- SERVICE CONFIG ---------------- */
const ALL_SERVICES_CONFIG = {
  videoProduction: { cost: 400, label: "Video Production (High Tier)" },
  websiteDevelopment: { cost: 500, label: "Website Development (High Tier)" },
  adsManagement: { cost: 300, label: "Targeted Ads Mgmt" },
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

/* ---------------- COLOR THEORY ONLY ---------------- */
const accentColor = "#00C828";
const cardBgColor = "#FFFFFF";
const inputBgColor = "#F5F5F5";
const primaryTextColor = "#1A1A1A";
const bodyTextColor = "#4A4A4A";
const trackColor = "#E0E0E0";
const inputBorderColor = "#D6D6D6";
const scrollContainerBg = "#EEEEEE";

/* ---------------- TYPES ---------------- */
interface CustomCSSProperties extends React.CSSProperties {
  [key: `--${string}`]: string;
}

interface DropdownOptionProps {
  serviceKey: ServiceKey;
  label: string;
  isActive: boolean;
  toggleService: (serviceKey: ServiceKey) => void;
}

/* ---------------- DROPDOWN OPTION ---------------- */
const DropdownOption: React.FC<DropdownOptionProps> = React.memo(
  ({ serviceKey, label, isActive, toggleService }) => {
    const [isPulsing, setIsPulsing] = useState(false);

    const handleClick = () => {
      if (!isActive) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 300);
      }
      toggleService(serviceKey);
    };

    return (
      <div
        onClick={handleClick}
        style={{
          backgroundColor: isActive ? accentColor : "#FFFFFF",
          color: isActive ? "#FFFFFF" : primaryTextColor,
          padding: "0.75rem 1rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <span>{label}</span>
        <div
          style={{
            backgroundColor: isActive ? "#FFFFFF" : accentColor,
            color: isActive ? accentColor : "#FFFFFF",
            width: 18,
            height: 18,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isPulsing ? "scale(1.3)" : "scale(1)",
            transition: "all 0.2s",
          }}
        >
          {isActive && "✔"}
        </div>
      </div>
    );
  }
);
DropdownOption.displayName = "DropdownOption";

/* ---------------- MAIN COMPONENT ---------------- */
export default function CustomPlanBuilder() {
  const sectionRef = useRef<HTMLElement>(null);

  const initialActiveServices: ActiveServices = Object.keys(
    ALL_SERVICES_CONFIG
  ).reduce((acc, key) => {
    acc[key as ServiceKey] = false;
    return acc;
  }, {} as ActiveServices);

  const [activeServices, setActiveServices] =
    useState<ActiveServices>(initialActiveServices);

  const [clientBudgetInput, setClientBudgetInput] = useState("500");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [computedPrice, setComputedPrice] = useState(0);

  const activeServiceCount = Object.values(activeServices).filter(Boolean).length;

  const calculateFinalPrice = useCallback(() => {
    const total = Object.keys(activeServices)
      .filter((k) => activeServices[k as ServiceKey])
      .reduce(
        (sum, key) => sum + ALL_SERVICES_CONFIG[key as ServiceKey].cost,
        0
      );
    return Math.max(99, total);
  }, [activeServices]);

  const toggleService = useCallback((serviceKey: ServiceKey) => {
    setActiveServices((prev) => ({ ...prev, [serviceKey]: !prev[serviceKey] }));
  }, []);

  const handleComputePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeServiceCount) return;
    setComputedPrice(calculateFinalPrice());
    setShowOrderModal(true);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FAFAFA",
        padding: "5rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          background: cardBgColor,
          borderRadius: 24,
          padding: 32,
          border: `1px solid ${inputBorderColor}`,
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: primaryTextColor,
            marginBottom: 8,
          }}
        >
          Build Your <span style={{ color: accentColor }}>Custom Plan</span>
        </h2>

        <p style={{ color: bodyTextColor, marginBottom: 24 }}>
          Select the services you need, set your budget, and compute your custom
          price.
        </p>

        <form onSubmit={handleComputePrice}>
          <div
            style={{
              border: `1px solid ${inputBorderColor}`,
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            {(Object.keys(ALL_SERVICES_CONFIG) as ServiceKey[]).map((key) => (
              <DropdownOption
                key={key}
                serviceKey={key}
                label={ALL_SERVICES_CONFIG[key].label}
                isActive={activeServices[key]}
                toggleService={toggleService}
              />
            ))}
          </div>

          <input
            type="number"
            value={clientBudgetInput}
            onChange={(e) => setClientBudgetInput(e.target.value)}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 12,
              border: `1px solid ${inputBorderColor}`,
              background: inputBgColor,
              color: primaryTextColor,
              marginBottom: 24,
            }}
          />

          <button
            type="submit"
            disabled={!activeServiceCount}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 14,
              background: accentColor,
              color: "#FFFFFF",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            COMPUTE PRICE
          </button>
        </form>

        {showOrderModal && (
          <p
            style={{
              marginTop: 24,
              fontSize: 24,
              fontWeight: 700,
              color: accentColor,
              textAlign: "center",
            }}
          >
            ${computedPrice}
          </p>
        )}
      </div>
    </section>
  );
}
