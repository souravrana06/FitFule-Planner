import { useState, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import { Camera, Upload, AlertCircle } from 'lucide-react'
import ProductCard from '../components/ProductCard'

export default function BarcodeScanner() {
  const [scannedProduct, setScannedProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [manualBarcode, setManualBarcode] = useState('')
  const [scannerActive, setScannerActive] = useState(false)

  const handleBarcodeLookup = async (barcode) => {
    setLoading(true)
    setError(null)
    
    try {
    //   const response = await axios.post('/api/barcode/lookup', { barcode })
        const response = await axios.post(
        'http://localhost:5000/api/barcode/lookup',
        { barcode }
        )

      setScannedProduct(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to lookup product.')
      setScannedProduct(null)
    } finally {
      setLoading(false)
    }
  }

  const startScanner = () => {
    setScannerActive(true)
    
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    )

    scanner.render(
      (result) => {
        setScannerActive(false)
        scanner.clear()
        handleBarcodeLookup(result)
      },
      (error) => {
        // Ignore scanning errors
      }
    )
  }

  const stopScanner = () => {
    setScannerActive(false)
  }

  const handleManualSubmit = (e) => {
    e.preventDefault()
    if (manualBarcode.trim()) {
      handleBarcodeLookup(manualBarcode.trim())
      setManualBarcode('')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
          📱 Barcode <span className="text-gradient-primary">Scanner</span>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          Scan or enter a product barcode to instantly get complete nutrition insights and scores.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2 font-display">
            <Camera className="text-emerald-400" size={22} />
            Camera Scan
          </h2>
          
          <div className="space-y-4">
            {!scannerActive ? (
              <button
                onClick={startScanner}
                className="btn-primary w-full py-3"
              >
                Start Camera
              </button>
            ) : (
              <div className="space-y-4">
                <div id="qr-reader" className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40" style={{ minHeight: '300px' }}></div>
                <button
                  onClick={stopScanner}
                  className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Stop Camera
                </button>
              </div>
            )}
            <p className="text-xs text-slate-400 text-center">
              ✨ Allow camera access and position the barcode in front of the lens.
            </p>
          </div>
        </div>

        <div className="card relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2 font-display">
            <Upload className="text-indigo-400" size={22} />
            Manual Entry
          </h2>
          
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter product barcode"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                className="input-field py-3 text-sm"
              />
            </div>
            <button type="submit" className="btn-secondary w-full py-3">
              Look Up Product
            </button>
          </form>
          
          <p className="text-xs text-slate-400 text-center pt-2">
            💡 You can find the barcode number underneath the vertical barcode stripes.
          </p>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 card flex flex-col items-center justify-center space-y-4">
          <div className="spinner"></div>
          <p className="text-slate-400 text-sm">Looking up product in Open Food Facts database...</p>
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

      {scannedProduct && <ProductCard product={scannedProduct} />}

      {!scannedProduct && !loading && (
        <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-indigo-300 text-sm font-display flex items-center gap-2">
            🔍 Quick Test Barcodes:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { code: '8718114010305', label: 'Lipton Green Tea' },
              { code: '5010477148516', label: 'Quaker Oats' },
              { code: '4002431004110', label: 'Milka Chocolate' }
            ].map((item) => (
              <button
                key={item.code}
                onClick={() => handleBarcodeLookup(item.code)}
                className="text-xs bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-4 py-3 hover:border-indigo-500/30 hover:text-white transition-all text-left flex flex-col gap-0.5"
              >
                <span className="font-semibold text-slate-200">{item.label}</span>
                <span className="text-[10px] text-slate-500 font-mono">{item.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}