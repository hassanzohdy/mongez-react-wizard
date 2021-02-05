import React from 'react';
import Tooltip from './Tooltip';
import ColoredIcon from './ColoredIcon';
import { trans } from './../localization';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FormContext from './../form/providers/form-provider';

export type DeleteRowButtonProps = {
    open: boolean;
    index: number;
    items: any[];
    iconColor?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    marginTop?: string | number;
    setItems: Function;
}

export default function DeleteRowButton({ marginTop = '1rem', tooltip = 'delete', icon: Icon = DeleteIcon, iconColor = "#F00", open, index, items, setItems }: DeleteRowButtonProps) {
    const { form } = React.useContext(FormContext);

    if (open === false) return null;

    const onClick = () => {
        items.splice(index, 1);

        if (form) {
            form.validForm(true);
        }

        setItems([...items]);
    };

    return (
        <Tooltip title={trans(tooltip)}>
            <IconButton style={{ marginTop }} onClick={onClick}>
                <ColoredIcon icon={Icon} color={iconColor} />
            </IconButton>
        </Tooltip>
    )
}