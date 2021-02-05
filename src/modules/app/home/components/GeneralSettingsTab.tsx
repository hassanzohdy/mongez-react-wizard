import React from 'react'
import { Checkbox, SelectInput, TextInput } from 'reactor/form'
import { toCamelCase, toStudlyCase } from 'reinforcements';
import { Note, InputsWrapper, InputWrapper, RowHeading } from './Helpers';
import Alert from '@material-ui/lab/Alert';


export default function GeneralSettingsTab({ appSettings }) {
    const [data, setData] = React.useState({
        appName: null,
        moduleName: null,
        route: null,
        role: null,
        serviceRoute: null,
        serviceClassName: null,
        serviceObjectName: null,
        sidebarIconImport: null,
        sidebarIconName: null,
        viewable: false,
    });

    const setFromInput = key => e => set(key, e.target.value);

    const set = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    }

    const setModule = e => {
        let moduleName = e.target.value;

        setData({
            ...data,
            moduleName,
            route: `/${moduleName}`,
            role: moduleName,
            serviceRoute: `/${moduleName}`,
            serviceClassName: toStudlyCase(moduleName),
            serviceObjectName: toCamelCase(moduleName),
        });
    }

    return (
        <>
            <Alert severity="info">Any Non Required Input will be auto filled from the module name if no value provided.</Alert>
            <InputsWrapper>
                <RowHeading heading="App And Module Name" />
                <InputWrapper>
                    <SelectInput name="appName" value={data.appName} onChange={item => set('appName', item.value)} required items={appSettings.apps} label="App Name" />
                </InputWrapper>
                <InputWrapper>
                    <TextInput margin="none" name="moduleName" onChange={setModule} required label="Module Name" />
                </InputWrapper>
                <InputWrapper>
                    <Checkbox name="viewable" label="Has Single Details Page" checked={data.viewable} onChange={checked => setData({ ...data, viewable: checked })} />
                </InputWrapper>
            </InputsWrapper>
            <InputsWrapper>
                <RowHeading heading="Module Route And Permission" />
                <InputWrapper>
                    <TextInput name="route" value={data.route} onChange={setFromInput('route')} label="Route (Starts With /)" />
                </InputWrapper>
                <InputWrapper>
                    <TextInput name="role" value={data.role} onChange={setFromInput('role')} label="Module Role Permissions Name" />
                </InputWrapper>
            </InputsWrapper>
            <InputsWrapper>
                <RowHeading heading="Service API" />
                <InputWrapper xs={12}>
                    <TextInput name="serviceRoute" value={data.serviceRoute} onChange={setFromInput('serviceRoute')} label="API Route (Starts With /)" />
                </InputWrapper>
                <InputWrapper>
                    <TextInput name="serviceClassName" value={data.serviceClassName} onChange={setFromInput('serviceClassName')} label="Service Class Name" />
                </InputWrapper>
                <InputWrapper>
                    <TextInput name="serviceObjectName" value={data.serviceObjectName} onChange={setFromInput('serviceObjectName')} label="Service Object Name" />
                </InputWrapper>
            </InputsWrapper>
            <InputsWrapper>
                <RowHeading heading="Sidebar" />
                <InputWrapper>
                    <TextInput name="sidebar.iconName" required value={data.sidebarIconName} onChange={setFromInput('sidebarIconName')} label="Icon Name" />
                </InputWrapper>
                <InputWrapper xs={9}>
                    <TextInput name="sidebar.iconImport" required value={data.sidebarIconImport} onChange={setFromInput('sidebarIconImport')} label="Icon Import (Only the import path)" />
                </InputWrapper>
            </InputsWrapper>
        </>
    )
}
