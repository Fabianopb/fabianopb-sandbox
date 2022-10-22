import { Button as MuiButton, ButtonProps } from '@mui/material';
import styled, { css } from 'styled-components';

type ButtonVariant = 'blue' | 'grey';

type Props = Omit<ButtonProps, 'variant'> & {
  variant: ButtonVariant;
};

const variantConfig = {
  blue: {
    base: '#274866',
    hover: '#203b54',
    disabled: '#9ebeda',
  },
  grey: {
    base: '#a4a5a8',
    hover: '#97989c',
    disabled: '#d8d9da',
  },
};

const StyledButton = styled(MuiButton)<{ override: ButtonVariant; disabled?: boolean }>`
  background-color: ${({ override }) => variantConfig[override].base};
  color: #fff;
  &:hover {
    background-color: ${({ override }) => variantConfig[override].hover};
  }
  ${({ disabled, override }) =>
    disabled &&
    css`
      background-color: ${variantConfig[override].disabled}; ;
    `}
`;

const Button = ({ variant, ...props }: Props) => <StyledButton {...props} override={variant} />;

export default Button;
