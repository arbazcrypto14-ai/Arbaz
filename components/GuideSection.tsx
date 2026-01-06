
import React from 'react';
import { motion } from 'framer-motion';

const GuideSection: React.FC = () => {
  const MotionDiv = motion.div as any;

  const steps = [
    {
      title: "1. Stage & Commit",
      desc: "Jaise aapne screenshot mein dekha, 'Stage and commit all changes' par click karein. Ye aapke kaam ko save kar deta hai.",
      icon: "💾"
    },
    {
      title: "2. Push / Publish",
      desc: "Commit ke baad 'Push' ya 'Publish' button dabayein. Ab aapka brand 'Arbaz' internet par cloud par chala gaya hai.",
      icon: "☁️"
    },
    {
      title: "3. Vercel pe Import",
      desc: "Vercel.com kholein, 'Add New Project' dabayein aur apni GitHub repository ko select karein. Ye bilkul free hai.",
      icon: "⚡"
    },
    {
      title: "4. Mubarak Ho!",
      desc: "Vercel aapko ek link dega (arbaz.vercel.app). Ab aapka luxury brand puri duniya ke liye live hai!",
      icon: "🎉"
    }
  ];

  return (
    <section id="guide" className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-900 rounded-full blur-[120px] -mr-48 -mt-48 opacity-50"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 border border-zinc-800 rounded-full text-[10px] uppercase tracking-[0.4em] mb-6 text-zinc-400"
          >
            Aapki Manzil Kareeb Hai
          </MotionDiv>
          <h2 className="font-serif text-5xl md:text-6xl mb-6 italic">Bas Ye Akhri Steps...</h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-light leading-relaxed">
            Aapne GitHub par files dekh li hain. Ab bas unhe "Commit" aur "Push" karke Vercel se connect karna hai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 p-8 rounded-2xl hover:bg-zinc-900 transition-all group"
            >
              <div className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {step.desc}
              </p>
            </MotionDiv>
          ))}
        </div>

        <div className="mt-20 bg-white/5 border border-white/10 p-10 rounded-3xl text-center">
          <p className="text-zinc-400 text-sm italic font-serif text-lg">
            "Coding mushkil lag sakti hai, lekin Arbaz Brand ko live karna bas 3 clicks ka kaam hai."
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
