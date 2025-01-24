import StartupCard from "@/components/shared/StartupCard";
import SearchForm from "../../components/shared/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Zaloopa" },
      _id: 1,
      description: "Zaloopa Zaloopivna Zaloopenko",
      image:
        "https://hatrabbits.com/wp-content/uploads/2017/01/random-word-1.jpg",
      category: "Robots",
      title: "Zaloopa",
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 2, name: "Loopa" },
      _id: 2,
      description: "Loopa Loopivna Loopenko",
      image:
        "https://hatrabbits.com/wp-content/uploads/2017/01/random-word-1.jpg",
      category: "Robots",
      title: "Loopa",
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your Startup, <br />
          Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
