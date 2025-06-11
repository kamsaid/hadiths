import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Step {
  id: string
  type?: string
  arabic?: string
  description?: string
  transliteration?: string
  min_reps?: number
  pref_reps?: number
  evidence?: string[]
  sources?: string[]
}

interface StepCardProps {
  step: Step
  showEvidence?: boolean
  showReps?: boolean
}

export function StepCard({ step, showEvidence = true, showReps = true }: StepCardProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      layout
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <h3 className="text-base font-medium capitalize">{step.id.replace(/_/g, ' ')}</h3>
        {step.type && (
          <Badge variant="secondary" className="whitespace-nowrap capitalize">
            {step.type}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {step.arabic && (
          <p dir="rtl" className="font-arabic text-xl leading-loose text-right">
            {step.arabic}
          </p>
        )}
        {step.description && <p className="text-[15px] leading-relaxed">{step.description}</p>}
        {showReps && step.min_reps && (
          <p className="text-sm text-muted-foreground">
            Repetitions: {step.min_reps}
            {step.pref_reps ? ` (preferably ${step.pref_reps})` : ''}
          </p>
        )}
        {step.transliteration && (
          <p className="text-sm text-muted-foreground italic">{step.transliteration}</p>
        )}
        {showEvidence && step.evidence && (
          <details className="text-sm cursor-pointer select-none">
            <summary className="mb-1 font-medium">Evidence</summary>
            <ul className="list-disc ml-5 space-y-1">
              {step.evidence.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          </details>
        )}
        {step.sources && (
          <details className="text-sm cursor-pointer select-none">
            <summary className="mb-1 font-medium">Sources</summary>
            <ul className="list-disc ml-5 space-y-1">
              {step.sources.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          </details>
        )}
      </CardContent>
    </motion.div>
  )
}
