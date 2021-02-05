import React from 'react'
import { AddRowButton, DeleteRowButton, For, Log, RowWrapper } from 'reactor/components'
import { TextInput } from 'reactor/form';
import { toStudlyCase } from 'reinforcements'
import AppSettingsContext from './AppSettingsContext';
import { InputsWrapper, InputWrapper, RowHeading } from './Helpers';

export default function TranslationsTab() {
    const appSettings = React.useContext(AppSettingsContext);

    const newTranslation = () => {
        let translation = {
            name: null,
        };

        for (let localCode of appSettings.locales) {
            translation[localCode] = null;
        }

        return translation;
    };

    const [translations, setTranslations] = React.useState([]);

    return (
        <>
            <RowHeading heading={"Translations"} />
            <For array={translations} render={(translation, index) => (
                <>
                    <RowWrapper item={translation} component={InputsWrapper}>
                        <InputWrapper>
                            <TextInput name={`translations.${index}.name`} value={translation.name} onChange={e => translation.name = e.target.value} required label="Translation key Name" />
                        </InputWrapper>
                        <For array={appSettings.locales} render={localeCode => (
                            <InputWrapper>
                                <TextInput name={`translations.${index}.text.${localeCode}`} value={translation[localeCode]} onChange={e => translation[localeCode] = e.target.value} required label={`${toStudlyCase(localeCode)} Translation Text`} />
                            </InputWrapper>
                        )} />
                        <InputWrapper xs={1}>
                            <DeleteRowButton open index={index} setItems={setTranslations} items={translations} />
                        </InputWrapper>
                    </RowWrapper>
                </>
            )} />
            <AddRowButton items={translations} newItem={newTranslation} setItems={setTranslations} />
        </>
    )
}
