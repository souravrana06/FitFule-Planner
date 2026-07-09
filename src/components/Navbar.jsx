import { useState } from 'react'
import { Menu, X, Leaf } from 'lucide-react'

export default function Navbar({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'scanner', label: 'Barcode Scanner', icon: '📱' },
    { id: 'mealplan', label: 'Meal Plan', icon: '🍽️' },
    { id: 'analyzer', label: 'Analyzer', icon: '📊' },
    { id: 'shopping', label: 'Shopping List', icon: '🛒' },
    { id: 'about', label: 'About', icon: 'ℹ️' }
  ]

  const handleNavClick = (pageId) => {
    onNavigate(pageId)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-4 left-4 right-4 max-w-6xl mx-auto rounded-2xl bg-[#0b0f19]/70 backdrop-blur-lg border border-white/10 shadow-xl z-50 transition-all duration-300">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300">
              <Leaf className="text-primary" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              Fit<span className="text-emerald-400">Fuel</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border border-indigo-500/30 text-white shadow-sm shadow-indigo-500/10'
                    : 'text-slate-400 border border-transparent hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <span className="mr-1.5 text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/5 pt-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border border-indigo-500/30 text-white'
                    : 'text-slate-400 border border-transparent hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <span className="mr-2.5 text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}