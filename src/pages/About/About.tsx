import { BookOpen, HeartHandshake, Users, Library } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 text-center bg-gradient-to-b from-[#000957] to-[#344CB7]">
        <div className="container px-4 mx-auto">
          <Badge
            variant="outline"
            className="mb-4 text-yellow-400 bg-yellow-50"
          >
            Since 2010
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            Welcome to Book Store
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-200">
            Your Gateway to Literary Adventures and Lifelong Learning
          </p>
          <Button
            variant="secondary"
            onClick={() => navigate("/books")}
            className="gap-2"
          >
            <Library className="w-5 h-5" />
            Explore Our Collection
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <Card className="p-8 mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-[#344CB7]">
              Our Mission
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600">
              To ignite the passion for reading by providing carefully curated
              books, creating a community hub for book lovers, and fostering a
              culture of lifelong learning through accessible literature.
            </p>
          </Card>

          {/* Values Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 text-center transition-shadow hover:shadow-lg">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-[#344CB7]" />
              <h3 className="mb-2 text-xl font-semibold">Curated Selection</h3>
              <p className="text-gray-600">
                Handpicked titles across genres to ensure quality and diversity
              </p>
            </Card>

            <Card className="p-6 text-center transition-shadow hover:shadow-lg">
              <HeartHandshake className="w-12 h-12 mx-auto mb-4 text-[#344CB7]" />
              <h3 className="mb-2 text-xl font-semibold">Community First</h3>
              <p className="text-gray-600">
                Hosting regular book clubs and author events
              </p>
            </Card>

            <Card className="p-6 text-center transition-shadow hover:shadow-lg">
              <Users className="w-12 h-12 mx-auto mb-4 text-[#344CB7]" />
              <h3 className="mb-2 text-xl font-semibold">Expert Staff</h3>
              <p className="text-gray-600">
                Passionate bibliophiles ready to guide your journey
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-16 bg-[#577BC1] text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">📚 Limited-Time Offer!</h2>
          <p className="text-lg mb-6">
            Enjoy <span className="font-bold text-yellow-300">30% OFF</span> on
            all bestselling books! Don’t miss out on this exclusive deal – grab
            your favorite books now!
          </p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg text-lg transition"
            onClick={() => navigate("/books")}
          >
            Shop Now 📖
          </button>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-[#344CB7]">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://lovelove-react.wpocean.com/static/media/img-2.12d206bd2c655cb5d77e.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h3 className="mb-2 text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Head Curator</p>
              <Badge variant="outline" className="mt-2">
                Fiction Expert
              </Badge>
            </Card>

            <Card className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://lovelove-react.wpocean.com/static/media/img-3.1ea517e3171d47b4d232.jpg" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <h3 className="mb-2 text-xl font-semibold">Alice Smith</h3>
              <p className="text-gray-600">Community Manager</p>
              <Badge variant="outline" className="mt-2">
                Event Organizer
              </Badge>
            </Card>

            <Card className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://lovelove-react.wpocean.com/static/media/img-4.c1572fbbba35712ff2f4.jpg" />
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <h3 className="mb-2 text-xl font-semibold">Michael Brown</h3>
              <p className="text-gray-600">Customer Experience</p>
              <Badge variant="outline" className="mt-2">
                Reading Advocate
              </Badge>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
