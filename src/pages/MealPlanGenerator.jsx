import { useState } from 'react'
import axios from 'axios'
import { Utensils, AlertCircle, Download } from 'lucide-react'

export default function MealPlanGenerator() {
    const [formData, setFormData] = useState({
        dietary_preferences: 'balanced',
        health_goals: 'lose weight',
        days: 7,
        calories: 2000
    })
    const [mealPlan, setMealPlan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [cuisine, setCuisine] = useState('Indian')

    const dietaryOptions = [
        'balanced', 'vegetarian', 'vegan', 'keto',
        'gluten-free', 'dairy-free', 'paleo', 'low-carb'
    ]

    const healthGoalsOptions = [
        'lose weight', 'gain muscle', 'maintain health',
        'increase energy', 'improve digestion', 'better metabolism'
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await axios.post('/api/mealplan/generate', formData)
            setMealPlan(response.data.data)
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate meal plan')
        } finally {
            setLoading(false)
        }
    }

    const downloadMealPlan = () => {
        const content = JSON.stringify(mealPlan, null, 2)
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
        element.setAttribute('download', 'meal-plan.json')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }



    return (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-10">
            <div className="text-center space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
                    🍽️ AI Meal <span className="text-gradient-primary">Planner</span>
                </h1>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                    Get fully customized meal plans powered by Google Gemini AI, tailored to your health goals and dietary preferences.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 card relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                    <h2 className="text-xl font-bold text-slate-100 mb-6 font-display">Select Preferences</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dietary Preference</label>
                                <select
                                    value={formData.dietary_preferences}
                                    onChange={(e) => setFormData({ ...formData, dietary_preferences: e.target.value })}
                                    className="input-field cursor-pointer"
                                >
                                    {dietaryOptions.map((option) => (
                                        <option key={option} value={option} className="bg-slate-950 text-slate-200">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                    Cuisine Preference
                                </label>
                                <select
                                    value={cuisine}
                                    onChange={(e) => setCuisine(e.target.value)}
                                    className="input-field cursor-pointer"
                                >
                                    <option value="Indian" className="bg-slate-950 text-slate-200">Indian</option>
                                    <option value="North Indian" className="bg-slate-950 text-slate-200">North Indian</option>
                                    <option value="South Indian" className="bg-slate-950 text-slate-200">South Indian</option>
                                    <option value="Punjabi" className="bg-slate-950 text-slate-200">Punjabi</option>
                                    <option value="Gujarati" className="bg-slate-950 text-slate-200">Gujarati</option>
                                    <option value="Jain" className="bg-slate-950 text-slate-200">Jain</option>
                                    <option value="High Protein Indian" className="bg-slate-950 text-slate-200">High Protein Indian</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Health Goal</label>
                            <select
                                value={formData.health_goals}
                                onChange={(e) => setFormData({ ...formData, health_goals: e.target.value })}
                                className="input-field cursor-pointer"
                            >
                                {healthGoalsOptions.map((option) => (
                                    <option key={option} value={option} className="bg-slate-950 text-slate-200">
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-semibold">
                                <span className="text-slate-400 uppercase tracking-wider">Plan Duration</span>
                                <span className="text-emerald-400 font-bold text-sm">{formData.days} Days</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="3"
                                    max="30"
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                    className="flex-1 accent-emerald-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-semibold">
                                <span className="text-slate-400 uppercase tracking-wider">Daily Calorie Target</span>
                                <span className="text-indigo-400 font-bold text-sm">{formData.calories} kcal</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1200"
                                    max="4000"
                                    step="100"
                                    value={formData.calories}
                                    onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) })}
                                    className="flex-1 accent-indigo-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3.5"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    Generating Plan...
                                </>
                            ) : 'Generate Meal Plan'}
                        </button>
                    </form>
                </div>

                <div className="md:col-span-1 card bg-gradient-to-br from-indigo-500/5 to-purple-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                    <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2 font-display">
                        <Utensils className="text-indigo-400" size={20} />
                        Plan Preview
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-[#080c14]/50 border border-white/5 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 font-medium">Dietary Type</p>
                            <p className="font-bold text-slate-200 capitalize mt-0.5">{formData.dietary_preferences}</p>
                        </div>
                        <div className="bg-[#080c14]/50 border border-white/5 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 font-medium">Cuisine</p>
                            <p className="font-bold text-slate-200 capitalize mt-0.5">{cuisine}</p>
                        </div>
                        <div className="bg-[#080c14]/50 border border-white/5 p-4 rounded-xl">
                            <p className="text-xs text-slate-400 font-medium">Target Goal</p>
                            <p className="font-bold text-slate-200 capitalize mt-0.5">{formData.health_goals}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#080c14]/50 border border-white/5 p-4 rounded-xl">
                                <p className="text-xs text-slate-400 font-medium">Duration</p>
                                <p className="font-bold text-emerald-400 mt-0.5">{formData.days} Days</p>
                            </div>
                            <div className="bg-[#080c14]/50 border border-white/5 p-4 rounded-xl">
                                <p className="text-xs text-slate-400 font-medium">Daily Energy</p>
                                <p className="font-bold text-indigo-400 mt-0.5">{formData.calories} kcal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="text-center py-12 card flex flex-col items-center justify-center space-y-4">
                    <div className="spinner"></div>
                    <p className="text-slate-400 text-sm">Creating your custom meal schedule with Gemini AI...</p>
                </div>
            )}

            {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="text-rose-400 flex-shrink-0" size={20} />
                        <p className="text-rose-300 text-sm font-medium">{error}</p>
                    </div>
                </div>
            )}

            {mealPlan && (
                <div className="card space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-800">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-display">Your Personalized Meal Plan</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Generated just now based on your preferences</p>
                        </div>
                        <button
                            onClick={downloadMealPlan}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer"
                        >
                            <Download size={16} />
                            Download Plan (.json)
                        </button>
                    </div>

                    {mealPlan.mealPlan && mealPlan.mealPlan.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-200 font-display">Daily Meals Schedule</h3>
                            <div className="space-y-3">
                                {mealPlan.mealPlan.map((day) => (
                                    <details key={day.day} className="group bg-[#0b0f19]/60 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300">
                                        <summary className="flex justify-between items-center font-bold text-slate-200 p-4 cursor-pointer hover:bg-slate-800/40 list-none select-none">
                                            <span className="flex items-center gap-3">
                                                <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono border border-emerald-500/25">
                                                    {day.day}
                                                </span>
                                                Day {day.day} Meals
                                            </span>
                                            <span className="text-xs text-slate-500 transition-transform duration-200 group-open:rotate-180">▼</span>
                                        </summary>
                                        <div className="p-4 border-t border-slate-900 bg-slate-950/20 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                                            <div className="bg-[#080c14]/40 border border-white/5 p-3 rounded-lg">
                                                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">🌅 Breakfast</p>
                                                <p className="text-xs text-slate-300 leading-relaxed font-medium">{day.meals.breakfast}</p>
                                            </div>
                                            <div className="bg-[#080c14]/40 border border-white/5 p-3 rounded-lg">
                                                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">🍽️ Lunch</p>
                                                <p className="text-xs text-slate-300 leading-relaxed font-medium">{day.meals.lunch}</p>
                                            </div>
                                            <div className="bg-[#080c14]/40 border border-white/5 p-3 rounded-lg">
                                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">🍴 Dinner</p>
                                                <p className="text-xs text-slate-300 leading-relaxed font-medium">{day.meals.dinner}</p>
                                            </div>
                                            <div className="bg-[#080c14]/40 border border-white/5 p-3 rounded-lg">
                                                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">🍪 Snacks</p>
                                                <p className="text-xs text-slate-300 leading-relaxed font-medium">{day.meals.snacks || 'Healthy raw nuts / fruits'}</p>
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}

                    {mealPlan.shoppingList && mealPlan.shoppingList.length > 0 && (
                        <div className="bg-[#0b0f19]/80 border border-emerald-500/10 p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                            <h3 className="text-base font-bold text-emerald-300 mb-4 font-display flex items-center gap-2">
                                🛒 Generated Shopping List
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {mealPlan.shoppingList.map((item, idx) => (
                                    <label key={idx} className="flex items-start gap-3 p-3 bg-slate-950/40 hover:bg-slate-950 rounded-xl border border-white/5 cursor-pointer transition select-none group">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 mt-0.5 rounded border-slate-800 text-indigo-600 focus:ring-indigo-500/50 cursor-pointer" 
                                        />
                                        <span className="text-xs text-slate-300 group-hover:text-slate-100 transition">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}