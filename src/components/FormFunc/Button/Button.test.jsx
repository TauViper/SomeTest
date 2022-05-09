import React from "react";
import { Button } from "./Button";
import { render, screen } from '@testing-library/react';

describe('Button', () => {
    it('render', () => {
        render(<Button />);
    });
    it('snapshot', () => {
        const { asFragment } = render(<Button />);
        expect(asFragment()).toMatchSnapshot();
    });
});