import React from 'react';
import { Button, styled } from '@material-ui/core';
import { GridContainer, GridItem } from 'reactor/components';
import { adminColor, cloneModulesColor, frontOfficeColor } from './flags';

export const InputWrapper = props => <GridItem {...props}></GridItem>;

export const FormContentWrapper = styled('div')({
    margin: '2rem auto',
    width: '60%',
});

export const MultiRowWrapper = styled(GridContainer)({
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
});

export const InputsWrapper = props => <GridContainer spacing={2} {...props} />;

export const HeadingText = styled('h3')({
    marginTop: '0.6rem',
    fontSize: '1.4rem',
    marginBottom: 0,
});

export const RowHeading = ({ heading }) => (
    <InputsWrapper spacing={0}>
        <HeadingText>{heading}</HeadingText>
    </InputsWrapper>
)

export const Note = styled('h3')({
    margin: '1rem 0',
    borderBottom: '1px solid',
    display: 'inline-block',
    color: 'teal',
    fontWeight: 'bold',
    fontSize: '0.8rem',
})

export const HeadingWrapperContent = ({ text }) => (
    <HeadingWrapper>
        <Heading>{text}</Heading>
        <Line />
    </HeadingWrapper>
);

export const HeadingWrapper = styled('div')({
    width: '50%',
    margin: 'auto',
});

export const Heading = styled('h1')({
    fontWeight: 'bold',
    textAlign: 'center',
});

export const Line = styled('div')({
    height: '6px',
    borderRadius: '4px',
    background: 'linear-gradient(to right, orange , yellow, green, cyan, blue, violet)',
})

export const Heading2 = styled('h2')({
    fontWeight: 'bold',
    textAlign: 'center'
});


export const WizardButton = styled(Button)({
    '&:disabled': {
        paddingBottom: 0,
    }
})

export const AdminButton = styled(WizardButton)({
    color: '#FFF',
    marginRight: '2rem',
    backgroundColor: adminColor,
    '&:hover': {
        backgroundColor: adminColor,
    }
});

export const CloneModulesButton = styled(WizardButton)({
    color: '#FFF',
    marginRight: '2rem',
    backgroundColor: cloneModulesColor,
    '&:hover': {
        backgroundColor: cloneModulesColor,
    }
});

export const FrontOfficeButton = styled(WizardButton)({
    color: '#FFF',
    backgroundColor: frontOfficeColor,
    '&:hover': {
        backgroundColor: frontOfficeColor,
    }
});
