import { createBrowserRouter, createRoutesFromElements, Route, useRouteError } from 'react-router-dom';

import App from './App';
import Root from './screens/Root';
import StreamerProfile, { loader as streamerProfileLoader } from './screens/StreamerProfile';

const ErrorPage = () => {
    const error = useRouteError(); console.log(error); return <h1>Error</h1>
}

export default createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'
            element={<Root />}>
            <Route index element={<App />} />
            <Route path='/react' element={<App />} />
            <Route path='/profile/:streamerAlias'
                element={<StreamerProfile />}
                errorElement={<ErrorPage />}
                loader={streamerProfileLoader} />
        </Route>
    )
);