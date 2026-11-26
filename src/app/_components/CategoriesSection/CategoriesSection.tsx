
import { getAllCategories } from '@/Api/Services/category.service';
import CategoryCard from '../CategoryCard/CategoryCard'
import { Category } from '@/Types/CategoryType/Category.type';

export default async function CategoriesSection() {
  const allCategories = (await getAllCategories()) ?? [];

  return (
    <section className="mx-auto mt-10 w-full max-w-384 px-4 pb-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
        {allCategories.map((category: Category) => (
            <CategoryCard key={category._id} img={category.image} label={category.name} id={category._id} />
          ))}
      </div>
    </section>
  )
}
