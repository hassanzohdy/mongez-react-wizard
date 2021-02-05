// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import Globals from '../../globals';
import Is from '@flk/supportive-is';
import { Obj } from 'reinforcements';
import HiddenInput from './HiddenInput';
import { trans } from '../../localization';
import Avatar from '../../components/Avatar';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { getItem, getItems } from '../utils/select-items';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Checkbox, Chip, FormHelperText, styled } from '@material-ui/core';
import useRequiredInputValidator from '../hooks/use-required-input-validator';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Label from './Label';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AvatarLabel = styled('span')({
    marginLeft: '0.4rem',
});

const filter = createFilterOptions();

function mapItemInternally(item) {
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
        let label = item.label || item.text || item.name || item.title;

        if (label[Globals.localeCode]) {
            label = label[Globals.localeCode];
        }

        item = {
            ...item,
            label,
            value: item.value || item.id
        };
    }

    return item;
}

export default function AutoComplete(props: any) {
    const defaultMapResponse = response => {
        return response.data.records.map(mapItem);
    };

    let { label, request, InputProps = {}, imageable, margin = 'normal', searchable, lazyLoading, groupBy, mapItem = mapItemInternally, addable = false, closeOnSelect, onChange, loadingText = trans('loading'), noOptionsText = trans('noOptions'), autoHighlight, items, name, value, multiple, required, mapResponse = defaultMapResponse, ...otherProps } = props;
    const [open, setOpen] = React.useState(false);
    const [currentSearchText, setSearchText] = React.useState('');
    const [isLoading, setLoading] = React.useState(() => {
        if (!request) return false;

        if (!value && searchable) return false;

        return true;
    });

    const mapItems = items => {
        if (!items) return [];
        return items.map(mapItem);
    };

    const [currentItems, setItems] = React.useState(mapItems(items || []));

    const [loaded, requestIsLoaded] = React.useState(false);
    // for multiple selections
    if (multiple && !value) {
        value = [];
    }

    const adjustValue = value => {
        if (value === null) return multiple ? [] : '';

        if (Is.scalar(value) && Is.numeric(value)) {
            value = Number(value);
        }

        if (value === undefined) return null;

        let itemValue = multiple ? getItems(currentItems, value) : getItem(currentItems, value);

        return itemValue || null;
    };

    const onSelection = (e, value, reason) => {
        if (!['remove-option', 'select-option'].includes(reason)) return;

        if (addable) {
            if (Is.array(value)) {
                let lastItem = [].concat(value).pop();
                if (lastItem && !getItem(currentItems, lastItem.value)) {
                    setItems([mapItems(currentItems), lastItem]);
                }
            }
        }

        setValue(value);
        // clear the error if value is not empty 
        !Is.empty(value) && clearRequiredInput();

        // set the item as an argument for the onChange event 
        onChange && onChange(value);
        // onChange && onChange(multiple ? getItems(currentItems, value) : getItem(currentItems, value));
    }

    const [error, setError] = React.useState(null);
    const [currentValue, setValue] = React.useState(adjustValue(value));
    // get the item object for the given value
    const componentRef = React.useRef();

    const clearRequiredInput = useRequiredInputValidator(required, componentRef, currentValue, setError);
    const hasError = Boolean(error);

    // terminate the auto complete input with clearing the required validation
    React.useEffect(() => {
        return () => clearRequiredInput(true);
    }, []);

    React.useEffect(() => {
        setItems(mapItems(items));
    }, [items]);


    const manageRequestResponse = response => {
        const items = mapResponse(response);

        setItems(items);
        requestIsLoaded(true);
        setLoading(false);

        if (value) {
            setValue(multiple ? getItems(items, value) : getItem(items, value));
        }
    };

    React.useEffect(() => {
        if (!request || loaded) return;

        if (Is.empty(value) && searchable) return;

        request(value, 'initial').then(manageRequestResponse);
    }, [loaded, request, value, searchable]);

    if (closeOnSelect === undefined) {
        closeOnSelect = multiple !== true;
    }

    const RenderHiddenInputs = () => {
        if (request && !loaded) return null;

        if (currentValue === undefined || currentValue === null) return null;

        if (!multiple) {
            return <HiddenInput name={name} value={currentValue.value || currentValue} />
        }

        return currentValue.map((item, index) => {
            return <HiddenInput key={index} name={name} value={item.value || item} />
        });
    };

    let filterOptions = undefined;

    if (addable) {
        otherProps.selectOnFocus = true;
        otherProps.clearOnBlur = true;
        otherProps.handleHomeEndKeys = true;
        filterOptions = (options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (addable && params.inputValue !== '') {
                filtered.push(mapItem(params.inputValue));
            }

            return filtered;
        };
    }

    const remoteSearch = e => {
        if (!searchable || !request) return;

        const searchText = e.target.value;

        if (!searchText || searchText === currentSearchText) return;

        setLoading(true);
        setSearchText(searchText);

        request(searchText, 'search').then(manageRequestResponse);
    };

    if (groupBy) {
        otherProps.groupBy = option => Is.callable(groupBy) ? groupBy(option) : Obj.get(option, groupBy);
    }

    if (multiple) {
        otherProps.renderOption = (option, { selected }) => (
            <React.Fragment>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                />
                {option.label}
            </React.Fragment>
        );
    }

    return (
        <>
            <RenderHiddenInputs />
            <Autocomplete
                multiple={multiple}
                autoHighlight
                open={open}
                disableClearable={required}
                noOptionsText={noOptionsText}
                disableCloseOnSelect={!closeOnSelect}
                value={currentValue}
                getOptionDisabled={(item: any) => item.disabled}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                options={currentItems}
                loadingText={loadingText}
                onChange={onSelection}
                loading={isLoading}
                filterOptions={filterOptions}
                renderTags={(value, getTagProps) => {
                    if (isLoading) return loadingText;
                    return value.map((option: any, index) => {
                        if (!option || !option.label) return null;
                        return <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
                    })
                }}
                getOptionSelected={(option: any, selectedValue: any) => {
                    if (!option || !selectedValue) return false;
                    return option.value === selectedValue.value;
                }}
                renderOption={(option: any) => {
                    if (imageable) {
                        let imageKey = imageable === true ? 'image' : imageable;
                        return (
                            <>
                                <Avatar src={option[imageKey]} />
                                <AvatarLabel>{option.label}</AvatarLabel>
                            </>
                        );
                    }

                    return option.label;
                }}
                getOptionLabel={(item: any) => {
                    // as item by all means can not be a scalar value
                    // if its scalar, then it means the items list is being lazy loaded.
                    if (Is.scalar(item)) return '';

                    return item.label;
                }}
                renderInput={(params) => {
                    return <TextField
                        {...params}
                        label={isLoading ? loadingText : <Label label={label} required={required} />}
                        variant="outlined"
                        margin={margin}
                        onChange={remoteSearch}
                        InputProps={{
                            ...params.InputProps,
                            ...InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />;
                }}
                {...otherProps}
            />
            <FormHelperText error={hasError}>{error}</FormHelperText>
        </>
    );
}

AutoComplete.defaultProps = {
    autoHighlight: true,
}