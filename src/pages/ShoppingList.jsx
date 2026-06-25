import { useState } from 'react'
import { Trash2, Plus, Download } from 'lucide-react'

export default function ShoppingList() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [category, setCategory] = useState('produce')

  const categories = [
    { id: 'produce', name: '🥬 Produce', color: 'bg-green-50' },
    { id: 'dairy', name: '🥛 Dairy', color: 'bg-blue-50' },
    { id: 'meat', name: '🥩 Meat & Seafood', color: 'bg-red-50' },
    { id: 'grains', name: '🌾 Grains & Bread', color: 'bg-yellow-50' },
    { id: 'pantry', name: '🥫 Pantry', color: 'bg-orange-50' },
    { id: 'frozen', name: '🧊 Frozen', color: 'bg-purple-50' },
    { id: 'other', name: '📦 Other', color: 'bg-gray-50' }
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2">🛒 Smart Shopping List</h1>
      <p className="text-center text-gray-600 mb-8">
        Build and manage your personalized shopping list by category
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 card">
          <h2 className="text-2xl font-bold mb-6">Add Items</h2>
          <form onSubmit={addItem} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Item Name</label>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="e.g., Apples, Chicken breast"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Plus size={20} />
              Add Item
            </button>
          </form>

          <div className="mt-6 space-y-2">
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-primary">{items.length}</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{items.filter(i => i.completed).length}</p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={downloadList}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition"
            >
              <Download size={20} />
              Download List
            </button>
          )}
        </div>

        <div className="md:col-span-2">
          {items.length === 0 ? (
            <div className="card text-center text-gray-500 py-12">
              <p className="text-lg">Your shopping list is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map(category => {
                const categoryItems = items.filter(item => item.category === category.id)
                if (categoryItems.length === 0) return null

                return (
                  <div key={category.id} className={`${category.color} rounded-lg p-4`}>
                    <h3 className="font-bold text-lg mb-3">{category.name}</h3>
                    <div className="space-y-2">
                      {categoryItems.map(item => (
                        <div
                          key={item.id}
                          className="bg-white p-3 rounded flex items-center justify-between group hover:shadow-md transition"
                        >
                          <label className="flex items-center gap-3 cursor-pointer flex-1">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleItem(item.id)}
                              className="w-5 h-5 cursor-pointer"
                            />
                            <span className={item.completed ? 'line-through text-gray-400' : ''}>
                              {item.name}
                            </span>
                          </label>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 size={18} />
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