"use client"

export function Background() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(88, 28, 135, 0.15), transparent 50%),
          radial-gradient(circle at top right, rgba(192, 132, 252, 0.1), transparent 50%),
          linear-gradient(
            to bottom right,
            rgb(10, 10, 18),
            rgb(46, 16, 74),
            rgb(88, 28, 135),
            rgb(46, 16, 74),
            rgb(10, 10, 18)
          )
        `,
        backgroundAttachment: "fixed",
        backgroundBlendMode: "soft-light, overlay, normal",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none" />
      <div
        className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundRepeat: "repeat", backgroundSize: "100px 100px" }}
      />
    </div>
  )
}

