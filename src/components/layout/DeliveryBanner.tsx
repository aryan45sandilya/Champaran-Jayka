import { Bike, Phone } from 'lucide-react'

export function DeliveryBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-[rgb(196_142_72)] text-[rgb(14_10_8)] py-1.5 px-4 z-[60]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 text-center">
        <div className="flex items-center gap-1.5">
          <Bike size={13} className="shrink-0" />
          <span className="text-[0.7rem] sm:text-xs font-semibold tracking-wide">
            🎉 Free Delivery within 3 km!
          </span>
        </div>
        <span className="hidden sm:block text-[rgb(14_10_8/0.4)] text-xs">|</span>
        <div className="flex items-center gap-1.5">
          <Phone size={12} className="shrink-0" />
          <span className="text-[0.7rem] sm:text-xs font-medium">
            Order:{' '}
            <a href="tel:+917667751506" className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">76677 51506</a>
            {' '}·{' '}
            <a href="tel:+919934412330" className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">99344 12330</a>
          </span>
        </div>
      </div>
    </div>
  )
}
