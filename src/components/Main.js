import styled from 'styled-components';
import Title from './Title';
import Posts from './timeline/Posts';
import Trending from './Trending';
import Publish from './timeline/Publish';
import { VscLoading } from 'react-icons/vsc';

export default function Main(props) {
    return (
        <Page>
            <Title title={props.title} posts={props.posts} />
            <div>
                <div className="container">
                    {props.title === 'timeline' ? (
                        <Publish reloadTimeline={props.getPosts} />
                    ) : (
                        ''
                    )}
                    {props.loading ? (
                        <div>
                            loading
                            <VscLoading />{' '}
                        </div>
                    ) : (
                        <Posts
                            posts={props.posts}
                            getPosts={props.getPosts}
                            setPosts={props.setPosts}
                            hasMore={props.hasMore}
                            isFollowing={props.isFollowing || false}
                        />
                    )}
                </div>
                <Trending />
            </div>
        </Page>
    );
}

const Page = styled.main`
    background-color: #4d4d4d;
    min-width: 100vw;
    min-height: 100vh;
    margin-top: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .container {
        width: 611px;
    }

    > div {
        display: flex;
        width: 60%;
    }

    @media (max-width: 1000px) {
        .container {
            width: 100%;
        }

        h1 {
            margin-left: 17px;
        }
        .container-aside {
            display: none;
        }

        > div {
            width: 100%;
        }
    }
`;
