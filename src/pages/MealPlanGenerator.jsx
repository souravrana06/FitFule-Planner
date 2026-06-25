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
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-2">🍽️ AI Meal Plan Generator</h1>
            <p className="text-center text-gray-600 mb-8">
                Get personalized meal plans powered by Google Gemini AI
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="card">
                    <h2 className="text-2xl font-bold mb-6">Your Preferences</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Dietary Preference</label>
                            <select
                                value={formData.dietary_preferences}
                                onChange={(e) => setFormData({ ...formData, dietary_preferences: e.target.value })}
                                className="input-field"
                            >
                                {dietaryOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Cuisine Preference
                            </label>

                            <select
                                value={cuisine}
                                onChange={(e) => setCuisine(e.target.value)}
                                className="input-field"
                            >
                                <option value="Indian">Indian</option>
                                <option value="North Indian">North Indian</option>
                                <option value="South Indian">South Indian</option>
                                <option value="Punjabi">Punjabi</option>
                                <option value="Gujarati">Gujarati</option>
                                <option value="Jain">Jain</option>
                                <option value="High Protein Indian">High Protein Indian</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Health Goal</label>
                            <select
                                value={formData.health_goals}
                                onChange={(e) => setFormData({ ...formData, health_goals: e.target.value })}
                                className="input-field"
                            >
                                {healthGoalsOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Plan Duration</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="3"
                                    max="30"
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                    className="flex-1"
                                />
                                <span className="font-bold text-lg text-primary">{formData.days} days</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Daily Calories (kcal)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1200"
                                    max="4000"
                                    step="100"
                                    value={formData.calories}
                                    onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) })}
                                    className="flex-1"
                                />
                                <span className="font-bold text-lg text-secondary">{formData.calories} kcal</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Generating Plan...' : 'Generate Meal Plan'}
                        </button>
                    </form>
                </div>

                <div className="card bg-gradient-to-br from-primary/5 to-secondary/5">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Utensils className="text-primary" />
                        Your Plan Preview
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded">
                            <p className="text-sm text-gray-600">Dietary Preference</p>
                            <p className="font-bold text-lg capitalize">{formData.dietary_preferences}</p>
                        </div>
                        <div className="bg-white p-4 rounded">
                            <p className="text-sm text-gray-600">Health Goal</p>
                            <p className="font-bold text-lg capitalize">{formData.health_goals}</p>
                        </div>
                        <div className="bg-white p-4 rounded">
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-bold text-lg">{formData.days} Days</p>
                        </div>
                        <div className="bg-white p-4 rounded">
                            <p className="text-sm text-gray-600">Daily Target</p>
                            <p className="font-bold text-lg">{formData.calories} kcal/day</p>
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="text-center py-12">
                    <div className="spinner mx-auto"></div>
                    <p className="text-gray-600 mt-4">Creating your personalized meal plan...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-8">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="text-red-500" />
                        <p className="text-red-800">{error}</p>
                    </div>
                </div>
            )}

            {mealPlan && (
                <div className="mt-12 card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">Your Personalized Meal Plan</h2>
                        <button
                            onClick={downloadMealPlan}
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            <Download size={20} />
                            Download
                        </button>
                    </div>

                    {mealPlan.mealPlan && mealPlan.mealPlan.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-4">Daily Meals</h3>
                            <div className="space-y-4">
                                {mealPlan.mealPlan.map((day) => (
                                    <details key={day.day} className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition">
                                        <summary className="font-bold text-lg">Day {day.day}</summary>
                                        <div className="mt-4 space-y-3">
                                            <div className="bg-white p-3 rounded">
                                                <p className="font-semibold">🌅 Breakfast</p>
                                                <p className="text-gray-700">{day.meals.breakfast}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded">
                                                <p className="font-semibold">🍽️ Lunch</p>
                                                <p className="text-gray-700">{day.meals.lunch}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded">
                                                <p className="font-semibold">🍴 Dinner</p>
                                                <p className="text-gray-700">{day.meals.dinner}</p>
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}

                    {mealPlan.shoppingList && mealPlan.shoppingList.length > 0 && (
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-green-900">🛒 Shopping List</h3>
                            <div className="grid md:grid-cols-2 gap-2">
                                {mealPlan.shoppingList.map((item, idx) => (
                                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span className="text-green-900">{item}</span>
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