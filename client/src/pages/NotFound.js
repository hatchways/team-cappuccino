import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div style={{
        marginTop: '5rem',
        marginLeft: '3rem'
    }}>
        <h1>404! Page is not found! </h1>
        <Link to="/">Return to home!</Link>
    </div>
);


export default NotFoundPage;