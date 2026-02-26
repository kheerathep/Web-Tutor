import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

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
    id: "igcse",
    label: "IGCSE",
    color: "#E8A020",
    icon: "📘",
    desc: "Unlock your full potential with our IGCSE program led by top-tier educators. Our premium teachers, graduates from international schools, are dedicated to helping you achieve that coveted A*.",
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
    id: "ap",
    label: "AP Courses",
    color: "#C0392B",
    icon: "🎯",
    desc: "Stand out in the competitive world of AP exams with our expert instructors. They're here to ensure you reach your maximum potential.",
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
    id: "alevel",
    label: "A Level",
    color: "#1A5276",
    icon: "🏆",
    desc: "Elevate your academic journey with our A-Level tutoring. Our world-class instructors will guide you toward A-Level brilliance and university readiness.",
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
    id: "ib",
    label: "IB Diploma",
    color: "#1E8449",
    icon: "🌍",
    desc: "Embrace the challenge of IB Diploma education with confidence. Our IB-trained faculty will empower you to excel in every subject group.",
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
    id: "sat",
    label: "IELTS / SAT / ACT",
    color: "#7D3C98",
    icon: "✏️",
    desc: "Prepare to ace your standardized exams with our experienced mentors. We'll boost your scores and confidence for university admissions.",
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
    id: "ucat",
    label: "UCAT",
    color: "#117A65",
    icon: "⚕️",
    desc: "Our UCAT preparation is designed specifically for students aspiring to apply for Medicine in Thailand and the UK. All 5 sections covered.",
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
  {
    name: "N'Jean",
    school: "The Newton Sixth Form",
    program: "A LEVEL",
    year: "2024",
    tier: "A",
    grades: [
      { subject: "Biology", grade: "A" },
      { subject: "Mathematics", grade: "A" },
      { subject: "Chemistry", grade: "A" },
      { subject: "Physics", grade: "A" },
    ],
    avatar: "👩",
    avatarBg: "#c9a98a",
  },
  {
    name: "N'Fame",
    school: "Shrewsbury International School",
    program: "A LEVEL",
    year: "2024",
    tier: "A*",
    grades: [
      { subject: "Biology", grade: "A*" },
      { subject: "Mathematics", grade: "A*" },
      { subject: "Chemistry", grade: "A*" },
    ],
    avatar: "👨",
    avatarBg: "#a0c4d8",
  },
  {
    name: "N'Neva",
    school: "Satit Prasarnmit International Program",
    program: "A LEVEL",
    year: "2024",
    tier: "A",
    grades: [
      { subject: "Biology", grade: "A" },
      { subject: "Chemistry", grade: "A" },
    ],
    avatar: "👦",
    avatarBg: "#b8d4b8",
  },
  {
    name: "N'Prim",
    school: "Bangkok Patana School",
    program: "IGCSE",
    year: "2024",
    tier: "A*",
    grades: [
      { subject: "Mathematics", grade: "A*" },
      { subject: "Physics", grade: "A*" },
      { subject: "Chemistry", grade: "A*" },
      { subject: "Biology", grade: "A*" },
    ],
    avatar: "👧",
    avatarBg: "#d4b8d4",
  },
  {
    name: "N'Atom",
    school: "Wells International School",
    program: "AP",
    year: "2024",
    tier: "5",
    grades: [
      { subject: "Calculus BC", grade: "5" },
      { subject: "Physics C", grade: "5" },
      { subject: "Chemistry", grade: "5" },
    ],
    avatar: "🧑",
    avatarBg: "#d4c8a0",
  },
  {
    name: "N'Mild",
    school: "Concordian International School",
    program: "IB",
    year: "2024",
    tier: "7",
    grades: [
      { subject: "Math AA HL", grade: "7" },
      { subject: "Physics HL", grade: "7" },
      { subject: "Chemistry SL", grade: "7" },
    ],
    avatar: "👩",
    avatarBg: "#c8a0b4",
  },
];

const WHY_US = [
  { icon: "👨‍🏫", title: "Expert Instructors", desc: "Study with internationally acclaimed professors equipped with proven exam-taking techniques to help you achieve A*." },
  { icon: "🗓️", title: "Flexible Schedule", desc: "Create your own study schedule. Choose ideal learning times that suit your lifestyle and commitments." },
  { icon: "🎧", title: "One-on-One Learning", desc: "Learn privately with a dedicated instructor, fully tailored lesson plans, and personalized attention." },
  { icon: "🌐", title: "Learn Anywhere", desc: "Study from anywhere via our convenient online platform, with full flexibility and control over your time." },
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
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        borderTop: `4px solid ${course.color}`,
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
      }}
    >
      <div style={{ padding: "1.75rem 1.75rem 1.25rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{course.icon}</div>
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.25rem",
            fontWeight: 800,
            color: course.color,
            marginBottom: "0.6rem",
          }}
        >
          {course.label}
        </h3>
        <p style={{ color: "#666", fontSize: "0.87rem", lineHeight: 1.72 }}>{course.desc}</p>

        <button
          onClick={toggle}
          style={{
            marginTop: "1.1rem",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.82rem",
            fontWeight: 700,
            padding: "8px 18px",
            borderRadius: "100px",
            border: `2px solid ${course.color}`,
            color: open ? "#fff" : course.color,
            background: open ? course.color : "transparent",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
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
        }}
      >
        <div
          style={{
            background: `${course.color}08`,
            borderTop: `1px solid ${course.color}20`,
            padding: "0.25rem 1.5rem 1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "0.75rem" }}>
            {course.subjects.map((sub, i) => (
              <div
                key={sub.name}
                style={{
                  opacity: visible.includes(i) ? 1 : 0,
                  transform: visible.includes(i) ? "translateY(0)" : "translateY(-8px)",
                  transition: "opacity 0.28s ease, transform 0.28s ease",
                  background: "#fff",
                  borderLeft: `3px solid ${course.color}`,
                  borderRadius: "0 0.5rem 0.5rem 0",
                  padding: "0.55rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "0.83rem" }}>{sub.name}</span>
                <span style={{ color: "#999", fontSize: "0.72rem", textAlign: "right", flexShrink: 0, maxWidth: 180 }}>
                  {sub.detail}
                </span>
              </div>
            ))}
          </div>
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
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#f9f7f4", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes twinkle { 0%,100%{opacity:0.12} 50%{opacity:0.85} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #C0392B; border-radius: 3px; }
        .navbtn { background:none; border:none; cursor:pointer; position:relative; }
        .navbtn::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#E8A020; transition:width 0.3s; }
        .navbtn:hover::after { width:100%; }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.09)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <button onClick={() => scrollTo("Home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#E8A020,#C0392B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>A*</div>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 20, color: scrolled ? "#1a1a1a" : "#fff" }}>
              demo<span style={{ color: "#E8A020" }}>★</span>
            </span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="hidden md:flex">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="navbtn"
                style={{ fontSize: "0.85rem", fontWeight: 500, color: scrolled ? "#333" : "rgba(255,255,255,0.88)", padding: "4px 0" }}>
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("Contact")}
              style={{ padding: "8px 20px", borderRadius: "100px", background: "#C0392B", color: "#fff", fontWeight: 700, fontSize: "0.83rem", border: "none", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "#E8A020")}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "#C0392B")}
            >
              ติดต่อเรา
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: scrolled ? "#333" : "#fff" }}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div style={{ background: "#fff", padding: "10px 24px 18px", animation: "slideDown 0.22s ease", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 0", fontSize: "0.88rem", fontWeight: 500, color: "#333", background: "none", border: "none", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="Home" style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1a0505 0%,#2C0B0B 45%,#1A2657 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {STAR_POS.map((s, i) => (
          <div key={i} style={{ position: "absolute", top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, borderRadius: "50%", background: "#E8A020", animation: `twinkle ${s.dur}s ${s.delay}s infinite`, pointerEvents: "none" }} />
        ))}
        <div style={{ position: "absolute", width: 480, height: 480, border: "1px solid rgba(232,160,32,0.12)", borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 720, height: 720, border: "1px solid rgba(232,160,32,0.06)", borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.5rem", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ animation: "slideDown 0.8s ease" }}>
            <span style={{ display: "inline-block", marginBottom: 18, padding: "4px 18px", borderRadius: "100px", background: "rgba(232,160,32,0.16)", color: "#E8A020", border: "1px solid rgba(232,160,32,0.28)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Premier Tutoring School · Bangkok, Thailand
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6vw,5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "1.4rem", animation: "slideDown 0.8s ease 0.1s both" }}>
            Ignite Your{" "}
            <span style={{ background: "linear-gradient(135deg,#E8A020,#F4D03F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Academic Star
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.95rem,2vw,1.15rem)", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.8, animation: "slideDown 0.8s ease 0.2s both" }}>
            ติวเข้มหลักสูตร IGCSE, AP, A Level, IB และอีกมากมาย<br />มุ่งสู่ A* ทุกวิชา โดยทีมครูมืออาชีพ
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animation: "slideDown 0.8s ease 0.3s both" }}>
            <button
              onClick={() => scrollTo("Courses")}
              style={{ padding: "13px 34px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", background: "linear-gradient(135deg,#E8A020,#C0392B)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 26px rgba(192,57,43,0.42)", transition: "transform 0.2s" }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ดูคอร์สทั้งหมด
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              style={{ padding: "13px 34px", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.32)", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = "transparent")}
            >
              ติดต่อเรา →
            </button>
          </div>
          <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 380, margin: "60px auto 0", animation: "slideDown 0.8s ease 0.5s both" }}>
            {([["500+", "นักเรียน"], ["95%", "A* Rate"], ["10+", "หลักสูตร"]] as [string, string][]).map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 800, color: "#E8A020" }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.76rem", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f9f7f4" />
          </svg>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="Courses" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <FadeIn className="text-center mb-16">
            <span style={{ display: "inline-block", marginBottom: 12, padding: "4px 16px", borderRadius: "100px", background: "rgba(192,57,43,0.08)", color: "#C0392B", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>What We Offer</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: "0.9rem" }}>คอร์สเรียนของเรา</h2>
            <p style={{ color: "#777", maxWidth: 480, margin: "0 auto", lineHeight: 1.72, fontSize: "0.92rem" }}>
              ครอบคลุมทุกหลักสูตรนานาชาติ — กดที่แต่ละคอร์สเพื่อดูรายวิชาทั้งหมด
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.5rem" }}>
            {COURSES.map((course, i) => <CourseCard key={course.id} course={course} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ background: "linear-gradient(135deg,#1a0505,#2C0B0B)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <FadeIn className="text-center mb-14">
            <span style={{ display: "inline-block", marginBottom: 12, padding: "4px 16px", borderRadius: "100px", background: "rgba(232,160,32,0.15)", color: "#E8A020", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Our Advantage</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#fff" }}>ทำไมถึงเลือก demo★?</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
            {WHY_US.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", borderRadius: "1rem", padding: "1.75rem", height: "100%", transition: "transform 0.3s,box-shadow 0.3s" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <div style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#E8A020", marginBottom: "0.6rem" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.86rem", lineHeight: 1.72 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEACHERS ── */}
      <section id="Teachers" style={{ padding: "6rem 1.5rem", background: "#f9f7f4" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <FadeIn className="text-center mb-14">
            <span style={{ display: "inline-block", marginBottom: 12, padding: "4px 16px", borderRadius: "100px", background: "rgba(192,57,43,0.08)", color: "#C0392B", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Our Team</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: "0.9rem" }}>ครูผู้สอนของเรา</h2>
            <p style={{ color: "#777", maxWidth: 480, margin: "0 auto", lineHeight: 1.72, fontSize: "0.92rem" }}>ทีมครูจบจากมหาวิทยาลัยชั้นนำทั่วโลก พร้อมประสบการณ์สอนหลักสูตรนานาชาติโดยตรง</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.5rem" }}>
            {([
              { name: "Dr. Sarah Chen", subject: "AP Calculus & Statistics", grad: "MIT Graduate", emoji: "👩‍🏫", c: ["#E8A020", "#C0392B"] },
              { name: "Mr. James Park", subject: "A Level Physics & Chemistry", grad: "Imperial College London", emoji: "👨‍🔬", c: ["#C0392B", "#7D3C98"] },
              { name: "Ms. Priya Patel", subject: "IGCSE & IB English", grad: "University of Oxford", emoji: "📚", c: ["#1A5276", "#1E8449"] },
            ] as { name: string; subject: string; grad: string; emoji: string; c: [string, string] }[]).map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.12}>
                <div
                  style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", background: "#fff", transition: "transform 0.3s,box-shadow 0.3s" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}
                >
                  <div style={{ height: 150, background: `linear-gradient(135deg,${t.c[0]},${t.c[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>{t.emoji}</div>
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", color: "#1a1a1a", marginBottom: 4 }}>{t.name}</h3>
                    <p style={{ color: "#C0392B", fontSize: "0.8rem", fontWeight: 600, marginBottom: 8 }}>{t.subject}</p>
                    <p style={{ color: "#888", fontSize: "0.76rem" }}>🎓 {t.grad}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENT ── */}
      <section id="Achievement" style={{ background: "#f5f0eb", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <FadeIn className="text-center mb-14">
            <span style={{ display: "inline-block", marginBottom: 12, padding: "4px 16px", borderRadius: "100px", background: "rgba(192,57,43,0.1)", color: "#C0392B", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Hall of Fame</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: "0.9rem" }}>What Our Students are Saying</h2>
            <p style={{ color: "#777", maxWidth: 460, margin: "0 auto", fontSize: "0.92rem" }}>ความสำเร็จของนักเรียน คือความภาคภูมิใจของเรา</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.75rem" }}>
            {STUDENT_ACHIEVEMENTS.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.1}>
                <div
                  style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.13)", transition: "transform 0.3s,box-shadow 0.3s", background: "#fff" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = "translateY(-7px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.18)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.13)"; }}
                >
                  <div style={{ background: "linear-gradient(160deg,#6B1414 0%,#8B1A1A 60%,#3B1A5A 100%)", padding: "1.25rem 1.25rem 0", position: "relative", minHeight: 220 }}>
                    <div style={{ background: "#1A2657", padding: "6px 14px", borderRadius: "4px", display: "inline-block", marginBottom: "0.75rem" }}>
                      <span style={{ color: "#FFD700", fontWeight: 900, fontSize: "0.95rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>🎉 Congratulations</span>
                    </div>
                    <div style={{ marginBottom: "0.5rem" }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", color: "#FFD700", fontSize: "2.2rem", fontWeight: 900, lineHeight: 1 }}>{s.tier}</span>
                      <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Achiever {s.year}</div>
                    </div>
                    <div style={{ color: "#FFD700", fontSize: "0.85rem", marginBottom: "0.6rem", letterSpacing: 2 }}>★ ★ ★</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{s.program}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                      {s.grades.map((g) => (
                        <div key={g.subject} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "6px", padding: "3px 8px", textAlign: "center" }}>
                          <div style={{ color: "#FFD700", fontWeight: 900, fontSize: "0.85rem", lineHeight: 1.1 }}>{g.grade}</div>
                          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 1 }}>{g.subject}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ position: "absolute", right: 0, bottom: 0, top: 0, width: "48%", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
                      <div style={{ width: 110, height: 160, background: `linear-gradient(180deg,${s.avatarBg}88 0%,${s.avatarBg} 100%)`, borderRadius: "60px 60px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", lineHeight: 1, paddingTop: "0.5rem" }}>
                        {s.avatar}
                      </div>
                    </div>
                  </div>
                  <div style={{ background: "#2C0B0B", padding: "0.85rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display',serif", color: "#FFD700", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "0.03em" }}>{s.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{s.school}</div>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#E8A020,#C0392B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 11, flexShrink: 0 }}>A*</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="About" style={{ background: "linear-gradient(135deg,#f9f7f4,#fff)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "4rem", alignItems: "center" }}>
          <FadeIn>
            <span style={{ display: "inline-block", marginBottom: 12, padding: "4px 16px", borderRadius: "100px", background: "rgba(192,57,43,0.08)", color: "#C0392B", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>About Us</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: "1.2rem", lineHeight: 1.2 }}>
              เส้นทางสู่ความเป็นเลิศทางวิชาการ
            </h2>
            <p style={{ color: "#555", lineHeight: 1.85, marginBottom: "1rem", fontSize: "0.93rem" }}>
              demo★ เชี่ยวชาญการนำทางนักเรียนนานาชาติสู่เป้าหมาย ด้วยทีมที่ปรึกษาและครูผู้สอนมากประสบการณ์ ครอบคลุมตั้งแต่การวางแผนการเรียนจนถึงการสมัครมหาวิทยาลัย
            </p>
            <p style={{ color: "#555", lineHeight: 1.85, marginBottom: "2rem", fontSize: "0.93rem" }}>
              ตั้งอยู่ที่ <strong>MBK Tower ชั้น 20</strong> กรุงเทพฯ พร้อมเรียนออนไลน์ได้ทุกที่ทั่วโลก
            </p>
            <button
              onClick={() => scrollTo("Contact")}
              style={{ padding: "12px 28px", borderRadius: "100px", fontWeight: 700, fontSize: "0.88rem", background: "linear-gradient(135deg,#C0392B,#E8A020)", color: "#fff", border: "none", cursor: "pointer" }}
            >
              ติดต่อเรา
            </button>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {([
                { icon: "📍", title: "ที่ตั้ง", desc: "MBK Tower ชั้น 20\nกรุงเทพฯ" },
                { icon: "🕐", title: "เวลาทำการ", desc: "จ–ส: 09:00–20:00\nอา: 09:00–18:00" },
                { icon: "📞", title: "โทรศัพท์", desc: "061-265-0047\n061-265-0507" },
                { icon: "💬", title: "LINE", desc: "@demo\nตอบไว ทุกวัน!" },
              ] as { icon: string; title: string; desc: string }[]).map((info) => (
                <div
                  key={info.title}
                  style={{ background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0", borderRadius: "1rem", padding: "1.25rem", transition: "transform 0.3s,box-shadow 0.3s" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{ fontSize: "1.7rem", marginBottom: "0.45rem" }}>{info.icon}</div>
                  <h4 style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "0.3rem", fontSize: "0.86rem" }}>{info.title}</h4>
                  <p style={{ color: "#666", fontSize: "0.76rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>{info.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" style={{ background: "linear-gradient(135deg,#1a0505,#2C0B0B)", padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,160,32,0.07) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeIn className="text-center mb-14">
            <span style={{ display: "inline-block", marginBottom: 12, padding: "4px 16px", borderRadius: "100px", background: "rgba(232,160,32,0.15)", color: "#E8A020", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Get In Touch</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: "0.75rem" }}>ติดต่อเรา</h2>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.92rem", lineHeight: 1.7 }}>มีคำถามหรืออยากปรึกษาเรื่องคอร์ส? ทีมงานยินดีช่วยเหลือทุกวัน</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {([
              { icon: "📍", label: "ที่อยู่", val: "MBK Tower ชั้น 20\nพระราม 1 กรุงเทพฯ" },
              { icon: "📞", label: "โทร (MBK)", val: "061-265-0047\n061-265-0507" },
              { icon: "📞", label: "โทร (Bang Na)", val: "082-839-9656\n082-849-9563" },
              { icon: "💬", label: "LINE Official", val: "@demo\n(แชทได้เลย)" },
              { icon: "📘", label: "Facebook", val: "demo★ Tutoring" },
              { icon: "🕐", label: "เวลาทำการ", val: "จ–ส: 09:00–20:00\nอา: 09:00–18:00" },
            ] as { icon: string; label: string; val: string }[]).map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.07}>
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "1.25rem", backdropFilter: "blur(8px)", height: "100%" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
                  <div style={{ color: "#E8A020", fontSize: "0.72rem", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</div>
                  <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.8rem", lineHeight: 1.65, whiteSpace: "pre-line" }}>{c.val}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.25rem", padding: "2.25rem", backdropFilter: "blur(10px)", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                ส่งข้อความหาเราผ่าน LINE ได้เลย — ทีมงานตอบภายใน 24 ชั่วโมง
              </p>
              <button
                style={{ padding: "14px 42px", borderRadius: "100px", fontWeight: 700, fontSize: "0.93rem", background: "linear-gradient(135deg,#E8A020,#C0392B)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 26px rgba(192,57,43,0.4)", transition: "transform 0.2s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.transform = "scale(1)")}
              >
                💬 ติดต่อผ่าน LINE @demo
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0d0303", padding: "1.75rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#E8A020,#C0392B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 11 }}>A*</div>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, color: "#fff", fontSize: 16 }}>
              demo<span style={{ color: "#E8A020" }}>★</span>
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.76rem" }}>© 2024 demo★. All Rights Reserved.</p>
          <div style={{ display: "flex", gap: 18 }}>
            {["Facebook", "Instagram", "LINE"].map((s) => (
              <span
                key={s}
                style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.76rem", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => (e.currentTarget.style.color = "#E8A020")}
                onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}