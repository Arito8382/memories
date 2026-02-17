import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Quote, ChevronLeft, ChevronRight, Heart,
  Users, GraduationCap, Send, Trash2, Plus,
} from 'lucide-react'

/* ─────────────────────────────────────────
   INITIAL QUOTES — kosong dulu
───────────────────────────────────────── */
const INITIAL_QUOTES = []

/* ─────────────────────────────────────────
   FAREWELL PAGE
───────────────────────────────────────── */
export default function FarewellPage() {
  const [quotes, setQuotes] = useState([])
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    role: '',
    quote: '',
  })

  // Load dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem('farewell-quotes-rpl4')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setQuotes(parsed)
      } catch (e) {
        setQuotes(INITIAL_QUOTES)
      }
    } else {
      setQuotes(INITIAL_QUOTES)
    }
  }, [])

  // Save ke localStorage setiap quotes berubah
  useEffect(() => {
    if (quotes.length > 0) {
      localStorage.setItem('farewell-quotes-rpl4', JSON.stringify(quotes))
    }
  }, [quotes])

  // Auto slide
  useEffect(() => {
    if (quotes.length === 0) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [quotes.length])

  const handleNext = () => {
    if (quotes.length === 0) return
    setDirection(1)
    setCurrent(prev => (prev + 1) % quotes.length)
  }

  const handlePrev = () => {
    if (quotes.length === 0) return
    setDirection(-1)
    setCurrent(prev => (prev - 1 + quotes.length) % quotes.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nama.trim() || !formData.quote.trim()) {
      alert('Nama dan pesan harus diisi!')
      return
    }

    const newQuote = {
      id: Date.now(),
      nama: formData.nama.trim(),
      role: formData.role.trim() || 'Teman XII RPL 4',
      quote: formData.quote.trim(),
      initials: formData.nama.trim().split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
      color: `hsl(${Math.random() * 360}, 45%, 60%)`,
    }

    setQuotes(prev => [...prev, newQuote])
    setFormData({ nama: '', role: '', quote: '' })
    setShowForm(false)
    setCurrent(quotes.length) // langsung ke pesan baru
  }

  const handleDelete = (id) => {
    if (!confirm('Yakin ingin hapus pesan ini?')) return
    const filtered = quotes.filter(q => q.id !== id)
    setQuotes(filtered)
    if (current >= filtered.length && filtered.length > 0) {
      setCurrent(filtered.length - 1)
    }
  }

  const currentQuote = quotes[current]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
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
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 28,
            }}
          >
            Tulis kenangan atau pesan terbaikmu untuk XII RPL 4. Pesanmu akan muncul di sini.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              color: 'var(--color-navy)',
              border: 'none', borderRadius: 99,
              padding: '12px 28px',
              fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(201,168,76,0.4)',
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Tulis Pesan
          </motion.button>
        </div>
      </section>

      {/* ══ FORM MODAL ══ */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(10,16,30,0.88)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: 24,
                padding: 'clamp(28px,5vw,40px)',
                maxWidth: 560,
                width: '100%',
                boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28,
                  fontWeight: 700, color: 'var(--color-navy)' }}>Tulis Pesanmu</h2>
                <button onClick={() => setShowForm(false)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 28, color: 'var(--color-ink-light)', lineHeight: 1,
                }}>&times;</button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                    color: 'var(--color-ink-light)', fontWeight: 600,
                    marginBottom: 6, display: 'block' }}>Nama Lengkap *</label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={e => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                    placeholder="Contoh: Budi Santoso"
                    required
                    style={{
                      width: '100%', padding: '12px 16px',
                      border: '1.5px solid rgba(201,168,76,0.25)',
                      borderRadius: 12,
                      fontFamily: 'var(--font-body)', fontSize: 15,
                      outline: 'none',
                      transition: 'border 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                    color: 'var(--color-ink-light)', fontWeight: 600,
                    marginBottom: 6, display: 'block' }}>Sebagai (opsional)</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Contoh: Ketua Kelas, Teman Sekelas, Alumni"
                    style={{
                      width: '100%', padding: '12px 16px',
                      border: '1.5px solid rgba(201,168,76,0.25)',
                      borderRadius: 12,
                      fontFamily: 'var(--font-body)', fontSize: 15,
                      outline: 'none',
                      transition: 'border 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                    color: 'var(--color-ink-light)', fontWeight: 600,
                    marginBottom: 6, display: 'block' }}>Pesan / Kenangan *</label>
                  <textarea
                    value={formData.quote}
                    onChange={e => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                    placeholder="Tulis pesan atau kenangan terbaikmu untuk XII RPL 4..."
                    required
                    rows={5}
                    style={{
                      width: '100%', padding: '12px 16px',
                      border: '1.5px solid rgba(201,168,76,0.25)',
                      borderRadius: 12,
                      fontFamily: 'var(--font-body)', fontSize: 15,
                      outline: 'none', resize: 'vertical',
                      transition: 'border 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
                    color: 'var(--color-navy)',
                    border: 'none', borderRadius: 99,
                    padding: '14px 28px',
                    fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
                    marginTop: 8,
                  }}
                >
                  <Send size={16} strokeWidth={2} />
                  Kirim Pesan
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ CAROUSEL ══ */}
      <section style={{
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)',
        background: 'var(--color-cream)',
        minHeight: '60vh',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>

          {quotes.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center',
                padding: 'clamp(60px,10vw,100px) 20px',
              }}
            >
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(201,168,76,0.1)',
                border: '1.5px solid rgba(201,168,76,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <Quote size={36} color="var(--color-gold)" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,36px)',
                fontWeight: 600, color: 'var(--color-navy)', marginBottom: 12 }}>
                Belum ada pesan
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15,
                color: 'var(--color-ink-light)', lineHeight: 1.7, marginBottom: 28 }}>
                Jadilah yang pertama menulis pesan kenangan untuk XII RPL 4!
              </p>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
                  color: 'var(--color-navy)',
                  border: 'none', borderRadius: 99,
                  padding: '12px 28px',
                  fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(201,168,76,0.4)',
                }}
              >
                <Plus size={16} strokeWidth={2.5} />
                Tulis Pesan Pertama
              </button>
            </motion.div>
          ) : (
            <>
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
                      background: `linear-gradient(135deg, ${currentQuote.color}, ${currentQuote.color}99)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '4px solid white',
                      outline: `3px solid ${currentQuote.color}55`,
                      boxShadow: `0 12px 40px ${currentQuote.color}66`,
                      marginBottom: 28,
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontSize: 32,
                        fontWeight: 700, color: 'white', letterSpacing: '-0.02em',
                      }}>{currentQuote.initials}</span>
                    </div>

                    {/* Quote card */}
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
                      <div style={{
                        position: 'absolute', top: -12, left: 24,
                        width: 56, height: 56, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 6px 20px rgba(201,168,76,0.35)',
                      }}>
                        <Quote size={24} color="white" strokeWidth={2.5} />
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(currentQuote.id)}
                        style={{
                          position: 'absolute', top: 16, right: 16,
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'rgba(201,76,76,0.1)',
                          border: '1px solid rgba(201,76,76,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(201,76,76,0.15)'
                          e.currentTarget.style.transform = 'scale(1.1)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(201,76,76,0.1)'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        <Trash2 size={14} color="#C94C4C" strokeWidth={2} />
                      </button>

                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(17px,3vw,24px)',
                        fontStyle: 'italic',
                        color: 'var(--color-ink)',
                        lineHeight: 1.7,
                        marginBottom: 24,
                        paddingTop: 20,
                      }}>"{currentQuote.quote}"</p>

                      <div style={{ textAlign: 'center' }}>
                        <p style={{
                          fontFamily: 'var(--font-display)', fontSize: 20,
                          fontWeight: 700, color: 'var(--color-navy)',
                          marginBottom: 4,
                        }}>{currentQuote.nama}</p>
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
                          }}>{currentQuote.role}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 48 }}>
                <button onClick={handlePrev} style={{
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
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.color = 'inherit'
                  }}
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </button>

                <button onClick={handleNext} style={{
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
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.color = 'inherit'
                  }}
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1)
                      setCurrent(i)
                    }}
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

              <p style={{
                textAlign: 'center', marginTop: 20,
                fontFamily: 'var(--font-body)', fontSize: 13,
                color: 'var(--color-ink-light)',
              }}>
                {current + 1} / {quotes.length} pesan
              </p>
            </>
          )}
        </div>
      </section>

      {/* ══ PENUTUP ══ */}
      <section style={{
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)',
        background: 'var(--color-navy)',
        position: 'relative', overflow: 'hidden',
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
            Kita pisah raga, tapi kenangan ini selamanya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 99, padding: '10px 20px',
            }}
          >
            <GraduationCap size={16} color="var(--color-gold)" strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 16,
              color: 'var(--color-gold)' }}>XII RPL 4 — Class of 2025</span>
          </motion.div>
        </div>
      </section>
    </>
  )
}
