import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Quote, ChevronLeft, ChevronRight, Heart,
  Sparkles, Users, GraduationCap,
} from 'lucide-react'

/* ─────────────────────────────────────────
   DATA QUOTES — XII RPL 4
───────────────────────────────────────── */
const QUOTES = [
  {
    id: 1,
    nama: 'Aulia Rahman',
    role: 'Ketua Kelas',
    quote: 'Dua tahun bareng kalian ngajarin gue arti teamwork yang sesungguhnya. Terima kasih sudah jadi keluarga kedua. See you at the top!',
    initials: 'AR',
    color: '#7A9EC9',
  },
  {
    id: 2,
    nama: 'Bintang Pratama',
    role: 'Ketua OSIS',
    quote: 'XII RPL 4 bukan cuma kelas biasa. Ini rumah buat gue belajar, gagal, bangkit, dan akhirnya lulus bareng. Love you all.',
    initials: 'BP',
    color: '#C97A9E',
  },
  {
    id: 3,
    nama: 'Citra Dewi',
    role: 'Sekretaris',
    quote: 'Dari yang awalnya gatau apa-apa soal coding, sekarang udah bisa bikin web sendiri. Semua karena kalian yang selalu support. Thanks, RPL 4!',
    initials: 'CD',
    color: '#7AC9A8',
  },
  {
    id: 4,
    nama: 'Dimas Santoso',
    role: 'Bendahara',
    quote: 'Nge-debug error bareng sampe larut malam adalah kenangan terindah. Semoga kita semua sukses di jalan masing-masing.',
    initials: 'DS',
    color: '#C9C07A',
  },
  {
    id: 5,
    nama: 'Elisa Putri',
    role: 'Anggota',
    quote: 'PKL bareng, ujian bareng, lulus bareng. XII RPL 4 adalah chapter terbaik dalam hidup gue. Keep coding, keep dreaming!',
    initials: 'EP',
    color: '#A87AC9',
  },
  {
    id: 6,
    nama: 'Fajar Nugroho',
    role: 'Anggota',
    quote: 'Kalian bukan cuma teman sekelas, tapi saudara seperjuangan. Sampai ketemu lagi di dunia IT yang sesungguhnya!',
    initials: 'FN',
    color: '#C97A7A',
  },
  {
    id: 7,
    nama: 'Pak Agus',
    role: 'Wali Kelas XII RPL 4',
    quote: 'Bangga melihat kalian tumbuh dari anak kelas XI yang polos jadi programmer handal di XII. Sukses selalu, anak-anak RPL 4!',
    initials: 'PA',
    color: '#C9A84C',
  },
]

/* ─────────────────────────────────────────
   FAREWELL PAGE
───────────────────────────────────────── */
export default function FarewellPage() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % QUOTES.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + QUOTES.length) % QUOTES.length)
  }

  // Auto slide setiap 6 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % QUOTES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const quote = QUOTES[current]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.92,
      filter: 'blur(6px)',
    }),
  }

  return (
    <>
      {/* ══ HEADER ══ */}
      <section style={{
        padding: 'clamp(100px,14vw,140px) clamp(20px,5vw,60px) clamp(40px,6vw,64px)',
        background: 'var(--color-navy)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-5%',
          width: '45vw', height: '45vw', maxWidth: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)',
              border: '1.5px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Quote size={28} color="var(--color-gold)" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px,7vw,68px)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.12, marginBottom: 18,
            }}
          >
            Pesan{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Perpisahan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,2vw,16px)',
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
            }}
          >
            Kata-kata tulus dari teman-teman XII RPL 4 untuk mengenang perjalanan kita bersama.
          </motion.p>
        </div>
      </section>

      {/* ══ CAROUSEL ══ */}
      <section style={{
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)',
        background: 'var(--color-cream)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>

          {/* Slide container */}
          <div style={{
            position: 'relative',
            minHeight: 'clamp(380px,50vw,480px)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 88, height: 88, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${quote.color}, ${quote.color}99)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '4px solid white',
                  outline: `3px solid ${quote.color}55`,
                  boxShadow: `0 12px 40px ${quote.color}66`,
                  marginBottom: 28,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 32,
                    fontWeight: 700, color: 'white', letterSpacing: '-0.02em',
                  }}>{quote.initials}</span>
                </div>

                {/* Quote */}
                <div style={{
                  background: 'white',
                  borderRadius: 24,
                  padding: 'clamp(32px,5vw,48px)',
                  boxShadow: '0 12px 48px rgba(26,39,68,0.12)',
                  border: '1px solid rgba(201,168,76,0.1)',
                  position: 'relative',
                  maxWidth: 680,
                  textAlign: 'center',
                }}>
                  {/* Decorative quotes */}
                  <div style={{
                    position: 'absolute', top: -12, left: 24,
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(201,168,76,0.35)',
                  }}>
                    <Quote size={24} color="white" strokeWidth={2.5} />
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(17px,3vw,24px)',
                    fontStyle: 'italic',
                    color: 'var(--color-ink)',
                    lineHeight: 1.7,
                    marginBottom: 24,
                    paddingTop: 20,
                  }}>"{quote.quote}"</p>

                  <div style={{ textAlign: 'center' }}>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontSize: 20,
                      fontWeight: 700, color: 'var(--color-navy)',
                      marginBottom: 4,
                    }}>{quote.nama}</p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      borderRadius: 99, padding: '5px 14px',
                    }}>
                      <Users size={11} color="var(--color-gold)" strokeWidth={2} />
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: 12,
                        color: 'var(--color-gold)', fontWeight: 600,
                      }}>{quote.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginTop: 48,
          }}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'white',
                border: '1.5px solid rgba(201,168,76,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(26,39,68,0.08)',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-navy)'
                e.currentTarget.style.borderColor = 'var(--color-navy)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
              }}
            >
              <ChevronLeft size={20} color="currentColor" strokeWidth={2} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'white',
                border: '1.5px solid rgba(201,168,76,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(26,39,68,0.08)',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-navy)'
                e.currentTarget.style.borderColor = 'var(--color-navy)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
              }}
            >
              <ChevronRight size={20} color="currentColor" strokeWidth={2} />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 28,
          }}>
            {QUOTES.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1)
                  setCurrent(i)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  borderRadius: 99,
                  background: i === current ? 'var(--color-gold)' : 'rgba(201,168,76,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <p style={{
            textAlign: 'center',
            marginTop: 20,
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--color-ink-light)',
          }}>
            {current + 1} / {QUOTES.length}
          </p>
        </div>
      </section>

      {/* ══ PENUTUP FINAL ══ */}
      <section style={{
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)',
        background: 'var(--color-navy)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '70vw', height: '70vw', maxWidth: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)',
              border: '2px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
            }}
          >
            <Heart size={32} color="var(--color-gold)" strokeWidth={1.5}
              fill="rgba(201,168,76,0.2)" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px,6vw,58px)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.2, marginBottom: 20,
            }}
          >
            Terima kasih,{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>XII RPL 4</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,2.2vw,17px)',
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.8,
              marginBottom: 36,
            }}
          >
            Dari XI sampai XII, kalian adalah bagian terbaik dari cerita hidup ini.
            Kita pisah raga, tapi kenangan ini selamanya. Sukses selalu untuk semua anak RPL 4!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 99, padding: '10px 20px',
            }}>
              <GraduationCap size={18} color="var(--color-gold)" strokeWidth={2} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14,
                color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Class of 2025</span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 99, padding: '10px 20px',
            }}>
              <Sparkles size={16} color="var(--color-gold)" strokeWidth={2} />
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 16,
                color: 'var(--color-gold)' }}>XII RPL 4 Forever</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
