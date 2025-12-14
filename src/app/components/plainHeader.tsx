import Image from "next/image"

export default function PlainHeader () {
  return (
    <header className="h-20 flex justify-between items-center">
      <div className="flex items-center h-20 ml-4">
        <Image
          width={150}
          height={60}
          alt="Lancrly logo"
          src="/lancrly.png"
          className="object-contain"
        />
      </div>
    </header>
  )
}