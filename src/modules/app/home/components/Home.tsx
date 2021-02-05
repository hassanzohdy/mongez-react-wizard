import React from 'react';
import { useOnce } from 'reactor/hooks';
import endpoint from 'reactor/http';
import AdminModuleBuilder from './AdminModuleBuilder';
import FrontOfficeModuleBuilder from './FrontOfficeModuleBuilder';
import HomeHeading from './HomeHeading';

export default function Home() {
    const [moduleType, setModuleType] = React.useState(null);
    // const [moduleType, setModuleType] = React.useState('admin');

    const [appSettings, setAppSettings] = React.useState(null);

    useOnce(() => {
        endpoint.get('/settings').then(response => {
            console.log(response.data);
            
            setAppSettings(response.data);
        })
    });

    return (
        <>
            {!moduleType && <HomeHeading loading={appSettings === null} setModuleType={setModuleType} />}

            {appSettings && moduleType == 'admin' && <AdminModuleBuilder appSettings={appSettings} />}
            {appSettings && moduleType == 'front-office' && <FrontOfficeModuleBuilder appSettings={appSettings} />}
        </>
    )
} 