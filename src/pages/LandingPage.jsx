import { Barcode, Utensils, ShoppingCart, Zap } from 'lucide-react'

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: <Barcode size={40} className="text-primary" />,
      title: 'Barcode Scanner',
      description: 'Scan food products to instantly get nutrition info and health scores'
    },
    {
      icon: <Utensils size={40} className="text-secondary" />,
      title: 'AI Meal Plans',
      description: 'Get personalized meal plans powered by Google Gemini AI'
    },
    {
      icon: <ShoppingCart size={40} className="text-accent" />,
      title: 'Smart Shopping',
      description: 'Generate intelligent shopping lists based on your meal plans'
    },
    {
      icon: <Zap size={40} className="text-yellow-500" />,
      title: 'Quick Analysis',
      description: 'Analyze ingredients for health rating and alternatives'
    }
  ]

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-green-400 to-secondary text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your AI-Powered Nutrition Coach
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Scan. Plan. Eat Healthy. FitFuel makes nutrition simple and personalized.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('scanner')}
              className="btn-primary bg-white text-primary hover:bg-gray-100"
            >
              📱 Start Scanning
            </button>
            <button
              onClick={() => onNavigate('mealplan')}
              className="btn-secondary border-2 border-white bg-transparent hover:bg-white hover:text-secondary"
            >
              🍽️ Get Meal Plan
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why FitFuel?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card text-center hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Scan Products</h3>
              <p className="text-gray-600">Use your phone camera to scan barcode and get instant nutrition info</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your goals and preferences for perfect recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Meal Plans</h3>
              <p className="text-gray-600">Get personalized meal plans and shopping lists delivered instantly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Eating Habits?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start with a simple barcode scan or jump into meal planning.
          </p>
          <button
            onClick={() => onNavigate('scanner')}
            className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-all"
          >
            Get Started Now →
          </button>
        </div>
      </section>
    </div>
  )
}