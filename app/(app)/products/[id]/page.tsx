import {getProductById} from "@/lib/api/products/queries";

interface Props {
    params: {
        id: string
    }
}

export default function ProductPage({params}: Props) {

    const product = getProductById(params?.id)

    return (
        <div>
            {JSON.stringify(product)}
        </div>
    )
}