import React from 'react';
import Label from './Label';
import Is from '@flk/supportive-is';
import Globals from '../../globals';
import { Random } from 'reinforcements';
import { trans } from './../../localization';
import { toInputName } from 'reinforcements';
import { getItem } from '../utils/select-items';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Select, FormHelperText } from '@material-ui/core';
import { selectItems, RenderSelectedValues } from './SelectInputHelpers';
import useRequiredInputValidator from '../hooks/use-required-input-validator';

function defaultMapItem(item) {
    if (Is.string(item)) {
        item = {
            label: trans(item),
            value: item,
        }
    }
    else if (Is.numeric(item)) {
        item = {
            label: item,
            value: item,
        };
    } else if (Is.plainObject(item)) {
        let label = item.label || item.text || item.name;

        if (Is.plainObject(label) && label[Globals.localeCode]) {
            label = label[Globals.localeCode];
        }

        item = {
            ...item,
            label: label,
            value: item.value || item.id
        };
    }

    return item;
}

interface SelectProps {
    id?: string;
    label?: string;
    name?: string;
    grouped?: boolean;
    classes?: any;
    fullWidth?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
    onChange?: Function;
    lazyLoading?: boolean;
    request?: Function;
    mapResponse?: Function;
    labelId?: string;
    placeholder?: string;
    required?: boolean;
    value?: any;
    items?: any[];
    imagable?: boolean | string;
    iconable?: boolean;
    multiple?: boolean;
    readOnly?: boolean;
    mapItem?: Function;
    none?: boolean;
}

export default function SelectInput(props: SelectProps) {
    const mapItems = items => {
        if (!items) return [];
        return items.map(mapItem);
    };

    const defaultMapResponse = response => {
        return mapItems(response.data.records);
    };

    let { id, label, name, grouped, classes = {}, mapItem = defaultMapItem, fullWidth = true, variant = 'outlined', onChange, lazyLoading, request, mapResponse = defaultMapResponse, labelId, placeholder, required, value = '', items, imagable, iconable, multiple, readOnly, none, ...otherProps } = props;
    // for multiple selections
    if (multiple && !value) {
        value = [];
    }

    const [currentItems, setItems] = React.useState(mapItems(items || []));

    const [isLoading, setLoading] = React.useState(lazyLoading);

    const [loaded, requestIsLoaded] = React.useState(false);

    const adjustValue = value => {
        if (isLoading) return multiple ? [] : '';

        if (value === null) return multiple ? [] : '';

        if (Is.numeric(value)) return Number(value);

        return value;
    };

    const [opened, setOpenedStatus] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentValue, setValue] = React.useState(adjustValue(value));
    // get the item object for the given value
    const componentRef = React.useRef(null);

    const clearRequiredInput = useRequiredInputValidator(required, componentRef, currentValue, setError);

    const hasError = Boolean(error);

    // const checkNoneItem = React.useCallback(() => {
    const checkNoneItem = (() => {
        if (none && !currentItems.find(item => item.none)) {
            // add none 
            const noneItem = {
                value: '',
                label: trans('none'),
                none: true,
            };

            setItems([noneItem, ...currentItems]);
        }
    });

    // const checkPlaceholder = React.useCallback(() => {
    const checkPlaceholder = (() => {
        if (placeholder && currentItems && !currentItems.find(item => item.placeholder)) {
            const placeholderItem = {
                value: '',
                label: trans(placeholder),
                disabled: true,
                placeholder: true,
            };

            setItems([placeholderItem, ...currentItems]);
        }
    });

    React.useEffect(() => {
        if (Is.undefined(items)) return;

        setItems(mapItems(items));
        checkPlaceholder();
        checkNoneItem();
    }, [items]);

    // terminate the select input with clearing the required validation
    React.useEffect(() => {
        return () => clearRequiredInput(true);
    }, []);

    React.useEffect(() => {
        if (value === null) return;

        setValue(adjustValue(value));
    }, [value]);

    React.useEffect(() => {
        if (!lazyLoading || loaded) return;

        request().then(response => {
            const items = mapResponse(response);

            checkPlaceholder();
            checkNoneItem();

            setItems(items);
            requestIsLoaded(true);
            setLoading(false);
            if (value !== null) {
                setValue(value || '');
            }
        });

    }, [lazyLoading, loaded, request, mapResponse, placeholder, value]);

    checkPlaceholder();
    checkNoneItem();

    const handleChange = (event) => {
        let value = event.target.value;
        setValue(value);

        // select the item by value
        let item = getItem(currentItems, value);

        // set the item as an argument for the onChange event 
        onChange && onChange(item);

        if (value) {
            clearRequiredInput();
        }
    };

    return (
        <FormControl variant={variant} fullWidth={fullWidth} className={classes.formControl} error={hasError}>
            <Label component={InputLabel} required={required} id={labelId} label={label} />
            <Select
                id={id}
                displayEmpty
                label={label}
                ref={componentRef}
                labelId={labelId}
                onOpen={() => setOpenedStatus(true)}
                onBlur={() => setOpenedStatus(false)}
                multiple={multiple}
                value={currentValue}
                name={toInputName(name)}
                onChange={handleChange}
                renderValue={selected => <RenderSelectedValues imagable={imagable} grouped={grouped} opened={opened} placeholder={placeholder} label={label} items={currentItems} selected={selected} />}
                children={selectItems(currentItems, grouped, isLoading, imagable)}
                {...otherProps}
            />

            {hasError &&
                <FormHelperText error={hasError}>{error}</FormHelperText>
            }

        </FormControl>
    );
}

SelectInput.defaultProps = {
    id: Random.id(),
    labelId: Random.id(),
    value: '',
}