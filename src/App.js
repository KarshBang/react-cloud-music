import React from 'react'
import { GlobalStyle } from './style'
import { HashRouter } from 'react-router-dom'
import { IconStyle } from './assets/iconfont/iconfont'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { Provider } from 'react-redux'
import store from './store'
console.log(store)
const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle></GlobalStyle>
                <IconStyle></IconStyle>
                {renderRoutes(routes)}
            </HashRouter>
        </Provider>

    )
}

export default App