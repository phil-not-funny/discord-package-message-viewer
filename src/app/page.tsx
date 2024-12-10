"use client";

import UserInfo from "@/components/UserInfo";
import ZipUploader from "@/components/ZipUploader";
import { DiscordUser } from "@/types/discord";
import { FRONTEND } from "@/utils/logging";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<DiscordUser>();

  return (
    <div className="space-y-4 relative pt-5">
      <h1 className="mt-5 text-3xl font-semibold uppercase tracking-wide text-center">
        Discord Package Messages Viewer
      </h1>
      <ZipUploader successCallback={setUser} />
      <UserInfo user={user} />
    </div>
  );
}
