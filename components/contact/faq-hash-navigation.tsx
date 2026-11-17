'use client'

import { useEffect } from 'react'

export function FaqHashNavigation() {
  useEffect(() => {
    const openQuestion = () => {
      const id = window.location.hash.slice(1)
      if (!id.startsWith('faq-')) return

      const question = document.getElementById(id)
      if (!(question instanceof HTMLDetailsElement)) return

      question.open = true
      window.requestAnimationFrame(() =>
        question.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      )
    }

    openQuestion()
    window.addEventListener('hashchange', openQuestion)
    return () => window.removeEventListener('hashchange', openQuestion)
  }, [])

  return null
}
