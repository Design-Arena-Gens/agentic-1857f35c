'use client'

import { useStore } from '@/lib/store'
import { Car } from 'lucide-react'

export default function CarSelector() {
  const { carModels, selectedCar, setSelectedCar } = useStore()

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <Car className="mr-2" size={20} />
        <h3 className="text-lg font-semibold">Select Car Model</h3>
      </div>

      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {carModels.map((car) => (
          <button
            key={car.id}
            onClick={() => setSelectedCar(car)}
            className={`p-3 rounded-lg text-left transition-colors ${
              selectedCar?.id === car.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            <div className="font-semibold">{car.year} {car.make} {car.model}</div>
            <div className="text-sm opacity-75">{car.type}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
