'use client'
import useFetch from "@/lib/hooks/useFetch";
import FavoriteArticle from "@/components/FavoriteArticle";

function ArticlesFavoritePage() {

    const request1 = useFetch("https://jsonplaceholder.typicode.com/posts/1")
    const request2 = useFetch("https://jsonplaceholder.typicode.com/posts/2")
    const request3 = useFetch("https://jsonplaceholder.typicode.com/posts/3")

    return (
        <div>Articles page

            <div className='flex flex-col gap-2'>
                {[request1, request2, request3].map((item, index) => {
                    if (item.loading) {
                        return (
                            <div key={index}>Loading</div>
                        )
                    }
                    if (item.error) {
                        return (
                            <div key={index}>Error :(</div>
                        )
                    }
                    return (
                        <div key={index} className="p-5 bg-gray-100">
                           <FavoriteArticle {...item.data} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ArticlesFavoritePage;