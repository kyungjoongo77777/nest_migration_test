import {View} from "react-native-web";
import {BrowserRouter as Router, Route} from "react-router-dom";
import React from 'react';
import {ConfigProvider} from 'antd';
import ProviderPage from "./pages/ProviderPage";
import TransPage2 from "./pages/TransPage2";

export default function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'orange',
                },
            }}
        >
            <View>
                <Router>
                    <Route exact path="/" component={ProviderPage}/>
                    <Route exact path="/trans/:streamId" component={TransPage2}/>
                    {/*<Route exact path="/trans/:streamId" component={TransPage}/>*/}
                </Router>
            </View>
        </ConfigProvider>
    )
}


