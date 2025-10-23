'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Save, Download, FileImage, FileText, RotateCcw } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function SaveExportPanel() {
  const { user, selectedCar, saveDesign, resetModifications, savedDesigns, loadDesign } = useStore()
  const [designName, setDesignName] = useState('')
  const [showSaved, setShowSaved] = useState(false)

  const handleSave = () => {
    if (!designName.trim()) {
      alert('Please enter a design name')
      return
    }
    if (!user) {
      alert('Please login to save designs')
      return
    }
    saveDesign(designName)
    setDesignName('')
    alert('Design saved successfully!')
  }

  const handleExportImage = async () => {
    const canvas3D = document.querySelector('canvas')
    if (!canvas3D) return

    const link = document.createElement('a')
    link.download = `car-design-${Date.now()}.png`
    link.href = canvas3D.toDataURL()
    link.click()
  }

  const handleExportPDF = async () => {
    const canvas3D = document.querySelector('canvas')
    if (!canvas3D) return

    const imgData = canvas3D.toDataURL('image/png')
    const pdf = new jsPDF()

    pdf.text('3D Car Modification Design', 10, 10)
    pdf.text(`Car: ${selectedCar?.year} ${selectedCar?.make} ${selectedCar?.model}`, 10, 20)
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30)

    pdf.addImage(imgData, 'PNG', 10, 40, 180, 135)
    pdf.save(`car-design-${Date.now()}.pdf`)
  }

  const userDesigns = savedDesigns.filter(d => d.userId === user?.id)

  return (
    <div className="space-y-4">
      {/* Save Design */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Save className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Save Design</h3>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            placeholder="Enter design name"
            className="flex-1 px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={!user}
          />
          <button
            onClick={handleSave}
            disabled={!user || !selectedCar}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>
        {!user && (
          <p className="text-sm text-gray-400 mt-2">Login to save designs</p>
        )}
      </div>

      {/* Export */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Download className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Export</h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={handleExportImage}
            disabled={!selectedCar}
            className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <FileImage className="mr-2" size={18} />
            Export as Image
          </button>
          <button
            onClick={handleExportPDF}
            disabled={!selectedCar}
            className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <FileText className="mr-2" size={18} />
            Export as PDF
          </button>
        </div>
      </div>

      {/* Reset */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <button
          onClick={resetModifications}
          disabled={!selectedCar}
          className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <RotateCcw className="mr-2" size={18} />
          Reset Modifications
        </button>
      </div>

      {/* Saved Designs */}
      {user && userDesigns.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h3 className="text-lg font-semibold">My Saved Designs</h3>
            <span className="text-sm text-gray-400">{userDesigns.length}</span>
          </button>
          {showSaved && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {userDesigns.map((design) => (
                <button
                  key={design.id}
                  onClick={() => loadDesign(design)}
                  className="w-full p-2 bg-gray-700 rounded hover:bg-gray-600 text-left transition-colors"
                >
                  <div className="font-medium">{design.name}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(design.createdAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
