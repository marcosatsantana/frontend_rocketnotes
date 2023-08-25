import { Container } from './styles'

export function ButtonText({ title, isActive = false, ...rest }) {
    return (
        <Container $isactive={isActive} {...rest} type="button">
            {title}
        </Container>
    );
};
