import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../Aux/Aux';

const layout = (props) => (
    <Aux>
        <Toolbar></Toolbar>
        <main>{props.children}</main>
    </Aux>
);

export default layout;
