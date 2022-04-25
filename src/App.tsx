import {Suspense,lazy} from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import {Login, NewSeller, Dashboard, ThankYou, Checkout, CheckoutPrivate, OrderConfirmation, Profile, SwitchPage } from './pages';
import { LoginButton, Loader, ErrorSnackbar } from './components';
import { useUserInfo } from './contexts';
import './App.scss';
const AuthPage =lazy(()=>import( './pages/Auth/auth'));
function App() {
  const {user, loading } = useUserInfo();
  return (
    <div className="App">
      <Suspense fallback={<Loader msg={undefined} />}>
          <Router>
              <Switch>
                  <Route path="/sell/new" component={NewSeller} />
                  <Route path="/sell/thankyou" component={ThankYou} />
                  <Route path="/userpages/login" component={Login} />
                  <Route path="/order/confirmation/:id" component={OrderConfirmation} />
                  <Route path="/switch/:id" component={SwitchPage} />
                  {/* <Route path = '/cancel_order/:id' component={CancelOrder} /> */}
                  <Route path="/auth" component={AuthPage}>
                  </Route>
                
                  
              </Switch>
          </Router>         
      </Suspense>
    </div>
    
  );
}

export default App;
