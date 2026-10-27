export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 ${className}`}>{children}</div>
}
