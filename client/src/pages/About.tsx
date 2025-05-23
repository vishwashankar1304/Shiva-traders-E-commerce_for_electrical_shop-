import { FaStar, FaTrophy, FaHandshake, FaTruck, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About Siva Traders</h1>
            <p className="text-xl text-blue-100">
              Your trusted partner for quality electronics and home improvement products at affordable prices.
            </p>
          </div>
        </div>
      </section>

      {/* Our story section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="/lovable-uploads/images/products/siva traders.jpg" 
                alt="Siva Traders store" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Siva Traders was established in 2010 with a simple mission: to provide high-quality electronic appliances and home improvement products to our community at affordable prices. What began as a small family business has grown into a trusted name in Vijayamangalam and surrounding areas.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, Mr. Siva Kumar, started the business with a deep understanding of customer needs and a commitment to service excellence. His vision was to create a one-stop shop where customers could find all their home and electrical needs under one roof.
              </p>
              <p className="text-gray-600">
                Today, we continue to uphold these values, offering a wide range of products from air coolers and fans to construction materials, always maintaining our focus on quality, affordability, and exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Siva Traders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our products, ensuring durability and performance.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-orange-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Commitment</h3>
              <p className="text-gray-600">
                We build long-term relationships based on trust, transparency, and exceptional service.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliable Delivery</h3>
              <p className="text-gray-600">
                Our same-day delivery service ensures you get what you need when you need it.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We continuously strive to improve and exceed customer expectations in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mx-0.5" />
                ))}
              </div>
              <span className="ml-2 font-semibold text-gray-900">4.9 out of 5</span>
            </div>
            <p className="text-gray-600 mt-2">Based on Google Reviews</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">
                "I've been shopping at Siva Traders for years. Their product range is excellent, and their service is always helpful and friendly. The same-day delivery is a lifesaver!"
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  RK
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Rajesh Kumar</h4>
                  <p className="text-xs text-gray-500">Loyal Customer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">
                "The quality of products at Siva Traders is exceptional. I purchased an air cooler last summer, and it's still working perfectly. Great value for money and excellent after-sales support."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  SP
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Sunita Patel</h4>
                  <p className="text-xs text-gray-500">Homeowner</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < 4 ? "text-yellow-400 text-sm" : "text-gray-300 text-sm"} />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">
                "As a contractor, I rely on Siva Traders for all my construction supplies. Their inventory is always well-stocked, and their prices are very competitive. The staff is knowledgeable and always ready to help."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  VM
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Vijay Mohan</h4>
                  <p className="text-xs text-gray-500">Building Contractor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Store</h2>
            <p className="text-xl text-blue-100">
              We'd love to welcome you to our store in Vijayamangalam
            </p>
          </div>
          
          <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-600 text-xl mt-1 mr-4" />
                    <span>
                      <strong className="block text-gray-900 mb-1">Address</strong>
                      VRS Complex, Thingalur Road, Mekkur, Vijayamangalam, Tamil Nadu 638056
                    </span>
                  </li>
                  
                  <li className="flex items-center">
                    <FaPhone className="text-blue-600 text-xl mr-4" />
                    <span>
                      <strong className="block text-gray-900 mb-1">Phone</strong>
                      <a href="tel:+918220659504" className="text-blue-600 hover:text-blue-800">
                        +91 82206 59504
                      </a>
                    </span>
                  </li>
                  
                  <li className="flex items-center">
                    <FaEnvelope className="text-blue-600 text-xl mr-4" />
                    <span>
                      <strong className="block text-gray-900 mb-1">Email</strong>
                      <a href="mailto:sivatradersvts@gmail.com" className="text-blue-600 hover:text-blue-800">
                        sivatradersvts@gmail.com
                      </a>
                    </span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Hours</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">10:00 AM - 5:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Map Section */}
              <div className="md:w-1/2 h-[400px]">
                <iframe
                  title="Siva Traders Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.3003198420017!2d77.49850117504587!3d11.242795549319913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba90d974b2b5e43%3A0x5942932411f825f9!2sSiva%20Traders!5e0!3m2!1sen!2sin!4v1713102077324!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 