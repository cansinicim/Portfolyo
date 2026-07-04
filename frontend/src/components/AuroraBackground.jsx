import { motion } from 'framer-motion';

const blobs = [
  { color: 'rgba(139,92,246,0.30)', size: 620, top: '-16%', left: '-10%', duration: 22 },
  { color: 'rgba(34,211,238,0.22)', size: 560, top: '-8%', left: '72%', duration: 27 },
  { color: 'rgba(99,102,241,0.26)', size: 520, top: '62%', left: '-8%', duration: 31 },
  { color: 'rgba(245,158,11,0.16)', size: 460, top: '82%', left: '78%', duration: 25 },
];

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-60" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: 'blur(70px)',
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
