"use client";

import ChannelMessages from "@/components/ChannelMessages";
import UserInfo from "@/components/UserInfo";
import ZipUploader from "@/components/ZipUploader";
import { DiscordUser, PackageViewerChannel } from "@/types/discord";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<DiscordUser>();
  const [selectedChannel, setSelectedChannel] =
    useState<PackageViewerChannel>();

  return (
    <div className="space-y-4 relative pt-5 pb-5">
      <h1 className="mt-5 text-3xl font-semibold uppercase tracking-wide text-center">
        Discord Package Messages Viewer
      </h1>
      <ZipUploader successCallback={setUser} />
      <UserInfo user={user} onSelectChange={setSelectedChannel} />
      {selectedChannel && <ChannelMessages channel={selectedChannel} />}
    </div>
  );
}
