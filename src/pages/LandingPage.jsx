import { Barcode, Utensils, ShoppingCart, Zap } from 'lucide-react'

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Barcode size={28} /></div>,
      title: 'Barcode Scanner',
      description: 'Scan food products to instantly get nutrition info and health scores.'
    },
    {
      icon: <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><Utensils size={28} /></div>,
      title: 'AI Meal Plans',
      description: 'Get personalized meal plans powered by Google Gemini AI.'
    },
    {
      icon: <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20"><ShoppingCart size={28} /></div>,
      title: 'Smart Shopping',
      description: 'Generate intelligent shopping lists based on your meal plans.'
    },
    {
      icon: <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20"><Zap size={28} /></div>,
      title: 'Quick Analysis',
      description: 'Analyze ingredients for health rating and alternatives.'
    }
  ]

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            AI-Powered Nutrition Coach
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight font-display">
            Your AI-Powered <br />
            <span className="text-gradient-primary">Nutrition Coach</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Scan. Plan. Eat Healthy. FitFuel makes nutrition simple, scientific, and personalized just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => onNavigate('scanner')}
              className="btn-primary sm:px-8 py-4 text-base"
            >
              📱 Start Scanning
            </button>
            <button
              onClick={() => onNavigate('mealplan')}
              className="btn-secondary sm:px-8 py-4 text-base"
            >
              🍽️ Get Meal Plan
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 max-w-6xl mx-auto">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-display">Why FitFuel?</h2>
          <p className="text-slate-400 max-w-md mx-auto">Smart features tailored to make your wellness journey effortless.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="card flex flex-col justify-between items-start text-left hover:scale-[1.03] transition-all">
              <div className="mb-6">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-slate-950/40 border-y border-slate-900/60 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-display">How It Works</h2>
            <p className="text-slate-400 max-w-md mx-auto">Three simple steps to smarter nutrition decisions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold font-display text-lg mb-6 mx-auto">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-3 font-display">Scan Products</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Use your phone camera to scan barcodes and get instant, complete nutrition transparency.</p>
            </div>
            
            <div className="card text-center p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold font-display text-lg mb-6 mx-auto">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-3 font-display">AI Analysis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Our AI evaluates products and ingredients based on your personalized goals and preferences.</p>
            </div>
            
            <div className="card text-center p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold font-display text-lg mb-6 mx-auto">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-3 font-display">Custom Plans</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Receive personalized meal schedules, recipes, and shopping lists delivered dynamically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 max-w-4xl mx-auto">
        <div className="card bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-indigo-500/10 border border-emerald-500/20 p-12 text-center relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white font-display">Ready to Transform Your Eating Habits?</h2>
            <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
              Start with a simple barcode scan or dive into meal planning to begin your health transformation.
            </p>
            <button
              onClick={() => onNavigate('scanner')}
              className="btn-primary inline-flex items-center gap-2 mx-auto"
            >
              Get Started Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}