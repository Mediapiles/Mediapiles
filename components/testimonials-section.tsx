export function TestimonialsSection() {
  const testimonials = Array(9).fill({
    title: "Review title",
    body: "Review body",
    reviewer: "Reviewer name",
    rating: 5,
  })

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="animate-heading text-3xl md:text-4xl font-bold text-center mb-16 text-black">Testimonials</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300">
                <div className="flex mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                </div>
                <h3 className="text-black font-bold mb-1">{testimonial.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{testimonial.body}</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
                  <span className="text-gray-700 text-sm">{testimonial.reviewer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
