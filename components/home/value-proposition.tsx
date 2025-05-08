import { Heart, Calendar } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Find Peace",
    description: "Let Allah bring you peace through prayer, reflection, and Quran recitation.",
    icon: Heart,
  },
  {
    title: "Transform Your Prayer Life",
    description: "Access thousands of guided prayers, Quran studies, and Islamic teachings.",
    image: "/images/prayer-mat.png",
  },
  {
    title: "Build a Habit",
    description: "Create a consistent prayer routine that works with your schedule.",
    icon: Calendar,
  },
];

export function ValueProposition() {
  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Experience the Benefits of Regular Prayer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform helps you create a meaningful connection with Allah through daily prayer and reflection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-background p-6 rounded-lg border text-center"
            >
              <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                {feature.icon ? (
                  <feature.icon className="h-6 w-6 text-primary" />
                ) : feature.image ? (
                  <div className="relative w-8 h-8">
                    <Image 
                      src={feature.image} 
                      alt={feature.title} 
                      fill 
                      sizes="32px"
                      className="object-contain" 
                    />
                  </div>
                ) : null}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="mt-16 bg-background rounded-lg border p-6 md:p-8 max-w-3xl mx-auto">
          <blockquote className="text-lg italic text-muted-foreground mb-4">
            "This app has transformed my relationship with prayer. I feel more connected to my faith than ever before."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20" />
            <div>
              <p className="font-medium">Abdullah M.</p>
              <p className="text-sm text-muted-foreground">App user since 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 