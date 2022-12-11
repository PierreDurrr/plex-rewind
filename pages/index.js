import Link from 'next/link'
import { motion } from 'framer-motion'
import { animateFadeIn } from '../styles/motion'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="flex items-center gap-4 mb-6 text-4xl font-bold">
        <motion.img
          src="/plex.svg"
          alt="Plex logo"
          className="h-14"
          initial={{ opacity: 0, translateX: '-50px' }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.span
          initial={{ opacity: 0, translateX: '50px' }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.8 }}
        >
          Rewind
        </motion.span>
      </h1>

      {/* TODO: Maybe we can use <motion /> as <Link /> already */}
      <motion.div
        variants={animateFadeIn}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8 }}
      >
        <Link href="/rewind/total" className="mx-auto mb-6 button">
          Get started
        </Link>
      </motion.div>

      {/* TODO: Maybe we can use <motion /> as <Link /> already */}
      <motion.div
        variants={animateFadeIn}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link href="/dashboard/tv" className="text-slate-300 hover:opacity-75">
          Dashboard
        </Link>
      </motion.div>
    </div>
  )
}
