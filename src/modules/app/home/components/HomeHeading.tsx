import React from 'react';
import { styled } from '@material-ui/core';
import { CircleProgress, TextCenter } from 'reactor/components';
import { Heading2, HeadingWrapperContent, CloneModulesButton, AdminButton, FrontOfficeButton } from './Helpers';

const Content = styled('div')({
    marginTop: '10%',
});

export default function HomeHeading({ loading, setModuleType }) {
    return (
        <>
            <HeadingWrapperContent text={'Mongez Wizard'} />

            <Content>
                <Heading2>What Shall We Do Now?</Heading2>

                <TextCenter>
                    <CloneModulesButton disabled={loading} onClick={() => setModuleType('admin')}>
                        {loading ? <CircleProgress size={20} /> : 'Clone Modules'}
                    </CloneModulesButton>
                    <AdminButton disabled={loading} onClick={() => setModuleType('admin')}>
                        {loading ? <CircleProgress size={20} /> : 'Create Admin Module'}
                    </AdminButton>
                    <FrontOfficeButton disabled={loading} onClick={() => setModuleType('front-office')}>
                        {loading ? <CircleProgress size={20} /> : 'Create Front Office Module'}                        
                        </FrontOfficeButton>
                </TextCenter>
            </Content>
        </>
    )
}
