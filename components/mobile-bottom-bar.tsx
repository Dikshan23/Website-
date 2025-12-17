"use client"

import { Phone, MessageCircle, Dumbbell } from "lucide-react"

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border">
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href="tel:+17276131110"
          className="flex flex-col items-center justify-center py-3 gap-1 text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-medium">Call</span>
        </a>
        <a
          href="https://wa.me/17276131110"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 gap-1 text-green-400 hover:bg-green-500/5 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-medium">WhatsApp</span>
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center justify-center py-3 gap-1 text-primary hover:bg-primary/5 transition-colors"
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-xs font-medium">Join</span>
        </a>
      </div>
    </div>
  )
}
