export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Labor Market Research</h3>
            <p className="text-gray-300 text-sm">
              Providing data-driven insights to optimize your workforce strategies and
              talent acquisition efforts.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Research Methodology
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@labormarketresearch.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Monday-Friday, 9AM-5PM ET</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Labor Market Research. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
