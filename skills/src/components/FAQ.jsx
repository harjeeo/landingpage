import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    {
      question: "What courses do you offer?",
      answer: "We offer practical courses in Graphic Design, UI Design, Digital Marketing, Google Ads and Meta Ads."
    },
    {
      question: "Are the courses suitable for beginners?",
      answer: "Yes. Our courses are designed step-by-step, making them suitable for beginners as well as those looking to upgrade their skills."
    },
    {
      question: "Are the courses online or offline?",
      answer: "Our courses are available online, so you can learn from anywhere at your own pace."
    },
    {
      question: "Will I work on real-world projects?",
      answer: "Yes. You'll work on practical projects and exercises to understand how these skills are used in real-world situations."
    },
    {
      question: "Do I get support while learning?",
      answer: "Yes. You'll receive guidance and support to help you understand concepts, complete projects and improve your skills."
    },
    {
      question: "Can these courses help me start freelancing?",
      answer: "Yes. You'll develop practical skills and build projects that can help you create a portfolio and explore freelancing opportunities."
    }
  ];

  return (
    <section id="faq" className="py-8 sm:py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#09090b] tracking-tight leading-[1.15]">
            Frequently asked questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className={`w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg transition-colors cursor-pointer ${
                    isOpen ? 'text-[#0bc40e]' : 'text-[#18181b] hover:text-[#0bc40e]'
                  }`}
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 border border-slate-200 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0bc40e]' : 'text-[#71717a]'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-[#52525b] leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
