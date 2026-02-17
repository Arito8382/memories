import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  GraduationCap, Users, Images, CalendarDays,
  Award, BookOpen, School, ChevronDown, ArrowRight,
} from 'lucide-react'

/* ── Confetti ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x:        Math.random() * 100,
  delay:    Math.random() * 6,
  size:     Math.random() * 7 + 4,
  duration: Math.random() * 4 + 5,
  isCircle: i % 2 === 0,
  color:    ['#C9A84C','#E2C47A','#1A2744','#E8D5C4'][i % 4],
}))

function Particle({ x, delay, size, duration, isCircle, color }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: '108vh', opacity: [1, 1, 0], rotate: 600 }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 3, ease: 'linear' }}
      style={{
        position: 'absolute', left: `${x}%`, top: 0,
        width: size, height: size,
        borderRadius: isCircle ? '50%' : '2px',
        background: color, pointerEvents: 'none',
      }}
    />
  )
}

/* ── Counter ── */
function AnimatedCounter({ target, started }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    let raf
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / 1800, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started, target])
  return <span>{count}</span>
}

/* ── Stat Card ── */
function StatCard({ Icon, target, suffix, label, delay, started }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      style={{
        flex: 1, minWidth: 130, background: 'white',
        borderRadius: 16, padding: '26px 20px', textAlign: 'center',
        boxShadow: '0 4px 22px rgba(26,39,68,0.07)',
        border: '1px solid rgba(201,168,76,0.12)',
        transition: 'box-shadow 0.3s', cursor: 'default',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(201,168,76,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 14px',
      }}>
        <Icon size={20} color="var(--color-gold)" strokeWidth={1.8} />
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 5vw, 44px)',
        fontWeight: 700, color: 'var(--color-navy)',
        lineHeight: 1, marginBottom: 6,
      }}>
        <AnimatedCounter target={target} started={started} />{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 12,
        color: 'var(--color-ink-light)', letterSpacing: '0.07em',
        textTransform: 'uppercase', fontWeight: 500,
      }}>{label}</div>
    </motion.div>
  )
}

/* ── Animation variants ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
}
const wordAnim = {
  hidden: { y: 46, opacity: 0, filter: 'blur(6px)' },
  show:   { y: 0,  opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
}

/* ── HomePage ── */
export default function HomePage() {
  const heroRef     = useRef(null)
  const statsRef    = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '26%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <>
      {/* ══ HERO ══ */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-cream)', position: 'relative',
        overflow: 'hidden', paddingTop: 80,
      }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-10%', right: '-5%',
            width: '52vw', height: '52vw', maxWidth: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.11) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '-8%',
            width: '40vw', height: '40vw', maxWidth: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,39,68,0.065) 0%, transparent 70%)',
          }} />
        </div>

        {/* Confetti */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {PARTICLES.map(p => <Particle key={p.id} {...p} />)}
        </div>

        {/* Content */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="hero-content">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: 'backOut' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,168,76,0.10)',
              border: '1px solid rgba(201,168,76,0.36)',
              borderRadius: 99, padding: '6px 18px', marginBottom: 28,
            }}
          >
            <GraduationCap size={15} color="var(--color-gold)" strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 15,
              color: 'var(--color-gold)', letterSpacing: '0.05em' }}>Class of 2024</span>
          </motion.div>

          {/* Heading row 1 */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            style={{ display: 'flex', gap: 13, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 4 }}>
            {['Selamat', 'Datang', 'di'].map((w, i) => (
              <motion.span key={i} variants={wordAnim} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 8vw, 84px)',
                fontWeight: 300, color: 'var(--color-ink)',
                lineHeight: 1.1, letterSpacing: '-0.015em',
              }}>{w}</motion.span>
            ))}
          </motion.div>

          {/* Heading row 2 — gold */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            style={{ display: 'flex', gap: 13, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 26 }}>
            {['Ruang', 'Kenangan'].map((w, i) => (
              <motion.span key={i} variants={wordAnim} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 8vw, 84px)',
                fontWeight: 700, fontStyle: 'italic',
                lineHeight: 1.1, letterSpacing: '-0.015em',
                background: 'linear-gradient(135deg, #C9A84C 0%, #E2C47A 55%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{w}</motion.span>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-accent)', fontSize: 'clamp(17px, 3vw, 23px)',
              color: 'var(--color-ink-light)', textAlign: 'center',
              marginBottom: 44, letterSpacing: '0.02em', maxWidth: 540,
            }}>
            Sebuah babak yang tak terlupakan — terima kasih telah menjadi bagian dari cerita ini
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.5 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
            <Link to="/gallery" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 10px 32px rgba(201,168,76,0.46)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
                  color: 'var(--color-navy)', border: 'none', borderRadius: 99,
                  padding: '13px 28px', fontFamily: 'var(--font-body)',
                  fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(201,168,76,0.32)',
                }}>
                <Images size={16} strokeWidth={2} /> Lihat Galeri
              </motion.button>
            </Link>
            <Link to="/classmates" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, background: 'rgba(26,39,68,0.06)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: 'var(--color-navy)',
                  border: '1.5px solid rgba(26,39,68,0.22)', borderRadius: 99,
                  padding: '13px 28px', fontFamily: 'var(--font-body)',
                  fontSize: 15, fontWeight: 500, cursor: 'pointer',
                  transition: 'background 0.22s ease',
                }}>
                <Users size={16} strokeWidth={1.8} /> Kenalan Teman
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.6 }}
            style={{
              display: 'flex', flexWrap: 'wrap',
              background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(201,168,76,0.16)', borderRadius: 18,
              overflow: 'hidden', boxShadow: '0 4px 26px rgba(26,39,68,0.08)',
            }}>
            {[
              { value: '247', label: 'Siswa',    Icon: Users    },
              { value: '3',   label: 'Tahun',    Icon: BookOpen },
              { value: '12',  label: 'Kelas',    Icon: School   },
              { value: '38',  label: 'Prestasi', Icon: Award    },
            ].map(({ value, label, Icon }, i, arr) => (
              <div key={label} style={{
                flex: 1, minWidth: 80, padding: '18px 20px', textAlign: 'center',
                borderRight: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.13)' : 'none',
              }}>
                <Icon size={16} color="var(--color-gold)" strokeWidth={1.6}
                  style={{ display: 'block', margin: '0 auto 6px' }} />
                <div style={{ fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700,
                  color: 'var(--color-navy)', lineHeight: 1, marginBottom: 3 }}>{value}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11,
                  color: 'var(--color-ink-light)', letterSpacing: '0.07em',
                  textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)' }}>
          <motion.div animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 12,
              color: 'var(--color-gold)', letterSpacing: '0.1em' }}>scroll</span>
            <ChevronDown size={20} color="var(--color-gold)" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ CLASS HIGHLIGHT ══ */}
      <section style={{
        padding: 'clamp(64px,10vw,104px) clamp(20px,5vw,60px)',
        background: 'var(--color-cream)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: '-1%', top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)', fontSize: 'clamp(110px,18vw,210px)',
          fontWeight: 700, color: 'rgba(26,39,68,0.033)',
          userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
        }}>2024</div>

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(26,39,68,0.06)', borderRadius: 99,
              padding: '5px 15px', marginBottom: 16,
            }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'var(--color-navy)', letterSpacing: '0.11em',
              textTransform: 'uppercase', fontWeight: 600 }}>Angkatan Kami</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px,6vw,58px)', fontWeight: 700,
              color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: 16, maxWidth: 520 }}>
            Sebuah Perjalanan<br />
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>yang Luar Biasa</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.18, duration: 0.6 }}
            style={{ fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px,2vw,16px)', color: 'var(--color-ink-light)',
              lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            Tiga tahun penuh tawa, perjuangan, dan kenangan bersama.
            Hari ini kita berdiri di garis finish — dengan segudang cerita
            yang akan selalu kita bawa ke mana pun kita pergi.
          </motion.p>

          <div ref={statsRef} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <StatCard Icon={Users}    target={247} suffix=""     label="Siswa Lulus"  delay={0.00} started={statsInView} />
            <StatCard Icon={BookOpen} target={3}   suffix=" thn" label="Masa Belajar" delay={0.10} started={statsInView} />
            <StatCard Icon={School}   target={12}  suffix=""     label="Kelas"        delay={0.20} started={statsInView} />
            <StatCard Icon={Award}    target={38}  suffix=""     label="Prestasi"     delay={0.30} started={statsInView} />
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              background: 'var(--color-navy)', borderRadius: 22,
              padding: 'clamp(28px,5vw,46px)', position: 'relative', overflow: 'hidden',
            }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: 140, height: 140,
              background: 'radial-gradient(circle at top right, rgba(201,168,76,0.17), transparent 70%)',
            }} />
            <div style={{ fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px,10vw,100px)', color: 'rgba(201,168,76,0.17)',
              lineHeight: 0.65, marginBottom: 14 }}>"</div>
            <p style={{ fontFamily: 'var(--font-display)',
              fontSize: 'clamp(17px,2.5vw,24px)', fontStyle: 'italic',
              color: 'var(--color-cream)', lineHeight: 1.65, marginBottom: 22, maxWidth: 580 }}>
              Pendidikan bukan hanya tentang ilmu yang diserap, tetapi tentang
              jiwa-jiwa yang bertumbuh bersama dan menemukan dirinya.
            </p>
            <cite style={{ fontFamily: 'var(--font-accent)', fontSize: 15,
              color: 'var(--color-gold)', fontStyle: 'normal' }}>
              — Kepala Sekolah, Wisuda 2024
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* ══ TEASER ══ */}
      <section style={{
        padding: 'clamp(56px,9vw,92px) clamp(20px,5vw,60px)',
        background: 'var(--color-cream-dark)', textAlign: 'center',
      }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-accent)', fontSize: 19,
            color: 'var(--color-gold)', marginBottom: 10 }}>
          Masih banyak yang menanti
        </motion.p>
        <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px,4.5vw,46px)', color: 'var(--color-navy)',
            fontWeight: 600, marginBottom: 36 }}>
          Jelajahi setiap sudut cerita kita
        </motion.h3>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { Icon: Images,       label: 'Galeri Foto',      to: '/gallery'    },
            { Icon: Users,        label: 'Teman Sekelas',    to: '/classmates' },
            { Icon: CalendarDays, label: 'Perjalanan Waktu', to: '/timeline'   },
          ].map(({ Icon, label, to }, i) => (
            <motion.div key={to}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={to} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(26,39,68,0.12)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: 'white', borderRadius: 99,
                    border: '1.5px solid rgba(201,168,76,0.22)',
                    padding: '12px 26px', fontFamily: 'var(--font-body)',
                    fontSize: 15, fontWeight: 500, color: 'var(--color-navy)',
                    boxShadow: '0 2px 12px rgba(26,39,68,0.06)',
                    transition: 'all 0.25s ease',
                  }}>
                  <Icon size={16} strokeWidth={1.8} color="var(--color-gold)" />
                  {label}
                  <ArrowRight size={14} strokeWidth={1.8} style={{ opacity: 0.4 }} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .hero-content {
          display: flex; flex-direction: column;
          align-items: center; padding: 0 20px;
          width: 100%; max-width: 920px;
          text-align: center; position: relative; z-index: 1;
        }
      `}</style>
    </>
  )
}
