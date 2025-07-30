export function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold tracking-tight text-black mb-4">MEDIAPILES</div>
            <p className="text-gray-600 mb-4">
              Creating exceptional digital experiences through professional video editing and creative services.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Video Editing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  After Effects
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Premiere Pro
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Content Creation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-600">mediapilesagency@gmail.com</p>
              <p className="text-gray-600">+92 328 7210660</p>
              
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MediaPiles Agency. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
