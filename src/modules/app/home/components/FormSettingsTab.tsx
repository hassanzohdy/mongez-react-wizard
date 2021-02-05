import React from 'react'
import { InputsWrapper, InputWrapper, MultiRowWrapper, RowHeading } from './Helpers';
import { AutoComplete, Checkbox, ChipInput, SelectInput, SubmitButton, TextInput } from 'reactor/form';
import { AddRowButton, DeleteRowButton, For, If, RowWrapper, TextRight } from 'reactor/components'
import AppSettingsContext from './AppSettingsContext';
import { useForceUpdate } from 'reactor/hooks';
import { Obj } from 'reinforcements';
import { styled } from '@material-ui/core';
import { adminColor } from './flags';

const selectTypes = [
    { label: 'List Of Items', value: 'items' },
    { label: 'Service API', value: 'service' },
];

const SubmitFormButton = styled(SubmitButton)({
    background: adminColor,
    color: '#FFF',
    '&:hover': {
        backgroundColor: adminColor,
    }
})

export default function FormSettingsTab() {
    const appSettings = React.useContext(AppSettingsContext);

    const [isFullScreen, setFullScreen] = React.useState(false);

    const createInput = () => ({
        name: null,
        type: null,
        label: null,
        newRow: false,
        service: null,
        required: true,
        autoFocus: false,
        placeholder: null,
    });

    const [inputs, setInputs] = React.useState([createInput()]);

    const [hiddenPlaceholder, setHiddenPlaceholder] = React.useState(false)

    const hiddenPlaceholderInput = (index, value) => {
        inputs[index].type = value

        setInputs(inputs);

        setHiddenPlaceholder(appSettings.typeExceptPlaceholder.includes(value));
    };

    const forceUpdate = useForceUpdate();

    const isSelectableInput = input => ['select', 'autoComplete'].includes(input.type);

    return (
        <>
            <RowHeading heading={"Form Settings"} />
            <InputsWrapper>
                <InputWrapper>
                    <TextInput name="form.options.singleName" label="Single Name (Translation Key)" required />
                </InputWrapper>
            </InputsWrapper>

            <RowHeading heading={"Form Modal Settings"} />
            <InputsWrapper>
                <InputWrapper>
                    <SelectInput disabled={isFullScreen} value="md" name="form.options.modalOptions.size" items={appSettings.modalSizes} label="Modal SIze" none />
                </InputWrapper>
            </InputsWrapper>
            <InputsWrapper>
                <For array={appSettings.formModalOptions} render={formModalOption => (
                    <InputWrapper>
                        <Checkbox label={formModalOption.label} onChange={checked => setFullScreen(checked)} name={`form.options.modalOptions.${formModalOption.value}`} />
                    </InputWrapper>
                )} />
            </InputsWrapper>

            <RowHeading heading={"Form Inputs"} />

            <For array={inputs} render={(input, index) => (
                <>
                    <RowWrapper item={input} component={MultiRowWrapper}>
                        <InputsWrapper>
                            <InputWrapper>
                                <SelectInput label="Input Type" items={appSettings.formInputTypes} name={`form.inputs.${index}.type`} value={input.type} onChange={item => { hiddenPlaceholderInput(index, item.value); input.type = item.value; forceUpdate() }} required />
                            </InputWrapper>
                            <InputWrapper>
                                <TextInput label="Label" name={`form.inputs.${index}.label`} value={input.label} onChange={e => input.label = e.target.value} required />
                            </InputWrapper>
                            <InputWrapper hidden={hiddenPlaceholder}>
                                <TextInput label="Input placeholder" name={`form.inputs.${index}.placeholder`} value={input.placeholder} onChange={e => input.placeholder = e.target.value} required />
                            </InputWrapper>
                        </InputsWrapper>
                        <InputsWrapper>
                            <InputWrapper>
                                <TextInput label="Input name" name={`form.inputs.${index}.name`} value={input.name} onChange={e => input.name = e.target.value} required />
                            </InputWrapper>
                            <InputWrapper>
                                <TextInput label="Input Value Key (Supports Dot Notation)" name={`form.inputs.${index}.value`} value={input.value || input.name} onChange={e => input.value = e.target.value} required />
                            </InputWrapper>
                            <If condition={isSelectableInput(input)}>
                                <InputsWrapper>
                                    <InputWrapper>
                                        <SelectInput required label="Getting Data From" items={selectTypes} name={`form.inputs.${index}.selectType`} value={input.selectType} onChange={item => { input.selectType = item.value; forceUpdate(); }} />
                                    </InputWrapper>
                                    <If condition={input.selectType === 'items'}>
                                        <InputWrapper>
                                            <ChipInput label="Items Values (Comma Separate)" name={`form.inputs.${index}.items`} value={input.items} onChange={items => input.items = items} />
                                        </InputWrapper>
                                    </If>
                                    <If condition={input.selectType === 'service'}>
                                        <InputWrapper>
                                            <AutoComplete groupBy="module" label="Select Service" required items={Obj.get(appSettings, `appModules.${appSettings.currentApp}.services`, [])} name={`form.inputs.${index}.service`} value={input.service} onChange={item => input.service = item.value} />
                                        </InputWrapper>
                                    </If>
                                </InputsWrapper>
                            </If>
                        </InputsWrapper>
                        <InputsWrapper>
                            <If condition={!isSelectableInput(input)}>
                                <InputWrapper>
                                    <Checkbox label="Auto Focus" name={`form.inputs.${index}.autoFocus`} checked={input.autoFocus} onChange={checked => input.autoFocus = checked} />
                                </InputWrapper>
                                <InputWrapper>
                                    <Checkbox label="MultiLingual" name={`form.inputs.${index}.multiLingual`} checked={input.multiLingual} onChange={checked => input.multiLingual = checked} />
                                </InputWrapper>
                            </If>
                            <InputWrapper>
                                <Checkbox label="Required" name={`form.inputs.${index}.required`} checked={input.required} onChange={checked => input.required = checked} />
                            </InputWrapper>
                            <InputWrapper>
                                <Checkbox label="New Row" name={`form.inputs.${index}.newRow`} checked={input.newRow} onChange={checked => input.newRow = checked} />
                            </InputWrapper>
                            <If condition={isSelectableInput(input)}>
                                <InputWrapper>
                                    <Checkbox label="Lazy Loading" name={`form.inputs.${index}.lazyLoading`} checked={input.lazyLoading} onChange={checked => input.lazyLoading = checked} />
                                </InputWrapper>
                                <If condition={input.type == 'autoComplete'}>
                                    <InputWrapper>
                                        <Checkbox label="Remote Search Only" name={`form.inputs.${index}.searchable`} checked={input.searchable} onChange={checked => input.searchable = checked} />
                                    </InputWrapper>
                                </If>
                            </If>
                            <InputWrapper xs={1}>
                                <DeleteRowButton open index={index} setItems={setInputs} items={inputs} />
                            </InputWrapper>
                        </InputsWrapper>

                    </RowWrapper>
                </>
            )} />

            <AddRowButton items={inputs} newItem={createInput} setItems={setInputs} />

            <TextRight>
                <SubmitFormButton>Create Module</SubmitFormButton>
            </TextRight>
        </>
    )
}
