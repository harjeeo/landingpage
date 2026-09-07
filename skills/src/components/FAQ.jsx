import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    {
      question: "What is Designership?",
      answer: "Designership is a premier online academy dedicated to helping designers of all levels excel and thrive in UX/UI design. From beginners to career changers and experienced product designers, our practical courses and Figma resources help you work smarter, land better roles, and increase your income."
    },
    {
      question: "How can I learn Figma?",
      answer: "Our Ultimate Figma Masterclass 2.0 course is built for both beginners and experienced designers. You'll learn end-to-end Figma workflows, auto-layout 5.0, variables, design tokens, interactive prototyping, building component libraries, and developer handoff."
    },
    {
      question: "How can I learn UX Research?",
      answer: "Take our Practical UX Research & Strategy Course, which covers the complete end-to-end workflow of planning and executing research strategy. You'll learn how to formulate research questions, conduct user interviews, analyze qualitative data, and map user journeys."
    },
    {
      question: "Where can I find reviews on Designership?",
      answer: "You can view reviews on our Testimonials page or directly on each course card. Hundreds of our alumni have landed roles at Google, Meta, Canva, Amazon, and Atlassian after completing our masterclasses."
    },
    {
      question: "What courses and products does Designership offer?",
      answer: "We offer masterclass courses in Figma 2.0, UX Research & Strategy, and UX/UI Design, along with value bundles. We also produce ShipFaster UI, a comprehensive Figma design system containing 6,000+ components and 150+ pre-built screens."
    },
    {
      question: "How will Designership's courses help improve my UX/UI design skills?",
      answer: "Designership courses teach practical, real-world skills that you can apply immediately in product teams and client projects."
    }
  ];

  return (
    <section id="faq" className="py-8 sm:py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#09090b] tracking-tight leading-[1.15]">
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
                className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#18181b] hover:text-[#7c3aed] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 border border-slate-200 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#7c3aed]' : 'text-[#71717a]'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#52525b] leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
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
