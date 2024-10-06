import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes/index'
import MainLayout from './layouts/MainLayout'
import DefaultLayout from './layouts/DefaultLayout'
import CreateAccountLayout from './layouts/CreateAccountLayout'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {
            routes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout === null) {
                Layout = CreateAccountLayout;
              }
              if (route.layout) {
                Layout = MainLayout;

              }
              let Page = route.component;
              let path = route.path;
              return <Route key={index} path={path} 
                    element={
                    <PrivateRoute isPrivate={route.isPrivate}>
                        <Layout>
                            <Page />
                        </Layout>
                    </PrivateRoute>
                    }/>
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
