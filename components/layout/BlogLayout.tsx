import Link from "next/link";
import BackToTopButton from "../BackToTopButton";

const BlogLayout = ({
  children,
  sections,
}: {
  children: React.ReactNode;
  sections?: {
    id?: string;
    title?: string;
    icon?: React.ReactNode;
  }[];
}) => {
  return (
    <div className="w-full pt-10 min-h-screen mx-auto px-4 md:p-4 m-auto flex justify-between rounded-lg">
      <div className="w-full lg:max-w-4xl">{children}</div>
      <aside className="w-full hidden md:block max-w-sm px-4 py-6 rounded-lg space-y-6">
        <div className="sticky top-20">
          <h3 className="text-lg font-semibold mb-4">On This Page</h3>
          <ul className="space-y-2 ml-2">
            {sections &&
              sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {section.icon}
                    {section.title}
                  </Link>
                </li>
              ))}
          </ul>
          <hr className="my-6 border-gray-200 dark:border-gray-700" />
          <BackToTopButton />
        </div>
      </aside>
    </div>
  );
};
export default BlogLayout