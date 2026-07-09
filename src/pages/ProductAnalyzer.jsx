import { useState } from 'react'
import axios from 'axios'
import { AlertCircle } from 'lucide-react'

export default function ProductAnalyzer() {
  const [ingredients, setIngredients] = useState('')
  const [allergies, setAllergies] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async (e) => {
    e.preventDefault()
    
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const ingredientsList = ingredients.split(',').map(i => i.trim()).filter(i => i)
      const allergiesList = allergies.split(',').map(a => a.trim()).filter(a => a)

      const response = await axios.post('/api/ingredients/analyze', {
        ingredients: ingredientsList,
        allergies: allergiesList
      })

      setAnalysis(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze ingredients')
    } finally {
      setLoading(false)
    }
  }

  const getHealthRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600'
    if (rating >= 6) return 'text-yellow-600'
    if (rating >= 4) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
          📊 Ingredient <span className="text-gradient-primary">Analyzer</span>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          Paste product ingredients lists to analyze their health rating, scan for allergens, and explore better options.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-xl font-bold text-slate-100 mb-6 font-display">Analyze Ingredients</h2>
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Ingredients (comma-separated)
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., wheat flour, sugar, hydrogenated vegetable oil, artificial flavors"
                className="input-field h-36 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Known Allergies (optional)
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g., peanuts, dairy, gluten"
                className="input-field text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : 'Analyze Ingredients'}
            </button>
          </form>
        </div>

        <div className="md:col-span-2 space-y-6">
          {loading && (
            <div className="card text-center py-16 flex flex-col items-center justify-center space-y-4">
              <div className="spinner"></div>
              <p className="text-slate-400 text-sm">AI is dissecting the ingredients list...</p>
            </div>
          )}

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
              <div className="flex gap-3 items-center">
                <AlertCircle className="text-rose-400 flex-shrink-0" size={20} />
                <p className="text-rose-300 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card sm:col-span-1 bg-[#0b0f19]/80 border border-slate-800 flex flex-col justify-center items-center p-6 text-center">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Health Rating</span>
                  <p className={`text-5xl font-black font-display ${getHealthRatingColor(analysis.healthRating)}`}>
                    {analysis.healthRating}<span className="text-lg font-normal text-slate-500">/10</span>
                  </p>
                </div>

                <div className="card sm:col-span-2 bg-[#0b0f19]/80 border border-slate-800 p-6 flex flex-col justify-center">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Overview Summary</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{analysis.summary}</p>
                </div>
              </div>

              {analysis.allergens && analysis.allergens.length > 0 && (
                <div className="bg-amber-500/5 border border-amber-500/15 p-5 rounded-2xl space-y-3">
                  <h3 className="text-sm font-bold text-amber-300 font-display uppercase tracking-wider flex items-center gap-2">
                    ⚠️ Detected Allergens
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.allergens.map((allergen, idx) => (
                      <span key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                        • {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {analysis.alternatives && analysis.alternatives.length > 0 && (
                <div className="card relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                  <h3 className="text-base font-bold text-slate-200 mb-4 font-display">💡 Recommended Alternatives</h3>
                  <div className="grid gap-3">
                    {analysis.alternatives.map((alt, idx) => (
                      <div key={idx} className="bg-slate-900/30 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Avoid Ingredient</p>
                          <p className="text-xs font-bold text-rose-400">{alt.current}</p>
                        </div>
                        <div className="hidden sm:block text-slate-600">➔</div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Healthy Swap</p>
                          <p className="text-xs font-bold text-emerald-400">{alt.replacement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && !analysis && (
            <div className="card text-center text-slate-500 py-20 border border-dashed border-slate-800 bg-transparent flex flex-col items-center justify-center space-y-2">
              <span className="text-3xl">📋</span>
              <p className="text-slate-400 font-medium text-sm">Waiting for ingredients...</p>
              <p className="text-xs text-slate-600 max-w-xs">Input your ingredients list on the left panel and click analyze to start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}