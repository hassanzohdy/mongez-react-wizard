import React from 'react'
import { SelectInput } from 'reactor/form';
import { Obj } from 'reinforcements';
import { InputWrapper, RowHeading } from './Helpers';

export default function TableBadgeSettings({ column, index }) {
    const [badges, setBadges] = React.useState(Obj.get(column, 'settings.badges', []));

    return (
        <>
            <RowHeading heading="Badges Settings" />
            <InputWrapper>
            </InputWrapper>
        </>
    )
}
