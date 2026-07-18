import type { Doctor } from '../../types/plan'

export default function MedicalProfileCard({ doctor }: { doctor: Doctor }) {
  return (
    <>
      <h4>Medical Profile</h4>
      <div className="card doctor">
        <div className="doc-photo">{doctor.initials}</div>
        <div>
          <b>{doctor.name}</b>
          <small>{doctor.specialty}</small>
          <small>{doctor.yearsExperience}+ years experience</small>
          <div className="rating">
            Ratings: <b>{doctor.rating}/5</b>
            {doctor.boardCertified && (
              <>
                {' · '}
                <span className="badge">Board Certified</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
