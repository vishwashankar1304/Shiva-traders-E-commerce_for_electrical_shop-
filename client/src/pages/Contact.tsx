import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section className="bg-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Have questions or need assistance? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact information section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Contact Info and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Contact Info */}
            <div className="h-[500px] flex flex-col justify-between">
              {/* Address */}
              <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Location</h3>
                    <p className="text-xl text-gray-600">
                      VRS Complex, Thingalur Road, Mekkur, Vijayamangalam, Tamil Nadu 638056
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Phone */}
              <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <FaPhone className="text-green-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Phone Number</h3>
                    <p className="text-xl text-gray-600">
                      <a href="tel:+918220659504" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                        +91 82206 59504
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <FaWhatsapp className="text-green-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">WhatsApp</h3>
                    <p className="text-xl text-gray-600">
                      <a 
                        href="https://wa.me/918220659504" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-[500px]">
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

          {/* Bottom Row - Business Hours */}
          <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
              <FaClock className="text-blue-600 text-2xl mr-4" />
              Business Hours
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="w-full md:w-1/3 flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <span className="text-lg font-medium text-gray-700 mb-2">Monday - Friday</span>
                <span className="text-lg text-gray-600">9:00 AM - 8:00 PM</span>
              </div>
              <div className="w-full md:w-1/3 flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <span className="text-lg font-medium text-gray-700 mb-2">Saturday</span>
                <span className="text-lg text-gray-600">9:00 AM - 7:00 PM</span>
              </div>
              <div className="w-full md:w-1/3 flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <span className="text-lg font-medium text-gray-700 mb-2">Sunday</span>
                <span className="text-lg text-gray-600">10:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 