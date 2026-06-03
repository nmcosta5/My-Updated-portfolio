export default function Stats({ stats }) {
  if (!stats || stats.length === 0) return null

  return (
    <section className="stats stats-animation reveal">
      {stats.map((stat) => (
        <div className="stat" key={stat.id}>
          <h2>{stat.value}</h2>
          <span>{stat.label}<br />{stat.sublabel}</span>
        </div>
      ))}
    </section>
  )
}
