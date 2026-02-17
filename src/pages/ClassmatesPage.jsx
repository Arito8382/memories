import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Users, Search, Star, BookOpen, Sparkles,
  GraduationCap, Heart, Quote,
} from 'lucide-react'

/* ─────────────────────────────────────────
   DATA TEMAN — ganti dengan data asli
───────────────────────────────────────── */
const CLASSMATES = [
  {
    id: 1, name: 'Aulia Rahma',      kelas: 'XII IPA 1', role: 'Ketua OSIS',
    cita: 'Dokter',     quote: 'Setiap langkah kecil adalah bagian dari perjalanan besar.',
    color: '#C9A87A', initials: 'AR', kategori: 'ipa',
  },
  {
    id: 2, name: 'Bagas Pratama',    kelas: 'XII IPA 2', role: 'Ketua Kelas',
    cita: 'Insinyur',   quote: 'Kerja keras hari ini adalah sukses hari esok.',
    color: '#7A9EC9', initials: 'BP', kategori: 'ipa',
  },
  {
    id: 3, name: 'Citra Dewi',       kelas: 'XII IPS 1', role: 'Wakil OSIS',
    cita: 'Pengacara',  quote: 'Ilmu tanpa aksi hanya setengah perjalanan.',
    color: '#C97A9E', initials: 'CD', kategori: 'ips',
  },
  {
    id: 4, name: 'Dimas Santoso',    kelas: 'XII IPA 1', role: 'Sekretaris',
    cita: 'Arsitek',    quote: 'Mimpi adalah cetak biru dari kenyataan.',
    color: '#7AC9A8', initials: 'DS', kategori: 'ipa',
  },
  {
    id: 5, name: 'Elisa Putri',      kelas: 'XII IPS 2', role: 'Bendahara',
    cita: 'Akuntan',    quote: 'Teliti dalam setiap detail adalah kunci keberhasilan.',
    color: '#C9C07A', initials: 'EP', kategori: 'ips',
  },
  {
    id: 6, name: 'Fajar Nugroho',    kelas: 'XII IPA 2', role: 'Anggota',
    cita: 'Pilot',      quote: 'Langit bukan batas, tapi awal dari segalanya.',
    color: '#A87AC9', initials: 'FN', kategori: 'ipa',
  },
  {
    id: 7, name: 'Gita Sari',        kelas: 'XII IPS 1', role: 'Anggota',
    cita: 'Psikolog',   quote: 'Memahami orang lain dimulai dari memahami diri sendiri.',
    color: '#C97A7A', initials: 'GS', kategori: 'ips',
  },
  {
    id: 8, name: 'Hendra Wijaya',    kelas: 'XII IPA 1', role: 'Anggota',
    cita: 'Programmer', quote: 'Kode yang baik adalah puisi bagi komputer.',
    color: '#7AC9C9', initials: 'HW', kategori: 'ipa',
  },
  {
    id: 9, name: 'Indah Lestari',    kelas: 'XII IPS 2', role: 'Anggota',
    cita: 'Desainer',   quote: 'Seni adalah cara jiwa bicara tanpa kata.',
    color: '#C9A0C9', initials: 'IL', kategori: 'ips',
  },
  {
    id: 10, name: 'Joko Susilo',     kelas: 'XII IPA 2', role: 'Anggota',
    cita: 'Dokter Gigi', quote: 'Senyum adalah obat paling mujarab di dunia.',
    color: '#A8C97A', initials: 'JS', kategori: 'ipa',
  },
  {
    id: 11, name: 'Kartika Sari',    kelas: 'XII IPS 1', role: 'Anggota',
    cita: 'Guru',       quote: 'Mendidik satu anak berarti menerangi satu generasi.',
    color: '#C9887A', initials: 'KS', kategori: 'ips',
  },
  {
    id: 12, name: 'Luthfi Hakim',    kelas: 'XII IPA 1', role: 'Anggota',
    cita: 'Ilmuwan',    quote: 'Rasa ingin tahu adalah mesin terkuat ilmu pengetahuan.',
    color: '#7A88C9', initials: 'LH', kategori: 'ipa',
  },
]

const FILTERS = [
  { key: 'semua', label: 'Semua' },
  { key: 'ipa',   label: 'IPA'   },
  { key: 'ips',   label: 'IPS'   },
]

/* ─────────────────────────────────────────
   FLIP CARD
───────────────────────────────────────── */
function FlipCard({ person, index }) {
  const [flipped, setFlipped] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onClick={() => setFlipped(p => !p)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', height: 260,
          position: 'relative',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
      >
        {/* ── DEPAN ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          borderRadius: 20,
          background: 'white',
          boxShadow: '0 6px 28px rgba(26,39,68,0.10)',
          border: '1px solid rgba(201,168,76,0.12)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '24px 20px', gap: 12,
          overflow: 'hidden',
        }}>
          {/* avatar warna */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: `linear-gradient(135deg, ${person.color}, ${person.color}99)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 6px 20px ${person.color}55`,
            flexShrink: 0,
            border: '3px solid white',
            outline: `2px solid ${person.color}44`,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 24,
              fontWeight: 700, color: 'white', letterSpacing: '-0.02em',
            }}>{person.initials}</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 18,
              fontWeight: 700, color: 'var(--color-navy)',
              lineHeight: 1.2, marginBottom: 4 }}>{person.name}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--color-ink-light)', marginBottom: 8 }}>{person.kelas}</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 99, padding: '4px 12px',
            }}>
              <Star size={10} color="var(--color-gold)" fill="var(--color-gold)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11,
                color: 'var(--color-gold)', fontWeight: 600 }}>{person.role}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <GraduationCap size={13} color="var(--color-ink-light)" strokeWidth={1.6} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--color-ink-light)' }}>Cita-cita: {person.cita}</span>
          </div>

          {/* hint flip */}
          <div style={{
            position: 'absolute', bottom: 12, right: 14,
            display: 'flex', alignItems: 'center', gap: 4,
            opacity: 0.4,
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 10,
              color: 'var(--color-ink-light)' }}>tap untuk quote</span>
          </div>
        </div>

        {/* ── BELAKANG ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 20,
          background: `linear-gradient(135deg, var(--color-navy) 0%, #243560 100%)`,
          boxShadow: '0 6px 28px rgba(26,39,68,0.22)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '28px 24px', gap: 16,
          overflow: 'hidden',
        }}>
          {/* orb deco */}
          <div style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 140, height: 140, borderRadius: '50%',
            background: `radial-gradient(circle, ${person.color}22 0%, transparent 70%)`,
          }} />
          <div style={{
            position: 'absolute', bottom: '-15%', left: '-5%',
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          }} />

          <Quote size={22} color="var(--color-gold)" strokeWidth={1.5} style={{ opacity: 0.7, flexShrink: 0 }} />

          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 15,
            fontStyle: 'italic', color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.65, textAlign: 'center', position: 'relative',
          }}>"{person.quote}"</p>

          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            position: 'relative',
          }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 15,
              color: 'var(--color-gold)' }}>— {person.name}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'rgba(255,255,255,0.35)' }}>{person.kelas}</span>
          </div>

          {/* hint flip balik */}
          <div style={{
            position: 'absolute', bottom: 12, right: 14,
            opacity: 0.35,
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 10,
              color: 'rgba(255,255,255,0.6)' }}>tap untuk kembali</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   CLASSMATES PAGE
───────────────────────────────────────── */
export default function ClassmatesPage() {
  const [filter, setFilter] = useState('semua')
  const [search, setSearch] = useState('')

  const filtered = CLASSMATES.filter(p => {
    const matchFilter = filter === 'semua' || p.kategori === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.kelas.toLowerCase().includes(search.toLowerCase()) ||
                        p.cita.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

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
        <div style={{
          position: 'absolute', bottom: '-30%', left: '-5%',
          width: '30vw', height: '30vw', maxWidth: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
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
            <Users size={13} color="var(--color-gold)" strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--color-gold)', letterSpacing: '0.1em',
              textTransform: 'uppercase', fontWeight: 600 }}>Teman Kelas</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px,7vw,72px)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.12, marginBottom: 16, maxWidth: 600,
            }}
          >
            Wajah-wajah{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Terkasih</span>
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
            Klik kartu untuk membalik dan membaca pesan spesial dari setiap teman.
            Mereka adalah bagian terbaik dari cerita kita.
          </motion.p>

          {/* stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 36,
            }}
          >
            {[
              { Icon: Users,         value: '247', label: 'Total Siswa'  },
              { Icon: BookOpen,      value: '4',   label: 'Kelas'        },
              { Icon: Heart,         value: '100%', label: 'Semangat'    },
            ].map(({ Icon, value, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(201,168,76,0.15)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color="var(--color-gold)" strokeWidth={1.8} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 20,
                    fontWeight: 700, color: 'white', lineHeight: 1 }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11,
                    color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em',
                    textTransform: 'uppercase' }}>{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ FILTER + SEARCH ══ */}
      <section style={{
        padding: '24px clamp(20px,5vw,60px)',
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
          <div style={{ display: 'flex', gap: 6 }}>
            {FILTERS.map(f => {
              const isActive = filter === f.key
              return (
                <motion.button
                  key={f.key}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setFilter(f.key)}
                  style={{
                    padding: '7px 18px', borderRadius: 99, border: 'none',
                    fontFamily: 'var(--font-body)', fontSize: 13.5,
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.22s ease',
                    background: isActive ? 'var(--color-navy)' : 'rgba(26,39,68,0.06)',
                    color:      isActive ? 'white' : 'var(--color-ink-light)',
                    boxShadow:  isActive ? '0 4px 14px rgba(26,39,68,0.2)' : 'none',
                  }}
                >{f.label}</motion.button>
              )
            })}
          </div>

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
              placeholder="Cari nama, kelas..."
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'var(--font-body)', fontSize: 14,
                color: 'var(--color-ink)', width: 150,
              }}
            />
          </div>
        </div>
      </section>

      {/* ══ GRID KARTU ══ */}
      <section style={{
        padding: 'clamp(36px,5vw,56px) clamp(20px,5vw,60px) clamp(56px,8vw,80px)',
        background: 'var(--color-cream)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.p
            key={filter + search}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 13,
              color: 'var(--color-ink-light)', marginBottom: 28 }}>
            Menampilkan <strong style={{ color: 'var(--color-navy)' }}>{filtered.length}</strong> teman
            {filter !== 'semua' && ` · ${filter.toUpperCase()}`}
          </motion.p>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 18,
              }}>
                {filtered.map((person, i) => (
                  <FlipCard key={person.id} person={person} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '60px 0', textAlign: 'center' }}
              >
                <Users size={40} color="var(--color-ink-light)" strokeWidth={1.2}
                  style={{ display: 'block', margin: '0 auto 16px', opacity: 0.35 }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15,
                  color: 'var(--color-ink-light)' }}>Tidak ada teman ditemukan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ PESAN PERPISAHAN ══ */}
      <section style={{
        padding: 'clamp(56px,9vw,92px) clamp(20px,5vw,60px)',
        background: 'var(--color-cream-dark)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)',
              border: '1.5px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Heart size={26} color="var(--color-gold)" strokeWidth={1.5} fill="rgba(201,168,76,0.2)" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,5vw,48px)',
              fontWeight: 700, color: 'var(--color-navy)',
              lineHeight: 1.2, marginBottom: 16,
            }}
          >
            Terima kasih sudah menjadi{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>bagian cerita ini</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,2vw,16px)',
              color: 'var(--color-ink-light)', lineHeight: 1.8,
            }}
          >
            Kalian bukan sekadar teman sekelas. Kalian adalah bagian dari
            kenangan terbaik yang akan selalu diingat sepanjang masa.
          </motion.p>
        </div>
      </section>
    </>
  )
}
