'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useStore } from '@/lib/store'
import AuthModal from '@/components/AuthModal'
import CarSelector from '@/components/CarSelector'
import ModificationPanel from '@/components/ModificationPanel'
import SaveExportPanel from '@/components/SaveExportPanel'
import { User, LogOut, Settings } from 'lucide-react'

const Car3DViewer = dynamic(() => import('@/components/Car3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="text-white">Loading 3D Viewer...</div>
    </div>
  )
})

export default function Home() {
  const { user, setUser, selectedCar } = useStore()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">3D Car Modifier</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span>{user.name}</span>
                  {user.isAdmin && (
                    <span className="px-2 py-1 bg-yellow-600 rounded text-xs">ADMIN</span>
                  )}
                </div>
                {user.isAdmin && (
                  <button
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors flex items-center"
                  >
                    <Settings className="mr-2" size={18} />
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors flex items-center"
                >
                  <LogOut className="mr-2" size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Admin Panel */}
      {showAdminPanel && user?.isAdmin && (
        <div className="p-6 border-b border-gray-700">
          {/* Import admin panel component */}
          {typeof window !== 'undefined' && (
            <div>
              {(() => {
                const AdminPanel = require('@/components/AdminPanel').default
                return <AdminPanel />
              })()}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Car Selection */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <CarSelector />
        </div>

        {/* Center - 3D Viewer */}
        <div className="flex-1 relative">
          {selectedCar ? (
            <>
              <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 px-4 py-2 rounded z-10">
                <div className="font-semibold">
                  {selectedCar.year} {selectedCar.make} {selectedCar.model}
                </div>
                <div className="text-sm text-gray-400">{selectedCar.type}</div>
              </div>
              <Car3DViewer />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="text-4xl mb-4">🚗</div>
                <div className="text-xl mb-2">Welcome to 3D Car Modifier</div>
                <div className="text-gray-400">Select a car from the left panel to start customizing</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Modifications */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Customization</h2>
            <ModificationPanel />

            <div className="mt-6">
              <SaveExportPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
