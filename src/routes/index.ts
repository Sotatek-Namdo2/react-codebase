import routesConst from 'routes/routes-const';
import PrivateRoute from 'routes/private-route';
import Home from 'pages';

const routers = {
  home: {
    exact: true,
    path: routesConst.Home,
    component: Home,
    route: PrivateRoute,
  },
};

export default routers;
