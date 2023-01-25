import { createBrowserRouter, createRoutesFromElements, Route, useRouteError } from 'react-router-dom';

import Root from './screens/Root';
import StreamerProfile, { loader as streamerProfileLoader } from './screens/StreamerProfile';
import ChooseAvatarAnimation, { loader as chooseAvatarAnimationLoader } from './screens/ChooseAvatarAnimation';
import Hub from './screens/Hub';
import Avatar from './routes/Hub/Avatar';
import How from './routes/Hub/How';
import Download from './routes/Hub/Download';

const ErrorPage = () => {
    const error = useRouteError(); console.log(error); return <h1>Error</h1>
}

export default createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'
            element={<Root />}>
            <Route path='/profile/:streamerAlias'
                element={<StreamerProfile />}
                errorElement={<ErrorPage />}
                loader={streamerProfileLoader} />
            <Route path='/avatar/animation/:avatarId/:animationId'
                element={<ChooseAvatarAnimation />}
                errorElement={<ErrorPage />}
                loader={chooseAvatarAnimationLoader} />
            <Route path='/hub'
                element={<Hub />}
                errorElement={<ErrorPage />}
            >
                <Route path='/hub/avatar'
                    element={<Avatar />}
                    errorElement={<ErrorPage />}
                />
                <Route path='/hub/how'
                    element={<How />}
                    errorElement={<ErrorPage />}
                />
                <Route path='/hub/download'
                    element={<Download />}
                    errorElement={<ErrorPage />}
                />
            </Route>
        </Route>
    )
);

// export default createBrowserRouter([
//     {
//         path: "/hub",
//         element: <Hub />,
//         children: [
//             {
//                 path: '/hub/avatar',
//                 element: <Avatar />,
//                 errorElement: <ErrorPage />
//             }
//         ],
//         errorElement: <ErrorPage />
//     }
// ])