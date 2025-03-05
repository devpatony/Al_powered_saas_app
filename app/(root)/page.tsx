import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";
import { PageProps } from "next/page-props";

interface HomePageParams {
  id: string;
  type: TransformationTypeKey;
}

interface HomePageSearchParams {
  query?: string;
  page?: string;
}

const Home = async ({ params, searchParams }: PageProps) => {
  const { id, type } = params as HomePageParams;
  const { query, page } = searchParams as HomePageSearchParams;

  const currentPage = Number(page) || 1;
  const searchQuery = query || '';

  const images = await getAllImages({ page: currentPage, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with ImageLab 🚀
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt={link.label} width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={currentPage}
        />
      </section>
    </>
  );
};

export default Home;