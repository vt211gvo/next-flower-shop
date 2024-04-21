async function ArticlesPage() {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await data.json();

    return (
        <div>Articles page

            <div>
                {JSON.stringify(json)}
            </div>
        </div>
    )
}
export default ArticlesPage;