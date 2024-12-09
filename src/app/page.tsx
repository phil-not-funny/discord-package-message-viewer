import ZipUploader from "@/components/ZipUploader";

export default function Home() {
  return (
    <div className="pt-5 space-y-4">
      <h1 className="text-3xl font-semibold uppercase tracking-wide text-center">Discord Package Messages Viewer</h1>
      <ZipUploader />
    </div>
  );
}
