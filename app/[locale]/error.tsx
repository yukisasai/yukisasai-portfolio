"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="eyebrow mb-4">500</p>
      <h1 className="font-sans text-3xl font-bold sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-muted">
        予期しないエラーが発生しました。
      </p>
      <button
        onClick={() => reset()}
        className="btn btn-primary mt-8"
      >
        もう一度試す
      </button>
    </main>
  );
}
