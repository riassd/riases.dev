import { useEffect, useState } from 'react'

const CACHE_KEY = 'gh-stats-cache-v1'
const CACHE_TTL = 1000 * 60 * 60

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.savedAt > CACHE_TTL) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // storage unavailable (private mode, quota) — skip caching silently
  }
}

async function fetchStats(username) {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`),
  ])
  if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

  const user = await userRes.json()
  const repos = await reposRes.json()

  const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0)
  const latest = repos[0]

  return {
    publicRepos: user.public_repos ?? repos.length,
    followers: user.followers ?? 0,
    stars,
    latestRepo: latest
      ? { name: latest.name, url: latest.html_url, pushedAt: latest.pushed_at }
      : null,
  }
}

export function useGithubStats(username) {
  const [state, setState] = useState({ status: 'loading', data: readCache() })

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setState({ status: 'ready', data: cached })
      return
    }

    let cancelled = false
    fetchStats(username)
      .then((data) => {
        if (cancelled) return
        writeCache(data)
        setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', data: null })
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return state
}
