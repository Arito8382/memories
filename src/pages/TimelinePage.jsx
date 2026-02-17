import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  CalendarDays, Code2, Trophy,
  Users, Laptop, BookOpen, Star,
  Terminal, Cpu, Globe, Rocket,
  GraduationCap, Heart,
} from 'lucide-react'

/* ─────────────────────────────────────────
   DATA TIMELINE — RPL 4
───────────────────────────────────────── */
const TIMELINE = [
  {
    id: 1,
    tahun: '2025',
    bulan: 'Juli',
    judul: 'Awal XI RPL 4',
    deskripsi: 'Kita mulai perjalanan di kelas XI RPL 4. Wajah-wajah baru, meja baru, semangat baru. Pertama kalinya kita duduk satu kelas dan belajar dunia coding bersama.',
    Icon: Users,
    kategori: 'kelas',
    badge: 'Awal Mula',
    highlight: false,
  },
  {
    id: 2,
    tahun: '2025',
    bulan: 'Agustus',
    judul: 'Belajar Pemrograman Dasar',
    deskripsi: 'Mulai mengenal algoritma, flowchart, dan bahasa pemrograman pertama. Ada yang frustasi dengan error, ada yang langsung jatuh cinta sama coding.',
    Icon: Code2,
    kategori: 'akademik',
    badge: 'Ngoding',
    highlight: false,
  },
  {
    id: 3,
    tahun: '2025',
    bulan: 'Oktober',
    judul: 'Proyek Web Pertama',
    deskripsi: 'HTML, CSS, dan JavaScript jadi teman sehari-hari. Proyek web pertama yang bikin begadang semalaman — tapi puas banget waktu jalan di browser.',
    Icon: Globe,
    kategori: 'akademik',
    badge: 'Web Dev',
    highlight: false,
  },
  {
    id: 4,
    tahun: '2025',
    bulan: 'November',
    judul: 'UTS Semester Ganjil',
    deskripsi: 'Ujian pertama yang bikin deg-degan. Belajar bareng di grup WA sampai tengah malam, saling kirim rangkuman, saling semangatin.',
    Icon: BookOpen,
    kategori: 'akademik',
    badge: 'Ujian',
    highlight: false,
  },
  {
    id: 5,
    tahun: '2026',
    bulan: 'Januari',
    judul: 'Pengenalan Database & Backend',
    deskripsi: 'Kenalan sama MySQL, PHP, dan Laravel. Masa-masa "kenapa query-ku error terus?" tapi juga masa belajar yang paling seru bareng anak-anak RPL 4.',
    Icon: Cpu,
    kategori: 'akademik',
    badge: 'Database',
    highlight: false,
  },
  {
    id: 6,
    tahun: '2026',
    bulan: 'Maret',
    judul: 'Praktik Kerja Lapangan (PKL)',
    deskripsi: 'Pertama kali ngerasain dunia kerja nyata. Anak-anak RPL 4 tersebar di berbagai perusahaan IT. Pengalaman yang mengubah cara pandang tentang dunia teknologi.',
    Icon: Laptop,
    kategori: 'spesial',
    badge: 'PKL',
    highlight: true,
  },
  {
    id: 7,
    tahun: '2026',
    bulan: 'Juni',
    judul: 'Naik ke XII RPL 4',
    deskripsi: 'Kita lulus dari XI dan resmi jadi kelas XII RPL 4! Satu langkah lagi menuju kelulusan. Kelas makin solid, makin kompak, makin gila bareng.',
    Icon: Rocket,
    kategori: 'spesial',
    badge: 'Naik Kelas',
    highlight: true,
  },
  {
    id: 8,
    tahun: '2026',
    bulan: 'Agustus',
    judul: 'Proyek Akhir Dimulai',
    deskripsi: 'Kelas XII RPL 4 mulai ngerjain proyek akhir yang sesungguhnya. Aplikasi, sistem informasi, website — semua dikerjain dengan serius sambil tetap nge-gas bareng.',
    Icon: Terminal,
    kategori: 'akademik',
    badge: 'Final Project',
    highlight: false,
  },
  {
    id: 9,
    tahun: '2026',
    bulan: 'Oktober',
    judul: 'Uji Kompetensi Keahlian',
    deskripsi: 'Ujian kompetensi yang nentuin skill kita sebagai anak RPL. Deg-degan, tapi semua anak RPL 4 buktiin kalau kita layak dan siap terjun ke industri.',
    Icon: Trophy,
    kategori: 'akademik',
    badge: 'UKK',
    highlight: false,
  },
  {
    id: 10,
    tahun: '2026',
    bulan: 'Februari',
    judul: 'Ujian Akhir Sekolah',
    deskripsi: 'Ujian terakhir sebagai pelajar SMK. Semua ilmu dari XI sampai XII diuji. Belajar bareng terakhir kalinya — sekaligus momen yang paling penuh kenangan.',
    Icon: Star,
    kategori: 'akademik',
    badge: 'Ujian Akhir',
    highlight: false,
  },
  {
    id: 11,
    tahun: '2026',
    bulan: 'Mei',
    judul: 'Hari Kelulusan XII RPL 4',
    deskripsi: 'Ini dia — hari yang kita tunggu-tunggu. Toga, sertifikat, air mata, dan pelukan. XII RPL 4 resmi lulus! Terima kasih sudah jadi bagian terbaik dari perjalanan ini.',
    Icon: GraduationCap,
    kategori: 'wisuda',
    badge: 'LULUS!',
    highlight: true,
  },
]

const KATEGORI_WARNA = {
  kelas:    { bg: 'rgba(122,158,201,0.15)', border: 'rgba(122,158,201,0.4)', text: '#4A7EB5'  },
  akademik: { bg: 'rgba(201,168,76,0.12)',  border: 'rgba(201,168,76,0.4)',  text: '#B8962A'  },
  spesial:  { bg: 'rgba(122,201,168,0.15)', border: 'rgba(122,201,168,0.4)', text: '#3A9E7A'  },
  wisuda:   { bg: 'rgba(201,122,122,0.15)', border: 'rgba(201,122,122,0.4)', text: '#C94A4A'  },
}

/* ─────────────────────────────────────────
   TIMELINE ITEM
───────────────────────────────────────── */
function TimelineItem({ item, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0
  const warna  = KATEGORI_WARNA[item.kategori]

  return (
    <div ref={ref} style={{
      display: 'flex',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      position: 'relative',
      marginBottom: 48,
    }}>
      {/* Kartu */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.95 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        whileHover={{ y: -4, boxShadow: item.highlight
          ? '0 20px 56px rgba(201,168,76,0.25)'
          : '0 16px 48px rgba(26,39,68,0.14)' }}
        style={{
          width: 'calc(50% - 40px)',
          background: item.highlight
            ? 'var(--color-navy)'
            : 'white',
          borderRadius: 20,
          padding: 'clamp(20px,3vw,28px)',
          boxShadow: item.highlight
            ? '0 8px 32px rgba(26,39,68,0.2)'
            : '0 4px 22px rgba(26,39,68,0.08)',
          border: item.highlight
            ? '1px solid rgba(201,168,76,0.25)'
            : '1px solid rgba(201,168,76,0.1)',
          position: 'relative',
          transition: 'box-shadow 0.3s, transform 0.3s',
        }}
        className="timeline-card"
      >
        {/* Glow highlight */}
        {item.highlight && (
          <div style={{
            position: 'absolute', top: '-1px', left: '-1px', right: '-1px',
            height: 3, borderRadius: '20px 20px 0 0',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
          }} />
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: item.highlight ? 'rgba(201,168,76,0.15)' : warna.bg,
              border: `1px solid ${item.highlight ? 'rgba(201,168,76,0.3)' : warna.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <item.Icon
                size={20}
                color={item.highlight ? 'var(--color-gold)' : warna.text}
                strokeWidth={1.8}
              />
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-accent)', fontSize: 13,
                color: item.highlight ? 'var(--color-gold)' : 'var(--color-ink-light)',
                letterSpacing: '0.04em', marginBottom: 2,
              }}>{item.bulan} {item.tahun}</p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(15px,2vw,19px)',
                fontWeight: 700,
                color: item.highlight ? 'white' : 'var(--color-navy)',
                lineHeight: 1.25,
              }}>{item.judul}</h3>
            </div>
          </div>

          {/* Badge */}
          <div style={{
            flexShrink: 0,
            background: item.highlight ? 'rgba(201,168,76,0.15)' : warna.bg,
            border: `1px solid ${item.highlight ? 'rgba(201,168,76,0.35)' : warna.border}`,
            borderRadius: 99, padding: '4px 10px',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
              color: item.highlight ? 'var(--color-gold)' : warna.text,
              letterSpacing: '0.04em',
            }}>{item.badge}</span>
          </div>
        </div>

        {/* Deskripsi */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(13px,1.8vw,14.5px)',
          color: item.highlight ? 'rgba(255,255,255,0.65)' : 'var(--color-ink-light)',
          lineHeight: 1.75,
        }}>{item.deskripsi}</p>
      </motion.div>

      {/* Dot di tengah */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: 'backOut' }}
        style={{
          position: 'absolute',
          left: '50%', top: 24,
          transform: 'translateX(-50%)',
          width: item.highlight ? 20 : 14,
          height: item.highlight ? 20 : 14,
          borderRadius: '50%',
          background: item.highlight
            ? 'var(--color-gold)'
            : 'white',
          border: item.highlight
            ? '3px solid var(--color-navy)'
            : '2.5px solid var(--color-gold)',
          zIndex: 2,
          boxShadow: item.highlight
            ? '0 0 0 5px rgba(201,168,76,0.2)'
            : 'none',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   TIMELINE PAGE
───────────────────────────────────────── */
export default function TimelinePage() {
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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
            <CalendarDays size={13} color="var(--color-gold)" strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
              color: 'var(--color-gold)', letterSpacing: '0.1em',
              textTransform: 'uppercase', fontWeight: 600 }}>Perjalanan Waktu</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px,7vw,72px)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.12, marginBottom: 16,
            }}
          >
            Jejak Langkah{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>XII RPL 4</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,2vw,16px)',
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 500,
              marginBottom: 36,
            }}
          >
            Dari hari pertama di XI RPL 4 sampai detik kelulusan di XII RPL 4 —
            setiap momen tercatat di sini.
          </motion.p>

          {/* Tahun strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            {['2023 — 2024', '2024 — 2025'].map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 99, padding: '8px 18px',
              }}>
                <CalendarDays size={13} color="var(--color-gold)" strokeWidth={1.8} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13,
                  color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ LEGENDA ══ */}
      <section style={{
        padding: '20px clamp(20px,5vw,60px)',
        background: 'var(--color-cream)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
      }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
            color: 'var(--color-ink-light)', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase' }}>Legenda:</span>
          {Object.entries(KATEGORI_WARNA).map(([key, w]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: w.text, opacity: 0.8,
              }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12,
                color: 'var(--color-ink-light)', textTransform: 'capitalize' }}>{key}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section style={{
        padding: 'clamp(56px,8vw,80px) clamp(20px,5vw,60px)',
        background: 'var(--color-cream)',
        position: 'relative',
      }}>
        <div ref={lineRef} style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>

          {/* Garis tengah statis */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 2, transform: 'translateX(-50%)',
            background: 'rgba(201,168,76,0.15)',
          }} />

          {/* Garis tengah animasi scroll */}
          <motion.div style={{
            position: 'absolute', left: '50%', top: 0,
            width: 2, transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, var(--color-gold), rgba(201,168,76,0.3))',
            height: lineHeight,
            originY: 0,
          }} />

          {/* Items */}
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}

          {/* End dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              border: '4px solid white',
              boxShadow: '0 0 0 4px rgba(201,168,76,0.25), 0 8px 24px rgba(201,168,76,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto',
              position: 'relative', zIndex: 2,
            }}
          >
            <GraduationCap size={22} color="var(--color-navy)" strokeWidth={2} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-accent)', fontSize: 18,
              color: 'var(--color-gold)', textAlign: 'center',
              marginTop: 16,
            }}
          >
            XII RPL 4 — Selesai dengan bangga
          </motion.p>
        </div>
      </section>

      {/* ══ PENUTUP ══ */}
      <section style={{
        padding: 'clamp(56px,9vw,92px) clamp(20px,5vw,60px)',
        background: 'var(--color-navy)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '60vw', height: '60vw', maxWidth: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)',
              border: '1.5px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Heart size={28} color="var(--color-gold)" strokeWidth={1.5}
              fill="rgba(201,168,76,0.2)" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px,5vw,52px)',
              fontWeight: 700, color: 'white',
              lineHeight: 1.2, marginBottom: 18,
            }}
          >
            Dari XI RPL 4{' '}
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>hingga seterusnya</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,2vw,16px)',
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 32,
            }}
          >
            Dua tahun belajar code bareng, debug bareng, begadang bareng, dan
            tumbuh bareng. XII RPL 4 bukan sekadar kelas — ini rumah kedua kita.
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
              borderRadius: 99, padding: '10px 24px',
            }}
          >
            <Code2 size={16} color="var(--color-gold)" strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 16,
              color: 'var(--color-gold)' }}>XII RPL 4 — Class of 2025</span>
          </motion.div>
        </div>
      </section>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .timeline-card {
            width: calc(100% - 32px) !important;
          }
        }
      `}</style>
    </>
  )
}          
