import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

export interface CarModel {
  id: string
  make: string
  model: string
  year: number
  type: 'SUV' | 'Sedan' | 'Sports Car' | 'Truck' | 'Coupe'
  specifications: string
}

export interface Modification {
  color: string
  wheels: string
  spoiler: string
  interior: string
  exhaust: string
  bumper: string
  headlights: string
  stickers: string[]
}

export interface SavedDesign {
  id: string
  userId: string
  carModelId: string
  modifications: Modification
  name: string
  createdAt: string
}

interface Store {
  user: User | null
  selectedCar: CarModel | null
  modifications: Modification
  savedDesigns: SavedDesign[]
  carModels: CarModel[]

  setUser: (user: User | null) => void
  setSelectedCar: (car: CarModel | null) => void
  updateModification: (key: keyof Modification, value: any) => void
  resetModifications: () => void
  saveDesign: (name: string) => void
  loadDesign: (design: SavedDesign) => void
  addCarModel: (car: CarModel) => void
}

const defaultModifications: Modification = {
  color: '#ff0000',
  wheels: 'default',
  spoiler: 'none',
  interior: '#000000',
  exhaust: 'stock',
  bumper: 'stock',
  headlights: 'stock',
  stickers: []
}

const initialCarModels: CarModel[] = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2024, type: 'Sedan', specifications: 'Mid-size sedan' },
  { id: '2', make: 'Honda', model: 'Civic', year: 2024, type: 'Sedan', specifications: 'Compact sedan' },
  { id: '3', make: 'Ford', model: 'Mustang', year: 2024, type: 'Sports Car', specifications: 'Performance sports car' },
  { id: '4', make: 'Chevrolet', model: 'Tahoe', year: 2024, type: 'SUV', specifications: 'Full-size SUV' },
  { id: '5', make: 'Tesla', model: 'Model 3', year: 2024, type: 'Sedan', specifications: 'Electric sedan' },
  { id: '6', make: 'BMW', model: 'M4', year: 2024, type: 'Coupe', specifications: 'Performance coupe' },
  { id: '7', make: 'Audi', model: 'Q7', year: 2024, type: 'SUV', specifications: 'Luxury SUV' },
  { id: '8', make: 'Mercedes', model: 'C-Class', year: 2024, type: 'Sedan', specifications: 'Luxury sedan' },
]

export const useStore = create<Store>((set, get) => ({
  user: null,
  selectedCar: null,
  modifications: defaultModifications,
  savedDesigns: [],
  carModels: initialCarModels,

  setUser: (user) => set({ user }),

  setSelectedCar: (car) => set({
    selectedCar: car,
    modifications: defaultModifications
  }),

  updateModification: (key, value) => set((state) => ({
    modifications: { ...state.modifications, [key]: value }
  })),

  resetModifications: () => set({ modifications: defaultModifications }),

  saveDesign: (name) => {
    const { user, selectedCar, modifications, savedDesigns } = get()
    if (!user || !selectedCar) return

    const newDesign: SavedDesign = {
      id: Date.now().toString(),
      userId: user.id,
      carModelId: selectedCar.id,
      modifications: { ...modifications },
      name,
      createdAt: new Date().toISOString()
    }

    set({ savedDesigns: [...savedDesigns, newDesign] })
  },

  loadDesign: (design) => {
    const { carModels } = get()
    const car = carModels.find(c => c.id === design.carModelId)
    set({
      selectedCar: car || null,
      modifications: design.modifications
    })
  },

  addCarModel: (car) => set((state) => ({
    carModels: [...state.carModels, car]
  }))
}))
