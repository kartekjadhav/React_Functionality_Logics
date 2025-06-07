import { useEffect, useState } from 'react'

function ProductsWithUnknownLength({productsPerPage=10}) {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState();

  async function fetchProducts() {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page-1)*productsPerPage }`);
      const data = await response.json();
      setTotalPages(Math.ceil(data.total / productsPerPage))
      setProducts(data.products); 
    } catch (error) {
      console.log("Error while fetching products");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page])


  function handlePaginationClick(i) {
    if (i >= 0 && i < totalPages && i !== page-1) {
      setPage(i+1);
    }
  }

  return (
    <div className='m-3 flex flex-col justify-center items-center' >
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {products && products.map((product, index) => {
          return <li key={product.id} className='border rounded-lg bg-gray-100 w-50 px-3 py-2 flex flex-col items-center justify-center' >  
            <img src={product.images} alt={product.title} className='cover' />
            <p className='font-bold' >{product.title}</p>
            <p className='font-bold' >{product.price}</p>
          </li> 
        })}
      </ul>
      {
        products && <ul className='flex flex-wrap gap-3 my-5 justify-center items-center' >
          <li key={'left-arror'} className={`cursor-pointer ${page>1 ? "flex" : "hidden"}`} onClick={() => (setPage(prev => prev-1))} >⬅️</li>
          {totalPages && [...Array(totalPages)].map((_, i) => {
            return <li 
                      key={i} 
                      className={`px-3 py-2 border rounded-lg cursor-pointer ${page === i+1 ? "bg-gray-200": ""}`} 
                      onClick={() => handlePaginationClick(i)}
                      >
              {i+1}
            </li>
          })}
          <li key={'right-arror'} className={`cursor-pointer ${page<totalPages ? "flex" : "hidden"} `} onClick={() => (setPage(prev => prev+1))} >➡️</li>
        </ul>
      }
    </div>
  )
}


export default ProductsWithUnknownLength;