import axios from 'axios';

export default function Follow(id, bool, setWait, setFollow, token) {
    const action = bool ? 'follow' : 'unfollow';
    setWait(true);
    setFollow(bool);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const request = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/${action}`,
        {},
        config
    );
    request.then(() => {
        setWait(false);
    });
    request.catch(() => {
        alert('não foi possível executar a operação.');
        setFollow(!bool);
        setWait(false);
    })

}