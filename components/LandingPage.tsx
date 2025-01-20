"use client"

import { useState, Suspense, lazy } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import Link from "next/link"
import Logo from "./Logo"
import { Loader2 } from "lucide-react"

const AutoInsuranceForm = lazy(() => import("./AutoInsuranceForm"))
const PropertyInsuranceForm = lazy(() => import("./PropertyInsuranceForm"))

export default function LandingPage() {
  const [openHome, setOpenHome] = useState(false)
  const [openAuto, setOpenAuto] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      <div className="text-center space-y-6 mb-8">
        <Logo className="mx-auto" />
      </div>

      <div className="flex gap-4">
        <Button
          size="lg"
          className="text-lg px-12 py-6 rounded-full border border-black bg-black text-white hover:bg-white hover:text-black hover:border-opacity-25 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => setOpenHome(true)}
        >
          Home
        </Button>
        <Button
          size="lg"
          className="text-lg px-12 py-6 rounded-full border border-black bg-black text-white hover:bg-white hover:text-black hover:border-opacity-25 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => setOpenAuto(true)}
        >
          Auto
        </Button>
      </div>

      <HomeInsuranceDrawer open={openHome} onOpenChange={setOpenHome} />
      <AutoInsuranceDrawer open={openAuto} onOpenChange={setOpenAuto} />
      <footer className="absolute bottom-4 w-full text-center">
        <p className="text-xs text-gray-400">
          Powered by{" "}
          <Link href="https://roomikh.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            RoomAi
          </Link>
        </p>
      </footer>
    </div>
  )
}

const HomeInsuranceDrawer = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="h-[95vh]">
      <DrawerHeader>
        <DrawerTitle>Property Insurance Application</DrawerTitle>
        <DrawerDescription>Fill out this form to get a quote for property insurance.</DrawerDescription>
      </DrawerHeader>
      <div className="px-4 md:px-8 overflow-y-auto pb-8">
        <Suspense fallback={<LoadingSpinner />}>
          <PropertyInsuranceForm onSubmit={() => onOpenChange(false)} />
        </Suspense>
      </div>
    </DrawerContent>
  </Drawer>
)

const AutoInsuranceDrawer = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="h-[95vh]">
      <DrawerHeader>
        <DrawerTitle>Auto Insurance Application</DrawerTitle>
        <DrawerDescription>Fill out this form to get a quote for auto insurance.</DrawerDescription>
      </DrawerHeader>
      <div className="px-4 md:px-8 overflow-y-auto pb-8">
        <Suspense fallback={<LoadingSpinner />}>
          <AutoInsuranceForm onSubmit={() => onOpenChange(false)} />
        </Suspense>
      </div>
    </DrawerContent>
  </Drawer>
)

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
)

