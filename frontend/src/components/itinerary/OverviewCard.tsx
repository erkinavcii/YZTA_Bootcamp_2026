import type { Overview } from '../../types/plan'

export default function OverviewCard({ overview, nights }: { overview: Overview; nights: number }) {
  const icon = /dental|teeth|implant/i.test(overview.procedure) ? '🦷' : '💉'
  return (
    <>
      <h4>Itinerary Overview</h4>
      <div className="card">
        <div className="row">
          <span className="ic">{icon}</span> {overview.procedure} at '{overview.clinicName}'
        </div>
        <div className="row muted">
          <span className="ic">⏱</span> {nights} nights
        </div>
      </div>
    </>
  )
}
