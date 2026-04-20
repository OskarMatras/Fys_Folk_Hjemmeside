import { useState, useEffect, useRef } from "react";

// ─── Fys Folk ───
// Tuborgfondet aesthetic: warm cream (#f5efe6), rich black, Tuborg red accent
// No emojis. No neon. No gradients. Pure editorial warmth.

const C = {
  cream: "#f5efe6",
  creamDark: "#ede5d8",
  creamLight: "#faf7f2",
  black: "#1a1a1a",
  blackSoft: "#2d2d2d",
  white: "#ffffff",
  grey: "#6b6b6b",
  greyLight: "#9a9a9a",
  red: "#e03c31",
  redDark: "#c4342b",
  tagBg: "#e8e2d8",
};

const PROJECTS = [
  {
    id: 1,
    title: "Solcellebil",
    desc: "Ideen er at vise hvor simpel en elbil egentlig er.",
    placeholder: "SOLCELLEBIL",
    rotation: -2.5,
    bg: "#2a3a4a",
  },
  {
    id: 2,
    title: "100kg Drone",
    desc: "Hvor langt er drone-teknologien? Kan den bruges industrielt?",
    placeholder: "100KG DRONE",
    rotation: 1.8,
    bg: "#3a2a3a",
  },
  {
    id: 3,
    title: "3D-printet robotarm",
    desc: "Robot-teknologi og AI er vidunderligt.",
    placeholder: "ROBOTARM",
    rotation: -1.2,
    bg: "#2a3a2a",
  },
  {
    id: 4,
    title: "Raketmotor",
    desc: "En lille raketmotor har da aldrig været en dårlig ide...",
    placeholder: "RAKETMOTOR",
    rotation: 2.2,
    bg: "#3a2a2a",
  },
  {
    id: 5,
    title: "Din ide?",
    desc: "Send en god ide og hjælp os med at føre den ud i livet.",
    placeholder: "DIN IDÉ",
    rotation: -1.6,
    bg: "#4a3a2a",
    isCTA: true,
  },
];

// Example submitted ideas for display
const EXAMPLE_IDEAS = [
  { id: 1, title: "Vindmølle af genbrugsmaterialer", author: "Sofie M.", time: "2 dage siden", bg: "#3a4a3a" },
  { id: 2, title: "Automatisk kompostering med sensorer", author: "Emil K.", time: "4 dage siden", bg: "#4a3a3a" },
  { id: 3, title: "Hjemmelavet CNC-fræser", author: "Nora J.", time: "1 uge siden", bg: "#2a3a4a" },
  { id: 4, title: "Brintcelledrevet RC-bil", author: "Oscar P.", time: "1 uge siden", bg: "#3a3a4a" },
  { id: 5, title: "AI-styret drivhus", author: "Freja L.", time: "2 uger siden", bg: "#4a4a3a" },
  { id: 6, title: "Undervandsdrone til havforskning", author: "Magnus B.", time: "2 uger siden", bg: "#2a4a3a" },
  { id: 7, title: "Solcelle-oplader til cykler", author: "Ida T.", time: "3 uger siden", bg: "#3a2a4a" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function HighlightTitle({ children }) {
  const words = children.split(" ");
  return (
    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 1.15, display: "inline" }}>
      {words.map((word, i) => (
        <span key={i}>
          <span style={{ background: C.black, color: C.cream, padding: "2px 16px 10px", borderRadius: 6, display: "inline", lineHeight: 1.4 }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: scrolled ? "14px 0" : "22px 0",
      background: scrolled ? "rgba(245,239,230,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => go("hero")} style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 26,
          color: scrolled ? C.black : C.cream, cursor: "pointer", letterSpacing: "-1px", transition: "color 0.4s",
        }}>
          FYS FOLK
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["Om os", "about"], ["Projekter", "projects"], ["Idéer", "ideas"], ["Støt os", "support"]].map(([l, id]) => (
            <button key={id} onClick={() => go(id)} style={{
              background: "none", border: "none", fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 500, color: scrolled ? C.black : C.cream,
              cursor: "pointer", padding: 0, transition: "all 0.4s", opacity: 0.75,
            }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.75)}
            >{l}</button>
          ))}
          <button onClick={() => go("ideas")} style={{
            background: C.red, color: C.white, border: "none", borderRadius: 100,
            padding: "10px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            fontWeight: 600, cursor: "pointer", transition: "all 0.25s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.redDark; e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.red; e.currentTarget.style.transform = "scale(1)"; }}
          >Send en idé</button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", background: C.black,
      display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden",
      padding: "0 32px 80px",
    }}>
      {/* <!-- INDSÆT: Hero-billede som baggrund --> */}
      <div style={{
        position: "absolute", inset: 0, background: C.black, opacity: 0.5,
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700,
        color: "rgba(255,255,255,0.1)", letterSpacing: 6, textTransform: "uppercase",
      }}>[ Indsæt hero-billede ]</div>
      <div style={{ maxWidth: 1300, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <Reveal>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900,
            fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 1.0,
            color: C.cream, margin: 0, letterSpacing: "-3px", maxWidth: 900,
          }}>
            Vi bygger<br />fremtidens<br />
            <span style={{ color: C.red }}>teknologi</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(17px, 2vw, 21px)",
            color: "rgba(245,239,230,0.6)", lineHeight: 1.65, maxWidth: 500, margin: "28px 0 0",
          }}>
            Fys Folk er en frivillig forening af unge der bygger ambitiøse
            naturvidenskabelige og tekniske projekter. Fra solcellebiler til
            raketmotorer — vi skaber med vores egne hænder.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Indsatsområder ─── */
function Areas() {
  const areas = ["Solenergi", "Droner", "Robotik", "Elektronik", "Raketvidenskab", "Bæredygtighed"];
  return (
    <section style={{ background: C.cream, padding: "80px 32px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <Reveal><HighlightTitle>Vores indsatsområder</HighlightTitle></Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 48 }}>
            {areas.map((a) => (
              <div key={a} style={{
                background: C.white, borderRadius: 100, padding: "16px 32px",
                fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700,
                color: C.black, boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "default",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) rotate(-1deg)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) rotate(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
              >{a}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Projects: Tilted cards ─── */
function ProjectsSection() {
  return (
    <section id="projects" style={{ background: C.cream, padding: "40px 32px 100px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <Reveal><HighlightTitle>Udvalgte projekter</HighlightTitle></Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 32, alignItems: "start", marginTop: 56,
        }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div
                style={{
                  transform: `rotate(${p.rotation}deg)`,
                  transition: "transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease",
                  cursor: p.isCTA ? "pointer" : "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(0deg) scale(1.03)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${p.rotation}deg) scale(1)`; e.currentTarget.style.boxShadow = "none"; }}
                onClick={() => { if (p.isCTA) document.getElementById("ideas")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <div style={{
                  background: C.white, borderRadius: 16, overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}>
                  {/* <!-- INDSÆT: Projektbillede --> */}
                  <div style={{
                    height: 280, background: p.isCTA ? C.red : p.bg,
                    position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700,
                      color: "rgba(255,255,255,0.2)", letterSpacing: 4, textTransform: "uppercase",
                    }}>[ {p.placeholder} ]</span>
                  </div>
                  <div style={{ padding: "20px 22px 26px" }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800,
                      color: C.black, lineHeight: 1.2, margin: "0 0 8px",
                    }}>{p.title}</h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                      color: C.grey, lineHeight: 1.5, margin: 0,
                    }}>{p.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function AboutSection() {
  return (
    <section id="about" style={{ background: C.creamLight, padding: "100px 32px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <Reveal><HighlightTitle>Hvem er vi</HighlightTitle></Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 48, marginTop: 56, alignItems: "start",
        }}>
          <Reveal delay={0.1}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 22, color: C.blackSoft,
              lineHeight: 1.7, margin: 0, maxWidth: 520,
            }}>
              Fys Folk er en frivillig forening for unge der brænder for
              naturvidenskab, teknologi og engineering. Vi mødes for at bygge
              ambitiøse projekter — ikke fordi vi skal, men fordi vi <strong>vil</strong>.
              Den bedste måde at lære er at få beskidte hænder og bygge noget virkeligt.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { title: "Læring", desc: "Vi lærer ved at bygge. Teori er fedt — men det er federe når det virker." },
                { title: "Innovation", desc: "Vi tør prøve ting der måske fejler. Sådan opstår gennembrud." },
                { title: "Fællesskab", desc: "Alle er velkomne. Det eneste krav er nysgerrighed." },
              ].map((v) => (
                <div key={v.title} style={{
                  display: "flex", gap: 18, alignItems: "flex-start",
                  background: C.white, borderRadius: 18, padding: "24px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)", transition: "transform 0.3s ease",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(8px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: C.red,
                    flexShrink: 0, marginTop: 10,
                  }} />
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 800, color: C.black, marginBottom: 4 }}>{v.title}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.grey, lineHeight: 1.55 }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Fra vild idé til virkelighed ─── */
function IdeasSection() {
  const [form, setForm] = useState({ name: "", email: "", idea: "", description: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: "100%", padding: "16px 20px", borderRadius: 14,
    border: `2px solid ${C.tagBg}`, fontFamily: "'DM Sans', sans-serif",
    fontSize: 16, color: C.black, outline: "none", background: C.creamLight,
    transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <section id="ideas" style={{ background: C.cream, padding: "100px 32px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <Reveal><HighlightTitle>Fra vild idé til virkelighed</HighlightTitle></Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 20, color: C.grey,
            lineHeight: 1.7, margin: "28px 0 0", maxWidth: 560,
          }}>
            Har du en idé til et projekt? Send den til os. Vi samler de bedste
            idéer og bygger dem sammen. Ingen idé er for vild — det er hele pointen.
          </p>
        </Reveal>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: 56, marginTop: 56, alignItems: "start",
        }}>
          {/* Idea submission form */}
          <Reveal delay={0.15}>
            <div style={{
              background: C.white, borderRadius: 24, padding: "44px 40px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
            }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%", background: C.red,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", color: C.white, fontFamily: "'Outfit', sans-serif",
                    fontSize: 28, fontWeight: 800,
                  }}>!</div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 800, color: C.black, margin: "0 0 8px" }}>
                    Idé modtaget!
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.grey }}>
                    Vi kigger på den og vender tilbage.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: C.black, margin: "0 0 28px" }}>
                    Indsend din idé
                  </h3>
                  {[
                    { k: "name", l: "Navn", t: "text", p: "Dit navn" },
                    { k: "email", l: "Email", t: "email", p: "din@email.dk" },
                    { k: "idea", l: "Idéens titel", t: "text", p: "Fx 'Solcelledrevet båd'" },
                  ].map((f) => (
                    <div key={f.k} style={{ marginBottom: 20 }}>
                      <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: C.black, marginBottom: 8 }}>{f.l}</label>
                      <input type={f.t} placeholder={f.p} value={form[f.k]}
                        onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = C.red)}
                        onBlur={(e) => (e.target.style.borderColor = C.tagBg)}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: C.black, marginBottom: 8 }}>Beskriv idéen</label>
                    <textarea placeholder="Hvad er idéen, og hvorfor er den fed?" rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => (e.target.style.borderColor = C.red)}
                      onBlur={(e) => (e.target.style.borderColor = C.tagBg)}
                    />
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: C.black, marginBottom: 8 }}>
                      Vedhæft en skitse eller tegning (valgfrit)
                    </label>
                    <div style={{
                      border: `2px dashed ${C.tagBg}`, borderRadius: 14, padding: "32px 20px",
                      textAlign: "center", cursor: "pointer", transition: "border-color 0.2s",
                      background: C.creamLight,
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.red)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.tagBg)}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.greyLight }}>
                        Klik for at uploade en fil
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSent(true)} style={{
                    width: "100%", background: C.red, color: C.white,
                    border: "none", borderRadius: 14, padding: "18px 32px",
                    fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 17,
                    cursor: "pointer", transition: "all 0.25s ease",
                  }}
                    onMouseEnter={(e) => { e.target.style.background = C.redDark; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(224,60,49,0.25)"; }}
                    onMouseLeave={(e) => { e.target.style.background = C.red; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
                  >
                    Send idé
                  </button>
                </>
              )}
            </div>
          </Reveal>

          {/* Recent ideas */}
          <Reveal delay={0.2}>
            <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: C.black, margin: "0 0 28px" }}>
                Seneste indsendte idéer
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {EXAMPLE_IDEAS.map((idea, i) => (
                  <div key={idea.id} style={{
                    display: "flex", gap: 16, alignItems: "center",
                    background: C.white, borderRadius: 16, padding: "16px 20px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "transform 0.3s ease",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(6px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                  >
                    {/* <!-- INDSÆT: Skitse/tegning af idéen --> */}
                    <div style={{
                      width: 56, height: 56, borderRadius: 12, background: idea.bg,
                      flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: 1, textTransform: "uppercase" }}>Skitse</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: C.black, lineHeight: 1.25, marginBottom: 4 }}>
                        {idea.title}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.greyLight }}>
                        {idea.author} · {idea.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Support ─── */
function SupportSection() {
  return (
    <section id="support" style={{ background: C.black, padding: "100px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900,
            fontSize: "clamp(36px, 5vw, 62px)", color: C.cream,
            lineHeight: 1.05, letterSpacing: "-2px", margin: "0 0 24px", maxWidth: 700,
          }}>
            Støt næste generation af{" "}
            <span style={{ background: C.red, color: C.white, padding: "0 14px 6px", borderRadius: 8 }}>byggere</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 19,
            color: "rgba(245,239,230,0.6)", lineHeight: 1.7,
            margin: "0 0 56px", maxWidth: 580,
          }}>
            Fys Folk er non-profit og drevet af frivillige. Vi søger fondsstøtte
            og samarbejdspartnere der tror på at unge kan skabe noget ekstraordinært.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20, marginBottom: 56,
          }}>
            {[
              { title: "Fonde og puljer", desc: "Vi søger aktivt fonde som Tuborgfondet, VILLUM og Nordea-fonden." },
              { title: "Virksomheder", desc: "Sponsorér materialer, udstyr eller giv adgang til jeres værksted." },
              { title: "Privatpersoner", desc: "Enhver donation hjælper os med at købe komponenter og materialer." },
            ].map((item) => (
              <div key={item.title} style={{
                background: "rgba(245,239,230,0.05)",
                border: "1px solid rgba(245,239,230,0.1)",
                borderRadius: 20, padding: "36px 30px", transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(224,60,49,0.06)"; e.currentTarget.style.borderColor = "rgba(224,60,49,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(245,239,230,0.05)"; e.currentTarget.style.borderColor = "rgba(245,239,230,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 800, color: C.cream, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(245,239,230,0.5)", lineHeight: 1.55 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
        {/* <!-- INDSÆT: Partner/fondslogoer --> */}
        <Reveal delay={0.2}>
          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center",
            padding: "28px 0", borderTop: "1px solid rgba(245,239,230,0.08)",
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(245,239,230,0.3)", textTransform: "uppercase", letterSpacing: 2, marginRight: 8 }}>Partnere:</span>
            {["Partner 1", "Partner 2", "Partner 3"].map((p) => (
              <div key={p} style={{ width: 110, height: 44, background: "rgba(245,239,230,0.05)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,239,230,0.2)" }}>[{p}]</div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: C.black, padding: "56px 32px 36px", borderTop: `3px solid ${C.red}` }}>
      <div style={{
        maxWidth: 1300, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 40, marginBottom: 40,
      }}>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 24, color: C.cream, marginBottom: 12, letterSpacing: "-1px" }}>FYS FOLK</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(245,239,230,0.45)", lineHeight: 1.6, margin: 0 }}>
            Frivillig forening for unge<br />der bygger fremtidens teknologi.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 800, color: C.cream, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 2 }}>Kontakt</h4>
          {/* <!-- INDSÆT: Email og CVR --> */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(245,239,230,0.45)", lineHeight: 2, margin: 0 }}>
            kontakt@fysfolk.dk<br />CVR: XX XX XX XX
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 800, color: C.cream, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 2 }}>Følg os</h4>
          {/* <!-- INDSÆT: Social media links --> */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Instagram", "YouTube", "GitHub"].map((s) => (
              <a key={s} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(245,239,230,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = C.red)}
                onMouseLeave={(e) => (e.target.style.color = "rgba(245,239,230,0.45)")}
              >{s}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 800, color: C.cream, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 2 }}>Støttet af</h4>
          {/* <!-- INDSÆT: Fondslogoer --> */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Fond 1", "Fond 2"].map((f) => (
              <div key={f} style={{ width: 88, height: 36, background: "rgba(245,239,230,0.05)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,239,230,0.18)" }}>[{f}]</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(245,239,230,0.06)", paddingTop: 20, textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(245,239,230,0.25)" }}>
        © 2026 Fys Folk. Alle rettigheder forbeholdes.
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function FysFolk() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.cream}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${C.red}; color: ${C.white}; }
        input::placeholder, textarea::placeholder { color: #b0a898; }
      `}</style>
      <Navbar />
      <Hero />
      <Areas />
      <ProjectsSection />
      <AboutSection />
      <IdeasSection />
      <SupportSection />
      <Footer />
    </>
  );
}
