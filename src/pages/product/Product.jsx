import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
// import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from '../../redux/apiCalls'

export default function Product() {

	const location = useLocation();
	const productId = location.pathname.split("/")[2];
	const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [ cat, setCat ] = useState([]);
  const dispatch = useDispatch()

	const product = useSelector((state) => state.product.products.find((product) => product._id === productId));

	const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  };

  const editedProduct = {...inputs, ...cat}


  const handleUpdate = (e, id) => {
    e.preventDefault();
    updateProduct(id, editedProduct);
  }

  const handleCat = (e) => {
    setCat(prev => {
      return {...prev, [e.target.name]: e.target.value.split(',')}
    })
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt={product.title} className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Price:</span>
                      <span className="productInfoValue">₹ {product.price}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Title</label>
                  <input type="text" name="title" placeholder={product.title} onChange={handleChange} />
									<label>Product Description</label>
                  <input type="text" name="desc" placeholder={product.desc} onChange={handleChange} />
									<label>Price</label>
                  <input type="text" name="price" placeholder={product.price} onChange={handleChange} />
                  <label>Categories</label>
                  <input type="text" name="categories" placeholder={product.categories} onChange={handleCat} />
                  <label>Color</label>
                  <input type="text" name="color" placeholder={product.color} onChange={handleCat} />
                  <label>Size</label>
                  <input type="text" name="size" placeholder={product.size} onChange={handleCat} />
                  <label>In-Stock</label>
                    <select name="inStock"  id="idStock" onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                  </div>
                  <button onClick={(e) => handleUpdate(e, product._id)} className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
