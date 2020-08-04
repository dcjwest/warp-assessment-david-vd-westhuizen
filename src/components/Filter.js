import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Filter = ({ vehicleInfo, formatPriceValue, params, onParamChange, applyFilters }) => {
    let manufacturerOptions, bodyStylesOptions;

    // Generate a list of prices ranging from 0 to 10 000 000 in 200 000 increments.
    const priceOptions = [...Array(51).keys()].map((num, index) => {
        return (
            <option key={index}>{formatPriceValue(num*200000)}</option>
        );
    });

    // Isolate the manufacturer/body options into separate arrays.
    if (vehicleInfo.length > 0) {
        manufacturerOptions = generateUniqueOptions(vehicleInfo.map(vehicle => vehicle.manufacturer));
        bodyStylesOptions = generateUniqueOptions(vehicleInfo.map(vehicle => vehicle.body));
    }

    // Remove duplicates.
    function generateUniqueOptions(arr) {
        return (
            arr.filter((item, index) => arr.indexOf(item) === index)
                .map((item, index) => <option key={index}>{item}</option>)
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        applyFilters();
    }

    return (
        <Form onSubmit={handleSubmit} style={{maxWidth: 400, margin: 'auto'}}>
            {/* Manufacturer Options */}
            <Form.Group>
                <h5 className='font-weight-bolder'>Manufacturer</h5>
                <Form.Control 
                    as='select' 
                    defaultValue='Any' 
                    name='manufacturer' 
                    value={params.manufacturer} 
                    onChange={onParamChange}>
                    <option>Any</option>
                    {manufacturerOptions}
                </Form.Control>
            </Form.Group>
            {/* Body Style Options */}
            <Form.Group>
                <h5 className='font-weight-bolder'>Body Style</h5>
                <Form.Control 
                    as='select' 
                    defaultValue='Any'
                    name='body' 
                    value={params.body} 
                    onChange={onParamChange}>
                    <option>Any</option>
                    {bodyStylesOptions}
                </Form.Control>
            </Form.Group>
            {/* Price Range Options */}
            <Form.Group>
                <h5 className='font-weight-bolder'>Price Range</h5>
                {/* Minumum Value */}
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <Form.Label className='font-weight-bolder mr-2'>From</Form.Label>
                    <Form.Control 
                        as='select' 
                        defaultValue='Any'
                        name='minValue' 
                        value={params.minValue} 
                        onChange={onParamChange}
                        className='w-75'>
                        <option>Any</option>
                        {priceOptions}
                    </Form.Control>
                </div>
                {/* Maximum Value */}
                <div className='d-flex justify-content-between align-items-center'>
                    <Form.Label className='font-weight-bolder mr-2'>To</Form.Label>
                    <Form.Control 
                        as='select' 
                        defaultValue='Any'
                        name='maxValue' 
                        value={params.maxValue} 
                        onChange={onParamChange}
                        className='w-75'>
                        <option>Any</option>
                        {priceOptions}
                    </Form.Control>
                </div>
            </Form.Group>
            <Button variant='dark' type='submit' block>Submit</Button>
        </Form>
    );
}

export default Filter;
