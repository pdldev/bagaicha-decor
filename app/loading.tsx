export default function Loading() {
  return (
    <main
      className="mx-auto max-w-7xl animate-pulse px-5 pt-32 pb-20 sm:px-8 lg:px-12"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="bg-surface h-3 w-24" />
      <div className="bg-surface mt-6 h-24 max-w-3xl" />
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index}>
            <div className="bg-surface aspect-[4/5]" />
            <div className="bg-surface mt-4 h-6 w-3/4" />
            <div className="bg-surface mt-2 h-5 w-1/3" />
            <div className="bg-surface mt-3 h-4 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  )
}
