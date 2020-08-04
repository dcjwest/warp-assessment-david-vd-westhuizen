import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import CartTotal from './CartTotal';
import { GiCarKey } from 'react-icons/gi'

const Header = ({ formatPriceValue, handleShowModal }) => {
    return (
        <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
            <Container className='px-0'>
                <Navbar.Brand href='#' style={{fontSize: '1.4em'}}>
                    <GiCarKey className='mr-2'/>
                    Vehicle Browser
                </Navbar.Brand>
                <CartTotal formatPriceValue={formatPriceValue} handleShowModal={handleShowModal} />
            </Container>
        </Navbar>
    );
}

export default Header;
