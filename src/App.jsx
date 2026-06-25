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
    <div className="min-h-screen bg-gradient-to-br from-light to-gray-100">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
      />

      <main className="pt-20">
        {pages[currentPage]}
      </main>

      <footer className="bg-dark text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">© 2026 FitFuel Planner. Built with ❤️ for healthier eating.</p>
          <p className="text-sm text-gray-400">
            Data powered by Open Food Facts API
          </p>
        </div>
      </footer>
    </div>
  )
}