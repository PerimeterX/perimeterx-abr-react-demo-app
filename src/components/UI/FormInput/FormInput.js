import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

class FormInput extends Component {
    state = {
        validationError: '',
    };
    render() {
        return (
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type={this.props.type}
                id={this.props.name}
                label={this.props.label}
                name={this.props.name}
                autoComplete="off"
                helperText={this.state.validationError}
                error={this.state.validationError.length > 0}
                onChange={(evt) => {
                    if (
                        evt.currentTarget.value.match(
                            this.props.validationPattern
                        )
                    ) {
                        this.setState({
                            validationError: '',
                        });
                        this.props.setValue(this.props.name, evt.target.value);
                    } else {
                        this.setState({
                            validationError: this.props.validationMessage,
                        });
                        this.props.setValue(this.props.name, '');
                    }
                }}
            />
        );
    }
}

export default FormInput;
