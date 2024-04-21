import axios from "axios";

interface Params {
    params: {
        id: number
    }
}

export function generateStaticParams() {
    return new Array(10)
        .fill(null)
        .map((_value, index) => (index + 1).toString());
}

async function ArticlesIdPage({params}: Params) {
    const data = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const comments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`)

    return (
        <div>
            <div>
                Data: {JSON.stringify(data.data)}
            </div>
            <div>
                Comments: {JSON.stringify(comments.data)}
            </div>
        </div>
    )
}

export default ArticlesIdPage