
import  ProductOverview  from '@/app/_components/ProductOverview/ProductOverview';
export default async function ProductDetailsPage(props:{params:Promise<{id:string}>}) {
const params=await props.params
const id=params.id

  return (
<>
<ProductOverview id={id} />
</>
  );
}
