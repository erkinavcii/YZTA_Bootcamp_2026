import type { TripPlan } from '../../types/plan'

export default function CostSummary({ plan }: { plan: TripPlan }) {
  const cost = plan.treatmentCostGBP.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <>
      <div className="line-item">
        <span>Treatment costs</span>
        <b>£{cost}</b>
      </div>
      <div className="line-item">
        <span>Dates</span>
        <b>
          {plan.dates.start} – {plan.dates.end}
        </b>
      </div>
      <div className="line-item link">
        <span>Booking Options</span>
        <span>›</span>
      </div>
    </>
  )
}
