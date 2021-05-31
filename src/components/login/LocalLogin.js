import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function LocalLogin(to) { //"/timeline"
    const history = useHistory();
    const { setUserInfo } = useContext(UserContext);

    useEffect(() => {
        const localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if ( localUserInfo !== null) {
            setUserInfo(localUserInfo);
            history.push(to);
        } else {
            history.push("/");
        }
    }, []);
}