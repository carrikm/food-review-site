import { useState } from 'react'

// A review photo that falls back to a pizza placeholder when there is no image or it fails to load.
export default function Photo({ src, alt, className, lazy = false }) {
  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) {
    return (
      <div className={`${className} photo-missing`} role="img" aria-label={`${alt} (no photo)`}>
        🍕
      </div>
    )
  }
  return <img className={className} src={src} alt={alt} loading={lazy ? 'lazy' : undefined} onError={() => setFailedSrc(src)} />
}
