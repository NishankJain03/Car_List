import React from 'react';
import './CarCard.css';

function CarCard({ car }) {
  const carData = [
    { label: 'People:', value: car.people },
    { label: 'Year:', value: car.year },
    { label: 'Fuel Type:', value: car.fuelType },
    { label: 'Transmission:', value: car.transmission },
    { label: 'Rent:', value: car.rent }
  ];

  const renderCarData = () => {
    return carData.map((carDatum, index) => {
      if (index % 2 === 0) {
        return (
          <tr key={carDatum.label}>
            <td>{carDatum.value}</td>
          </tr>
        );
      } else {
        return (
          <tr key={carDatum.label}>
            <td>{carDatum.value}</td>
          </tr>
        );
      }
    });
  };

  return (
    <div className="car-card">
      <img
        src={car.imageUrl}
        alt={car.name}
        className="car-image" // Add a CSS class for the image
      />
      <h2>{car.name}</h2>
      <div className="car-data-container">
        <table >
          <tbody>{renderCarData()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default CarCard;