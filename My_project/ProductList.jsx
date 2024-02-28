import { useEffect, useState } from "react"
import Product from "./Product";
export default function ProductList() {  
    const [productList, setProductList] = useState ([])


    const [searchInput, setSearchInput] = useState ('')


    const displayProducts = () => {
        const productsTemp = productList.filter(product => {
            console.log(product.id)
            return product.title.startsWith(searchInput) 
            || product.id.toString().startsWith(searchInput) 
        });
    
        if (productsTemp.length > 0) {
            return productsTemp.map((product, key) => {
                return <Product product={product} key={key} />;
            });
        }
    
        return (
            <tr>
                <td colSpan={7}>No products found.</td>
            </tr>
        );
    };

    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
                        .then(response => response.json())
                        .then(response => setProductList(response))
    }
   useEffect (() => {
      getProducts()
   } , []);


   const handleSearch = (e) => {
    e.preventDefault()
    const searchValue = document.querySelector('#search').value
    setSearchInput(searchValue)
   };


  return (
    <div className="container-fluid w-75 mx-auto my-3">
       <h2 style={{color:'brown'}}>Search :</h2>
       <form>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
                <label className="col-form-label"></label>
                     <input type='text' id='search'className="form-control" /><br></br></div>
                            <div className="col-auto">
                                      <input className="btn btn-primary" type="submit" value='Search' onClick={handleSearch}/></div>
        </div>
       </form>

       <h1 style={{textAlign:'center', color:'brown' , marginBottom:'80px'}}> My Products : </h1>
       <table className="table">
        <thead>
            <tr>
                <th>#ID</th>
                <th style={{textAlign:'center'}}>Title</th>
                <th>Price</th>
                <th style={{textAlign:'center'}}>Description</th>
                <th>Category</th>
                <th style={{textAlign:'center'}}>Image</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {displayProducts()}
        </tbody>
       </table>
       </div> 
)}
    
    