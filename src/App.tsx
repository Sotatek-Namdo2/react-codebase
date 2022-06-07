import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import routes from 'routes';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEagerConnect, useInactiveListener } from 'hooks';
import { themeConfig } from 'theme';
import Layout from 'components/Layout';

const App: React.FC<any> = () => {
  const { connector } = useWeb3React<Web3Provider>();
  const triedEager = useEagerConnect();

  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useInactiveListener(!triedEager || !!activatingConnector);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          ...themeConfig.palette,
        },
      }),
    [],
  );

  return (
    <React.Suspense fallback={<div>....Loading</div>}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Switch>
            {Object.keys(routes).map((key) => {
              //@ts-ignore
              const route = routes[key];
              return <route.route key={route.path} {...route} />;
            })}
            <Route path="*" />
          </Switch>
        </Layout>
      </ThemeProvider>
    </React.Suspense>
  );
};

export default App;
