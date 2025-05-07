'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronDown } from "lucide-react";
import clsx from "clsx";
import prayerData from '@/content/howtopray.json';

/**
 * Utility: simple horizontal stepper to visualise rakʿāt progression
 */
const Stepper = ({ total, current }) => (
  <div className="flex items-center justify-center gap-4 mb-8 select-none">
    {Array.from({ length: total }).map((_, idx) => {
      const done = idx < current;
      const active = idx === current;
      return (
        <div key={idx} className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border",
              done && "bg-emerald-600 text-white border-emerald-600",
              active && "bg-emerald-500/20 text-emerald-700 border-emerald-500",
              !done && !active && "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
            )}
          >
            {done ? <CheckCircle size={18} /> : idx + 1}
          </motion.div>
          {idx < total - 1 && <div className="w-8 h-px bg-gray-300 dark:bg-gray-600" />}
        </div>
      );
    })}
  </div>
);

/**
 * Displays an individual prayer step inside a Card component
 */
const PrayerStep = ({ step }) => (
  <Card as={motion.div} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} layout>
    <CardHeader className="flex flex-row items-start justify-between gap-2">
      <h3 className="text-base font-medium capitalize">
        {step.id.replace(/_/g, " ")}
      </h3>
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
      {step.min_reps && (
        <p className="text-sm text-muted-foreground">
          Repetitions: {step.min_reps}
          {step.pref_reps ? ` (preferably ${step.pref_reps})` : ""}
        </p>
      )}
      {step.evidence && (
        <details className="text-sm cursor-pointer select-none">
          <summary className="mb-1 font-medium">Evidence</summary>
          <ul className="list-disc ml-5 space-y-1">
            {step.evidence.map((src, i) => (
              <li key={i}>{src}</li>
            ))}
          </ul>
        </details>
      )}
    </CardContent>
  </Card>
);

/**
 * Shows steps of a single Rakʿa inside an Accordion item
 */
const RakaaDisplay = ({ rakaa, defaultOpen }) => (
  <AccordionItem value={`rakaa-${rakaa.number}`} className="border-none">
    <AccordionTrigger className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3 mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-left w-full flex justify-between items-center">
      <span className="text-lg font-semibold">Rakʿa {rakaa.number}</span>
      <ChevronDown className="h-5 w-5 transition-transform" />
    </AccordionTrigger>
    <AccordionContent className="space-y-4 pl-1 pr-1">
      {rakaa.exceptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-md"
        >
          <p className="font-medium mb-1 text-sm">
            Exceptions from Rakʿa {rakaa.clone_rakʿah_of}:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {rakaa.exceptions.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        {rakaa.steps?.map((step, idx) => (
          <PrayerStep key={`${rakaa.number}-${idx}`} step={step} />
        ))}
      </AnimatePresence>
    </AccordionContent>
  </AccordionItem>
);

/**
 * Meta‑blocks (Final Tashahhud & Taslīm) share similar UI
 */
const MetaBlock = ({ title, rows }) => (
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
);

/**
 * Main Prayer Page
 */
export default function PrayerPage() {
  const [activeSchool] = useState(prayerData.school);
  const [currentRakaa, setCurrentRakaa] = useState(0);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <motion.header 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="mb-10 space-y-8"
      >
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-60 md:w-48 md:h-72">
            <Image 
              src="/images/prayer-mat.png" 
              alt="Prayer mat" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">How to Pray</h1>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
            <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-200">
              {activeSchool}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-200">
              {prayerData.prayer_type}
            </Badge>
          </div>
        </div>
      </motion.header>

      <Stepper total={prayerData.rakʿāt.length} current={currentRakaa} />

      {/* RAKAA LIST */}
      <Accordion type="single" collapsible defaultValue="rakaa-1" onValueChange={(val) => {
        if (val) {
          const num = Number(val.split("-")[1]) - 1;
          setCurrentRakaa(num);
        }
      }} className="w-full mb-12">
        {prayerData.rakʿāt.map((rakaa) => (
          <RakaaDisplay key={rakaa.number} rakaa={rakaa} />
        ))}
      </Accordion>

      {/* FINAL Tashahhud */}
      {prayerData.final_tashahhud && (
        <MetaBlock
          title="Final Tashahhud"
          rows={[
            { label: "Posture", value: prayerData.final_tashahhud.posture },
            { label: "Text", value: prayerData.final_tashahhud.text },
            { label: "Ṣalawāt", value: prayerData.final_tashahhud.ṣalawāt },
            { label: "Duʿāʾ", value: prayerData.final_tashahhud.duʿāʾ },
          ]}
        />
      )}

      {/* TASLIM */}
      {prayerData.taslīm && (
        <MetaBlock
          title="Taslīm"
          rows={[
            { label: "Type", value: prayerData.taslīm.type },
            { label: "Text", value: prayerData.taslīm.text },
            {
              label: "Direction",
              value: prayerData.taslīm.right_then_left ? "Right then Left" : "Both sides",
            },
          ]}
        />
      )}

      {/* GENERAL NOTES */}
      {prayerData.general_notes && (
        <Card as={motion.section} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-16">
          <CardHeader>
            <h2 className="text-xl font-bold">General Notes</h2>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {prayerData.general_notes.map((note, idx) => (
                <li key={idx} className="text-sm leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 