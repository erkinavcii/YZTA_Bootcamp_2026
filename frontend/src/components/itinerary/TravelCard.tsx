import type { Travel } from '../../types/plan'

export default function TravelCard({ travel }: { travel: Travel }) {
  return (
    <>
      <h4>Travel</h4>
      <div className="card split">
        <div className="who">
          <span className="ic">✈️</span>
          <div className="txt">
            <b>
              Flight from {travel.origin} to {travel.destination}
            </b>
            <small>{travel.airline}</small>
          </div>
        </div>
        <div className="price">£{travel.priceGBP}</div>
      </div>
    </>
  )
}
