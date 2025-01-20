import Image from "next/image"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image src="/logo.svg" alt="Ahmad Nas Insurance Logo" width={256} height={178} className={className} priority />
  )
}

