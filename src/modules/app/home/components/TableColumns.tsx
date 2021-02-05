import React from 'react'
import { Obj } from 'reinforcements';
import { styled } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import { useForceUpdate } from 'reactor/hooks';
import AppSettingsContext from './AppSettingsContext';
import TableBadgeSettings from './TableBadgeSettings';
import { Checkbox, SelectInput, TextInput } from 'reactor/form';
import { InputsWrapper, InputWrapper, RowHeading } from './Helpers';
import { AddRowButton, DeleteRowButton, For, GridContainer, RowWrapper } from 'reactor/components';

const MarginedRow = styled('div')({
    marginTop: '1rem',
    marginBottom: '1rem',
});

const RowHeadingWrapper = styled('div')({
    marginBottom: '1rem',
});

const TableLinkSettings = ({ column, index }) => {
    const appSettings = React.useContext(AppSettingsContext);
    return (
        <>
            <RowHeading heading="Link Settings" />
            <InputWrapper>
                <TextInput name={`table.columns.${index}.settings.href`} value={Obj.get(column, 'settings.href')} onChange={e => Obj.set(column, 'settings.href', e.target.value)} required label="Column Href ${record}" />
            </InputWrapper>
            <InputWrapper>
                <SelectInput name={`table.columns.${index}.settings.target`} value={Obj.get(column, 'settings.target')} onChange={item => Obj.set(column, 'settings.target', item.value)} required label="Open Link In" items={appSettings.linkTargets} />
            </InputWrapper>
            <InputWrapper>
                <Checkbox name={`table.columns.${index}.settings.relative`} checked={Obj.get(column, 'settings.relative', true)} onChange={checked => Obj.set(column, 'settings.relative', checked)} required label="Relative Link" />
            </InputWrapper>
        </>
    )
};

export default function TableColumns() {
    const appSettings = React.useContext(AppSettingsContext);
    const createColumn = () => ({
        heading: null,
        key: null,
        formatter: 'default',
    });

    const [columns, setColumns] = React.useState([createColumn()]);

    const forceUpdate = useForceUpdate();

    return (
        <>
            <RowHeadingWrapper>
                <RowHeading heading="Table Columns" />
            </RowHeadingWrapper>

            <Alert severity="info">
                <AlertTitle><strong>Tip</strong></AlertTitle>
                Any Input That has <strong>{'${record}'}</strong> in its label, it means you can use the dynamic record object syntax, i.e <strong>{'${record}.name'}</strong>
            </Alert>

            <For array={columns} render={(column, index) => (
                <MarginedRow>
                    <RowWrapper item={column} component={GridContainer}>
                        <InputWrapper xs={11}>
                            <InputsWrapper>
                                <InputWrapper xs={6}>
                                    <TextInput name={`table.columns.${index}.heading`} value={column.heading} onChange={e => column.heading = e.target.value} required label="Column Heading" />
                                </InputWrapper>
                                <InputWrapper xs={6}>
                                    <TextInput name={`table.columns.${index}.heading`} value={column.heading} onChange={e => column.heading = e.target.value} required label="Column  Key (Supports Dot Notation)" />
                                </InputWrapper>
                                <InputWrapper>
                                    <SelectInput items={appSettings.columnFormatter} name={`table.columns.${index}.formatter`} value={column.formatter} onChange={item => { column.formatter = item.value; forceUpdate() }} required label="Column Formatter" />
                                </InputWrapper>
                                <InputWrapper xs={6}>
                                    <TextInput name={`table.columns.${index}.tooltip`} value={column.tooltip} onChange={e => column.tooltip = e.target.value} label="Tooltip ${record}" />
                                </InputWrapper>
                                {['link', 'imageLink'].includes(column.formatter) && <TableLinkSettings index={index} column={column} />}
                                {column.formatter == 'badge' && <TableBadgeSettings index={index} column={column} />}
                            </InputsWrapper>
                        </InputWrapper>
                        <InputWrapper xs={1}>
                            <DeleteRowButton open index={index} setItems={setColumns} items={columns} />
                        </InputWrapper>
                    </RowWrapper>
                </MarginedRow>
            )} />

            <AddRowButton items={columns} newItem={createColumn} setItems={setColumns} />
        </>
    )
}
