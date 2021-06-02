import axios from 'axios';

export function like(post, i, setPosts, posts, userInfo) {
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const like = post.likes.filter((like) => {
        return like.userId === userInfo.user.id;
    });

    if (like.length === 0) {
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/like`,
            {},
            config
        );

        promise.then((response) => {
            let newPosts = [...posts];
            newPosts[i].likes = response.data.post.likes;
            setPosts(newPosts);
        });
    } else {
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/dislike`,
            {},
            config
        );
        promise.then((response) => {
            let newPosts = [...posts];
            newPosts[i].likes = response.data.post.likes;
            setPosts(newPosts);
        });
    }
}

export function SwitchEditPost(post, setNewText, setEdit, edit) {
    if (edit === post.id) {
        setEdit(false);
    } else {
        setEdit(post.id);
        setNewText(post.text);
    }
}

export function EndEditPost(
    e,
    post,
    body,
    config,
    setEdit,
    setPosts,
    posts,
    setWait
) {
    if (e.which === 27) {
        setEdit(false);
    } else if (e.which === 13) {
        e.preventDefault();
        EditPost(post, body, config, setWait, setEdit, setPosts, posts);
    }
}

export function EditPost(
    post,
    body,
    config,
    setWait,
    setEdit,
    setPosts,
    posts
) {
    setWait(true);
    const request = axios.put(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`,
        body,
        config
    );
    request.then((r) => {
        setWait(false);
        setEdit(false);
        const newPosts = posts.map((e) => {
            if (e.id === post.id) {
                return r.data.post;
            }
            return e;
        });
        setPosts(newPosts);
    });
    request.catch(() => {
        alert('Não foi possível realizar as alterações');
        setWait(false);
    });
}

export function newTab(link) {
    window.open(link, '_blank');
}

export function showComments(posts, i, setComment) {
    if (posts[i].hasClicked === true) {
        posts[i].hasClicked = false;
        setComment(posts);
    } else {
        posts[i].hasClicked = true;
        setComment(posts);
    }
}
