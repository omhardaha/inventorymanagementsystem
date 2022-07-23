import "./Product.css";
import { Link } from "react-router-dom"
export default function Products({ post }) {
    return (
        <div className="post">
            {<img
                className="postImage"
                src={(post.photo) ? ("http://localhost:5000/images/" + post.photo) : "https://harshatimbers.com/wp-content/themes/harshatimbers/images/no-img.jpg"}
                alt=""
            />
            }
            <div className="postInfo">

                <div className="postCategery">
                    {
                        post.categories.map((c) => (

                            <Link to={`/?cat=${c}`}>
                                <span className="postCat">{c}</span>
                            </Link>
                        ))
                    }
                </div>
                {/* <Link to={`/post/${post._id}`}> */}
                <span className="postTitle">
                    {post.title}
                </span>
                {/* </Link> */}
                <div className="flex">
                    <button className="price priceD">
                        {'₹ ' + post.price}
                    </button>
                    <button className="price">


                        <Link to={`/post/${post._id}`}>
                            BUY NOW
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
