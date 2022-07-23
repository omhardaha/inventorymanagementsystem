import "./Products.css";
import Product from "../Product/Product";

export default function Posts({ getPosts }) {
    return <div className="posts">
        {
            getPosts.map((p) => (
                <Product post={p} />
            ))
        }
    </div>;
}
