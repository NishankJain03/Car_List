import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import SearchBar from './SearchBar';
import './CarList.css';

function CarList() {
  const [carData, setCarData] = useState([]);
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const maxPages = 10; // Maximum number of pages to display

  useEffect(() => {
    fetch('/carData.json')
      .then((response) => response.json())
      .then((data) => {
        setCarData(data);
        updateFilteredData(data, 1);
      })
      .catch((error) => console.error('Error fetching car data:', error));
  }, []);

  const updateFilteredData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data.slice(startIndex, endIndex);
    setFilteredCarData(slicedData);
  };

  const handleSearch = (searchText) => {
    if (!searchText) {
      // If search text is empty, show all cars
      updateFilteredData(carData, currentPage);
    } else {
      const filteredCars = carData.filter((car) =>
        car.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCarData(filteredCars);
    }
  };
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= maxPages) {
      setCurrentPage(pageNumber);
      updateFilteredData(carData, pageNumber);
      // Change the URL when clicking a page number
      window.history.pushState(null, null, `/page${pageNumber}`);
    }
  };

  const handleNextClick = () => {
    if (currentPage < maxPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updateFilteredData(carData, nextPage);
      // Change the URL when clicking "Next"
      window.history.pushState(null, null, `/page${nextPage}`);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      updateFilteredData(carData, prevPage);
      // Change the URL when clicking "Previous"
      window.history.pushState(null, null, `/page${prevPage}`);
    }
  };

  const handleRentNowClick = (carId) => {
    // Handle the "Rent Now" button click, e.g., redirect to a booking page
    // Here, you can add your logic to navigate to the booking page for the selected car
    alert(`You successfully rented a car${carId}`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="car-card-container">
        {filteredCarData.map((car) => (
          <div key={car.id} className="car-card">
            <CarCard car={car} />
            <button
              className="rent-now-button"
              onClick={() => handleRentNowClick(car.id)}
            >
              Rent Now
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="prev-button"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: maxPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="next-button"
          onClick={handleNextClick}
          disabled={currentPage === maxPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CarList;
