import React from 'react'
import Tabs, { Tab } from 'reactor/components/Tabs';
import Form from 'reactor/form/components/Form'
import { FormContentWrapper, HeadingWrapperContent } from './Helpers'
import GeneralSettingsTab from './GeneralSettingsTab';
import TranslationsTab from './TranslationsTab';
import TableSettingsTab from './TableSettingsTab';
import FormInputsTab from './FormInputsTab';

export default function AdminModuleBuilder({ appSettings }) {
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

    const submitForm = (e, form) => {

    };

    return (
        <>
            <HeadingWrapperContent text="Mongez Admin Module Builder" />

            <Form onSubmit={submitForm}>
                <FormContentWrapper>
                    <Tabs value={2}>
                        <Tab label="General Settings">
                            <GeneralSettingsTab setData={setData} setFromInput={setFromInput} data={data} appSettings={appSettings} />
                        </Tab>
                        <Tab label="Translations">
                            <TranslationsTab appSettings={appSettings} />
                        </Tab>
                        <Tab label="Table Settings">
                            <TableSettingsTab appSettings={appSettings} />
                        </Tab>
                        <Tab label="Form Inputs">
                            <FormInputsTab appSettings={appSettings} />
                        </Tab>
                    </Tabs>
                </FormContentWrapper>
            </Form>
        </>
    )
}