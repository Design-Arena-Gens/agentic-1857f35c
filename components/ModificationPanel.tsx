'use client'

import { useStore } from '@/lib/store'
import { Palette, Disc, Wind, Sofa, Wrench, Car, Lightbulb } from 'lucide-react'

export default function ModificationPanel() {
  const { modifications, updateModification, selectedCar } = useStore()

  if (!selectedCar) {
    return (
      <div className="text-gray-400 text-center py-8">
        Select a car to start modifying
      </div>
    )
  }

  return (
    <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
      {/* Color */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Palette className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Paint Color</h3>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={modifications.color}
            onChange={(e) => updateModification('color', e.target.value)}
            className="w-16 h-16 rounded cursor-pointer"
          />
          <div className="flex flex-wrap gap-2">
            {['#ff0000', '#0000ff', '#000000', '#ffffff', '#ffff00', '#00ff00', '#ff00ff', '#00ffff'].map(color => (
              <button
                key={color}
                onClick={() => updateModification('color', color)}
                className="w-10 h-10 rounded border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Wheels */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Disc className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Wheels</h3>
        </div>
        <select
          value={modifications.wheels}
          onChange={(e) => updateModification('wheels', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="default">Stock Wheels</option>
          <option value="sport">Sport Wheels</option>
          <option value="chrome">Chrome Wheels</option>
          <option value="black">Black Wheels</option>
        </select>
      </div>

      {/* Spoiler */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Wind className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Spoiler</h3>
        </div>
        <select
          value={modifications.spoiler}
          onChange={(e) => updateModification('spoiler', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="none">No Spoiler</option>
          <option value="small">Small Spoiler</option>
          <option value="large">Large Spoiler</option>
          <option value="wing">GT Wing</option>
        </select>
      </div>

      {/* Interior */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Sofa className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Interior Color</h3>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={modifications.interior}
            onChange={(e) => updateModification('interior', e.target.value)}
            className="w-16 h-16 rounded cursor-pointer"
          />
          <div className="flex flex-wrap gap-2">
            {['#000000', '#8b4513', '#d3d3d3', '#ff0000', '#0000ff'].map(color => (
              <button
                key={color}
                onClick={() => updateModification('interior', color)}
                className="w-10 h-10 rounded border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Exhaust */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Wrench className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Exhaust</h3>
        </div>
        <select
          value={modifications.exhaust}
          onChange={(e) => updateModification('exhaust', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="stock">Stock Exhaust</option>
          <option value="sport">Sport Exhaust</option>
          <option value="dual">Dual Exhaust</option>
        </select>
      </div>

      {/* Bumper */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Car className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Front Bumper</h3>
        </div>
        <select
          value={modifications.bumper}
          onChange={(e) => updateModification('bumper', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="stock">Stock Bumper</option>
          <option value="sport">Sport Bumper</option>
          <option value="aggressive">Aggressive Bumper</option>
        </select>
      </div>

      {/* Headlights */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Lightbulb className="mr-2" size={20} />
          <h3 className="text-lg font-semibold">Headlights</h3>
        </div>
        <select
          value={modifications.headlights}
          onChange={(e) => updateModification('headlights', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="stock">Stock Headlights</option>
          <option value="led">LED Headlights</option>
          <option value="xenon">Xenon Headlights</option>
        </select>
      </div>
    </div>
  )
}
