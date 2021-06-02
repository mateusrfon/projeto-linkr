export default function Comments({ userId, id, showComment }) {
    if (showComment) {
        return <p>{userId + ' e ' + id}</p>;
    } else {
        return <></>;
    }
}
