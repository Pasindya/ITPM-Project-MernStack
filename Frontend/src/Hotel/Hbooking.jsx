import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const BookingCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const BookingId = styled.div`
  background-color: #3182ce;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
`;

const HotelName = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
  word-break: break-word;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
`;

const UpdateButton = styled(Button)`
  background-color: #38a169;
  color: white;

  &:hover {
    background-color: #2f855a;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e53e3e;
  color: white;

  &:hover {
    background-color: #c53030;
  }
`;

function Hbooking({ hbooking, onDelete }) {
  const { _id, hotelName, checkIn, checkOut, guests, name, email, phone } = hbooking;
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updatehbook/${_id}`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/hbookings/${_id}`);
      onDelete(_id); // Update parent state
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  return (
    <BookingCard>
      <BookingId>Booking ID: {_id}</BookingId>
      <HotelName>{hotelName}</HotelName>
      
      <BookingDetails>
        <DetailGroup>
          <DetailLabel>Guest Name:</DetailLabel>
          <DetailValue>{name}</DetailValue>
        </DetailGroup>
        
        <DetailGroup>
          <DetailLabel>Dates:</DetailLabel>
          <DetailValue>
            {new Date(checkIn).toLocaleDateString()} – {new Date(checkOut).toLocaleDateString()}
          </DetailValue>
        </DetailGroup>
        
        <DetailGroup>
          <DetailLabel>Guests:</DetailLabel>
          <DetailValue>{guests}</DetailValue>
        </DetailGroup>
        
        <DetailGroup>
          <DetailLabel>Contact:</DetailLabel>
          <DetailValue>
            {phone} <br /> {email}
          </DetailValue>
        </DetailGroup>
      </BookingDetails>

      <ActionButtons>
        <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
      </ActionButtons>
    </BookingCard>
  );
}

export default Hbooking;