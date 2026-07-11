import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

const GRAVITY = 1500
const RESTITUTION = 0.32
const FRICTION = 0.985
const TONE_HEX = { pink: '#f472b6', blue: '#38bdf8', green: '#4ade80' }

function seedBodies(groups, w, ctx) {
  ctx.font = '600 13px var(--mono), monospace'
  var bodies = []
  var flat = []
  groups.forEach((group) => {
    group.skills.forEach((skill) => flat.push({ group, skill }))
  })
  flat.forEach((item, i) => {
    var padX = 20
    var textW = ctx.measureText(item.skill).width
    var w2 = Math.max(66, textW + padX * 2)
    var h = 38
    bodies.push({
      group: item.group,
      label: item.skill,
      w: w2,
      h: h,
      x: 30 + Math.random() * Math.max(10, w - 60),
      y: -60 - i * 42 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 40,
      vy: 0,
      dragging: false,
    })
  })
  return bodies
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function resolvePair(b1, b2) {
  var dx = b2.x - b1.x
  var dy = b2.y - b1.y
  var overlapX = (b1.w + b2.w) / 2 - Math.abs(dx)
  var overlapY = (b1.h + b2.h) / 2 - Math.abs(dy)
  if (overlapX <= 0 || overlapY <= 0) return

  var m1 = b1.dragging ? 0 : 1
  var m2 = b2.dragging ? 0 : 1
  if (m1 === 0 && m2 === 0) return
  var totalM = m1 + m2 || 1

  if (overlapX < overlapY) {
    var pushX = overlapX / totalM
    var sign = dx < 0 ? -1 : 1
    b1.x -= sign * pushX * m1
    b2.x += sign * pushX * m2
    var relVX = b2.vx - b1.vx
    var impulseX = (-relVX * (1 + RESTITUTION)) / totalM
    if (m1) b1.vx -= impulseX * m2
    if (m2) b2.vx += impulseX * m1
  } else {
    var pushY = overlapY / totalM
    var signY = dy < 0 ? -1 : 1
    b1.y -= signY * pushY * m1
    b2.y += signY * pushY * m2
    var relVY = b2.vy - b1.vy
    var impulseY = (-relVY * (1 + RESTITUTION)) / totalM
    if (m1) b1.vy -= impulseY * m2
    if (m2) b2.vy += impulseY * m1
  }
}

function StaticSkillGroups() {
  return (
    <motion.div variants={staggerContainer(0.12)} className="skill-groups">
      {profile.skillGroups.map((group) => (
        <motion.div key={group.title} variants={fadeUpItem} className="skill-group">
          <h3 className={`skill-group-title skill-group-title--${group.tone}`}>{group.title}</h3>
          <ul className="skills-list">
            {group.skills.map((skill) => (
              <li key={skill} className={`skill-pill skill-pill--${group.tone}`}>
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}

function SkillsPhysicsLab() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const apiRef = useRef({})
  const [visible, setVisible] = useState(false)
  const [paused, setPaused] = useState(false)
  const [gravityOn, setGravityOn] = useState(true)
  const [soundOn, setSoundOn] = useState(false)
  const [hud, setHud] = useState({ count: 0, rest: 0 })

  useEffect(() => {
    if (!wrapRef.current) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !canvasRef.current || !wrapRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
    let W = 0
    let H = 0

    function resize() {
      const rect = wrapRef.current.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    let bodies = seedBodies(profile.skillGroups, W, ctx)
    let localPaused = false
    let localGravityOn = true
    let localSoundOn = false

    let audioCtx = null
    let lastSoundAt = 0
    function ensureAudio() {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext
        audioCtx = new Ctx()
      }
      if (audioCtx.state === 'suspended') audioCtx.resume()
    }
    function playClick(intensity) {
      if (!localSoundOn || !audioCtx) return
      const now = audioCtx.currentTime
      if (now - lastSoundAt < 0.03) return
      lastSoundAt = now
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      const freq = 260 + Math.random() * 220 + intensity * 40
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(Math.max(60, freq * 0.4), now + 0.09)
      const vol = Math.min(0.18, 0.03 + intensity * 0.02)
      gain.gain.setValueAtTime(vol, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
      osc.connect(gain).connect(audioCtx.destination)
      osc.start(now)
      osc.stop(now + 0.13)
    }

    let pointerId = null
    let dragBody = null
    let dragDX = 0
    let dragDY = 0
    let lastPX = 0
    let lastPY = 0
    let lastPT = 0
    let throwVX = 0
    let throwVY = 0

    function bodyAt(px, py) {
      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i]
        if (px >= b.x - b.w / 2 && px <= b.x + b.w / 2 && py >= b.y - b.h / 2 && py <= b.y + b.h / 2) {
          return b
        }
      }
      return null
    }

    function onPointerDown(e) {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      const b = bodyAt(px, py)
      if (b) {
        ensureAudio()
        pointerId = e.pointerId
        dragBody = b
        dragBody.dragging = true
        dragDX = px - b.x
        dragDY = py - b.y
        lastPX = px
        lastPY = py
        lastPT = performance.now()
        canvas.setPointerCapture(e.pointerId)
      }
    }

    function onPointerMove(e) {
      if (!dragBody || e.pointerId !== pointerId) return
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      const now = performance.now()
      const dt = Math.max(1, now - lastPT)
      throwVX = ((px - lastPX) / dt) * 1000
      throwVY = ((py - lastPY) / dt) * 1000
      dragBody.x = px - dragDX
      dragBody.y = py - dragDY
      lastPX = px
      lastPY = py
      lastPT = now
    }

    function releaseDrag() {
      if (dragBody) {
        dragBody.dragging = false
        dragBody.vx = Math.max(-900, Math.min(900, throwVX))
        dragBody.vy = Math.max(-900, Math.min(900, throwVY))
      }
      dragBody = null
      pointerId = null
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', releaseDrag)
    canvas.addEventListener('pointercancel', releaseDrag)

    const highlightUntil = {}

    function launchCategory(title) {
      ensureAudio()
      highlightUntil[title] = performance.now() + 900
      bodies.forEach((b) => {
        if (b.group.title === title && !b.dragging) {
          b.vy -= 500 + Math.random() * 260
          b.vx += (Math.random() - 0.5) * 260
        }
      })
    }

    function shake() {
      ensureAudio()
      bodies.forEach((b) => {
        if (b.dragging) return
        b.vy -= 300 + Math.random() * 500
        b.vx += (Math.random() - 0.5) * 700
      })
    }

    function reset() {
      bodies = seedBodies(profile.skillGroups, W, ctx)
    }

    apiRef.current = {
      launchCategory,
      shake,
      reset,
      setPaused: (v) => {
        localPaused = v
      },
      setGravityOn: (v) => {
        localGravityOn = v
      },
      setSoundOn: (v) => {
        localSoundOn = v
        if (v) ensureAudio()
      },
    }

    function step(dt) {
      const floatDrift = !localGravityOn
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        if (b.dragging) continue

        if (floatDrift) {
          b.vx += (Math.random() - 0.5) * 12
          b.vy += (Math.random() - 0.5) * 12
          b.vx *= 0.98
          b.vy *= 0.98
        } else {
          b.vy += GRAVITY * dt
        }

        b.x += b.vx * dt
        b.y += b.vy * dt

        const minX = b.w / 2
        const maxX = W - b.w / 2
        const minY = b.h / 2
        const maxY = H - b.h / 2

        if (b.x < minX) {
          b.x = minX
          b.vx = -b.vx * RESTITUTION
        }
        if (b.x > maxX) {
          b.x = maxX
          b.vx = -b.vx * RESTITUTION
        }
        if (b.y < minY) {
          b.y = minY
          b.vy = -b.vy * RESTITUTION
        }
        if (b.y > maxY) {
          b.y = maxY
          const impact = Math.abs(b.vy)
          b.vy = -b.vy * RESTITUTION
          b.vx *= FRICTION
          if (impact > 60) playClick(Math.min(6, impact / 140))
          if (Math.abs(b.vy) < 40) b.vy = 0
        }
      }

      for (let a = 0; a < bodies.length; a++) {
        for (let c = a + 1; c < bodies.length; c++) {
          resolvePair(bodies[a], bodies[c])
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        const x = b.x - b.w / 2
        const y = b.y - b.h / 2
        const highlighted = highlightUntil[b.group.title] && performance.now() < highlightUntil[b.group.title]

        roundRectPath(ctx, x, y, b.w, b.h, b.h / 2)
        ctx.fillStyle = 'rgba(244, 242, 236, 0.05)'
        ctx.fill()

        ctx.lineWidth = b.dragging ? 2 : 1.2
        ctx.strokeStyle = highlighted ? '#ffd21f' : TONE_HEX[b.group.tone]
        ctx.globalAlpha = b.dragging ? 1 : 0.85
        ctx.stroke()
        ctx.globalAlpha = 1

        if (highlighted || b.dragging) {
          ctx.save()
          ctx.shadowColor = highlighted ? 'rgba(255,210,31,0.55)' : TONE_HEX[b.group.tone]
          ctx.shadowBlur = 16
          ctx.stroke()
          ctx.restore()
        }

        ctx.fillStyle = '#f4f2ec'
        ctx.font = '600 13px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(b.label, b.x, b.y + 1)
      }
    }

    let raf = 0
    let lastT = performance.now()
    let hudLast = performance.now()

    function frame(now) {
      const dt = Math.min(0.032, (now - lastT) / 1000)
      lastT = now
      if (!localPaused) step(dt)
      draw()

      if (now - hudLast > 400) {
        hudLast = now
        let rest = 0
        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i]
          if (!b.dragging && Math.abs(b.vx) < 4 && Math.abs(b.vy) < 4) rest++
        }
        setHud({ count: bodies.length, rest })
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const resizeObserver = new ResizeObserver(() => {
      const oldW = W
      resize()
      const scale = oldW ? W / oldW : 1
      bodies.forEach((b) => {
        b.x *= scale
      })
    })
    resizeObserver.observe(wrapRef.current)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', releaseDrag)
      canvas.removeEventListener('pointercancel', releaseDrag)
      if (audioCtx) audioCtx.close()
    }
  }, [visible])

  function togglePause() {
    const next = !paused
    setPaused(next)
    apiRef.current.setPaused?.(next)
  }
  function toggleGravity() {
    const next = !gravityOn
    setGravityOn(next)
    apiRef.current.setGravityOn?.(next)
  }
  function toggleSound() {
    const next = !soundOn
    setSoundOn(next)
    apiRef.current.setSoundOn?.(next)
  }

  return (
    <>
      <div className="skills-lab-legend">
        {profile.skillGroups.map((group) => (
          <button
            key={group.title}
            type="button"
            className="skills-lab-chip"
            data-tone={group.tone}
            onClick={() => apiRef.current.launchCategory?.(group.title)}
            data-cursor="hover"
          >
            <span className="skills-lab-dot" style={{ background: TONE_HEX[group.tone] }} />
            {group.title} <span className="skills-lab-count">({group.skills.length})</span>
          </button>
        ))}
      </div>

      <div className="skills-lab-lab" ref={wrapRef}>
        <div className="skills-lab-topbar">
          <span className="skills-lab-hint">arrastra las píldoras &middot; clic en una categoría para lanzarla</span>
          <span className="skills-lab-hud">
            cuerpos <b>{hud.count}</b> &middot; en reposo <b>{hud.rest}</b>
          </span>
        </div>
        <canvas ref={canvasRef} className="skills-lab-canvas" />
      </div>

      <div className="skills-lab-controls">
        <button
          type="button"
          className="skills-lab-btn"
          aria-pressed={paused}
          onClick={togglePause}
          data-cursor="hover"
        >
          {paused ? 'Reanudar' : 'Pausar'}
        </button>
        <button
          type="button"
          className="skills-lab-btn"
          onClick={() => apiRef.current.reset?.()}
          data-cursor="hover"
        >
          Reiniciar
        </button>
        <button
          type="button"
          className="skills-lab-btn"
          aria-pressed={!gravityOn}
          onClick={toggleGravity}
          data-cursor="hover"
        >
          {gravityOn ? 'Gravedad cero' : 'Gravedad normal'}
        </button>
        <button
          type="button"
          className="skills-lab-btn"
          onClick={() => apiRef.current.shake?.()}
          data-cursor="hover"
        >
          Sacudir
        </button>
        <button
          type="button"
          className="skills-lab-btn"
          aria-pressed={soundOn}
          onClick={toggleSound}
          data-cursor="hover"
        >
          Sonido {soundOn ? 'on' : 'off'}
        </button>
      </div>
    </>
  )
}

export default function Skills() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <motion.section
      id="skills"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2 variants={fadeUpItem} className="section-title glitch" data-text="Skills">
        Skills
      </motion.h2>
      {reduced ? <StaticSkillGroups /> : <SkillsPhysicsLab />}
    </motion.section>
  )
}
