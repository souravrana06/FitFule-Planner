import { useState } from 'react'
import { Trash2, Plus, Download } from 'lucide-react'

export default function ShoppingList() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [category, setCategory] = useState('produce')

  const categories = [
    { id: 'produce', name: '🥬 Produce', color: 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400' },
    { id: 'dairy', name: '🥛 Dairy', color: 'bg-sky-500/5 border border-sky-500/10 text-sky-400' },
    { id: 'meat', name: '🥩 Meat & Seafood', color: 'bg-rose-500/5 border border-rose-500/10 text-rose-400' },
    { id: 'grains', name: '🌾 Grains & Bread', color: 'bg-amber-500/5 border border-amber-500/10 text-amber-400' },
    { id: 'pantry', name: '🥫 Pantry', color: 'bg-orange-500/5 border border-orange-500/10 text-orange-400' },
    { id: 'frozen', name: '🧊 Frozen', color: 'bg-purple-500/5 border border-purple-500/10 text-purple-400' },
    { id: 'other', name: '📦 Other', color: 'bg-slate-500/5 border border-slate-500/10 text-slate-300' }
  ]

  const addItem = (e) => {
    e.preventDefault()
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem,
          category: category,
          completed: false
        }
      ])
      setNewItem('')
    }
  }

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const downloadList = () => {
    const grouped = categories.reduce((acc, cat) => {
      const catItems = items.filter(item => item.category === cat.id)
      if (catItems.length > 0) {
        acc[cat.name] = catItems.map(item => `${item.completed ? '✓' : '○'} ${item.name}`).join('\n')
      }
      return acc
    }, {})

    let content = 'SHOPPING LIST\n' + '='.repeat(50) + '\n\n'
    Object.entries(grouped).forEach(([cat, list]) => {
      content += `${cat}\n` + '-'.repeat(40) + '\n' + list + '\n\n'
    })

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', 'shopping-list.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
          🛒 Smart Shopping <span className="text-gradient-primary">List</span>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          Keep track of items you need to buy. Grouped dynamically by grocery categories.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 card relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-xl font-bold text-slate-100 mb-6 font-display">Add Items</h2>
          <form onSubmit={addItem} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Item Name</label>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="e.g., Organic Honey, Spinach"
                className="input-field text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field text-sm cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-slate-950 text-slate-200">{cat.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              <Plus size={18} />
              Add Item
            </button>
          </form>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-slate-900/30 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-slate-200 mt-1">{items.length}</p>
            </div>
            <div className="bg-slate-900/30 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Checked</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{items.filter(i => i.completed).length}</p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={downloadList}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold py-3 px-4 rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={18} />
              Download List (.txt)
            </button>
          )}
        </div>

        <div className="md:col-span-2">
          {items.length === 0 ? (
            <div className="card text-center text-slate-500 py-20 border border-dashed border-slate-800 bg-transparent flex flex-col items-center justify-center space-y-2">
              <span className="text-3xl">🛒</span>
              <p className="text-slate-400 font-medium text-sm">Your shopping list is currently empty</p>
              <p className="text-xs text-slate-600 max-w-xs">Add ingredients manually or generate a meal plan to auto-populate items.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map(category => {
                const categoryItems = items.filter(item => item.category === category.id)
                if (categoryItems.length === 0) return null

                return (
                  <div key={category.id} className={`${category.color} rounded-2xl p-5 space-y-3`}>
                    <h3 className="font-bold text-sm uppercase tracking-wider font-display">{category.name}</h3>
                    <div className="space-y-2">
                      {categoryItems.map(item => (
                        <div
                          key={item.id}
                          className="bg-[#0b0f19]/80 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between group hover:shadow-md transition"
                        >
                          <label className="flex items-center gap-3 cursor-pointer flex-1 select-none">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleItem(item.id)}
                              className="w-4 h-4 cursor-pointer rounded border-slate-800 text-indigo-600 focus:ring-indigo-500/50"
                            />
                            <span className={`text-sm ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                              {item.name}
                            </span>
                          </label>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}