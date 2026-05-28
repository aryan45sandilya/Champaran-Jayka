import { Bike, Phone } from 'lucide-react'

export function DeliveryBanner() {
  return (
    // Always single line — h-8 (32px) on all screens
    <div className="fixed top-0 left-0 right-0 w-full h-8 bg-[rgb(196_142_72)] text-[rgb(14_10_8)] z-[60] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-3 flex items-center justify-center gap-2 sm:gap-5 overflow-hidden">

        {/* Delivery */}
        <div className="flex items-center gap-1 shrink-0">
          <Bike size={12} className="shrink-0" />
          <span className="text-[0.65rem] sm:text-xs font-semibold whitespace-nowrap">
            🎉 Free Delivery within 3 km
          </span>
        </div>

        <span className="text-[rgb(14_10_8/0.35)] text-xs shrink-0">|</span>

        {/* Phone */}
        <div className="flex items-center gap-1 shrink-0">
          <Phone size={11} className="shrink-0" />
          <span className="text-[0.65rem] sm:text-xs font-medium whitespace-nowrap">
            Order:{' '}
            <a href="tel:+917667751506" className="font-bold underline underline-offset-1 hover:opacity-75 transition-opacity">
              76677 51506
            </a>
            <span className="mx-1">·</span>
            <a href="tel:+919934412330" className="font-bold underline underline-offset-1 hover:opacity-75 transition-opacity">
              99344 12330
            </a>
          </span>
        </div>

      </div>
    </div>
  )
}
