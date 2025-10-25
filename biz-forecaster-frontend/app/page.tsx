import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ChartBarIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/solid';

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-indigo-900">
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-6xl font-extrabold leading-tight tracking-tight">Welcome to BizForecaster</h1>
          <p className="mt-4 text-xl text-gray-300">Your ultimate solution for business forecasting and strategic planning.</p>
          <Link href="/register" className="mt-8 inline-block bg-indigo-600 text-white font-semibold py-4 px-10 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors">
            Get Started for Free <ArrowRightIcon className="inline-block w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 rounded-full mb-6">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Accurate Forecasts</h3>
              <p className="text-gray-400">Leverage advanced algorithms to get precise predictions for your business revenue, costs, and profits.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 bg-green-500 rounded-full mb-6">
                <CurrencyDollarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Insightful Analytics</h3>
              <p className="text-gray-400">Visualize your financial data with interactive charts and dashboards to make informed decisions.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 bg-purple-500 rounded-full mb-6">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Collaborative Planning</h3>
              <p className="text-gray-400">Work with your team in real-time to create and refine your business forecasts and strategic plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
              <p className="text-gray-400 mb-6">"BizForecaster has transformed the way we do business. The accuracy of the forecasts is unparalleled, and the user-friendly interface makes it easy for our entire team to use."</p>
              <div className="flex items-center">
                <Image width="48" height="48" className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User avatar" />
                <div>
                  <p className="font-bold">Jane Doe</p>
                  <p className="text-gray-500">CEO, Acme Inc.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
              <p className="text-gray-400 mb-6">"I can't imagine running our business without BizForecaster. It has become an indispensable tool for our strategic planning and financial forecasting."</p>
              <div className="flex items-center">
                <Image width="48" height="48" className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" />
                <div>
                  <p className="font-bold">John Smith</p>
                  <p className="text-gray-500">CFO, Globex Corporation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700">
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to take control of your financial future?</h2>
          <Link href="/register" className="bg-white text-indigo-700 font-semibold py-4 px-10 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
