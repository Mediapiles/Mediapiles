"use client"

export default function CustomPlanBuilder() {
  return (
    <section
      className="relative py-24"
      style={{ backgroundColor: "#121919" }} // Dark Background
    >
      <div className="container mx-auto px-4 max-w-3xl text-center">

        {/* Title */}
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ color: "#FFFFFF" }} // Bright white
        >
          Build Your <span style={{ color: "#C7D15A" }}>Custom Plan</span> {/* Highlighted accent */}
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg mb-12"
          style={{ color: "#FFFFFFB3" }} // Slightly transparent white
        >
          Choose exactly what you need. We’ll tailor your plan to your goals.
        </p>

        {/* Central Card */}
        <div
          className="rounded-3xl p-12 shadow-2xl mx-auto max-w-md"
          style={{
            backgroundColor: "#1E3F4C", // Dominant teal/blue
            boxShadow: "0 0 40px 10px #17515F", // Deep teal glow
          }}
        >
          <h3
            className="text-3xl font-bold mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Custom Plan
          </h3>

          <p
            className="mb-6"
            style={{ color: "#FFFFFFB3" }}
          >
            Perfect plan tailored to your exact needs.
          </p>

          {/* Price */}
          <div className="mb-8">
            <span
              className="text-4xl font-extrabold"
              style={{ color: "#FFFFFF" }}
            >
              $49
            </span>
            <span
              className="text-lg ml-1"
              style={{ color: "#FFFFFFB3" }}
            >
              / month
            </span>
          </div>

          {/* Features */}
          <ul
            className="mb-8 space-y-3 text-left"
            style={{ color: "#FFFFFFB3" }}
          >
            <li>✔ Video Editing (Short & Long Form)</li>
            <li>✔ Thumbnail Design</li>
            <li>✔ Motion Graphics & Effects</li>
            <li>✔ Custom Packages</li>
          </ul>

          {/* CTA Button */}
          <div className="text-center">
            <button
              className="font-bold px-8 py-3 rounded-xl transition"
              style={{
                backgroundColor: "#FFFFFF", // Bright accent
                color: "#1E3F4C", // Text color inside button
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Secondary Button */}
        <div className="mt-6">
          <button
            className="font-bold px-6 py-2 rounded-xl transition"
            style={{
              backgroundColor: "#343A40", // Dark gray button
              color: "#FFFFFF",
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  )
}
