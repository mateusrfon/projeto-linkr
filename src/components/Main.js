import styled from 'styled-components';
import Title from './Title';
import Posts from './timeline/Posts';
import Trending from './Trending';

export default function Main(props) {
    return (
        <Page>
            <div className="container">
                <Title title={props.title} />
                <Posts posts={props.posts} />
            </div>
            <Trending />
        </Page>
    );
}

const Page = styled.main`
    background-color: #4d4d4d;
    min-width: 100vw;
    min-height: 100vh;
    margin-top: 72px;
    display: flex;
    justify-content: center;

    .container {
        width: 80%;
    }

    @media (max-width: 700px) {
        .container {
            width: 100%;
        }

        h1 {
            margin-left: 17px;
        }
    }
`;