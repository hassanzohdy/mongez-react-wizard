import React from 'react';
import { Button, styled } from '@material-ui/core';
import { CircleProgress, TextCenter } from 'reactor/components';
import { Heading2, HeadingWrapperContent } from './Helpers';

const cloneModulesColor = '#1eb939';
const adminColor = '#ff006f';
const frontOfficeColor = '#2c87de';

const WizardButton = styled(Button)({
    '&:disabled': {
        paddingBottom: 0,
    }
})

const AdminButton = styled(WizardButton)({
    color: '#FFF',
    marginRight: '2rem',
    backgroundColor: adminColor,
    '&:hover': {
        backgroundColor: adminColor,
    }
});

const CloneModulesButton = styled(WizardButton)({
    color: '#FFF',
    marginRight: '2rem',
    backgroundColor: cloneModulesColor,
    '&:hover': {
        backgroundColor: cloneModulesColor,
    }
});

const FrontOfficeButton = styled(WizardButton)({
    color: '#FFF',
    backgroundColor: frontOfficeColor,
    '&:hover': {
        backgroundColor: frontOfficeColor,
    }
});

const Content = styled('div')({
    marginTop: '10%',
});


export default function HomeHeading({ loading, setModuleType }) {
    return (
        <>
            <HeadingWrapperContent text={'Mongez Wizard'} />

            <Content>
                <Heading2>What Do You Want To Do?</Heading2>


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
