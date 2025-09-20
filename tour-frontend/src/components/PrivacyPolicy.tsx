import { type FC } from "react";
import {
  Shield,
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  XIcon,
} from "lucide-react";

const PrivacyPolicy: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center text-white">
            <div className="p-3 bg-white/20 rounded-full mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-yellow-100 leading-relaxed">
              Your trust is our top priority. We protect your personal information 
              with the same care we guide you through the Himalayas.
            </p>
            <div className="flex items-center space-x-2 mt-6 text-sm opacity-90">
              <Clock size={16} />
              <span>Last Updated: September 19, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0 mt-1">
                <Lock size={24} className="text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  At Himalayan Trekking, we are committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy explains how we 
                  collect, use, disclose, and safeguard your information when you visit our website, 
                  make a booking, or contact us for adventure planning.
                </p>
                <p className="text-gray-600 leading-relaxed mt-2">
                  By using our services, you agree to the collection and use of information in 
                  accordance with this policy. We respect your privacy rights and are committed 
                  to being transparent about our data practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <FileText size={28} className="text-yellow-600 flex-shrink-0" />
              <span>Information We Collect</span>
            </h2>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0 mt-1">
                  <User size={20} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    When you book a trek, contact us, or create an account, we may collect:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Full name and contact details (email, phone)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Passport and travel document information</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Emergency contact information</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Medical information relevant to trekking safety</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Usage Data */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0 mt-1">
                  <Mail size={20} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Usage Data</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We automatically collect information about your interaction with our website:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>IP address and browser type</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Pages visited and time spent</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Referrer URL and search queries</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cookies */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0 mt-1">
                  <AlertTriangle size={20} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies and Tracking</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We use cookies to enhance your experience and analyze website performance:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Essential cookies for website functionality</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Analytics cookies for usage insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                      <span>Marketing cookies (with your consent)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <MapPin size={28} className="text-yellow-600 flex-shrink-0" />
              <span>How We Use Your Information</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <CheckCircle size={18} className="text-blue-600" />
                    <span>Booking & Planning</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Process your trek bookings, arrange permits, and coordinate 
                    with local guides and authorities.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <CheckCircle size={18} className="text-green-600" />
                    <span>Customer Service</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Respond to your inquiries, provide trip updates, and offer 
                    personalized trekking recommendations.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-l-4 border-purple-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <CheckCircle size={18} className="text-purple-600" />
                    <span>Marketing</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Send you relevant information about upcoming treks, special 
                    offers, and adventure news (with your consent).
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <CheckCircle size={18} className="text-orange-600" />
                    <span>Legal Compliance</span>
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comply with applicable laws, respond to legal requests, and 
                    protect our rights, safety, and property.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Phone size={28} className="text-yellow-600 flex-shrink-0" />
              <span>Who We Share Your Information With</span>
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Service Providers</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We may share your information with trusted third-party service providers 
                  who assist us in operating our website and delivering our services:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Payment processors (secure transactions)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Cloud storage providers (data backup)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Email service providers (communications)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Analytics tools (website performance)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <AlertTriangle size={18} className="text-amber-600" />
                  <span>Business Transfers</span>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  In the event of a merger, acquisition, or sale of assets, your information 
                  may be transferred as part of the transaction. We'll notify you if this happens.
                </p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <AlertTriangle size={18} className="text-red-600" />
                  <span>Legal Requirements</span>
                </h3>
                <p className="text-gray-600 text-sm">
                  We may disclose your information if required by law, such as to comply with 
                  a subpoena, court order, or similar legal process. We also reserve the right 
                  to disclose information when we believe disclosure is necessary to protect 
                  our rights, safety, or property.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Shield size={28} className="text-yellow-600 flex-shrink-0" />
              <span>Data Security & Protection</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Our Security Measures</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">SSL encryption for all data transmission</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Regular security audits and penetration testing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Employee training on data protection best practices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Secure cloud hosting with advanced firewalls</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Your Security Responsibilities</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>Use strong, unique passwords for your account</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>Keep your contact information up to date</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>Log out after completing your session</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>Report suspicious activity immediately</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <User size={28} className="text-yellow-600 flex-shrink-0" />
              <span>Your Privacy Rights</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Access Your Data",
                  description: "Request a copy of the personal information we hold about you",
                  color: "text-green-600 bg-green-50"
                },
                {
                  icon: Lock,
                  title: "Correct Information",
                  description: "Update or correct inaccurate personal data we have collected",
                  color: "text-blue-600 bg-blue-50"
                },
                {
                  icon: XIcon,
                  title: "Delete Data",
                  description: "Request deletion of your personal information (subject to legal obligations)",
                  color: "text-red-600 bg-red-50"
                },
                {
                  icon: Mail,
                  title: "Opt-Out",
                  description: "Unsubscribe from marketing communications at any time",
                  color: "text-purple-600 bg-purple-50"
                },
                {
                  icon: Shield,
                  title: "Data Portability",
                  description: "Receive your data in a structured, machine-readable format",
                  color: "text-yellow-600 bg-yellow-50"
                },
                {
                  icon: AlertTriangle,
                  title: "Withdraw Consent",
                  description: "Revoke consent for data processing at any time",
                  color: "text-orange-600 bg-orange-50"
                }
              ].map((item, index) => (
                <div key={index} className={`p-4 rounded-xl border ${item.color} space-y-3`}>
                  <item.icon size={24} className={`${item.color.split(' ')[0]} flex-shrink-0`} />
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
              <p className="text-sm text-gray-600 mb-4">
                To exercise any of these rights, please contact us using the information below. 
                We'll respond within 30 days of receiving your request.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-500" />
                  <span>privacy@himalayatrekking.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-500" />
                  <span>+977-1-4123456</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* International Data Transfers */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <MapPin size={28} className="text-yellow-600 flex-shrink-0" />
              <span>International Data Transfers</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                As a Nepal-based company serving international travelers, we may transfer your 
                personal information to countries outside your country of residence. This may 
                include transfers to:
              </p>
              
              <ul className="list-disc list-inside space-y-1 mt-3">
                <li>Our headquarters and offices in Kathmandu, Nepal</li>
                <li>Service providers located in the United States, European Union, and Asia</li>
                <li>Cloud storage and processing facilities in secure data centers</li>
              </ul>
              
              <p className="mt-4">
                We ensure that all international transfers are protected by appropriate safeguards, 
                including standard contractual clauses approved by relevant data protection authorities. 
                You have the right to request information about these safeguards at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <AlertTriangle size={28} className="text-yellow-600 flex-shrink-0" />
              <span>Children's Privacy</span>
            </h2>
            
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                Our services are not directed to children under 18 years of age. We do not knowingly 
                collect personal information from children under 18. If we become aware that we have 
                collected personal information from a child under 18, we will delete it as soon as possible.
              </p>
              
              <p className="text-gray-700 text-sm leading-relaxed mt-3">
                Parents or guardians who believe we have collected personal information from their child 
                under 18 can contact us immediately at <a href="mailto:privacy@himalayatrekking.com" className="text-yellow-600 hover:text-yellow-700 underline font-medium">privacy@himalayatrekking.com</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Changes to This Policy */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Clock size={28} className="text-yellow-600 flex-shrink-0" />
              <span>Changes to This Privacy Policy</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our 
                practices or legal requirements. When we make material changes, we'll notify you 
                by posting the updated policy on our website and updating the "Last Updated" date 
                at the top of this page.
              </p>
              
              <p>
                We encourage you to review this policy periodically to stay informed about how 
                we protect your information. Your continued use of our services after changes 
                take effect constitutes your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 rounded-2xl p-8 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Practices?</h2>
              <p className="text-yellow-100 mb-6 leading-relaxed">
                We're here to help! Our team is committed to protecting your privacy and 
                ensuring you have a secure, worry-free trekking experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Mail size={24} className="text-white" />
                  <span className="text-sm font-medium">Email Us</span>
                  <a href="mailto:privacy@himalayatrekking.com" className="text-xs hover:underline">privacy@himalayatrekking.com</a>
                </div>
                
                <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Phone size={24} className="text-white" />
                  <span className="text-sm font-medium">Call Us</span>
                  <a href="tel:+97714123456" className="text-xs hover:underline">+977-1-4123456</a>
                </div>
                
                <div className="flex flex-col items-center space-y-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <MapPin size={24} className="text-white" />
                  <span className="text-sm font-medium">Visit Us</span>
                  <address className="text-xs not-italic">Thamel, Kathmandu, Nepal</address>
                </div>
              </div>
              
              <p className="text-sm opacity-90">
                We're available Monday-Friday, 9 AM - 6 PM GMT+5:45
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Himalayan Trekking. All rights reserved. | 
            <a href="#" className="text-yellow-400 hover:text-yellow-300 mx-2 underline">Terms of Service</a> | 
            <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">Cookie Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;