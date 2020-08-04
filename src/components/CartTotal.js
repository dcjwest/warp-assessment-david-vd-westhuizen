import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { MdShoppingCart } from 'react-icons/md';

const CartTotal = ({ cartItems, formatPriceValue, handleShowModal }) => {
    function calculateTotal() {
        if (cartItems && cartItems.length > 0) {
            let newTotal = cartItems.reduce((total, vehicle) => total + vehicle.price, 0);
            return formatPriceValue(newTotal);
        }
        return 'Cart Empty';
    }
    
    return (
        <div className='d-flex align-items-center'>
            <Button variant='dark' onClick={handleShowModal}>
                <IconContext.Provider 
                    value={{
                        style: {
                            color: 'white',
                            fontSize: '1.1em'
                        }
                    }}>
                    <MdShoppingCart />
                </IconContext.Provider>
            </Button>
            <span style={{color: 'white', marginLeft: 5}}>{calculateTotal()}</span>
        </div>
    );
}

const mapStateToProps = state => {
    return {
      cartItems: state.cartItems
    }
};

export default connect(mapStateToProps)(CartTotal);