import React, { useState, useContext, createContext } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { AuthService, UserService } from '../services';
import {status} from '../services/address.service';

const APIcontext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [locationStatus, setLocationStatus] = useState(status.INITIAL);
    const [defaultLocation, setDefaultLocation] = useState({lat: null, lon: null});
    const [loading, setLoading] = useState(true);
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    console.log('isProgress status: ' + inProgress, account, user, loading);
    React.useEffect(() => {
        setLoading(true);
        if (!account && inProgress === 'none') {
            console.log('no account and none in progress')
            setLoading(false);
        }
        if (account && inProgress === 'none') {
            instance.acquireTokenSilent({
                scopes: ["scope test"],
                account: account
            }).then((response) => {
                console.log(response);
                if (response) {
                    
                    AuthService.token = response.accessToken;
                    UserService.validate({...response.account, role: "BUYER"})
                        .then((data) => {
                            AuthService.authUser = data;
                            setUser({...response.account, account: data});
                            console.log('Auth Service updated', AuthService);
                            setLoading(false);
                        })
                        .catch((err) => {
                            AuthService.authUser = null
                            setLoading(false);
                        })
                }
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [account, inProgress]);

    return <APIcontext.Provider value={{ user, setUser, loading, instance, setLocationStatus, locationStatus, defaultLocation, setDefaultLocation}}>
        {children}
    </APIcontext.Provider>
}

// context hook
export function useUserInfo() {
    return useContext(APIcontext);
}