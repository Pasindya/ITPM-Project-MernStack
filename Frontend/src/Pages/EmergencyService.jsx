import React from 'react';

const EmergencyService = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: '#333'
    }}>
      {/* Header Section */}
      <header style={{
        backgroundColor: '#d32f2f',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Emergency Services</h1>
        <p style={{ margin: '10px 0 0', fontSize: '1.2rem' }}>
          Immediate assistance available 24/7 for your safety and security
        </p>
      </header>

       {/* Emergency Contacts */}
       <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          borderBottom: '2px solid #d32f2f',
          paddingBottom: '10px',
          fontSize: '1.8rem',
          color: '#d32f2f'
        }}>
          Emergency Contacts
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {/* Hotel Emergency */}
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#d32f2f',
              marginTop: 0,
              fontSize: '1.4rem'
            }}>Hotel Emergency</h3>
            <p style={{ margin: '10px 0' }}>
              <strong>Front Desk:</strong> Ext. 0 from any house phone
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>Security:</strong> Ext. 911 from any house phone
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>24/7 Emergency Line:</strong> +1 (555) 123-4567
            </p>
          </div>
          
          {/* Local Emergency Services */}
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#d32f2f',
              marginTop: 0,
              fontSize: '1.4rem'
            }}>Local Emergency Services</h3>
            <p style={{ margin: '10px 0' }}>
              <strong>Police:</strong> 911 or +1 (555) 987-6543
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>Fire Department:</strong> 911 or +1 (555) 987-6544
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>Ambulance:</strong> 911 or +1 (555) 987-6545
            </p>
          </div>
          
          {/* Medical Assistance */}
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#d32f2f',
              marginTop: 0,
              fontSize: '1.4rem'
            }}>Medical Assistance</h3>
            <p style={{ margin: '10px 0' }}>
              <strong>Nearest Hospital:</strong> City General (1.5 miles)
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>Hospital Phone:</strong> +1 (555) 789-0123
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>24/7 Pharmacy:</strong> Green Cross (0.8 miles)
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>Poison Control:</strong> +1 (800) 222-1222
            </p>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          borderBottom: '2px solid #d32f2f',
          paddingBottom: '10px',
          fontSize: '1.8rem',
          color: '#d32f2f'
        }}>
          Quick Action Guide
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {/* Medical Emergency Card */}
          <div style={{
            backgroundColor: '#fff0f0',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            borderTop: '4px solid #d32f2f'
          }}>
            <h3 style={{
              color: '#d32f2f',
              marginTop: 0,
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '10px' }}>🩹</span> Medical Quick Tips
            </h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Choking:</strong> Perform abdominal thrusts (Heimlich maneuver) - stand behind person, make a fist above navel, thrust upward</li>
              <li style={{ marginBottom: '10px' }}><strong>Burns:</strong> Cool with room temperature water for 10-15 mins (no ice!)</li>
              <li style={{ marginBottom: '10px' }}><strong>Nosebleed:</strong> Lean forward slightly, pinch soft part of nose for 10 mins</li>
              <li style={{ marginBottom: '10px' }}><strong>Sprains:</strong> Remember RICE - Rest, Ice, Compression, Elevation</li>
              <li style={{ marginBottom: '10px' }}><strong>Allergic reaction:</strong> Antihistamines can help mild reactions, but use epinephrine auto-injector (EpiPen) for severe symptoms</li>
            </ul>
          </div>
          
          {/* Emergency Tricks Card */}
          <div style={{
            backgroundColor: '#f0f0ff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            borderTop: '4px solid #303f9f'
          }}>
            <h3 style={{
              color: '#303f9f',
              marginTop: 0,
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '10px' }}>🆘</span> Emergency Tricks
            </h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Fire:</strong> Stay low to avoid smoke inhalation - crawl if necessary</li>
              <li style={{ marginBottom: '10px' }}><strong>Power Outage:</strong> Your phone flashlight can help - conserve battery by dimming screen</li>
              <li style={{ marginBottom: '10px' }}><strong>Lost in Hotel:</strong> Look for red EXIT signs - they always lead to safety</li>
              <li style={{ marginBottom: '10px' }}><strong>Earthquake:</strong> Drop, Cover, Hold On under sturdy furniture</li>
              <li style={{ marginBottom: '10px' }}><strong>Emergency Signal:</strong> Three loud knocks or shouts can alert others to your location</li>
            </ul>
          </div>
          
          {/* Travel Health Card */}
          <div style={{
            backgroundColor: '#f0fff0',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            borderTop: '4px solid #2e7d32'
          }}>
            <h3 style={{
              color: '#2e7d32',
              marginTop: 0,
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '10px' }}>✈️</span> Travel Health Tips
            </h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}><strong>Jet Lag:</strong> Hydrate and adjust to local time immediately</li>
              <li style={{ marginBottom: '10px' }}><strong>Motion Sickness:</strong> Focus on horizon or close your eyes, ginger can help</li>
              <li style={{ marginBottom: '10px' }}><strong>Traveler's Diarrhea:</strong> BRAT diet - Bananas, Rice, Applesauce, Toast</li>
              <li style={{ marginBottom: '10px' }}><strong>Altitude Sickness:</strong> Rest, hydrate, avoid alcohol, descend if severe</li>
              <li style={{ marginBottom: '10px' }}><strong>Sun Protection:</strong> Reapply sunscreen every 2 hours, even when cloudy</li>
            </ul>
          </div>
        </div>
      </section>

     

      {/* Emergency Procedures */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          borderBottom: '2px solid #d32f2f',
          paddingBottom: '10px',
          fontSize: '1.8rem',
          color: '#d32f2f'
        }}>
          Emergency Procedures
        </h2>
        
        <div style={{
          backgroundColor: '#fff8f8',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          borderLeft: '4px solid #d32f2f'
        }}>
          <h3 style={{ marginTop: 0, color: '#d32f2f' }}>Fire Emergency</h3>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>Activate the nearest fire alarm</li>
            <li style={{ marginBottom: '10px' }}>Call the front desk or dial 911</li>
            <li style={{ marginBottom: '10px' }}>Use stairs - DO NOT use elevators</li>
            <li style={{ marginBottom: '10px' }}>Feel doors before opening - if hot, find another exit</li>
            <li>Assemble at the designated meeting point (front parking lot)</li>
          </ol>
          <div style={{
            backgroundColor: '#ffe0e0',
            padding: '15px',
            borderRadius: '6px',
            marginTop: '15px'
          }}>
            <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
              <strong>Pro Tip:</strong> If trapped, seal door cracks with wet towels and signal from window.
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#f8f8ff',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          borderLeft: '4px solid #303f9f'
        }}>
          <h3 style={{ marginTop: 0, color: '#303f9f' }}>Medical Emergency</h3>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>Call the front desk immediately (Ext. 0)</li>
            <li style={{ marginBottom: '10px' }}>If serious, call 911 for ambulance</li>
            <li style={{ marginBottom: '10px' }}>Do not move the injured person unless absolutely necessary</li>
            <li style={{ marginBottom: '10px' }}>Our staff is trained in basic first aid until help arrives</li>
            <li>Clear the area to give the person space</li>
          </ol>
          <div style={{
            backgroundColor: '#e0e0ff',
            padding: '15px',
            borderRadius: '6px',
            marginTop: '15px'
          }}>
            <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
              <strong>First Aid Tip:</strong> For severe bleeding, apply direct pressure with clean cloth and elevate the wound if possible.
            </p>
          </div>
        </div>

        {/* Added Weather Emergency Section */}
        <div style={{
          backgroundColor: '#f8fff8',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          borderLeft: '4px solid #2e7d32'
        }}>
          <h3 style={{ marginTop: 0, color: '#2e7d32' }}>Weather Emergency</h3>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>Listen for emergency alerts on hotel PA system</li>
            <li style={{ marginBottom: '10px' }}>Move to designated safe area (basement conference room)</li>
            <li style={{ marginBottom: '10px' }}>Stay away from windows during severe storms</li>
            <li style={{ marginBottom: '10px' }}>If flooding occurs, move to higher floors</li>
            <li>Follow instructions from hotel staff</li>
          </ol>
          <div style={{
            backgroundColor: '#e0ffe0',
            padding: '15px',
            borderRadius: '6px',
            marginTop: '15px'
          }}>
            <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
              <strong>Survival Tip:</strong> In case of power outage, your room's ice bucket can be used to store medications that require refrigeration.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section>
        <h2 style={{
          borderBottom: '2px solid #d32f2f',
          paddingBottom: '10px',
          fontSize: '1.8rem',
          color: '#d32f2f'
        }}>
          Additional Resources
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{
            backgroundColor: '#f0f8ff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              fontSize: '1.5rem'
            }}>
              <span>!</span>
            </div>
            <h3 style={{ marginTop: 0 }}>Emergency Exits</h3>
            <p>Maps located on the back of your room door and throughout the hotel</p>
            <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
              <strong>Tip:</strong> Count doors to nearest exit when you arrive - helpful in smoke conditions
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#f0f8ff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              fontSize: '1.5rem'
            }}>
              <span>+</span>
            </div>
            <h3 style={{ marginTop: 0 }}>First Aid Kits</h3>
            <p>Available at the front desk, in all staff areas, and in public restrooms</p>
            <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
              <strong>Tip:</strong> A clean sanitary pad makes an excellent emergency bandage for heavy bleeding
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#f0f8ff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              fontSize: '1.5rem'
            }}>
              <span>⌂</span>
            </div>
            <h3 style={{ marginTop: 0 }}>Safe Room</h3>
            <p>Designated safe area in the basement for severe weather emergencies</p>
            <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
              <strong>Tip:</strong> Keep shoes and flashlight by your bed at night for emergencies
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '0.9rem'
      }}>
        <p>Please familiarize yourself with emergency exits and procedures upon arrival.</p>
        <p>For non-emergency assistance, please contact the front desk at Ext. 0.</p>
        <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
          Remember: In any emergency, stay calm and follow instructions from hotel staff.
        </p>
      </footer>
    </div>
  );
};

export default EmergencyService;