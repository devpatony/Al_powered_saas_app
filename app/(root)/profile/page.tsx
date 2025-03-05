import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import { Collection } from "@/components/shared/Collection";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";

interface ProfilePageParams {
  id: string;
  type: TransformationTypeKey;
}

interface ProfilePageSearchParams {
  query?: string;
  page?: string;
}

interface PageProps {
  params: ProfilePageParams;
  searchParams: ProfilePageSearchParams;
}

const ProfilePage = async ({ params, searchParams }: PageProps) => {
  const { id, type } = params;
  const { query, page } = searchParams;

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserById(userId);
  const currentPage = Number(page) || 1;
  const searchQuery = query || '';

  const images = await getUserImages({ page: currentPage, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="photo"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={currentPage}
        />
      </section>
    </>
  );
};

export default ProfilePage;