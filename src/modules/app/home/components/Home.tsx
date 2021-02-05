import React from 'react';
import endpoint from 'reactor/http';
import { useOnce } from 'reactor/hooks';
import HomeHeading from './HomeHeading';
import AdminModuleBuilder from './AdminModuleBuilder';
import AppSettingsContext from './AppSettingsContext';
import FrontOfficeModuleBuilder from './FrontOfficeModuleBuilder';

export default function Home() {
    const [moduleType, setModuleType] = React.useState(null);
    // const [moduleType, setModuleType] = React.useState('admin');

    const [appSettings, setAppSettings] = React.useState(null);

    useOnce(() => {
        endpoint.get('/settings').then(response => {
            setAppSettings(response.data);
        })
    });

    return (
        <AppSettingsContext.Provider value={appSettings}>
            {!moduleType && <HomeHeading loading={appSettings === null} setModuleType={setModuleType} />}

            {appSettings && moduleType == 'admin' && <AdminModuleBuilder />}
            {appSettings && moduleType == 'front-office' && <FrontOfficeModuleBuilder />}
        </AppSettingsContext.Provider>
    )
} 