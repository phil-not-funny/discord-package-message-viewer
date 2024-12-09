import ZipUploader from "@/components/ZipUploader";

export default function Home() {
  return (
    <div className="space-y-4 relative pt-5">
      <h1 className="mt-5 text-3xl font-semibold uppercase tracking-wide text-center">Discord Package Messages Viewer</h1>
      <ZipUploader />
    </div>
  );
}
