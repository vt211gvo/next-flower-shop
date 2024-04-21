interface Props {
    userId: number;
    id: number;
    title: string;
    body: string;
}

function FavoriteArticle({title, body}: Props) {

    return (
        <div>
            <div>
                {title}
            </div>
            <div>
                {body}
            </div>
        </div>
    )
}
export default FavoriteArticle;