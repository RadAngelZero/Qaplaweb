import { createBrowserRouter, createRoutesFromElements, Route, useRouteError } from 'react-router-dom';

import SignIn from './screens/SignIn';
import Reaction from './screens/Reaction';
import ProtectedRoute from './components/ProtectedRoute';
import Root from './screens/Root';
import StreamerProfile, { loader as streamerProfileLoader } from './screens/StreamerProfile';
import ChooseAvatarAnimation, { loader as chooseAvatarAnimationLoader } from './screens/ChooseAvatarAnimation';

const ErrorPage = () => {
    const error = useRouteError(); console.log(error); return <h1>Error</h1>
}

export default createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'
            element={<Root />}>
            <Route index element={
                <ProtectedRoute>
                    <Reaction />
                </ProtectedRoute>
            } />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/react' element={
                <ProtectedRoute>
                    <Reaction />
                </ProtectedRoute>
            } />
            <Route path='/profile/:streamerAlias'
                element={<StreamerProfile />}
                errorElement={<ErrorPage />}
                loader={streamerProfileLoader} />
            <Route path='/avatar/animation/:avatarId/:animationId'
                element={<ChooseAvatarAnimation />}
                errorElement={<ErrorPage />}
                loader={chooseAvatarAnimationLoader} />
        </Route>
    )
);