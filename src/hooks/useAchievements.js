import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { unlockableAchievements } from '../data/unlockables.js'

const STORAGE_KEY = 'riassd-achievements'

function readUnlocked() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

let unlocked = readUnlocked()
const listeners = new Set()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked))
  } catch {
    // localStorage unavailable (private mode, quota) — unlocks stay in-memory only
  }
}

export function unlockAchievement(id) {
  if (unlocked.includes(id)) return false

  unlocked = [...unlocked, id]
  persist()
  listeners.forEach((fn) => fn(unlocked))

  const item = unlockableAchievements.find((a) => a.id === id)
  if (item) {
    toast(`${item.icon} Logro desbloqueado: ${item.label}`, { description: item.desc })
  }
  return true
}

export function useAchievements() {
  const [state, setState] = useState(unlocked)

  useEffect(() => {
    listeners.add(setState)
    return () => listeners.delete(setState)
  }, [])

  return state
}
