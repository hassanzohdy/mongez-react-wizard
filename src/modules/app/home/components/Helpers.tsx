import React from 'react';
import { styled } from '@material-ui/core';
import { GridContainer, GridItem } from 'reactor/components';

export const InputWrapper = props => <GridItem {...props}></GridItem>;

export const FormContentWrapper = styled('div')({
    margin: '2rem auto',
    width: '60%',
});

export const InputsWrapper = props => <GridContainer spacing={2} {...props} />;

export const RowHeading = ({ heading }) => (
    <InputWrapper xs={12}>
        <h3>{heading}</h3>
    </InputWrapper>
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