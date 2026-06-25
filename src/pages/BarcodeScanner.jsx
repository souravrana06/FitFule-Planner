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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2">📱 Barcode Scanner</h1>
      <p className="text-center text-gray-600 mb-8">
        Scan or enter a product barcode to get instant nutrition info
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Camera className="text-primary" />
            Camera Scan
          </h2>
          
          {!scannerActive ? (
            <button
              onClick={startScanner}
              className="btn-primary w-full"
            >
              Start Camera
            </button>
          ) : (
            <>
              <div id="qr-reader" className="w-full mb-4" style={{ minHeight: '300px' }}></div>
              <button
                onClick={stopScanner}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
              >
                Stop Camera
              </button>
            </>
          )}
          <p className="text-sm text-gray-600 mt-4">
            ✨ Position the barcode in front of your camera
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Upload className="text-secondary" />
            Manual Entry
          </h2>
          
          <form onSubmit={handleManualSubmit}>
            <input
              type="text"
              placeholder="Enter product barcode"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              className="input-field mb-4"
            />
            <button type="submit" className="btn-primary w-full">
              Look Up Product
            </button>
          </form>
          
          <p className="text-sm text-gray-600 mt-4">
            💡 You can find the barcode on product labels
          </p>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="spinner mx-auto"></div>
          <p className="text-gray-600 mt-4">Looking up product...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-500" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {scannedProduct && <ProductCard product={scannedProduct} />}

      {!scannedProduct && !loading && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-8">
          <h3 className="font-bold text-blue-900 mb-2">🔍 Try These Barcodes:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['8718114010305', '5010477148516', '4002431004110'].map((code) => (
              <button
                key={code}
                onClick={() => handleBarcodeLookup(code)}
                className="text-sm bg-white text-blue-700 border border-blue-300 rounded px-3 py-2 hover:bg-blue-100 transition"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}