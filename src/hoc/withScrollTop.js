import React, { useEffect } from 'react';
export function withScrollTop (Component) {


    return (props) => {

        useEffect(() => {
            console.log('asdlkfjasldkf')
            window.scrollTo(0, 0);
        });
        return <Component {...props} />
    };
};