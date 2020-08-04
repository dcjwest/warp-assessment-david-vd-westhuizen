import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { makeRequest, getAllVehicleData, filterVehicleData, addToCart } from './state/actionCreators';
import Header from './components/Header';
import Filter from './components/Filter';
import VehicleCard from './components/VehicleCard';
import CartModal from './components/CartModal';

const App = (props) => {
  const {
    vehicles,
    filteredVehicles,
    loading,
    error,
    makeRequest,
    getAllVehicleData,
    filterVehicleData,
    addToCart
  } = props;

  const [filterParams, setFilterParams] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    makeRequest();
    getAllVehicleData();
  }, [makeRequest, getAllVehicleData]);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  function handleFilterParamChange(e) {
    const filterName = e.target.name;
    const filterValue = e.target.value;

    setFilterParams(prevParams => {
      return { ...prevParams, [filterName]: filterValue };
    });

  }

  // Update the state with user-selected filters e.g.manufacturer, body style, etc.
  function applyFilters() {
    let formattedParams = { ...filterParams };
    
    for (let param in formattedParams) {
      // Ignore and remove any filters set to 'Any' to leave state essentially unchanged.
      if (formattedParams[param] === 'Any') {
        delete formattedParams[param];
        continue;
      }
      // Parse price range filters from string (R100 000) to integer (100000) format.
      if (param === 'minValue' || param === 'maxValue') {
        formattedParams[param] = parseInt(formattedParams[param].slice(1).replace(/\s/g, ''));
      }
    }

    filterVehicleData(formattedParams);
  }

  // Structure integer price values into well-formatted strings for the view.
  function formatPriceValue(price) {
    /* Regex for placing spaces between thousands in a large number.
      Source: https://www.codegrepper.com/code-examples/delphi/thousand+separator+javascript */
    let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `R${formattedPrice}`;
  }

  return (
    <>
      <Header formatPriceValue={formatPriceValue} handleShowModal={handleShowModal} />
      <Container className='my-5' style={{paddingTop: 50}}>
        <Row>
          <Col xs={12} md={3}>
            <Filter 
              vehicleInfo={vehicles} 
              formatPriceValue={formatPriceValue} 
              params={filterParams} 
              onParamChange={handleFilterParamChange}
              applyFilters={applyFilters}/>
          </Col>
          <Col xs={12} md={9}>
            { loading && <h2>Loading...</h2> }
            { error && <h2>An error occurred. Please refresh the page</h2> }
            { !loading && filteredVehicles.map(vehicle => {
              return (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  formatPriceValue={formatPriceValue}
                  addToCart={addToCart} />
              );
            })}
          </Col>
        </Row>
      </Container>
      <CartModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </>
  );
}

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles,
    filteredVehicles: state.filteredVehicles,
    loading: state.loading,
    error: state.error
  }
};
const mapDispatchToProps = dispatch => {
    return {
        makeRequest: () => dispatch(makeRequest()),
        getAllVehicleData: () => dispatch(getAllVehicleData()),
        filterVehicleData: (currentList, filterParams) => dispatch(filterVehicleData(currentList, filterParams)),
        addToCart: (vehicle) => dispatch(addToCart(vehicle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
