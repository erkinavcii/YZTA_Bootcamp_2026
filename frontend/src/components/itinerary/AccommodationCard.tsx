import type { Accommodation } from '../../types/plan'

export default function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return (
    <>
      <h4>Accommodation</h4>
      <div className="card split">
        <div className="who">
          <span className="ic">🛏️</span>
          <div className="txt">
            <b>Hotel: {accommodation.hotelName}</b>
            <small>{accommodation.nights} nights</small>
          </div>
        </div>
        <div className="price">£{accommodation.priceGBP}</div>
      </div>
    </>
  )
}
