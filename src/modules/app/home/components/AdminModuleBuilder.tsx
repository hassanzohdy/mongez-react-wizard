import React from 'react'
import Tabs, { Tab } from 'reactor/components/Tabs';
import Form from 'reactor/form/components/Form'
import { FormContentWrapper, HeadingWrapperContent } from './Helpers'
import GeneralSettingsTab from './GeneralSettingsTab';
import TranslationsTab from './TranslationsTab';
import TableSettingsTab from './TableSettingsTab';
import FormSettingsTab from './FormSettingsTab';

export default function AdminModuleBuilder() {
    const submitForm = (e, form) => {

    };

    return (
        <>
            <HeadingWrapperContent text="Mongez Admin Module Builder" />

            <Form onSubmit={submitForm}>
                <FormContentWrapper>
                    <Tabs>
                        <Tab label="General Settings">
                            <GeneralSettingsTab />
                        </Tab>
                        <Tab label="Translations">
                            <TranslationsTab />
                        </Tab>
                        <Tab label="Table Settings">
                            <TableSettingsTab />
                        </Tab>
                        <Tab label="Form Inputs">
                            <FormSettingsTab />
                        </Tab>
                    </Tabs>
                </FormContentWrapper>
            </Form>
        </>
    )
}