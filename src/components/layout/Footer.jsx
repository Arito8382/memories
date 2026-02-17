import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  GraduationCap, Home, Images, Users, CalendarDays,
  Instagram, Youtube, Heart,
} from 'lucide-react'

const navLinks = [
  { to: '/',           label: 'Beranda',     Icon: Home         },
  { to: '/gallery',    label: 'Galeri',      Icon: Images       },
  { to: '/classmates', label: 'Teman Kelas', Icon: Users        },
  { to: '/timeline',   label: 'Perjalanan',  Icon: CalendarDays },
  { to: '/farewell',   label: 'Pesan',       Icon: Heart        },
]
export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-navy)',
      padding: 'clamp(52px,9vw,88px) clamp(20px,5vw,60px) 28px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-25%', right: '-4%',
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)',
        pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          paddingBottom: 40,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          marginBottom: 28,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <GraduationCap size={20} color="#1A2744" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20,
                  fontWeight: 700, color: 'white', lineHeight: 1 }}>Kenangan</div>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11,
                  color: 'var(--color-gold)', letterSpacing: '0.09em' }}>Class of 2024</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5,
              color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: 240 }}>
              Mengabadikan setiap momen terbaik perjalanan kita bersama.
              Kenangan ini milik kita semua.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'var(--color-gold)', letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 600, marginBottom: 18 }}>Halaman</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(({ to, label, Icon }) => (
                <Link key={to} to={to} style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 14,
                  color: 'rgba(255,255,255,0.5)', transition: 'color 0.22s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  <Icon size={14} strokeWidth={1.6} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'var(--color-gold)', letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 600, marginBottom: 18 }}>Pesan</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 17,
              fontStyle: 'italic', color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65, marginBottom: 12, maxWidth: 240 }}>
              "Bukan perpisahan, melainkan awal dari babak yang baru."
            </p>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 14,
              color: 'var(--color-gold)' }}>— Angkatan 2024</span>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5,
              color: 'rgba(255,255,255,0.28)' }}>
              © {new Date().getFullYear()} Kenangan Kelulusan 2024 — Dibuat dengan
            </p>
            <Heart size={12} color="var(--color-gold)" fill="var(--color-gold)" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[Instagram, Youtube].map((Icon, i) => (
              <motion.button key={i} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.45)',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                  e.currentTarget.style.color = 'var(--color-gold)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                }}
              >
                <Icon size={15} strokeWidth={1.8} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
