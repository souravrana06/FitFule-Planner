import { AlertTriangle, Leaf } from 'lucide-react'

export default function ProductCard({ product }) {
  const getNutriscoreColor = (grade) => {
    const colors = {
      'a': 'bg-green-100 text-green-800',
      'b': 'bg-blue-100 text-blue-800',
      'c': 'bg-yellow-100 text-yellow-800',
      'd': 'bg-orange-100 text-orange-800',
      'e': 'bg-red-100 text-red-800'
    }
    return colors[grade?.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="card mb-8 border-2 border-primary">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500">Barcode: {product.barcode}</p>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="text-primary" />
                <h3 className="font-bold">Health Score</h3>
              </div>
              <p className={`text-4xl font-bold ${getHealthScoreColor(product.healthScore)}`}>
                {Math.round(product.healthScore)}/100
              </p>
            </div>

            <div className={`${getNutriscoreColor(product.nutriscore)} p-4 rounded-lg`}>
              <h3 className="font-bold mb-2">Nutri-Score</h3>
              <p className="text-3xl font-bold">{product.nutriscore?.toUpperCase() || 'N/A'}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Nutrition Facts</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-lg font-bold text-primary">
                {typeof product.nutrition.calories === 'number' 
                  ? product.nutrition.calories.toFixed(0) 
                  : product.nutrition.calories} kcal
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Protein</p>
              <p className="text-lg font-bold text-secondary">
                {typeof product.nutrition.protein === 'number' 
                  ? product.nutrition.protein.toFixed(1) 
                  : product.nutrition.protein}g
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Carbs</p>
              <p className="text-lg font-bold text-accent">
                {typeof product.nutrition.carbs === 'number' 
                  ? product.nutrition.carbs.toFixed(1) 
                  : product.nutrition.carbs}g
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Fat</p>
              <p className="text-lg font-bold text-yellow-600">
                {typeof product.nutrition.fat === 'number' 
                  ? product.nutrition.fat.toFixed(1) 
                  : product.nutrition.fat}g
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Fiber</p>
              <p className="text-lg font-bold text-green-600">
                {typeof product.nutrition.fiber === 'number' 
                  ? product.nutrition.fiber.toFixed(1) 
                  : product.nutrition.fiber}g
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Sodium</p>
              <p className="text-lg font-bold text-orange-600">
                {typeof product.nutrition.sodium === 'number' 
                  ? product.nutrition.sodium.toFixed(0) 
                  : product.nutrition.sodium}mg
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-2">Ingredients</h3>
            <p className="text-gray-700 text-sm">{product.ingredients}</p>
          </div>

          {product.allergens && (
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <div className="flex gap-2">
                <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
                <div>
                  <p className="font-bold text-yellow-900">Allergens</p>
                  <p className="text-yellow-800 text-sm">{product.allergens}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}