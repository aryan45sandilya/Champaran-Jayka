import { Bike, Phone } from 'lucide-react'

export function DeliveryBanner() {
  return (
    <div className="w-full bg-[rgb(196_142_72)] text-[rgb(14_10_8)] py-2 px-4 z-40 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 text-center">

        {/* Free delivery text */}
        <div className="flex items-center gap-1.5">
          <Bike size={14} className="shrink-0" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            🎉 Free Delivery within 3 km!
          </span>
        </div>

        <span className="hidden sm:block text-[rgb(14_10_8/0.4)] text-xs">|</span>

        {/* Call to order */}
        <div className="flex items-center gap-1.5">
          <Phone size={13} className="shrink-0" />
          <span className="text-xs sm:text-sm font-medium">
            Order now:{' '}
            <a
              href="tel:+917667751506"
              className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              76677 51506
            </a>
            {' '}·{' '}
            <a
              href="tel:+919934412330"
              className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              99344 12330
            </a>
          </span>
        </div>

      </div>
    </div>
  )
}
