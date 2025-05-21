'use client'
import { AnimatePresence } from 'framer-motion'
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { motion } from 'framer-motion'
import { StepCard } from './step-card'

interface Rakaa {
  number: number
  steps?: any[]
  exceptions?: string[]
  clone_rakʿah_of?: number
}

interface RakaaDisplayProps {
  rakaa: Rakaa
}

export function RakaaDisplay({ rakaa }: RakaaDisplayProps) {
  return (
    <AccordionItem value={`rakaa-${rakaa.number}`} className="border-none">
      <AccordionTrigger className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3 mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-left w-full">
        <span className="text-lg font-semibold">Rakʿa {rakaa.number}</span>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pl-1 pr-1">
        {rakaa.exceptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-md"
          >
            <p className="font-medium mb-1 text-sm">Exceptions from Rakʿa {rakaa.clone_rakʿah_of}:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {rakaa.exceptions.map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          </motion.div>
        )}
        <AnimatePresence initial={false}>
          {rakaa.steps?.map((step, idx) => (
            <StepCard key={`${rakaa.number}-${idx}`} step={step} />
          ))}
        </AnimatePresence>
      </AccordionContent>
    </AccordionItem>
  )
}
