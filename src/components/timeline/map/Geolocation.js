import styled from "styled-components";
import { AiOutlineClose } from 'react-icons/ai';
import Iframe from 'react-iframe';

export default function Geolocation({ setMap, location }) {
    const { user, latitude, longitude } = location;
    
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
                <Iframe className='map'
                        url={'https://www.google.com/maps/embed/v1/view' +
                        '?key=AIzaSyAt5c0oXB7E6TrT5reytSZqpKzCkV3CAkg'+
                        '&center=' + `${latitude},${longitude}&zoom=7`} />
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
        background-color: #fff;
    }

    @media (max-width: 1000px) {
        width: 80%;
        height: 50vh;
        padding: 5px 18px 15px 18px;
        div {
            font-size: 15px;
            margin-bottom: 8px;
            h1 {
                font-size: 20px;
            }
        }
    }
`;