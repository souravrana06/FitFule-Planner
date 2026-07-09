import { ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
          About Fit<span className="text-gradient-primary">Fuel Planner</span>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          Your personal AI-powered nutrition companion, making healthy eating scientific, accessible, and simple.
        </p>
      </div>

      <div className="card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-xl font-bold text-slate-100 mb-4 font-display flex items-center gap-2">
          🎯 Our Mission
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          FitFuel Planner is designed to bridge the gap between complex nutritional data and your everyday life. By combining scientific databases like Open Food Facts with state-of-the-art AI, we empower you to take full control of your diet, make informed purchasing choices, and plan meals that perfectly match your lifestyle and fitness aspirations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-bold text-slate-100 mb-4 font-display">🔍 Smart Scanning</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-6">
            Simply scan or enter any food barcode to instantly pull transparent and structured reports.
          </p>
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            <li className="flex items-center gap-2">✓ Complete nutritional content charts</li>
            <li className="flex items-center gap-2">✓ Dynamically calculated health scores</li>
            <li className="flex items-center gap-2">✓ Automated safety & allergen alerts</li>
            <li className="flex items-center gap-2">✓ Smarter, healthier swap suggestions</li>
          </ul>
        </div>

        <div className="card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-bold text-slate-100 mb-4 font-display">🤖 AI Meal Planning</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-6">
            Generate fully personalized diet plans using cutting edge Gemini AI logic.
          </p>
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            <li className="flex items-center gap-2">✓ Tailored to dietary restrictions (vegan, keto, low-carb)</li>
            <li className="flex items-center gap-2">✓ Specific daily calorie target tracking</li>
            <li className="flex items-center gap-2">✓ Auto-compiled shopping checklists</li>
            <li className="flex items-center gap-2">✓ Dynamic meal customization by day</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-slate-200 mb-6 font-display">⚙️ Technology Stack</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Frontend Engine</h3>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'Vite', 'Tailwind CSS', 'html5-qrcode', 'Lucide Icons'].map((tech) => (
                <span key={tech} className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold">{tech}</span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Backend & Services</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express.js', 'Google Gemini API', 'Open Food Facts'].map((tech) => (
                <span key={tech} className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-indigo-300 font-display">📚 Data & AI Integrity</h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-400">
            <div className="flex gap-3">
              <span className="text-sm">🌐</span>
              <div>
                <h4 className="font-bold text-slate-200 mb-0.5">Open Food Facts</h4>
                <p>A collaborative, free database of food products from around the world, providing ingredient analyses.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-sm">🤖</span>
              <div>
                <h4 className="font-bold text-slate-200 mb-0.5">Google Gemini AI</h4>
                <p>Powers our intelligent, personalized meal generator and handles granular ingredient review.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-emerald-300 font-display">🔒 Privacy Principles</h2>
          <ul className="space-y-3 text-xs text-slate-400 font-medium">
            <li className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>All generated lists and settings are cached locally in your browser session.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>We do not collect or upload personal biometric identifiers or health profiles.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>All API communications are secured with military-grade HTTPS protocols.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}