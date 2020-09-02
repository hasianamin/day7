import React from 'react';
import {Link} from 'react-router-dom'

const Pages404 = () => {
    return (
        <div>
            404 Page not found
            <Link to='/'>
                <button>Back to Home</button>
            </Link>
        </div>
    )
}

export default Pages404