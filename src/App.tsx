import React, { useState, useEffect, useRef, type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Subject {
  name: string;
  detail: string;
}

interface Course {
  id: string;
  label: string;
  color: string;
  icon: string;
  desc: string;
  subjects: Subject[];
}

interface StudentAchievement {
  name: string;
  school: string;
  program: string;
  year: string;
  tier: string;
  grades: { subject: string; grade: string }[];
  avatar: string;
  avatarBg: string;
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURSES: Course[] = [
  {
    id: "igcse", label: "IGCSE", color: "#E8A020", icon: "📘",
    desc: "Unlock your full potential with our IGCSE program led by top-tier educators dedicated to helping you achieve that coveted A*.",
    subjects: [
      { name: "Mathematics", detail: "Core & Extended — algebra, geometry, statistics" },
      { name: "Physics", detail: "Mechanics, electricity, waves & modern physics" },
      { name: "Chemistry", detail: "Organic, inorganic & physical chemistry" },
      { name: "Biology", detail: "Cell biology, genetics, ecology & more" },
      { name: "English Language", detail: "Reading, writing & language skills" },
      { name: "English Literature", detail: "Poetry, prose & drama analysis" },
      { name: "Economics", detail: "Micro & macroeconomics fundamentals" },
      { name: "Business Studies", detail: "Entrepreneurship, finance & marketing" },
      { name: "Computer Science", detail: "Programming, algorithms & systems" },
      { name: "History", detail: "World history from 1900 onwards" },
    ],
  },
  {
    id: "ap", label: "AP Courses", color: "#C0392B", icon: "🎯",
    desc: "Stand out in the competitive world of AP exams with our expert instructors ensuring you reach your maximum potential.",
    subjects: [
      { name: "AP Calculus AB", detail: "Limits, derivatives & integrals" },
      { name: "AP Calculus BC", detail: "Advanced calculus + series & sequences" },
      { name: "AP Statistics", detail: "Data analysis, probability & inference" },
      { name: "AP Physics 1", detail: "Algebra-based mechanics & waves" },
      { name: "AP Physics 2", detail: "Electricity, magnetism & thermodynamics" },
      { name: "AP Physics C: Mechanics", detail: "Calculus-based Newtonian mechanics" },
      { name: "AP Chemistry", detail: "Atomic structure, bonding & reactions" },
      { name: "AP Biology", detail: "Cells, genetics, evolution & ecology" },
      { name: "AP Computer Science A", detail: "Java programming & data structures" },
      { name: "AP Computer Science Principles", detail: "Algorithms, internet & big data" },
      { name: "AP English Language", detail: "Rhetoric, argumentation & analysis" },
      { name: "AP English Literature", detail: "Literary analysis & critical thinking" },
      { name: "AP World History", detail: "Global civilizations & modern era" },
      { name: "AP US History", detail: "American history from colonization to present" },
      { name: "AP Macroeconomics", detail: "GDP, inflation, monetary & fiscal policy" },
      { name: "AP Microeconomics", detail: "Supply, demand, market structures" },
      { name: "AP Psychology", detail: "Behavior, cognition & neuroscience" },
      { name: "AP Human Geography", detail: "Population, culture & political geography" },
      { name: "AP Environmental Science", detail: "Ecosystems, pollution & sustainability" },
      { name: "AP Art History", detail: "Global art movements across centuries" },
      { name: "AP Music Theory", detail: "Harmony, melody, rhythm & notation" },
      { name: "AP European History", detail: "Renaissance to modern European history" },
    ],
  },
  {
    id: "alevel", label: "A Level", color: "#1A5276", icon: "🏆",
    desc: "Elevate your academic journey with our A-Level tutoring. Our world-class instructors will guide you toward A-Level brilliance.",
    subjects: [
      { name: "Mathematics", detail: "Pure math, mechanics & statistics" },
      { name: "Further Mathematics", detail: "Complex numbers, matrices & proof" },
      { name: "Physics", detail: "Classical & modern physics" },
      { name: "Chemistry", detail: "Organic, inorganic & physical chemistry" },
      { name: "Biology", detail: "Biochemistry, genetics & physiology" },
      { name: "Economics", detail: "Micro, macro & global economics" },
      { name: "Business", detail: "Strategy, finance & management" },
      { name: "English Literature", detail: "Critical analysis of texts & contexts" },
      { name: "Computer Science", detail: "Algorithms, programming & theory" },
      { name: "Psychology", detail: "Research methods & psychological studies" },
    ],
  },
  {
    id: "ib", label: "IB Diploma", color: "#1E8449", icon: "🌍",
    desc: "Embrace the challenge of IB Diploma education with confidence. Our IB-trained faculty will empower you to excel.",
    subjects: [
      { name: "IB Mathematics AA (HL/SL)", detail: "Analysis & approaches" },
      { name: "IB Mathematics AI (HL/SL)", detail: "Applications & interpretations" },
      { name: "IB Physics (HL/SL)", detail: "Mechanics to quantum physics" },
      { name: "IB Chemistry (HL/SL)", detail: "Bonding, kinetics & thermodynamics" },
      { name: "IB Biology (HL/SL)", detail: "Genetics, ecology & cell biology" },
      { name: "IB Economics (HL/SL)", detail: "Micro, macro & international economics" },
      { name: "IB English A (HL/SL)", detail: "Literature & language & literature" },
      { name: "IB Computer Science (HL/SL)", detail: "Programming, systems & theory" },
      { name: "IB History (HL/SL)", detail: "20th century world history" },
      { name: "IB Psychology (HL/SL)", detail: "Research & perspectives in psychology" },
      { name: "Theory of Knowledge (TOK)", detail: "Core IB knowledge framework" },
      { name: "Extended Essay (EE)", detail: "4,000-word independent research" },
    ],
  },
  {
    id: "sat", label: "IELTS / SAT / ACT", color: "#7D3C98", icon: "✏️",
    desc: "Prepare to ace your standardized exams with our experienced mentors. We'll boost your scores for university admissions.",
    subjects: [
      { name: "SAT Math", detail: "Algebra, problem solving & advanced math" },
      { name: "SAT Reading & Writing", detail: "Evidence-based comprehension & editing" },
      { name: "ACT English", detail: "Grammar, punctuation & rhetorical skills" },
      { name: "ACT Math", detail: "Pre-algebra through trigonometry" },
      { name: "ACT Reading", detail: "Prose fiction, social & natural sciences" },
      { name: "ACT Science", detail: "Data interpretation & scientific reasoning" },
      { name: "IELTS Academic", detail: "Listening, reading, writing & speaking" },
      { name: "IELTS General", detail: "Everyday English for migration & work" },
    ],
  },
  {
    id: "ucat", label: "UCAT", color: "#117A65", icon: "⚕️",
    desc: "Our UCAT preparation is designed specifically for students aspiring to apply for Medicine in Thailand and the UK.",
    subjects: [
      { name: "Verbal Reasoning", detail: "Critical reading & text comprehension" },
      { name: "Decision Making", detail: "Logic puzzles & probabilistic reasoning" },
      { name: "Quantitative Reasoning", detail: "Numerical problem solving" },
      { name: "Abstract Reasoning", detail: "Pattern recognition & spatial thinking" },
      { name: "Situational Judgement", detail: "Medical ethics & professional scenarios" },
    ],
  },
];

const STUDENT_ACHIEVEMENTS: StudentAchievement[] = [
  { name: "N'Jean", school: "The Newton Sixth Form", program: "A LEVEL", year: "2024", tier: "A", grades: [{ subject: "Biology", grade: "A" }, { subject: "Mathematics", grade: "A" }, { subject: "Chemistry", grade: "A" }, { subject: "Physics", grade: "A" }], avatar: "👩", avatarBg: "#c9a98a" },
  { name: "N'Fame", school: "Shrewsbury International School", program: "A LEVEL", year: "2024", tier: "A*", grades: [{ subject: "Biology", grade: "A*" }, { subject: "Mathematics", grade: "A*" }, { subject: "Chemistry", grade: "A*" }], avatar: "👨", avatarBg: "#a0c4d8" },
  { name: "N'Neva", school: "Satit Prasarnmit International", program: "A LEVEL", year: "2024", tier: "A", grades: [{ subject: "Biology", grade: "A" }, { subject: "Chemistry", grade: "A" }], avatar: "👦", avatarBg: "#b8d4b8" },
  { name: "N'Prim", school: "Bangkok Patana School", program: "IGCSE", year: "2024", tier: "A*", grades: [{ subject: "Mathematics", grade: "A*" }, { subject: "Physics", grade: "A*" }, { subject: "Chemistry", grade: "A*" }, { subject: "Biology", grade: "A*" }], avatar: "👧", avatarBg: "#d4b8d4" },
  { name: "N'Atom", school: "Wells International School", program: "AP", year: "2024", tier: "5", grades: [{ subject: "Calculus BC", grade: "5" }, { subject: "Physics C", grade: "5" }, { subject: "Chemistry", grade: "5" }], avatar: "🧑", avatarBg: "#d4c8a0" },
  { name: "N'Mild", school: "Concordian International School", program: "IB", year: "2024", tier: "7", grades: [{ subject: "Math AA HL", grade: "7" }, { subject: "Physics HL", grade: "7" }, { subject: "Chemistry SL", grade: "7" }], avatar: "👩", avatarBg: "#c8a0b4" },
];

const WHY_US = [
  { icon: "👨‍🏫", title: "Expert Instructors", desc: "Study with internationally acclaimed professors equipped with proven techniques to help you achieve A*." },
  { icon: "🗓️", title: "Flexible Schedule", desc: "Create your own study schedule. Choose ideal learning times that suit your lifestyle." },
  { icon: "🎧", title: "One-on-One Learning", desc: "Learn privately with a dedicated instructor and fully tailored lesson plans." },
  { icon: "🌐", title: "Learn Anywhere", desc: "Study from anywhere via our convenient online platform with full flexibility." },
];

const STAR_POS = Array.from({ length: 28 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 3,
  dur: Math.random() * 3 + 2,
}));

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] { 
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Components ───────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function CourseCard({ course, index }: CourseCardProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<number[]>([]);
  const [ref, inView] = useInView(0.05);

  const toggle = () => {
    if (!open) {
      setOpen(true);
      setVisible([]);
      course.subjects.forEach((_, i) => {
        setTimeout(() => setVisible((v) => [...v, i]), i * 50);
      });
    } else {
      setOpen(false);
      setVisible([]);
    }
  };

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        borderTop: `4px solid ${course.color}`,
      }}
    >
      <div className="p-6">
        <div className="text-3xl mb-3">{course.icon}</div>
        <h3 className="text-xl font-extrabold mb-2" style={{ fontFamily: "'Playfair Display',serif", color: course.color }}>
          {course.label}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{course.desc}</p>

        <button
          onClick={toggle}
          className="mt-4 flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full transition-all duration-300"
          style={{
            border: `2px solid ${course.color}`,
            color: open ? "#fff" : course.color,
            background: open ? course.color : "transparent",
          }}
        >
          <span
            className="inline-block transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
          {open ? "ซ่อนรายวิชา" : `ดูรายวิชาทั้งหมด (${course.subjects.length})`}
        </button>
      </div>

      <div
        style={{
          maxHeight: open ? `${course.subjects.length * 68}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1)",
          background: `${course.color}08`,
          borderTop: `1px solid ${course.color}22`,
        }}
      >
        <div className="px-6 pb-5 pt-3 flex flex-col gap-2">
          {course.subjects.map((sub, i) => (
            <div
              key={sub.name}
              className="bg-white rounded-r-lg px-4 py-2 flex justify-between items-center gap-4 shadow-sm"
              style={{
                opacity: visible.includes(i) ? 1 : 0,
                transform: visible.includes(i) ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.28s ease, transform 0.28s ease",
                borderLeft: `3px solid ${course.color}`,
              }}
            >
              <span className="font-semibold text-gray-800 text-sm">{sub.name}</span>
              <span className="text-gray-400 text-xs text-right shrink-0 max-w-[180px]">{sub.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const navItems: [string, string][] = [
    ["หน้าหลัก", "Home"],
    ["คอร์สเรียน", "Courses"],
    ["ครูผู้สอน", "Teachers"],
    ["ผลงาน", "Achievement"],
    ["เกี่ยวกับเรา", "About"],
    ["ติดต่อเรา", "Contact"],
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#f9f7f4]" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes twinkle { 0%,100%{opacity:0.12} 50%{opacity:0.85} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        html, body, #root { width: 100%; margin: 0; padding: 0; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #C0392B; border-radius: 3px; }
        .navbtn { background:none; border:none; cursor:pointer; position:relative; padding: 4px 0; }
        .navbtn::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#E8A020; transition:width 0.3s; }
        .navbtn:hover::after { width:100%; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("Home")} className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ background: "linear-gradient(135deg,#E8A020,#C0392B)" }}>A*</div>
            <span className="font-black text-xl" style={{ fontFamily: "'Playfair Display',serif", color: scrolled ? "#1a1a1a" : "#fff" }}>
              demo<span style={{ color: "#E8A020" }}>★</span>
            </span>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="navbtn text-sm font-medium"
                style={{ color: scrolled ? "#333" : "rgba(255,255,255,0.88)" }}>
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("Contact")}
              className="px-5 py-2 rounded-full text-white font-bold text-sm border-none cursor-pointer transition-colors duration-200 hover:bg-[#E8A020]"
              style={{ background: "#C0392B" }}>
              ติดต่อเรา
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden bg-transparent border-none cursor-pointer text-2xl"
            style={{ color: scrolled ? "#333" : "#fff" }}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div className="bg-white shadow-lg px-6 pb-5 pt-2" style={{ animation: "slideDown 0.22s ease" }}>
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="block w-full text-left py-3 text-sm font-medium text-gray-700 bg-transparent border-none border-b border-gray-100 cursor-pointer">
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="Home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1a0505 0%,#2C0B0B 45%,#1A2657 100%)" }}>
        {STAR_POS.map((s, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, background: "#E8A020", animation: `twinkle ${s.dur}s ${s.delay}s infinite` }} />
        ))}
        <div className="absolute rounded-full pointer-events-none" style={{ width: 480, height: 480, border: "1px solid rgba(232,160,32,0.12)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 720, height: 720, border: "1px solid rgba(232,160,32,0.06)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" style={{ animation: "slideDown 0.8s ease" }}>
          <span className="inline-block mb-5 px-5 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase"
            style={{ background: "rgba(232,160,32,0.16)", color: "#E8A020", border: "1px solid rgba(232,160,32,0.28)" }}>
            Premier Tutoring School · Bangkok, Thailand
          </span>

          <h1 className="font-black text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6vw,5rem)", animation: "slideDown 0.8s ease 0.1s both" }}>
            Ignite Your{" "}
            <span style={{ background: "linear-gradient(135deg,#E8A020,#F4D03F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Academic Star
            </span>
          </h1>

          <p className="text-white/70 max-w-xl mx-auto mb-10 leading-loose" style={{ fontSize: "clamp(0.95rem,2vw,1.15rem)", animation: "slideDown 0.8s ease 0.2s both" }}>
            ติวเข้มหลักสูตร IGCSE, AP, A Level, IB และอีกมากมาย<br />มุ่งสู่ A* ทุกวิชา โดยทีมครูมืออาชีพ
          </p>

          <div className="flex gap-4 justify-center flex-wrap" style={{ animation: "slideDown 0.8s ease 0.3s both" }}>
            <button onClick={() => scrollTo("Courses")}
              className="px-9 py-3.5 rounded-full font-bold text-sm text-white border-none cursor-pointer transition-transform duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#E8A020,#C0392B)", boxShadow: "0 8px 26px rgba(192,57,43,0.42)" }}>
              ดูคอร์สทั้งหมด
            </button>
            <button onClick={() => scrollTo("Contact")}
              className="px-9 py-3.5 rounded-full font-bold text-sm text-white cursor-pointer transition-colors duration-200 hover:bg-white/10"
              style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.32)" }}>
              ติดต่อเรา →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5 max-w-xs mx-auto mt-16" style={{ animation: "slideDown 0.8s ease 0.5s both" }}>
            {([ ["500+", "นักเรียน"], ["95%", "A* Rate"], ["10+", "หลักสูตร"] ] as [string,string][]).map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black" style={{ fontFamily: "'Playfair Display',serif", color: "#E8A020" }}>{n}</div>
                <div className="text-xs mt-1 text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full block">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f9f7f4" />
          </svg>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="Courses" className="w-full py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}>What We Offer</span>
            <h2 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>คอร์สเรียนของเรา</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">ครอบคลุมทุกหลักสูตรนานาชาติ — กดที่แต่ละคอร์สเพื่อดูรายวิชาทั้งหมด</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, i) => <CourseCard key={course.id} course={course} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="w-full py-24 px-6" style={{ background: "linear-gradient(135deg,#1a0505,#2C0B0B)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase" style={{ background: "rgba(232,160,32,0.15)", color: "#E8A020" }}>Our Advantage</span>
            <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Playfair Display',serif" }}>ทำไมถึงเลือก demo★?</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display',serif", color: "#E8A020" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEACHERS ── */}
      <section id="Teachers" className="w-full py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}>Our Team</span>
            <h2 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>ครูผู้สอนของเรา</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">ทีมครูจบจากมหาวิทยาลัยชั้นนำทั่วโลก พร้อมประสบการณ์สอนหลักสูตรนานาชาติโดยตรง</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { name: "Dr. Sarah Chen", subject: "AP Calculus & Statistics", grad: "MIT Graduate", emoji: "👩‍🏫", c: ["#E8A020","#C0392B"] as [string,string] },
              { name: "Mr. James Park", subject: "A Level Physics & Chemistry", grad: "Imperial College London", emoji: "👨‍🔬", c: ["#C0392B","#7D3C98"] as [string,string] },
              { name: "Ms. Priya Patel", subject: "IGCSE & IB English", grad: "University of Oxford", emoji: "📚", c: ["#1A5276","#1E8449"] as [string,string] },
            ]).map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.12}>
                <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                  <div className="h-36 flex items-center justify-center text-6xl" style={{ background: `linear-gradient(135deg,${t.c[0]},${t.c[1]})` }}>{t.emoji}</div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>{t.name}</h3>
                    <p className="text-sm font-semibold mb-2" style={{ color: "#C0392B" }}>{t.subject}</p>
                    <p className="text-xs text-gray-400">🎓 {t.grad}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENT ── */}
      <section id="Achievement" className="w-full py-24 px-6 bg-[#f5f0eb]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase" style={{ background: "rgba(192,57,43,0.1)", color: "#C0392B" }}>Hall of Fame</span>
            <h2 className="text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>What Our Students are Saying</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">ความสำเร็จของนักเรียน คือความภาคภูมิใจของเรา</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDENT_ACHIEVEMENTS.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  <div className="relative min-h-[220px] p-5 pb-0" style={{ background: "linear-gradient(160deg,#6B1414 0%,#8B1A1A 60%,#3B1A5A 100%)" }}>
                    <div className="inline-block px-3 py-1 rounded mb-3" style={{ background: "#1A2657" }}>
                      <span className="font-black text-sm tracking-wide uppercase" style={{ color: "#FFD700" }}>🎉 Congratulations</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-black leading-none" style={{ fontFamily: "'Playfair Display',serif", color: "#FFD700", fontSize: "2.2rem" }}>{s.tier}</span>
                      <div className="text-[0.68rem] font-bold tracking-widest uppercase text-white/80">Achiever {s.year}</div>
                    </div>
                    <div className="text-sm mb-2 tracking-widest" style={{ color: "#FFD700" }}>★ ★ ★</div>
                    <div className="text-[0.65rem] font-bold tracking-widest uppercase text-white/60 mb-2">{s.program}</div>
                    <div className="flex flex-wrap gap-1.5 mb-4 pr-28">
                      {s.grades.map((g) => (
                        <div key={g.subject} className="rounded px-2 py-1 text-center" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                          <div className="font-black text-sm leading-tight" style={{ color: "#FFD700" }}>{g.grade}</div>
                          <div className="text-[0.5rem] uppercase tracking-wide text-white/60 mt-0.5">{g.subject}</div>
                        </div>
                      ))}
                    </div>
                    {/* Avatar */}
                    <div className="absolute right-0 bottom-0 top-0 w-5/12 flex items-end justify-center overflow-hidden">
                      <div className="flex items-center justify-center text-7xl leading-none pt-2"
                        style={{ width: 110, height: 160, background: `linear-gradient(180deg,${s.avatarBg}88 0%,${s.avatarBg} 100%)`, borderRadius: "60px 60px 0 0" }}>
                        {s.avatar}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5" style={{ background: "#2C0B0B" }}>
                    <div>
                      <div className="font-black text-base tracking-wide" style={{ fontFamily: "'Playfair Display',serif", color: "#FFD700" }}>{s.name}</div>
                      <div className="text-[0.6rem] uppercase tracking-wider mt-0.5 text-white/50">{s.school}</div>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-[11px] shrink-0"
                      style={{ background: "linear-gradient(135deg,#E8A020,#C0392B)" }}>A*</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="About" className="w-full py-24 px-6" style={{ background: "linear-gradient(135deg,#f9f7f4,#fff)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}>About Us</span>
            <h2 className="font-black text-gray-900 mb-5 leading-tight" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
              เส้นทางสู่ความเป็นเลิศทางวิชาการ
            </h2>
            <p className="text-gray-500 leading-loose text-sm mb-4">
              demo★ เชี่ยวชาญการนำทางนักเรียนนานาชาติสู่เป้าหมาย ด้วยทีมที่ปรึกษาและครูผู้สอนมากประสบการณ์ ครอบคลุมตั้งแต่การวางแผนการเรียนจนถึงการสมัครมหาวิทยาลัย
            </p>
            <p className="text-gray-500 leading-loose text-sm mb-8">
              ตั้งอยู่ที่ <strong className="text-gray-800">MBK Tower ชั้น 20</strong> กรุงเทพฯ พร้อมเรียนออนไลน์ได้ทุกที่ทั่วโลก
            </p>
            <button onClick={() => scrollTo("Contact")}
              className="px-7 py-3 rounded-full font-bold text-sm text-white border-none cursor-pointer"
              style={{ background: "linear-gradient(135deg,#C0392B,#E8A020)" }}>
              ติดต่อเรา
            </button>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {([
                { icon: "📍", title: "ที่ตั้ง", desc: "MBK Tower ชั้น 20\nกรุงเทพฯ" },
                { icon: "🕐", title: "เวลาทำการ", desc: "จ–ส: 09:00–20:00\nอา: 09:00–18:00" },
                { icon: "📞", title: "โทรศัพท์", desc: "061-265-0047\n061-265-0507" },
                { icon: "💬", title: "LINE", desc: "@demo\nตอบไว ทุกวัน!" },
              ] as { icon: string; title: string; desc: string }[]).map((info) => (
                <div key={info.title}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="text-2xl mb-2">{info.icon}</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{info.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">{info.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" className="w-full py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a0505,#2C0B0B)" }}>
        <div className="absolute rounded-full pointer-events-none" style={{ width: 560, height: 560, background: "radial-gradient(circle,rgba(232,160,32,0.07) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-[0.7rem] font-bold tracking-widest uppercase" style={{ background: "rgba(232,160,32,0.15)", color: "#E8A020" }}>Get In Touch</span>
            <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>ติดต่อเรา</h2>
            <p className="text-sm text-white/60 leading-relaxed">มีคำถามหรืออยากปรึกษาเรื่องคอร์ส? ทีมงานยินดีช่วยเหลือทุกวัน</p>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {([
              { icon: "📍", label: "ที่อยู่", val: "MBK Tower ชั้น 20\nพระราม 1 กรุงเทพฯ" },
              { icon: "📞", label: "โทร (MBK)", val: "061-265-0047\n061-265-0507" },
              { icon: "📞", label: "โทร (Bang Na)", val: "082-839-9656\n082-849-9563" },
              { icon: "💬", label: "LINE Official", val: "@demo\n(แชทได้เลย)" },
              { icon: "📘", label: "Facebook", val: "demo★ Tutoring" },
              { icon: "🕐", label: "เวลาทำการ", val: "จ–ส: 09:00–20:00\nอา: 09:00–18:00" },
            ] as { icon: string; label: string; val: string }[]).map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.07}>
                <div className="rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="text-[0.68rem] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#E8A020" }}>{c.label}</div>
                  <div className="text-xs text-white/70 leading-relaxed whitespace-pre-line">{c.val}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="rounded-2xl p-9 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
              <p className="text-white/65 text-sm mb-6">ส่งข้อความหาเราผ่าน LINE ได้เลย — ทีมงานตอบภายใน 24 ชั่วโมง</p>
              <button
                className="px-11 py-3.5 rounded-full font-bold text-base text-white border-none cursor-pointer transition-transform duration-200 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#E8A020,#C0392B)", boxShadow: "0 8px 26px rgba(192,57,43,0.4)" }}>
                💬 ติดต่อผ่าน LINE @demo
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full px-6 py-7" style={{ background: "#0d0303", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-[11px]" style={{ background: "linear-gradient(135deg,#E8A020,#C0392B)" }}>A*</div>
            <span className="font-black text-white text-base" style={{ fontFamily: "'Playfair Display',serif" }}>
              demo<span style={{ color: "#E8A020" }}>★</span>
            </span>
          </div>
          <p className="text-white/30 text-xs">© 2024 demo★. All Rights Reserved.</p>
          <div className="flex gap-5">
            {["Facebook", "Instagram", "LINE"].map((s) => (
              <span key={s} className="text-white/40 text-xs cursor-pointer transition-colors duration-200 hover:text-[#E8A020]">{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}