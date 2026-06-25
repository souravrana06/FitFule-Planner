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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2">📊 Ingredient Analyzer</h1>
      <p className="text-center text-gray-600 mb-8">
        Analyze ingredients for health rating and find healthier alternatives
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 card">
          <h2 className="text-2xl font-bold mb-6">Analyze</h2>
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">
                Ingredients (comma-separated)
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., flour, sugar, butter, eggs"
                className="input-field h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Known Allergies (optional)
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g., peanuts, dairy, gluten"
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Analyzing...' : 'Analyze Ingredients'}
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          {loading && (
            <div className="card text-center">
              <div className="spinner mx-auto"></div>
              <p className="text-gray-600 mt-4">Analyzing ingredients...</p>
            </div>
          )}

          {error && (
            <div className="card bg-red-50 border-l-4 border-red-500">
              <div className="flex gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {analysis && (
            <div className="space-y-4">
              <div className="card">
                <h3 className="text-lg font-bold mb-2">Health Rating</h3>
                <div className="text-center">
                  <p className={`text-5xl font-bold ${getHealthRatingColor(analysis.healthRating)}`}>
                    {analysis.healthRating}/10
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold mb-2">Overview</h3>
                <p className="text-gray-700">{analysis.summary}</p>
              </div>

              {analysis.allergens && analysis.allergens.length > 0 && (
                <div className="card bg-yellow-50 border-l-4 border-yellow-400">
                  <h3 className="text-lg font-bold mb-2 text-yellow-900">⚠️ Potential Allergens</h3>
                  <div className="space-y-1">
                    {analysis.allergens.map((allergen, idx) => (
                      <p key={idx} className="text-yellow-800">• {allergen}</p>
                    ))}
                  </div>
                </div>
              )}

              {analysis.alternatives && analysis.alternatives.length > 0 && (
                <div className="card bg-blue-50">
                  <h3 className="text-lg font-bold mb-4 text-blue-900">💡 Healthier Alternatives</h3>
                  <div className="space-y-3">
                    {analysis.alternatives.map((alt, idx) => (
                      <div key={idx} className="bg-white p-3 rounded">
                        <p className="text-sm text-gray-600">Current</p>
                        <p className="font-semibold text-blue-900 mb-2">{alt.current}</p>
                        <p className="text-sm text-gray-600">Replacement</p>
                        <p className="font-semibold text-green-700">{alt.replacement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && !analysis && (
            <div className="card text-center text-gray-500">
              <p>Enter ingredients above to see analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}