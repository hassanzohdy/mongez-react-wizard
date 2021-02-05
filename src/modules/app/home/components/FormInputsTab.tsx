import React from 'react'
import { AddRowButton, DeleteRowButton, For, Log, RowWrapper } from 'reactor/components'
import { toStudlyCase } from 'reinforcements'
import { InputsWrapper, InputWrapper, RowHeading } from './Helpers';
import { formInputTypes, typeExceptPlaceholder } from './flags';
import { Checkbox, NumberInput, SelectInput, TextInput } from 'reactor/form';

export default function FormInputsTab({ appSettings }) {
    const createInput = () => ({
        type: null,
        autoFocus: false,
        newRow: false,
        placeholder: null,
        required: true,
        label: null,
        service: null,
        name: null,
    });

    const [inputs, setInputs] = React.useState([createInput()]);

    const [hiddenPlaceholder, sethiddenPlaceholder] = React.useState(false)

    const hiddenPlaceholderInput = (index, value) => {
        inputs[index].type = value

        setInputs(inputs)
        
        let hide = typeExceptPlaceholder.includes(value) ? true : false

        sethiddenPlaceholder(hide)        
    }
    return (
        <>
            <RowHeading heading={"Form Inputs"} />
            <For array={inputs} render={(input, index) => (
                <>
                    <RowWrapper item={input} component={InputsWrapper}>
                        <InputsWrapper>
                            <InputWrapper>
                                <SelectInput label="Input Type" items={formInputTypes} name={`form.inputs.${index}.type`} value={input.type} onChange={item => hiddenPlaceholderInput(index, item.value)} required />
                            </InputWrapper>
                            <InputWrapper>
                                <TextInput label="Label" margin="none" name={`form.inputs.${index}.label`} value={input.label} onChange={e => input.label = e.target.value} required/>
                            </InputWrapper>
                            <InputWrapper hidden={hiddenPlaceholder}>
                                <TextInput margin="none" label="Input placeholder" name={`form.inputs.${index}.placeholder`} value={input.placeholder}  onChange={e => input.placeholder = e.target.value} required/>
                            </InputWrapper>
                        </InputsWrapper>
                        <InputsWrapper>
                            <InputWrapper>
                                <TextInput label="Input name" name={`form.inputs.${index}.name`} value={input.name}  onChange={e => input.name = e.target.name} required/>
                            </InputWrapper>
                            <InputWrapper>
                                <TextInput label="Service name" name={`form.inputs.${index}.service`} value={input.service}  onChange={e => input.service = e.target.value} />
                            </InputWrapper>
                        </InputsWrapper>
                        <InputsWrapper>
                            <InputWrapper>
                                <Checkbox label="Auto Focus" name={`form.inputs.${index}.autoFocus`} checked={input.autoFocus}  onChange={checked => input.autoFocus = checked}/>
                            </InputWrapper>
                            <InputWrapper>
                                <Checkbox label="Required" name={`form.inputs.${index}.required`} checked={input.required} onChange={checked => input.required = checked}/>
                            </InputWrapper>
                            <InputWrapper>
                                <Checkbox label="New row" name={`form.inputs.${index}.newRow`} checked={input.newRow}  onChange={checked => input.newRow = checked}/>
                            </InputWrapper>
                            <InputWrapper xs={1}>
                                <DeleteRowButton open index={index} setItems={setInputs} items={inputs} />
                            </InputWrapper>
                        </InputsWrapper>
                        
                    </RowWrapper>
                </>
            )} />
            
            <AddRowButton items={inputs} newItem={createInput} setItems={setInputs} />
        </>
    )
}
