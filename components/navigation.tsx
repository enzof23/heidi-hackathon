"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Users, Settings } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-slate-900">
              Medical History Twin
            </Link>
            <div className="flex space-x-4">
              <Link href="/">
                <Button
                  variant={pathname === "/" ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link href="/patients">
                <Button
                  variant={pathname.startsWith("/patients") ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Patients</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Dr. Sarah Johnson</span>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
