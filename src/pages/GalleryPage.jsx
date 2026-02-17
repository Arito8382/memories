import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ZoomIn, Filter, Images, Search } from 'lucide-react'

/* ─────────────────────────────────────────
   DATA FOTO — ganti src dengan foto asli
───────────────────────────────────────── */
const PHOTOS = [
  { id: 1,  category: 'kelas',  aspect: 'tall',   color: '#C9B99A', label: 'Kelas XII IPA 1' },
  { id: 2,  category: 'event',  aspect: 'wide',   color: '#A8BFC9', label: 'Pensi Tahunan'   },
  { id: 3,  category: 'wisuda', aspect: 'square', color: '#C9A87A', label: 'Hari Wisuda'      },
  { id: 4,  category: 'kelas',  aspect: 'square', color: '#B5C9A8', label: 'Kelas XII IPA 2' },
  { id: 5,  category: 'event',  aspect: 'tall',   color: '#C9A8B5', label: 'Study Tour'      },
  { id: 6,  category: 'wisuda', aspect: 'wide',   color: '#A8A8C9', label: 'Foto Bersama'    },
  { id: 7,  category: 'kelas',  aspect: 'wide',   color: '#C9C0A8', label: 'Kelas XII IPS 1' },
  { id: 8,  category: 'event',  aspect: 'square', color: '#A8C9C5', label: 'Lomba Sains'     },
  { id: 9,  category: 'wisuda', aspect: 'tall',   color: '#C9A8A8', label: 'Momen Wisuda'    },
  { id: 10, category: 'kelas',  aspect: 'square', color: '#B8C9A8', label: 'Kelas XII IPS 2' },
  { id: 11, category: 'event',  aspect: 'wide',   color: '#C9B5A8', label: 'Pentas Seni'     },
  { id: 12, category: 'wisuda', aspect: 'square', color: '#A8B5C9', label: 'Sidang Kelulusan' },
]

const CATEGORIES = [
  { key: 'semua', label: 'Semua' },
  { key: 'kelas', label: 'Kelas' },
  { key: 'event', label: 'Event' },
  { key: 'wisuda', label: 'Wisuda' },
]

/* ukuran grid berdasarkan aspect ratio */
const aspectStyle = {
  tall:   { gridRow: 'span 2' },
  wide:   { gridColumn: 'span 2' },
  square: {},
}

/* ─────────────────────────────────────────
   PHOTO CARD
───────────────────────────────────────── */
function PhotoCard({ photo, index, onOpen }) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      layoutId={`photo-${photo.id}`}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, zIndex: 2 }}
      onClick={() => onOpen(photo)}
      style={{
        ...aspectStyle[photo.aspect],
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(26,39,68,0.10)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* placeholder warna — ganti dengan <img> kalau sudah punya foto */}
      <div style={{
        width: '100%', height: '100%', minHeight: 180,
        background: photo.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <Images size={32} color="rgba(255,255,255,0.35)" strokeWidth={1.2} />
      </div>

      {/* Overlay hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,39,68,0.85) 0%, rgba(26,39,68,0.2) 50%, transparent 100%)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', alignItems: 'flex-start',
          padding: '16px',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
          color: 'white', marginBottom: 4,
        }}>{photo.label}</p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'rgba(201,168,76,0.25)',
          border: '1px solid rgba(201,168,76,0.5)',
          borderRadius: 99, padding: '3px 10px',
        }}>
          <ZoomIn size={11} color="var(--color-gold)" strokeWidth={2} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11,
            color: 'var(--color-gold)' }}>Buka</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
function Lightbox({ photo, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10,16,30,0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'white',
          zIndex: 1001,
        }}
      >
        <X size={20} strokeWidth={2} />
      </motion.button>

      {/* Photo expanded */}
      <motion.div
        layoutId={`photo-${photo.id}`}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 800,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        <div style={{
          width: '100%',
          aspectRatio: photo.aspect === 'wide' ? '16/9' : photo.aspect === 'tall' ? '3/4' : '1/1',
          background: photo.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Images size={64} color="rgba(255,255,255,0.3)" strokeWidth={1} />
        </div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            background: 'var(--color-navy)',
            padding: '18px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20,
              fontWeight: 600, color: 'white', marginBottom: 3 }}>{photo.label}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13,
              color: 'rgba(255,255,255,0.45)', textTransform: 'capitalize' }}>
              {photo.category} · 2024
            </p>
          </div>
          <div style={{
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.35)',
            borderRadius: 99, padding: '6px 14px',
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--color-gold)', fontWeight: 500,
              textTransform: 'capitalize' }}>{photo.category}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   GALLERY PAGE
───────────────────────────────────────── */
export default function GalleryPage() {
  const [active,   setActive]   = useState('semua')
  const [selected, setSelected] = useState(null)
  const [search,   setSearch]   = useState('')

  const filtered = PHOTOS.filter(p => {
    const matchCat    = active === 'semua' || p.category === active
    const matchSearch = p.label.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleOpen  = useCallback(photo => setSelected(photo), [])
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <>
      {/* ══ HEADER ══ */}
      <section style={{
        padding: 'clamp(100px,14vw,140px) clamp(20px,5vw,60px) clamp(40px,6vw,64px)',
        background: 'var(--color-navy)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* orb deco */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-5%',
          width: '45vw', height: '45vw', maxWidth: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30%', left: '-5%',
          width: '30vw', height: '30vw', maxWidth: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 99, padding: '5px 16px', marginBottom: 20,
            }}
          >
            <Images size={13} color="var(--color-gold)" strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--color-gold)', letterSpacing: '0.1em',
              textTransform: 'uppercase', fontWeight: 600 }}>Galeri Foto</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 7vw, 72px)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.12, marginBottom: 16, maxWidth: 600,
            }}
          >
            Momen Terbaik{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Kita</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,2vw,16px)',
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 480,
            }}
          >
            Kumpulan foto kenangan selama tiga tahun perjalanan kita bersama.
            Klik foto untuk melihat lebih dekat.
          </motion.p>
        </div>
      </section>

      {/* ══ FILTER + SEARCH ══ */}
      <section style={{
        padding: '28px clamp(20px,5vw,60px)',
        background: 'var(--color-cream)',
        position: 'sticky', top: 64, zIndex: 50,
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 4px 20px rgba(26,39,68,0.06)',
      }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginRight: 4, color: 'var(--color-ink-light)',
            }}>
              <Filter size={14} strokeWidth={1.8} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
                letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>Filter</span>
            </div>
            {CATEGORIES.map(cat => {
              const isActive = active === cat.key
              return (
                <motion.button
                  key={cat.key}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setActive(cat.key)}
                  style={{
                    padding: '7px 18px', borderRadius: 99, border: 'none',
                    fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.22s ease',
                    background: isActive ? 'var(--color-navy)' : 'rgba(26,39,68,0.06)',
                    color:      isActive ? 'white' : 'var(--color-ink-light)',
                    boxShadow:  isActive ? '0 4px 14px rgba(26,39,68,0.2)' : 'none',
                  }}
                >{cat.label}</motion.button>
              )
            })}
          </div>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'white', border: '1.5px solid rgba(201,168,76,0.22)',
            borderRadius: 99, padding: '8px 16px',
            boxShadow: '0 2px 10px rgba(26,39,68,0.05)',
          }}>
            <Search size={14} color="var(--color-ink-light)" strokeWidth={1.8} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari foto..."
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'var(--font-body)', fontSize: 14,
                color: 'var(--color-ink)', width: 140,
              }}
            />
          </div>
        </div>
      </section>

      {/* ══ MASONRY GRID ══ */}
      <section style={{
        padding: 'clamp(36px,5vw,56px) clamp(20px,5vw,60px) clamp(56px,8vw,80px)',
        background: 'var(--color-cream)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Count */}
          <motion.p
            key={active + search}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 13,
              color: 'var(--color-ink-light)', marginBottom: 24 }}>
            Menampilkan <strong style={{ color: 'var(--color-navy)' }}>{filtered.length}</strong> foto
          </motion.p>

          {/* Grid */}
          <motion.div layout style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridAutoRows: '200px',
            gap: 14,
          }}>
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((photo, i) => (
                  <PhotoCard key={photo.id} photo={photo} index={i} onOpen={handleOpen} />
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center',
                  }}
                >
                  <Images size={40} color="var(--color-ink-light)" strokeWidth={1.2}
                    style={{ display: 'block', margin: '0 auto 16px', opacity: 0.4 }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15,
                    color: 'var(--color-ink-light)' }}>Tidak ada foto ditemukan</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══ LIGHTBOX ══ */}
      <AnimatePresence>
        {selected && <Lightbox photo={selected} onClose={handleClose} />}
      </AnimatePresence>
    </>
  )
}
