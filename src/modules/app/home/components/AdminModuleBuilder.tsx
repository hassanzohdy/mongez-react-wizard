import React from 'react'
import Tabs, { Tab } from 'reactor/components/Tabs';
import Form from 'reactor/form/components/Form'
import { FormContentWrapper, HeadingWrapperContent } from './Helpers'
import GeneralSettingsTab from './GeneralSettingsTab';
import TranslationsTab from './TranslationsTab';
import TableSettingsTab from './TableSettingsTab';

export default function AdminModuleBuilder({ appSettings }) {
    const submitForm = (e, form) => {

    };

    return (
        <>
            <HeadingWrapperContent text="Mongez Admin Module Builder" />

            <Form onSubmit={submitForm}>
                <FormContentWrapper>
                    <Tabs value={2}>
                        <Tab label="General Settings">
                            <GeneralSettingsTab appSettings={appSettings} />
                        </Tab>
                        <Tab label="Translations">
                            <TranslationsTab appSettings={appSettings} />
                        </Tab>
                        <Tab label="Table Settings">
                            <TableSettingsTab appSettings={appSettings} />
                        </Tab>
                    </Tabs>
                </FormContentWrapper>
            </Form>
        </>
    )
}