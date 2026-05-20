
import useProduct from './../../hooks/useProduct';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader/Loader';

export default function Product() {
  let {data,isLoading,error,isError} = useProduct();
  // console.log(data.data.data);
  let products=data?.data.data
   if(isLoading){

    return <Loader/>
   }
  
  return (<>
  <div className='row'>

  {products?.map((product)=><ProductCard key={product._id} product={product}></ProductCard>)}
  </div>
  </>
  )
}
