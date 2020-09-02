import React from 'react';
import {Link} from 'react-router-dom'

const Pages404 = () => {
    return (
        // <div>
        //     404 Page not found
        //     <Link to='/'>
        //         <button>Back to Home</button>
        //     </Link>
        // </div>
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions">
                            <Link to='/'><a className="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>Take me back to Home</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pages404