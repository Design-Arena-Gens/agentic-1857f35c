'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Shield, Plus, Car } from 'lucide-react'

export default function AdminPanel() {
  const { user, addCarModel, carModels, savedDesigns } = useStore()
  const [showAddCar, setShowAddCar] = useState(false)
  const [newCar, setNewCar] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'Sedan' as const,
    specifications: ''
  })

  if (!user?.isAdmin) {
    return null
  }

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault()
    addCarModel({
      id: Date.now().toString(),
      ...newCar
    })
    setNewCar({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      type: 'Sedan',
      specifications: ''
    })
    setShowAddCar(false)
    alert('Car model added successfully!')
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <Shield className="mr-2 text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded">
          <div className="text-2xl font-bold">{carModels.length}</div>
          <div className="text-sm text-gray-400">Total Cars</div>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <div className="text-2xl font-bold">{savedDesigns.length}</div>
          <div className="text-sm text-gray-400">Total Designs</div>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <div className="text-2xl font-bold">{new Set(savedDesigns.map(d => d.userId)).size}</div>
          <div className="text-sm text-gray-400">Active Users</div>
        </div>
      </div>

      {/* Add Car Model */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddCar(!showAddCar)}
          className="flex items-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2" size={18} />
          Add New Car Model
        </button>

        {showAddCar && (
          <form onSubmit={handleAddCar} className="mt-4 space-y-3 bg-gray-700 p-4 rounded">
            <div>
              <label className="block text-sm mb-1">Make</label>
              <input
                type="text"
                value={newCar.make}
                onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Model</label>
              <input
                type="text"
                value={newCar.model}
                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Year</label>
              <input
                type="number"
                value={newCar.year}
                onChange={(e) => setNewCar({ ...newCar, year: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Type</label>
              <select
                value={newCar.type}
                onChange={(e) => setNewCar({ ...newCar, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Specifications</label>
              <textarea
                value={newCar.specifications}
                onChange={(e) => setNewCar({ ...newCar, specifications: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                rows={2}
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
              >
                Add Car
              </button>
              <button
                type="button"
                onClick={() => setShowAddCar(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Recent User Modifications */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Car className="mr-2" size={20} />
          Recent User Modifications
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {savedDesigns.slice(-10).reverse().map((design) => (
            <div key={design.id} className="bg-gray-700 p-3 rounded">
              <div className="font-medium">{design.name}</div>
              <div className="text-sm text-gray-400">
                User ID: {design.userId} | {new Date(design.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
