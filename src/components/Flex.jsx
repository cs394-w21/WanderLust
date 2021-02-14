import React from 'react';
import Box from '@material-ui/core/Box';


const Flex = ( props ) => {
    return (
        <Box display='flex' component='div' {...props}>
            {props.children}
        </Box>
    )
}

export default Flex;