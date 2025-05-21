'use client';

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { Stepper } from "@/components/prayer/stepper";
import { StepCard } from "@/components/prayer/step-card";
import { RakaaDisplay } from "@/components/prayer/rakaa-display";
import { MetaBlock } from "@/components/prayer/meta-block";
import hanbaliPrayerData from '@/content/howtopray.json';
import hanafiPrayerData from '@/content/howtoprayhanifi.json';
import shafiiPrayerData from '@/content/howtoprayshafii.json';

// Components extracted for clarity

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
              <StepCard key={step.id} step={step} showEvidence={false} showReps={false} />
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
              <StepCard key={step.id} step={step} showEvidence={false} showReps={false} />
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