import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Settings as SettingsIcon, 
  SunIcon, 
  MoonIcon, 
  Laptop, 
  Sunset,
  MinusIcon,
  PlusIcon,
  MonitorSmartphone
} from "lucide-react";

/**
 * Global Settings Modal for Quran Reader
 * 
 * Controls:
 * - Font size slider (binds to context)
 * - Theme mode (light, dark, system, auto-sunset)
 * - Page transition effect (slide, curl, none)
 * 
 * @param {Object} props
 * @param {string} props.theme - Current theme
 * @param {function} props.setTheme - Theme setter function
 * @param {string} props.transition - Current transition effect
 * @param {function} props.setTransition - Transition setter function
 * @param {number} props.fontSize - Current font size (in percent)
 * @param {function} props.setFontSize - Font size setter function
 */
export default function SettingsModal({ 
  theme = 'system', 
  setTheme, 
  transition = 'slide',
  setTransition,
  fontSize = 100,
  setFontSize
}) {
  const [localSettings, setLocalSettings] = useState({
    theme,
    transition,
    fontSize,
    arabicFont: localStorage.getItem('quran-arabic-font') || 'uthmani' // Default to KFGQPC Uthmani style
  });
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes in the media query
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Initialize local settings when props change
  useEffect(() => {
    setLocalSettings({
      theme,
      transition: prefersReducedMotion ? 'none' : transition,
      fontSize
    });
  }, [theme, transition, fontSize, prefersReducedMotion]);
  
  // Apply settings when dialog is closed with save
  const handleSave = () => {
    if (setTheme) setTheme(localSettings.theme);
    
    // Only set transition if reduced motion is not preferred
    if (setTransition && !prefersReducedMotion) {
      setTransition(localSettings.transition);
    } else if (setTransition && prefersReducedMotion) {
      setTransition('none');
    }
    
    if (setFontSize) setFontSize(localSettings.fontSize);
    
    // Apply Arabic font style
    document.documentElement.style.setProperty('--selected-arabic-font', localSettings.arabicFont);
    localStorage.setItem('quran-arabic-font', localSettings.arabicFont);
    
    // Save settings to localStorage
    localStorage.setItem('quran-settings', JSON.stringify({
      theme: localSettings.theme,
      transition: localSettings.transition,
      fontSize: localSettings.fontSize,
      arabicFont: localSettings.arabicFont
    }));
  };
  
  // Theme mode options
  const themeOptions = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: Laptop },
    { value: 'auto-sunset', label: 'Auto (Sunset)', icon: Sunset }
  ];
  
  // Transition options
  const transitionOptions = [
    { value: 'none', label: 'None' },
    { value: 'slide', label: 'Slide' },
    { value: 'curl', label: 'Page Curl' }
  ];
  
  // Arabic font options with KFGQPC Uthmani fonts
  const arabicFontOptions = [
    { value: 'uthmani', label: 'KFGQPC Uthmani (King Fahd Complex)' },
    { value: 'kfgqpc-hafs-smart', label: 'KFGQPC Hafs Smart (Modern Devices)' },
    { value: 'kfgqpc-hafs', label: 'KFGQPC Hafs Traditional' },
    { value: 'kfgqpc-naskh', label: 'KFGQPC Uthman Naskh' },
    { value: 'naskh', label: 'Naskh (Fallback)' },
    { value: 'amiri', label: 'Amiri Quran (Traditional)' }
  ];
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full hover:bg-background/80 text-foreground"
          aria-label="Open settings"
        >
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Reader Settings</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Font Size Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-base">Font Size</Label>
              <span className="text-sm text-muted-foreground">{localSettings.fontSize}%</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setLocalSettings({
                  ...localSettings,
                  fontSize: Math.max(100, localSettings.fontSize - 5)
                })}
                disabled={localSettings.fontSize <= 100}
                aria-label="Decrease font size"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              
              <Slider
                value={[localSettings.fontSize]}
                min={100}
                max={175}
                step={5}
                onValueChange={(value) => setLocalSettings({
                  ...localSettings,
                  fontSize: value[0]
                })}
                className="flex-1"
                aria-label="Adjust font size"
              />
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setLocalSettings({
                  ...localSettings,
                  fontSize: Math.min(175, localSettings.fontSize + 5)
                })}
                disabled={localSettings.fontSize >= 175}
                aria-label="Increase font size"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Arabic Font Style Control */}
          <div className="space-y-3">
            <Label className="text-base">Arabic Font Style</Label>
            <Select
              value={localSettings.arabicFont}
              onValueChange={(value) => setLocalSettings({
                ...localSettings,
                arabicFont: value
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Arabic font style" />
              </SelectTrigger>
              <SelectContent>
                {arabicFontOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Preview of selected font */}
            <div className="mt-2 p-3 bg-muted/30 rounded-md">
              <p dir="rtl" lang="ar" className={`text-center font-${localSettings.arabicFont} text-lg`}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Preview of {arabicFontOptions.find(o => o.value === localSettings.arabicFont)?.label}
              </p>
            </div>
          </div>
          
          {/* Theme Mode Control */}
          <div className="space-y-3">
            <Label className="text-base">Theme Mode</Label>
            <RadioGroup 
              value={localSettings.theme}
              onValueChange={(value) => setLocalSettings({
                ...localSettings,
                theme: value
              })}
              className="grid grid-cols-2 gap-2"
            >
              {themeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value}
                    id={`theme-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`theme-${option.value}`}
                    className="flex items-center justify-center space-x-2 rounded-md border-2 border-muted bg-popover p-3 
                              hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary
                              [&:has([data-state=checked])]:border-primary cursor-pointer w-full"
                  >
                    <option.icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Transition Effect Control - Disabled if reduced motion is preferred */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base">Page Transition</Label>
              {prefersReducedMotion && (
                <span className="text-xs text-yellow-500 dark:text-yellow-400 flex items-center">
                  <MonitorSmartphone className="h-3 w-3 mr-1" />
                  Reduced motion enabled
                </span>
              )}
            </div>
            
            <Select
              value={localSettings.transition}
              onValueChange={(value) => setLocalSettings({
                ...localSettings,
                transition: value
              })}
              disabled={prefersReducedMotion}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select transition" />
              </SelectTrigger>
              <SelectContent>
                {transitionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {prefersReducedMotion && (
              <p className="text-xs text-muted-foreground">
                Your system prefers reduced motion. Animations are disabled.
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 