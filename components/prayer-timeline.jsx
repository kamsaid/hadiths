"use client";

import { useState, useEffect } from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * PrayerTimeline component displays daily prayer times in a visual timeline
 * Features current prayer highlighting, time remaining calculation, and location-awareness
 */
const PrayerTimeline = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("New York, US"); // Default location
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Mock prayer times - in a real app, these would be calculated based on location
  const prayers = [
    { 
      name: "Fajr", 
      time: getPrayerTime(5, 15), // 5:15 AM
      arabicName: "الفجر",
      active: isActivePrayer(5, 15, 6, 30)
    },
    { 
      name: "Sunrise", 
      time: getPrayerTime(6, 30), // 6:30 AM
      arabicName: "الشروق",
      active: false // Sunrise is not a prayer time
    },
    { 
      name: "Dhuhr", 
      time: getPrayerTime(12, 45), // 12:45 PM
      arabicName: "الظهر",
      active: isActivePrayer(12, 45, 15, 30)
    },
    { 
      name: "Asr", 
      time: getPrayerTime(15, 30), // 3:30 PM
      arabicName: "العصر",
      active: isActivePrayer(15, 30, 18, 15)
    },
    { 
      name: "Maghrib", 
      time: getPrayerTime(18, 15), // 6:15 PM
      arabicName: "المغرب",
      active: isActivePrayer(18, 15, 19, 45)
    },
    { 
      name: "Isha", 
      time: getPrayerTime(19, 45), // 7:45 PM
      arabicName: "العشاء",
      active: isActivePrayer(19, 45, 5, 15)
    }
  ];
  
  // Helper function to get prayer time Date object
  function getPrayerTime(hours, minutes) {
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date;
  }
  
  // Helper function to check if current time is between start and end prayer times
  function isActivePrayer(startHour, startMinute, endHour, endMinute) {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Handle overnight case (e.g., Isha to Fajr)
    if (endHour < startHour) {
      return (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) || 
             (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute));
    }
    
    // Regular case
    return (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) && 
           (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute));
  }
  
  // Find next prayer
  const getNextPrayer = () => {
    const now = currentTime;
    
    for (let i = 0; i < prayers.length; i++) {
      if (prayers[i].name === "Sunrise") continue; // Skip Sunrise as it's not a prayer
      
      const prayerTime = prayers[i].time;
      if (prayerTime > now) {
        return prayers[i];
      }
    }
    
    // If all prayers today have passed, the next prayer is Fajr tomorrow
    return prayers[0];
  };
  
  const nextPrayer = getNextPrayer();
  
  // Calculate time remaining until next prayer
  const getTimeRemaining = () => {
    const now = currentTime;
    let targetTime = nextPrayer.time;
    
    // If next prayer is tomorrow
    if (targetTime < now) {
      targetTime = new Date(targetTime);
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const diff = targetTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <MapPin className="w-5 h-5 text-duson-yellow mr-2" />
          <span className="text-sm text-muted-foreground">{location}</span>
        </div>
        
        <Card className="bg-duson-yellow/10 border-duson-yellow/20 px-4 py-3">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-duson-yellow mr-2" />
            <div>
              <p className="text-sm font-medium">Next Prayer: <span className="text-duson-yellow">{nextPrayer.name}</span></p>
              <p className="text-xs text-muted-foreground">Time remaining: {getTimeRemaining()}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Prayer times */}
        <div className="space-y-8">
          {prayers.map((prayer, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline dot */}
              <div className={`absolute left-4 w-4 h-4 rounded-full mt-1.5 -ml-2 z-10 ${
                prayer.active 
                  ? "bg-duson-yellow ring-4 ring-duson-yellow/20" 
                  : "bg-gray-300 dark:bg-gray-600"
              }`}></div>
              
              {/* Prayer card */}
              <div className={`ml-10 flex-1 ${
                prayer.active ? "bg-duson-yellow/10 border-duson-yellow/20" : ""
              } rounded-lg p-4 transition-all duration-300 hover:shadow-md`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium">{prayer.name}</h3>
                      {prayer.active && (
                        <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium bg-duson-yellow text-white rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{prayer.arabicName}</p>
                  </div>
                  
                  <time className="text-lg font-semibold">
                    {prayer.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="group">
          View Full Prayer Schedule
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default PrayerTimeline; 