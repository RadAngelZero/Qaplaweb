import { RouterProvider } from 'react-router-dom';
import AuthProvider from './AuthProvider';

import Router from './Router';

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={Router} />
        </AuthProvider>
    );
}

export default App;