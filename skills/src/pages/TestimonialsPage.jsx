import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Mortarboard01Icon, UserIcon } from 'hugeicons-react';

// Sample Video Testimonials Data
const VIDEO_TESTIMONIALS = [
  {
    id: 'vid-1',
    name: 'Sarah Jenkins',
    role: 'Senior Product Designer at Shopify',
    country: '🇺🇸 USA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    title: 'From Junior Freelancer to Senior UI Designer in 6 Months',
    duration: '2:45',
    course: 'Ultimate Figma Masterclass 2.0',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: "The auto-layout and component variable architecture taught in this masterclass completely changed how fast I ship production designs."
  },
  {
    id: 'vid-2',
    name: 'Alex Rivera',
    role: 'Lead UX Strategist at Atlassian',
    country: '🇲🇽 Mexico',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    title: 'Scaling Design Systems for Enterprise Applications',
    duration: '3:12',
    course: 'Shipfaster UI: Figma UI Kit & Design System',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: "We reduced our squad's UI bug backlog by 70% after implementing the token structures learned from Designership."
  },
  {
    id: 'vid-3',
    name: 'Chloe Zhang',
    role: 'Product Designer at Canva',
    country: '🇦🇺 Australia',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    title: 'Mastering UX Research & User Testing Frameworks',
    duration: '4:05',
    course: 'Practical UX Research & Strategy',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    quote: "The user testing templates gave me the exact confidence needed to lead end-to-end research sprints independently."
  }
];

// Initial Testimonials Dataset (Exact matches from the real site)
const INITIAL_TESTIMONIALS = [
  {
    id: '1',
    name: 'Harpreet Singh',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '⚡ Practical Projects',
    content: 'Figma was quite confusing for me initially, but the course made everything much easier to understand. The practical projects were definitely the most useful part.',
    rating: 5,
    date: 'August 14, 2024',
    helpfulCount: 42
  },
  {
    id: '2',
    name: 'Aman Sharma',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🛍️ Simple Store Setup',
    content: 'Setting up a Shopify store seemed complicated at first, but the step-by-step approach made the whole process much easier to understand.',
    rating: 5,
    date: 'August 12, 2024',
    helpfulCount: 38
  },
  {
    id: '3',
    name: 'Simran Kaur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '🎨 Design Principles',
    content: "I knew the basics of designing but didn't really understand design principles. The lessons on typography, colours and layouts gave me much more clarity.",
    rating: 5,
    date: 'August 10, 2024',
    helpfulCount: 29
  },
  {
    id: '4',
    name: 'Riya Kapoor',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '✨ Project-Based',
    content: 'I really liked the practical approach. Instead of just explaining theory, every concept was demonstrated through actual Figma projects. It made learning much easier for me.',
    rating: 5,
    date: 'August 8, 2024',
    helpfulCount: 51
  },
  {
    id: '5',
    name: 'Neha Verma',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🚀 First Online Store',
    content: 'I had never built an online store before. The lessons helped me understand Shopify from the basics and gave me the confidence to create my first store. The practical demonstrations were especially helpful.',
    rating: 5,
    date: 'August 6, 2024',
    helpfulCount: 47
  },
  {
    id: '6',
    name: 'Gurpreet Singh',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '💼 Creative Workflow',
    content: 'I used Photoshop before, but creating professional-looking designs consistently was difficult. The course helped me improve my overall design workflow and understand how to approach a creative project properly.',
    rating: 5,
    date: 'August 4, 2024',
    helpfulCount: 33
  },
  {
    id: '7',
    name: 'Arjun Mehta',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '📐 Wireframing & Prototyping',
    content: 'The wireframing and prototyping modules were really helpful. I now feel much more confident turning an idea into a proper interface and presenting it professionally.',
    rating: 5,
    date: 'August 2, 2024',
    helpfulCount: 36
  },
  {
    id: '8',
    name: 'Pooja Sharma',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '⚡ Demo Store Build',
    content: 'Shopify felt confusing when I first started. Following the course and actually building a demo store made the learning experience much more practical.',
    rating: 5,
    date: 'July 30, 2024',
    helpfulCount: 25
  },
  {
    id: '9',
    name: 'Jasleen Kaur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '📱 Social Media Creatives',
    content: 'The pace of the course was good and the assignments helped me retain what I learned. I especially enjoyed working on social media creatives because they felt close to real client work.',
    rating: 5,
    date: 'July 28, 2024',
    helpfulCount: 44
  },
  {
    id: '10',
    name: 'Ananya Gupta',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '💡 User-First Mindset',
    content: 'I joined mainly to improve my Figma skills, but I ended up learning a lot more about UX and designing with the user in mind. The project work was a great addition.',
    rating: 5,
    date: 'July 26, 2024',
    helpfulCount: 39
  },
  {
    id: '11',
    name: 'Rohit Bansal',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '📦 Store Structure',
    content: "Good course if you're starting with Shopify. The store structure, products, collections and basic customization were explained clearly. I liked that the lessons focused on actually building things instead of only explaining features.",
    rating: 5,
    date: 'July 24, 2024',
    helpfulCount: 53
  },
  {
    id: '12',
    name: 'Manpreet Singh',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '🎯 Purpose-Driven',
    content: "I learned that good design isn't just about making something look nice. Understanding the purpose behind a design has completely changed how I approach projects.",
    rating: 5,
    date: 'July 22, 2024',
    helpfulCount: 31
  },
  {
    id: '13',
    name: 'Karan Malhotra',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '🔥 Auto Layout & Responsive',
    content: 'Components, Auto Layout and responsive design were areas I struggled with before. The course made the overall Figma workflow much clearer, and I now use these features more confidently in my projects.',
    rating: 5,
    date: 'July 20, 2024',
    helpfulCount: 48
  },
  {
    id: '14',
    name: 'Sakshi Arora',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '💎 Product Pages & Navigation',
    content: 'The course covered the things I actually needed while building a store. Product pages, navigation and basic settings were explained really well.',
    rating: 5,
    date: 'July 18, 2024',
    helpfulCount: 27
  },
  {
    id: '15',
    name: 'Navjot Kaur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '🚀 Social Posts & Banners',
    content: 'I learned how to create social media posts, banners and promotional creatives properly. The practical feedback was also very helpful.',
    rating: 5,
    date: 'July 16, 2024',
    helpfulCount: 35
  },
  {
    id: '16',
    name: 'Harleen Kaur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '🔍 User Flows & Research',
    content: 'UX research and user flows felt quite theoretical at first, but the practical examples made everything much easier to understand.',
    rating: 5,
    date: 'July 14, 2024',
    helpfulCount: 40
  },
  {
    id: '17',
    name: 'Aditya Jain',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🌐 Ecommerce Fundamentals',
    content: 'I wanted to understand ecommerce without getting into complicated technical stuff. This course gave me a solid starting point with Shopify and helped me understand how the different parts of a store work together.',
    rating: 5,
    date: 'July 12, 2024',
    helpfulCount: 43
  },
  {
    id: '18',
    name: 'Vivek Sharma',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '📂 Professional Portfolio',
    content: 'After completing the course, I feel much more confident presenting my designs professionally. The portfolio projects were a great addition and gave me something practical to work on.',
    rating: 5,
    date: 'July 10, 2024',
    helpfulCount: 37
  },
  {
    id: '19',
    name: 'Harman Singh',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '🎯 Step-by-Step Structure',
    content: 'I had watched quite a few Figma tutorials before, but having everything structured into one course helped the concepts finally come together. The step-by-step approach worked really well for me.',
    rating: 5,
    date: 'July 8, 2024',
    helpfulCount: 49
  },
  {
    id: '20',
    name: 'Tanya Mehra',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🏬 Built Live Store',
    content: 'I was able to create my first proper Shopify store while following the course. The practical demonstrations made a big difference.',
    rating: 5,
    date: 'July 6, 2024',
    helpfulCount: 30
  },
  {
    id: '21',
    name: 'Muskan Saini',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '✨ Color & Typography',
    content: 'Choosing the right colours and typography was something I always struggled with. I now have much more confidence when making those design decisions, especially for social media creatives.',
    rating: 5,
    date: 'July 4, 2024',
    helpfulCount: 45
  },
  {
    id: '22',
    name: 'Amandeep Kaur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '🛠️ Hands-on Projects',
    content: 'The projects made the learning experience much more engaging. Creating something after every module really helped me understand the concepts instead of just watching tutorials.',
    rating: 5,
    date: 'July 2, 2024',
    helpfulCount: 32
  },
  {
    id: '23',
    name: 'Sahil Verma',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '📦 Product Organization',
    content: 'From adding products to organizing the store, the complete process became much clearer after completing the lessons. A good practical introduction to Shopify for someone starting from scratch.',
    rating: 5,
    date: 'June 29, 2024',
    helpfulCount: 28
  },
  {
    id: '24',
    name: 'Yash Thakur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '🌱 Beginner to Confident',
    content: 'I liked how the course starts with the basics and gradually moves into real creative projects. It felt easy to follow even as a beginner, and I never felt overwhelmed.',
    rating: 5,
    date: 'June 27, 2024',
    helpfulCount: 41
  },
  {
    id: '25',
    name: 'Ritika Sharma',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '⚡ Advanced UI Workflow',
    content: 'I already knew the basics of Figma, but I wanted to improve my overall UI workflow. The advanced concepts and practical exercises helped a lot.',
    rating: 5,
    date: 'June 25, 2024',
    helpfulCount: 36
  },
  {
    id: '26',
    name: 'Mohit Arora',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '📈 Professional Presentation',
    content: 'I learned several useful ways to make a Shopify store look more professional, especially when it comes to homepage structure and product presentation. These small details made a noticeable difference in my store.',
    rating: 5,
    date: 'June 23, 2024',
    helpfulCount: 39
  },
  {
    id: '27',
    name: 'Priya Chawla',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '🎯 Relevant Branding',
    content: 'The language was simple and the examples were relevant. I found the social media design and branding sections particularly useful.',
    rating: 5,
    date: 'June 21, 2024',
    helpfulCount: 34
  },
  {
    id: '28',
    name: 'Shivani Gupta',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'UI/UX Design Course',
    outcome: '🎨 Better UI Decisions',
    content: 'The course helped me understand why certain UI decisions work better than others. The combination of UX concepts, Figma practice and real projects was really useful for me.',
    rating: 5,
    date: 'June 19, 2024',
    helpfulCount: 46
  },
  {
    id: '29',
    name: 'Ishita Khanna',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🎯 Complete Workflow',
    content: 'I started with very little ecommerce knowledge and by the end I had a much better understanding of the complete Shopify workflow. The step-by-step format made it easy to follow.',
    rating: 5,
    date: 'June 17, 2024',
    helpfulCount: 33
  },
  {
    id: '30',
    name: 'Dilpreet Kaur',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '📈 Clear Direction',
    content: "I was interested in graphic design but didn't really know where to start. The course gave me a clear direction and plenty of opportunities to practice. It was nice to see my designs improve throughout the course.",
    rating: 5,
    date: 'June 15, 2024',
    helpfulCount: 42
  },
  {
    id: '31',
    name: 'Gagandeep Singh',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🛠️ Clear Explanations',
    content: 'The practical approach made Shopify much easier to learn. I particularly liked how the store setup was explained step by step instead of rushing through it.',
    rating: 5,
    date: 'June 12, 2024',
    helpfulCount: 37
  },
  {
    id: '32',
    name: 'Parminder Singh',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Graphic Design Course',
    outcome: '🔥 Client-Level Designs',
    content: 'The assignments and practical exercises encouraged me to keep practicing. I now feel more confident creating designs similar to real client projects.',
    rating: 5,
    date: 'June 10, 2024',
    helpfulCount: 31
  },
  {
    id: '33',
    name: 'Rahul Kumar',
    flag: '🇮🇳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    course: 'Shopify Course',
    outcome: '🚀 Solid Foundation',
    content: 'I wanted to learn how to build a Shopify store from scratch, and the course covered the important steps in a simple and easy-to-follow way. It gave me a good foundation to start working on my own store.',
    rating: 5,
    date: 'June 08, 2024',
    helpfulCount: 44
  }
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  
  // Interactive States
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [votedIds, setVotedIds] = useState(new Set());
  const [activeVideo, setActiveVideo] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New Review Form State
  const [newReview, setNewReview] = useState({
    name: '',
    country: '🇺🇸',
    course: 'Figma Masterclass 2.0',
    outcome: '🚀 Career Accelerator',
    rating: 5,
    content: ''
  });

  // Filtered & Sorted Testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials
      .filter((t) => {
        // Category Filter
        if (selectedCategory !== 'All' && !t.course.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
        // Rating Filter
        if (selectedRating === '5' && t.rating !== 5) return false;
        if (selectedRating === '4' && t.rating < 4) return false;
        
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = t.name.toLowerCase().includes(q);
          const matchContent = t.content.toLowerCase().includes(q);
          const matchCourse = t.course.toLowerCase().includes(q);
          const matchOutcome = (t.outcome || '').toLowerCase().includes(q);
          return matchName || matchContent || matchCourse || matchOutcome;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') {
          return b.helpfulCount - a.helpfulCount;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // Default 'recent'
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [testimonials, selectedCategory, selectedRating, searchQuery, sortBy]);

  // Handle Helpful Vote
  const toggleHelpful = (id) => {
    setTestimonials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const hasVoted = votedIds.has(id);
          return {
            ...t,
            helpfulCount: hasVoted ? t.helpfulCount - 1 : t.helpfulCount + 1
          };
        }
        return t;
      })
    );

    setVotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Submit Review Handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content) return;

    const createdItem = {
      id: Date.now().toString(),
      name: newReview.name,
      flag: newReview.country,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`,
      verified: true,
      course: newReview.course,
      outcome: newReview.outcome,
      content: newReview.content,
      rating: Number(newReview.rating),
      date: 'Just now',
      helpfulCount: 1
    };

    setTestimonials([createdItem, ...testimonials]);
    setShowReviewModal(false);
    setNewReview({
      name: '',
      country: '🇺🇸',
      course: 'Figma Masterclass 2.0',
      outcome: '🚀 Career Accelerator',
      rating: 5,
      content: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans">
      
      {/* Dark Hero Section matching real website header */}
      <div className="bg-[#0c0e15] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0bc40e]/15 border border-[#0bc40e]/30 text-[#0bc40e] text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span>Testimonials</span>
          </div>

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-tight mb-4">
              Hear from our students
            </h1>
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto">
              From career changes to dream jobs, here's how our practical courses helped their professional journey.
            </p>
          </div>

        </div>
      </div>

      {/* Main White Content Area matching real site */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Minimal Clean Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'All', label: 'All Testimonials' },
              { id: 'UI/UX Design Course', label: 'UI/UX Design Course' },
              { id: 'Graphic Design Course', label: 'Graphic Design Course' },
              { id: 'Shopify Course', label: 'Shopify Course' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#6400e6] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Write Review Button */}
          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#6400e6] hover:bg-[#530dd3] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-md transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>✍️</span> Write Review
          </button>

        </div>

        {/* Counter Header */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
          <span>Showing <strong className="text-slate-900 font-semibold">{filteredTestimonials.length}</strong> student reviews</span>
          {(selectedCategory !== 'All' || searchQuery || selectedRating !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedRating('All');
              }}
              className="text-xs text-[#6400e6] hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Testimonials Masonry / Grid (Exact Light Theme matching real website) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mb-16 space-y-6">
          {filteredTestimonials.map((t) => {
            const hasVoted = votedIds.has(t.id);
            return (
              <div
                key={t.id}
                className="break-inside-avoid inline-block w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Avatar, Name, Verified Badge, Course Tag */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        <UserIcon className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-xs">{t.flag}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                        {t.verified && (
                          <svg className="w-4 h-4 text-[#4f46e5] fill-current" viewBox="0 0 20 20" title="Verified Student">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-[#7c3aed] font-medium">{t.course}</div>
                    </div>
                  </div>

                  {/* Outcome Badge */}
                  {t.outcome && (
                    <div className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md mb-3">
                      {t.outcome}
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    "{t.content}"
                  </p>
                </div>

                {/* Stars & Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400 text-sm">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleHelpful(t.id)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition-colors ${
                      hasVoted
                        ? 'bg-purple-100 text-[#6400e6] font-semibold'
                        : 'text-slate-400 hover:text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>👍</span>
                    <span>{t.helpfulCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsletter / CTA Section (White matching real site footer top) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm max-w-4xl mx-auto mb-16">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <Mortarboard01Icon className="w-6 h-6 text-[#6400e6]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Ready to build skills that matter?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6">
            Join learners who are building practical skills in UI Design, Graphic Design & Shopify through structured, hands-on courses designed for real-world work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/courses"
              className="w-full sm:w-auto bg-[#6400e6] hover:bg-[#530dd3] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Explore Courses →
            </Link>
            <a
              href="mailto:info@designsclue.com"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-6 py-3 rounded-xl transition-colors inline-flex items-center justify-center"
            >
              Talk to Us
            </a>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={activeVideo.avatar} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeVideo.name}</h4>
                  <p className="text-xs text-slate-500">{activeVideo.role}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="aspect-video w-full">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>✍️</span> Submit Your Review
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Country Flag</label>
                  <select
                    value={newReview.country}
                    onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                  >
                    <option value="🇺🇸">🇺🇸 United States</option>
                    <option value="🇬🇧">🇬🇧 United Kingdom</option>
                    <option value="🇨🇦">🇨🇦 Canada</option>
                    <option value="🇩🇪">🇩🇪 Germany</option>
                    <option value="🇦🇺">🇦🇺 Australia</option>
                    <option value="🇮🇳">🇮🇳 India</option>
                    <option value="🇲🇽">🇲🇽 Mexico</option>
                    <option value="🇯🇵">🇯🇵 Japan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Course / Product Taken</label>
                <select
                  value={newReview.course}
                  onChange={(e) => setNewReview({ ...newReview, course: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                >
                  <option value="UI/UX Design Course">UI/UX Design Course</option>
                  <option value="Graphic Design Course">Graphic Design Course</option>
                  <option value="Shopify Course">Shopify Course</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Outcome Tag</label>
                <input
                  type="text"
                  placeholder="e.g. 🚀 Landed Senior Role at Tech Firm"
                  value={newReview.outcome}
                  onChange={(e) => setNewReview({ ...newReview, outcome: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Your Review *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your experience and how the course helped your design career..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#6400e6]"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6400e6] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#530dd3]"
                >
                  Post Review Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
