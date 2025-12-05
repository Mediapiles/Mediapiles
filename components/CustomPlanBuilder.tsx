"use client"

// You will need to install a library like @headlessui/react for the Switch component
// For simplicity in this example, I'm using a simple div/input combo for the toggle and slider
// In a production app, you would use actual state management (useState) for these inputs.

export default function CustomPlanBuilder() {
  // Define custom styles for buttons and other elements based on the image
  const activeServiceStyle = {
    backgroundColor: "#296677", // Darker teal/blue for active button
    color: "#FFFFFF",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem", // sm
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-block",
    boxShadow: "0 0 10px 0 #17515F", // Subtle glow for active
  };

  const inactiveServiceStyle = {
    backgroundColor: "#1E3F4C", // Card background color for inactive button
    color: "#FFFFFFB3",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem", // sm
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-block",
    border: "1px solid #17515F", // Subtle border for definition
  };

  // The custom accent color from the image appears to be a light blue/cyan,
  // I'll adjust the highlight from your original code:
  const accentColor = "#66D9EE"; // A bright cyan/blue for highlights

  return (
    <section
      className="relative py-24"
      style={{ backgroundColor: "#121919" }} // Dark Background
    >
      {/* Infinity Icon from the image */}
      <div className="text-center mb-6">
        <svg
          className="mx-auto"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12C19 14.7614 16.7614 17 14 17C11.2386 17 9 14.7614 9 12C9 9.23858 11.2386 7 14 7C16.7614 7 19 9.23858 19 12ZM5 12C5 14.7614 7.23858 17 10 17C12.7614 17 15 14.7614 15 12C15 9.23858 12.7614 7 10 7C7.23858 7 5 9.23858 5 12ZM12 12C12 13.6569 10.6569 15 9 15C7.34315 15 6 13.6569 6 12C6 10.3431 7.34315 9 9 9C10.6569 9 12 10.3431 12 12ZM18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 10.3431 13.3431 9 15 9C16.6569 9 18 10.3431 18 12Z"
            fill={accentColor}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-3xl text-center">
        {/* Subtitle above the main title */}
        <p
          className="text-md mb-2"
          style={{ color: "#FFFFFFB3" }} // Slightly transparent white
        >
          Upgrade Your Casual Account
        </p>

        {/* Title */}
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ color: "#FFFFFF" }} // Bright white
        >
          Build Your <span style={{ color: accentColor }}>Custom Plan</span>
          {/* Highlighted accent */}
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg mb-12"
          style={{ color: "#FFFFFFB3" }} // Slightly transparent white
        >
          Select services and set your budget for tailored quote
        </p>

        {/* Central Card - Frosted Glass Look */}
        <div
          className="rounded-3xl p-10 shadow-2xl mx-auto max-w-xl text-left"
          style={{
            // Mimicking the frosted glass look with a dark transparent background
            backgroundColor: "rgba(30, 63, 76, 0.4)", // Dark teal/blue with transparency
            backdropFilter: "blur(10px)", // The "frosted" effect
            border: `1px solid ${accentColor}30`, // Light border
            boxShadow: `0 0 40px 10px ${accentColor}10`, // Subtle glow
          }}
        >
          <h3
            className="text-2xl font-bold mb-8"
            style={{ color: "#FFFFFF" }}
          >
            Build Your Custom Plan
          </h3>

          {/* Service Toggles/Buttons Section */}
          <div className="mb-10 space-y-4">
            {/* Row 1 */}
            <div className="flex flex-wrap gap-2">
              <span style={activeServiceStyle}>Video Production</span>
              <span style={inactiveServiceStyle}>Optimization</span>
              <span style={inactiveServiceStyle}>SEO</span>
              {/* Dropdown look - simply using a checked box for style match */}
              <span style={{ ...activeServiceStyle, paddingRight: '0.5rem' }}>
                Expenses
                <span className="ml-2 text-white">✔</span>
              </span>
              <span style={{ ...activeServiceStyle, paddingRight: '0.5rem' }}>
                Continuum
                <span className="ml-2 text-white">✔</span>
              </span>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-2">
              <span style={inactiveServiceStyle}>Video Promotion</span>
              <span style={inactiveServiceStyle}>Strategic Vision</span>
              <span style={inactiveServiceStyle}>Succeed Faster</span>
              <span style={inactiveServiceStyle}>Smart Ascent</span>
            </div>
          </div>

          {/* New Client Ads Promo Toggle */}
          <div className="flex items-center justify-between mb-8 pt-4 border-t border-gray-700">
            <label
              className="text-lg font-medium"
              style={{ color: "#FFFFFF" }}
            >
              New Client Ads Promo
            </label>
            {/* Custom Toggle Switch */}
            <div
              className="relative inline-block w-14 h-8 rounded-full transition-colors duration-200"
              style={{ backgroundColor: accentColor }} // Active color
            >
              <div
                className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out transform translate-x-6"
                // The translate-x-6 simulates the "on" state of the switch
              ></div>
            </div>
          </div>

          {/* Estimated Monthly Budget Section */}
          <h4
            className="text-lg font-medium mb-3"
            style={{ color: "#FFFFFF" }}
          >
            Your Estimated Monthly Budget
          </h4>
          <div className="mb-8">
            {/* Budget Display */}
            <div className="text-xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
              $0,000
            </div>

            {/* Range Slider */}
            <div className="flex items-center">
              <span
                className="text-sm mr-2"
                style={{ color: "#FFFFFFB3" }}
              >
                $0
              </span>
              <input
                type="range"
                min="0"
                max="800"
                defaultValue="0"
                className="flex-grow h-1 rounded-lg appearance-none cursor-pointer"
                style={{
                  // Basic custom styling for range input track (might need vendor prefixes)
                  backgroundColor: "#FFFFFF30",
                  outline: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                }}
              />
              <span
                className="text-sm ml-2"
                style={{ color: "#FFFFFFB3" }}
              >
                $800
              </span>
            </div>
          </div>

          {/* CTA Button - Compute Price */}
          <div className="text-center">
            <button
              className="font-bold px-10 py-3 rounded-xl transition w-full max-w-xs"
              style={{
                backgroundColor: accentColor, // Bright accent
                color: "#1E3F4C", // Text color inside button
                fontSize: "1.125rem", // lg
                boxShadow: `0 0 15px 5px ${accentColor}40`,
              }}
            >
              COMPUTE PRICE
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm mt-12" style={{ color: "#FFFFFFB3" }}>
          Terms and conditions apply. Please **contact us** for custom offerings
        </p>
      </div>
    </section>
  );
}