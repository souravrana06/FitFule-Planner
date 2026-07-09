import { useState } from 'react'
import { Leaf } from 'lucide-react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import BarcodeScanner from './pages/BarcodeScanner'
import MealPlanGenerator from './pages/MealPlanGenerator'
import ProductAnalyzer from './pages/ProductAnalyzer'
import ShoppingList from './pages/ShoppingList'
import About from './pages/About'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const pages = {
    home: <LandingPage onNavigate={setCurrentPage} />,
    scanner: <BarcodeScanner />,
    mealplan: <MealPlanGenerator />,
    analyzer: <ProductAnalyzer />,
    shopping: <ShoppingList />,
    about: <About />
  }

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[45%] h-[45%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
      />

      <main className="pt-28 min-h-[calc(100vh-160px)] relative z-10 page-transition">
        {pages[currentPage]}
      </main>

      <footer className="border-t border-slate-900/60 bg-[#080c14]/80 backdrop-blur-md py-10 mt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2 text-slate-300 font-medium">© 2026 FitFuel Planner. Built with ❤️ for healthier eating.</p>
          <p className="text-sm text-slate-500">
            Data powered by Open Food Facts API & Google Gemini AI
          </p>
        </div>
      </footer>
    </div>
  )
}