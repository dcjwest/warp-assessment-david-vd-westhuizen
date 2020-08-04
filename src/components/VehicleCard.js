import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, Button, Overlay, Tooltip } from 'react-bootstrap';
import { MdAddShoppingCart } from 'react-icons/md';

const VehicleCard = ({ vehicle, formatPriceValue, addToCart, cartItems }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const target = useRef(null);

    function handleClick() {
        // Inform user that only one of each vehicle is allowed in the cart.
        if (showTooltip) return;
        if (cartItems && cartItems.some(item => item.id === vehicle.id)) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 3000);
            return;
        }
        
        addToCart(vehicle);
    }
    return (
        <Card className='mb-4 mx-auto' style={{maxWidth: 650}}>
            <Card.Body>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                    <div className='d-flex flex-column'>
                        <div className='d-flex'>
                            <Card.Title className='mr-2'>
                                {`${vehicle.manufacturer} ${vehicle.model}`}
                            </Card.Title> | 
                            <Card.Link className='ml-2' href={vehicle.wiki} target='_blank'>Wiki Details</Card.Link>
                        </div>
                        <Card.Img src={`images/${vehicle.manufacturer}_${vehicle.model}.jpg`} />
                    </div>
                    <div className='d-flex flex-column ml-4' style={{minWidth: '40%'}}>
                        <ListGroup variant='flush' className='mb-2'>
                            <ListGroup.Item>
                                <span className='mr-2 font-weight-bolder'>Price:</span>
                                <span className='text-muted'>{formatPriceValue(vehicle.price)}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span className='mr-2 font-weight-bolder'>Make:</span>
                                <span className='text-muted'>{vehicle.manufacturer}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span className='mr-2 font-weight-bolder'>Model:</span>
                                <span className='text-muted'>{vehicle.model}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span className='mr-2 font-weight-bolder'>Body:</span>
                                <span className='text-muted'>{vehicle.body}</span>
                            </ListGroup.Item>
                        </ListGroup>
                        <Button ref={target} size='sm' onClick={handleClick}>
                            <MdAddShoppingCart style={{ fontSize: '1.2em', marginRight: 5 }} />
                            <span>Add to Cart</span>
                        </Button>
                        <Overlay target={target.current} show={showTooltip} placement='top'>
                            <Tooltip>Only one of each vehicle allowed in cart.</Tooltip>
                        </Overlay>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = state => {
    return {
      cartItems: state.cartItems
    }
};

export default connect(mapStateToProps)(VehicleCard);
