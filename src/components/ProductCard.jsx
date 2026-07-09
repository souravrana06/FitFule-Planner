import { AlertTriangle, Leaf } from 'lucide-react'

export default function ProductCard({ product }) {
  const getNutriscoreColor = (grade) => {
    const colors = {
      'a': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      'b': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      'c': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      'd': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      'e': 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
    }
    return colors[grade?.toLowerCase()] || 'bg-slate-800 text-slate-400 border border-slate-700/50'
  }

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-teal-400'
    if (score >= 40) return 'text-amber-400'
    return 'text-rose-400'
  }

  const renderMacroBar = (label, value, colorClass) => {
    const val = typeof value === 'number' ? value : parseFloat(value) || 0
    const pct = Math.min(100, Math.max(0, val)) // out of 100g
    return (
      <div className="bg-slate-900/30 p-3.5 rounded-xl border border-white/5 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">{label}</span>
          <span className="text-slate-200 font-bold">{val.toFixed(1)}g</span>
        </div>
        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${colorClass}`} 
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {/* Left column: Brand/Image */}
        <div className="space-y-4">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover rounded-2xl border border-slate-800 shadow-md"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-500 text-sm">
              No Image Available
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white font-display leading-tight">{product.name}</h2>
            <p className="text-sm text-slate-400 mt-1">Brand: <span className="text-slate-200 font-medium">{product.brand}</span></p>
            <p className="text-[11px] text-slate-500 font-mono mt-1">UPC: {product.barcode}</p>
          </div>
        </div>

        {/* Right columns: Scores & Nutrition Facts */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#0b0f19]/80 p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Leaf size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Health Score</p>
                <p className={`text-2xl font-bold font-display ${getHealthScoreColor(product.healthScore)}`}>
                  {Math.round(product.healthScore)} / 100
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl flex items-center gap-4 border ${getNutriscoreColor(product.nutriscore)}`}>
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl font-bold uppercase">
                {product.nutriscore?.toUpperCase() || '-'}
              </div>
              <div>
                <p className="text-xs opacity-80 font-medium uppercase tracking-wider">Nutri-Score</p>
                <p className="text-lg font-bold">Grade {product.nutriscore?.toUpperCase() || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-200 mb-3 font-display">Macro-nutrients (per 100g)</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {renderMacroBar('Protein', product.nutrition.protein, 'bg-emerald-400')}
              {renderMacroBar('Carbohydrates', product.nutrition.carbs, 'bg-indigo-400')}
              {renderMacroBar('Fat', product.nutrition.fat, 'bg-amber-400')}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-200 mb-3 font-display">Additional Nutrition Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/30 p-3 rounded-xl border border-white/5">
                <p className="text-xs text-slate-400">Calories</p>
                <p className="text-base font-bold text-slate-200 mt-0.5">
                  {typeof product.nutrition.calories === 'number' 
                    ? product.nutrition.calories.toFixed(0) 
                    : product.nutrition.calories} <span className="text-xs font-normal text-slate-400">kcal</span>
                </p>
              </div>
              <div className="bg-slate-900/30 p-3 rounded-xl border border-white/5">
                <p className="text-xs text-slate-400">Dietary Fiber</p>
                <p className="text-base font-bold text-slate-200 mt-0.5">
                  {typeof product.nutrition.fiber === 'number' 
                    ? product.nutrition.fiber.toFixed(1) 
                    : product.nutrition.fiber} <span className="text-xs font-normal text-slate-400">g</span>
                </p>
              </div>
              <div className="bg-slate-900/30 p-3 rounded-xl border border-white/5">
                <p className="text-xs text-slate-400">Sodium</p>
                <p className="text-base font-bold text-slate-200 mt-0.5">
                  {typeof product.nutrition.sodium === 'number' 
                    ? product.nutrition.sodium.toFixed(0) 
                    : product.nutrition.sodium} <span className="text-xs font-normal text-slate-400">mg</span>
                </p>
              </div>
            </div>
          </div>

          {product.ingredients && (
            <div className="bg-slate-950/20 p-4 rounded-xl border border-white/5">
              <h3 className="text-sm font-bold text-slate-300 mb-1.5 font-display">Ingredients List</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{product.ingredients}</p>
            </div>
          )}

          {product.allergens && product.allergens !== 'Not listed' && (
            <div className="bg-amber-500/5 border border-amber-500/15 p-4 rounded-xl flex gap-3">
              <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider font-display">Potential Allergens Detected</p>
                <p className="text-amber-400/80 text-xs mt-1 leading-relaxed">{product.allergens}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}