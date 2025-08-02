export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Changelog</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            v0.1.0 (In Development - MVP)
          </h2>
          <p className="text-muted-foreground mb-4">
            Currently in active development
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Initial development of MyReadingList application</li>
            <li>Basic authentication system implementation</li>
            <li>
              Core features:
              <ul className="list-circle pl-5 mt-2 space-y-1">
                <li>User registration and login</li>
                <li>Reading list creation and management</li>
                <li>Novel search and browsing</li>
                <li>Basic user profiles</li>
              </ul>
            </li>
            <li>Responsive UI implementation</li>
            <li>Dark mode support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
