import { ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">About FitFuel Planner</h1>
        <p className="text-xl text-gray-600">
          Your personal AI-powered nutrition companion
        </p>
      </div>

      <div className="card mb-8">
        <h2 className="text-3xl font-bold mb-4">🎯 Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          FitFuel Planner makes healthy eating accessible, personalized, and simple.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h3 className="text-2xl font-bold mb-4">🔍 Smart Scanning</h3>
          <p className="text-gray-700 mb-4">
            Simply scan any product barcode to get instant nutrition data.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Complete nutrition information</li>
            <li>✓ Health rating & Nutri-Score</li>
            <li>✓ Allergen warnings</li>
            <li>✓ Healthier alternatives</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-4">🤖 AI Meal Planning</h3>
          <p className="text-gray-700 mb-4">
            Get personalized meal plans powered by Google Gemini.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Customizable preferences</li>
            <li>✓ Health goal targeting</li>
            <li>✓ Auto-generated shopping lists</li>
            <li>✓ Nutritional insights</li>
          </ul>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-3xl font-bold mb-6">⚙️ Technology</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3">Frontend</h3>
            <ul className="text-gray-700 space-y-1">
              <li>• React 18</li>
              <li>• Vite</li>
              <li>• Tailwind CSS</li>
              <li>• html5-qrcode</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Backend & APIs</h3>
            <ul className="text-gray-700 space-y-1">
              <li>• Node.js + Express</li>
              <li>• Google Gemini AI</li>
              <li>• Open Food Facts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card mb-8 bg-blue-50">
        <h2 className="text-2xl font-bold mb-4">📚 Data Sources</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xl">🌐</span>
            <div>
              <h3 className="font-bold">Open Food Facts</h3>
              <p className="text-gray-600 text-sm">
                Free, collaborative food database from around the world.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🤖</span>
            <div>
              <h3 className="font-bold">Google Gemini AI</h3>
              <p className="text-gray-600 text-sm">
                Powers intelligent meal planning and ingredient analysis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">🔒 Privacy & Security</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span>✓</span>
            <span>Your scan history is stored locally in your browser</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>No personal health data collection without consent</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>HTTPS encryption for all API calls</span>
          </li>
        </ul>
      </div>
    </div>
  )
}