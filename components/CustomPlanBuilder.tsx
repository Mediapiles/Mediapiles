"use client"

export default function CustomPlanBuilder() {
  return (
    <section className="relative py-24 bg-dark">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-light text-center mb-4">
          Build Your <span className="text-cta">Custom Plan</span>
        </h2>

        {/* Subtitle */}
        <p className="text-light/70 text-center text-lg mb-12">
          Choose exactly what you need. We’ll tailor your plan to your goals.
        </p>

        {/* Single Central Card */}
        <div className="bg-accent/80 border border-accent/40 rounded-3xl p-12 shadow-xl mx-auto max-w-md">
          <h3 className="text-3xl font-bold text-light text-center mb-4">Custom Plan</h3>
          <p className="text-light/70 text-center mb-6">Perfect plan tailored to your exact needs.</p>

          {/* Price */}
          <div className="text-center mb-8">
            <span className="text-4xl font-extrabold text-light">$49</span>
            <span className="text-light/70 text-lg"> / month</span>
          </div>

          {/* Features List */}
          <ul className="mb-8 space-y-3 text-light/70">
            <li>✔ Video Editing (Short & Long Form)</li>
            <li>✔ Thumbnail Design</li>
            <li>✔ Motion Graphics & Effects</li>
            <li>✔ Custom Packages</li>
          </ul>

          {/* CTA Button */}
          <div className="text-center">
            <button className="bg-cta text-dark font-bold px-8 py-3 rounded-xl hover:brightness-110 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
