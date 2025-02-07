import Banner from "../../../components/Home/Banner/Banner";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Featured from "../../../components/Home/Featured/Featured";
import ProductReview from "../../../components/Home/ProductReview/ProductReview";

export default function Home() {
  return (
    <div>
      <Banner />
      <SectionTitle
        title="Featured Products"
        subtitle="Explore Our Bestsellers"
        align="center"
        titleColor="text-gray-900"
        subtitleColor="text-primary-600"
      />
      <Featured />
      <SectionTitle
        title="Our Achievements"
        subtitle="Celebrating Milestones in Our Journey"
        align="center"
        titleColor="text-gray-900"
        subtitleColor="text-primary-600"
      />
      <ProductReview />
    </div>
  );
}
