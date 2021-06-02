import styled from "styled-components";
import { AiOutlineClose } from 'react-icons/ai';

export default function Geolocation({ setMap, location }) {
    const { user, latitude, longitude } = location;
    console.log(user)
    window.onkeydown = (e) => {
        if (e.key === 'Escape') {
            setMap(false);
        }
    };

    return (
        <MapBody>
            <MapFrame>
                <div>
                    <h1>{`${user}'s location`}</h1>
                    <AiOutlineClose 
                        onClick={() => setMap(false)}/>
                </div>
                <p className='map'>map</p>
            </MapFrame>
        </MapBody>
    );
}

const MapBody = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MapFrame = styled.div`
    background-color: #333333;
    width: 790px;
    height: 354px;
    padding: 10px 40px 33px 37px;
    border-radius: 20px;
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        height: 56px;
        color: #fff;
        font-size: 25px;
        h1 {
            font-size: 38px;
        }
    }
    .map {
        width: 100%;
        height: calc(100% - 72px);
        background-color: red;
    }
`;