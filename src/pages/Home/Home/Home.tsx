import React from "react";
import Banner from "../../../components/Home/Banner/Banner";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Featured from "../../../components/Home/Featured/Featured";
import { useAppSelector } from "../../../redux/hooks";
import { verifyToken } from "../../../utils/verifyToken";
import Footer from "../../../components/Footer/Footer";

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
      <Footer />
    </div>
  );
}
