interface BookListDescriptionProps {
  description: string;
}

export function BookListDescription({ description }: BookListDescriptionProps) {
  return (
    <div className="mb-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          {description || "This list has no description yet."}
        </p>
      </div>
    </div>
  );
}
