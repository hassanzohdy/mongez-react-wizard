import React from 'react';
import { filterInputTypes } from './flags';
import { InputsWrapper, InputWrapper, RowHeading } from './Helpers'
import { NumberInput, SelectInput, TextInput } from 'reactor/form';
import { AddRowButton, DeleteRowButton, For, GridContainer, RowWrapper } from 'reactor/components';
import { styled } from '@material-ui/core';

const FilterWrapper = styled(GridContainer)({
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '2px dashed teal',
});

export default function TableFilter() {
    const createFilter = () => ({
        cols: 3,
        type: null,
        name: null,
        placeholder: null,
    });

    const [filters, setFilters] = React.useState([createFilter()]);

    return (
        <>
            <RowHeading heading="Table Filter" />

            <For array={filters} render={(filter, index) => (
                <>
                    <RowWrapper item={filter} component={FilterWrapper}>
                        <InputWrapper>
                            <InputsWrapper>
                                <InputWrapper xs={6}>
                                    <SelectInput items={filterInputTypes} name={`table.filters.${index}.type`} value={filter.type} onChange={item => filter.type = item.value} required label="Filter Type" />
                                </InputWrapper>
                                <InputWrapper xs={6}>
                                    <NumberInput margin="none" min={0} max={12} name={`table.filters.${index}.cols`} value={filter.cols} onChange={e => filter.cols = e.target.value} required label="Filter Columns Size" />
                                </InputWrapper>
                                <InputWrapper>
                                    <TextInput margin="none" name={`table.filters.${index}.name`} value={filter.name} onChange={e => filter.name = e.target.value} required label="Filter Server Name" />
                                </InputWrapper>
                                <InputWrapper>
                                    <TextInput margin="none" name={`table.filters.${index}.placeholder`} value={filter.placeholder} onChange={e => filter.placeholder = e.target.value} required label="Filter Placeholder" />
                                </InputWrapper>
                            </InputsWrapper>
                        </InputWrapper>
                        <InputWrapper xs={1}>
                            <DeleteRowButton marginTop={0} open index={index} setItems={setFilters} items={filters} />
                        </InputWrapper>
                    </RowWrapper>
                </>
            )} />

            <AddRowButton items={filters} newItem={createFilter} setItems={setFilters} />
        </>
    )
}
