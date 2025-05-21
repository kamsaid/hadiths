import { motion } from 'framer-motion'
import clsx from 'clsx'
import { CheckCircle } from 'lucide-react'

interface StepperProps {
  total: number
  current: number
}

export function Stepper({ total, current }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8 select-none">
      {Array.from({ length: total }).map((_, idx) => {
        const done = idx < current
        const active = idx === current
        return (
          <div key={idx} className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border',
                done && 'bg-emerald-600 text-white border-emerald-600',
                active && 'bg-emerald-500/20 text-emerald-700 border-emerald-500',
                !done && !active &&
                  'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'
              )}
            >
              {done ? <CheckCircle size={18} /> : idx + 1}
            </motion.div>
            {idx < total - 1 && <div className="w-8 h-px bg-gray-300 dark:bg-gray-600" />}
          </div>
        )
      })}
    </div>
  )
}
