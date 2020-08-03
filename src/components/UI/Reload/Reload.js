import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import Aux from '../../../hoc/Aux/Aux';

function Reload(props) {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    return (
        <Aux>
            <FontAwesomeIcon
                icon={faRedo}
                size="6x"
                color="#ffffff"
                onClick={props.refresh}
                style={{ cursor: 'pointer' }}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                className={hovered ? 'fa-spin' : ''}
            />
        </Aux>
    );
}

export default Reload;
