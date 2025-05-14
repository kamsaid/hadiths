'use client';

import { useState, useEffect } from 'react';
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
import hanbaliPrayerData from '@/content/howtopray.json';
import hanafiPrayerData from '@/content/howtoprayhanifi.json';
import shafiiPrayerData from '@/content/howtoprayshafii.json';

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
      {step.transliteration && (
        <p className="text-sm text-muted-foreground italic">
          {step.transliteration}
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
 * Displays a Hanafi prayer step inside a Card component
 */
const HanafiPrayerStep = ({ step }) => (
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
      {step.transliteration && (
        <p className="text-sm text-muted-foreground italic">
          {step.transliteration}
        </p>
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
  </Card>
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
  // State for madhab selection (1 = Hanbali, 2 = Hanafi, 3 = Shafi'i)
  const [activeMadhab, setActiveMadhab] = useState(1);
  const [currentRakaa, setCurrentRakaa] = useState(0);
  
  // Define the madhab names directly for display
  const madhabs = {
    1: { name: "Hanbali", prayerType: hanbaliPrayerData.prayer_type || "fard" },
    2: { name: "Hanafi", prayerType: "fard" },
    3: { name: "Shafi'i", prayerType: "fard" }
  };
  
  // Transform Hanafi data to match Hanbali format (for consistency in UI rendering)
  const transformedHanafiData = {
    school: "Hanafi",
    prayer_type: "fard",
    rakʿāt: [
      {
        number: 1,
        steps: hanafiPrayerData.steps.filter(step => step.order <= 8)
      },
      {
        number: 2,
        steps: [
          // Step 9 is about rising for the second rakah
          hanafiPrayerData.steps[8],
          // The rest of the steps for the second rakah (generally repeating steps 3-8)
          ...hanafiPrayerData.steps.slice(2, 8)
        ]
      }
    ],
    taslīm: {
      type: "fard",
      text: hanafiPrayerData.steps[12]?.arabic || "As-salāmu ʿalaykum wa raḥmatullāh",
      right_then_left: true
    }
  };

  // Transform Shafi'i data to match Hanbali format
  const transformedShafiiData = {
    school: "Shafi'i",
    prayer_type: "fard",
    rakʿāt: [
      {
        number: 1,
        steps: shafiiPrayerData.steps.filter(step => step.order <= 9)
      },
      {
        number: 2,
        steps: [
          // Step 10 is about rising for the second rakah
          shafiiPrayerData.steps[9],
          // Steps for second rakah (repeating steps 3-9)
          ...shafiiPrayerData.steps.slice(2, 9)
        ]
      }
    ],
    taslīm: {
      type: shafiiPrayerData.steps[14]?.type || "fard",
      text: shafiiPrayerData.steps[14]?.arabic || "As-salāmu ʿalaykum wa raḥmatullāh",
      right_then_left: true
    },
    general_notes: [shafiiPrayerData.notes]
  };

  // Get the prayer data based on the selected madhab
  const getPrayerData = () => {
    if (activeMadhab === 1) {
      return hanbaliPrayerData;
    } else if (activeMadhab === 2) {
      return transformedHanafiData;
    } else {
      return transformedShafiiData;
    }
  };

  // Get the current prayer data
  const prayerData = getPrayerData();

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
              sizes="(max-width: 768px) 160px, 192px"
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight">How to Pray</h1>
          
          {/* Madhab selector */}
          <div className="flex justify-center space-x-2 mb-2">
            <button 
              onClick={() => setActiveMadhab(1)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500",
                activeMadhab === 1 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              )}
              aria-label="Select Hanbali madhab"
            >
              1
            </button>
            <button 
              onClick={() => setActiveMadhab(2)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500",
                activeMadhab === 2 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              )}
              aria-label="Select Hanafi madhab"
            >
              2
            </button>
            <button 
              onClick={() => setActiveMadhab(3)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500",
                activeMadhab === 3 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              )}
              aria-label="Select Shafi'i madhab"
            >
              3
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
            <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-200">
              {madhabs[activeMadhab].name}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-200">
              {madhabs[activeMadhab].prayerType}
            </Badge>
          </div>
        </div>
      </motion.header>

      {activeMadhab === 1 ? (
        // Hanbali Content
        <>
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
        </>
      ) : activeMadhab === 2 ? (
        // Hanafi Content
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {hanafiPrayerData.description}
            </p>
          </div>

          <div className="space-y-6">
            {hanafiPrayerData.steps.map((step) => (
              <HanafiPrayerStep key={step.id} step={step} />
            ))}
          </div>
        </div>
      ) : (
        // Shafi'i Content
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {shafiiPrayerData.description}
            </p>
          </div>

          <div className="space-y-6">
            {shafiiPrayerData.steps.map((step) => (
              <HanafiPrayerStep key={step.id} step={step} />
            ))}
          </div>

          {/* GENERAL NOTES for Shafi'i */}
          {shafiiPrayerData.notes && (
            <Card as={motion.section} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-16">
              <CardHeader>
                <h2 className="text-xl font-bold">General Notes</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{shafiiPrayerData.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
} 