export function useGoal(
  code: string,
  cents?: number,
  debug?: boolean
): () => void

export function blockTracking(): void

export function enableTracking(): void

export function trackPageview(options: {
  url?: string
  referrer?: string
  debug?: boolean
}): void
