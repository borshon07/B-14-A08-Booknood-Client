import { getBooks } from "@/lib/api";
import HeroSlider from "@/components/home/HeroSlider";

export default async function HeroSection() {
  const books = await getBooks("?sort=newest&limit=3");

  return (
    <HeroSlider
      books={books.map((b) => ({
        _id: b._id,
        title: b.title,
        author: b.author,
        image: b.image,
      }))}
    />
  );
}
