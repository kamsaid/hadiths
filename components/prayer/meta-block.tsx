import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface Row {
  label: string
  value: string
}

interface MetaBlockProps {
  title: string
  rows: Row[]
}

export function MetaBlock({ title, rows }: MetaBlockProps) {
  return (
    <Card as={motion.section} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-10">
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardContent className="space-y-2">
        {rows.map(({ label, value }, idx) => (
          <p key={idx} className="text-sm">
            <span className="font-medium mr-1">{label}:</span>
            {value}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
