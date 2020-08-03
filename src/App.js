import React from 'react';
import Layout from './hoc/Layout/Layout';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Feed from './containers/Feed/Feed';

const darkTheme = createMuiTheme({
    palette: {
        background: {
            default: '#0A0E21',
        },
    },
});

const App = () => {
    return (
        <MuiThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Layout>
                <Switch>
                    <Route path="/" component={Feed} />
                </Switch>
            </Layout>
        </MuiThemeProvider>
    );
};

export default App;
