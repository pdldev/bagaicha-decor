export default function Loading() {
  return (
    <main
      className="mx-auto max-w-7xl animate-pulse px-6 py-32 sm:px-10 lg:px-16"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="bg-surface h-3 w-24 rounded" />
      <div className="bg-surface mt-6 h-24 max-w-3xl rounded" />
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        <div className="bg-surface aspect-[4/5] rounded" />
        <div className="bg-surface aspect-[4/5] rounded" />
        <div className="bg-surface aspect-[4/5] rounded" />
      </div>
    </main>
  )
}
