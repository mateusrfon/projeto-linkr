import axios from 'axios';

export default function Follow(id, bool, setWait, setFollow, token) {
    const action = bool ? 'follow' : 'unfollow';
    setWait(true);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/user/${id}/${action}`,
        config
    );
    request.then(() => {
        setFollow(bool);
        setWait(false);
    });
    request.catch(() => {
        alert('não foi possível executar a operação.');
        setWait(false);
    })

}