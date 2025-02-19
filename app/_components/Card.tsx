import type React from "react"
export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`card ${className || ""}`}>{children}</div>
)

export const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`card-body ${className || ""}`}>{children}</div>
)