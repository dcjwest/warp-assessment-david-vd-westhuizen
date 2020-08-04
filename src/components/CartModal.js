import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../state/actionCreators';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

const CartModal = ({ showModal, handleCloseModal, cartItems, removeFromCart }) => {
    let itemList;

    if (cartItems && cartItems.length > 0) {
        itemList = cartItems.map(item => {
            return (
                <ListGroup.Item 
                    key={item.id} 
                    className='d-flex justify-content-between'
                >
                    {`${item.manufacturer} ${item.model}`}
                    <Button 
                        variant='danger' 
                        onClick={() => removeFromCart(item.id)}
                    >
                        <MdDelete style={{ fontSize: '1.2em', marginRight: 5 }} />
                        <span>Remove</span>
                    </Button>
                </ListGroup.Item>
            )
        });
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Cart Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!itemList && <p className='text-center'>Your cart is empty...</p>}
                <ListGroup>
                    {itemList}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

const mapStateToProps = state => {
    return {
      cartItems: state.cartItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (id) => dispatch(removeFromCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
