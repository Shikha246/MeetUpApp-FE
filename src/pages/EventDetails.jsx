import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { meetId } = useParams();

  useEffect(() => {
  fetch(`http://localhost:3000/meetups/${meetId}`)
    .then(res => res.json())
    .then(data => {
      setEvent(data);  
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, [meetId]); 


  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-danger"></div></div>;
  if (!event) return <div className="text-center mt-5">No event found.</div>;

  // Helper to format the Date/Time strings
  const formatDate = (dateStr) => new Date(dateStr).toLocaleString('en-IN', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Navigation */}
      <nav className="navbar navbar-light bg-white border-bottom mb-4">
        <div className="container">
          <span className="navbar-brand text-danger fw-bold fs-3" style={{ fontStyle: 'italic' }}><Link className="nav-link fw-semibold" to="/">meetup</Link></span>
          
        </div>
      </nav>

      <div className="container">
        <div className="row">
          
          {/* LEFT: Event Details */}
          <div className="col-lg-8">
            <h1 className="fw-bold mb-1">{event.eventName}</h1>
            <p className="text-muted">Hosted By: <br/><span className="text-dark fw-bold">{event.hostedBy}</span></p>
            
            <img 
              src={event.coverImgUrl} 
              className="img-fluid rounded shadow-sm mb-4 w-100" 
              alt="Event Cover"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />

            <h4 className="fw-bold">Details:</h4>
            <p className="text-secondary lh-base" style={{ textAlign: 'justify' }}>{event.details}</p>

            <h4 className="fw-bold mt-4">Additional Information:</h4>
            <p className="mb-1"><strong>Dress Code:</strong> {event.dressCode}</p>
            <p><strong>Age Restrictions:</strong> {event.ageRestrictions}</p>

            <h4 className="fw-bold mt-4">Event Tags:</h4>
            <div className="d-flex gap-2 mb-4">
              {event.eventTags.map(tag => (
                <span key={tag} className="badge bg-danger px-3 py-2">{tag}</span>
              ))}
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="ms-2">
                  <div className="small fw-bold">{formatDate(event.startDateTime)} to</div>
                  <div className="small fw-bold">{formatDate(event.endDateTime)}</div>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="ms-2">
                  <div className="fw-bold">{event.location.city}</div>
                  <div className="text-muted small">{event.location.plotNo}, {event.location.address}</div>
                </div>
              </div>
              
              <div className="fs-5 fw-bold text-dark mt-2">₹ {event.amount.toLocaleString('en-IN')}</div>
            </div>

            <h5 className="fw-bold mb-3">Speakers: ({event.speakers.length})</h5>
            <div className="row g-3 mb-4">
              {event.speakers.map((speaker) => (
                <div key={speaker._id} className="col-6">
                  <div className="card border-0 shadow-sm text-center p-3 h-100">
                    <img 
                      src={speaker.speakersImageUrl} 
                      className="rounded-circle mx-auto mb-2" 
                      width="60" height="60" 
                      alt={speaker.speakersName} 
                    />
                    <div className="fw-bold small">{speaker.speakersName}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{speaker.speakersProfession}</div>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetails;