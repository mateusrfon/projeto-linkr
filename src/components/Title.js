import styled from 'styled-components';

export default function Title(props) {
    return <TitlePage>{props.title}</TitlePage>;
}

const TitlePage = styled.h1`
    margin-top: 53px;
    width: 80%;
    font-size: 43px;
    color: white;
    font-weight: 700;
    font-family: 'Oswald', sans-serif;
`;
