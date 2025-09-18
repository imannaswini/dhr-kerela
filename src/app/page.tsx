import { ShieldCheck, HeartPulse, Users, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <HeartPulse className="text-green-600 w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-800">Kerala Migrant Health</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
            <a href="/auth/login" className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
               Login
            </a>
            <a href="/auth/signup" className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Sign Up
            </a>
          </nav>
          <button className="md:hidden bg-green-100 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Login
          </button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://storage.googleapis.com/gweb-uniblog-publish-prod/images/healthcare_hero.width-1300.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-6">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Healthy Workforce, Resilient Kerala
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-3xl mx-auto">
              A unified digital health record system for migrant workers, ensuring better healthcare access and safeguarding public health.
            </p>
            <a href="/auth/login" className="mt-8 inline-block bg-green-600 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105">
              Access Health Portal
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto text-center px-6">
            <h3 className="text-3xl font-bold mb-4">A System for a Healthier Tomorrow</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Our platform is designed to bridge the healthcare gap for migrant workers while strengthening Keralas public health infrastructure.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<ShieldCheck className="w-12 h-12 text-green-600" />}
                title="Secure Health Records"
                description="Centralized, secure, and easily accessible digital health profiles for every registered worker."
              />
              <FeatureCard
                icon={<HeartPulse className="w-12 h-12 text-green-600" />}
                title="Disease Surveillance"
                description="Real-time data to monitor and prevent the spread of infectious diseases, protecting communities."
              />
              <FeatureCard
                icon={<Users className="w-12 h-12 text-green-600" />}
                title="Equitable Healthcare"
                description="Ensures every migrant worker has fair and impartial access to healthcare services across the state."
              />
              <FeatureCard
                icon={<Globe className="w-12 h-12 text-green-600" />}
                title="Multilingual Support"
                description="Accessible interface in multiple languages to overcome communication barriers."
              />
            </div>
          </div>
        </section>

        {/* About the Initiative Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
            <div>
              <h3 className="text-3xl font-bold mb-4">Aligning with Sustainable Development Goals</h3>
              <p className="text-gray-600 mb-4">
                This initiative directly supports SDG 3: Good Health and Well-being. By creating a robust health record system for a vulnerable population, we are taking a crucial step towards preventing disease transmission, enhancing public health surveillance, and ensuring no one is left behind.
              </p>
              <p className="text-gray-600">
                This project is a commitment by the Government of Kerala and the Health Service Department to build a more inclusive and healthier society for all.
              </p>
            </div>
            <div className="text-center">
              {/* You can replace this with a relevant image or illustration */}
              <img src="https://img.freepik.com/free-vector/health-checkup-concept-illustration_114360-6215.jpg" alt="Healthcare Professionals" className="rounded-lg shadow-lg mx-auto" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
     
    </div>
  );
}

// Helper component for Feature Cards to keep the main component clean
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}