import {
  DiscordUser,
  PackageViewer,
  PackageViewerChannel,
} from "@/types/discord";
import React, { useContext, useEffect, useState } from "react";
import DiscordDefaultPfp from "../../public/discordblue.png";
import { AppContext } from "./AppProvider";
import { FRONTEND } from "@/utils/logging";

export interface Props {
  user: DiscordUser | undefined;
  onSelectChange: (channel: PackageViewerChannel) => void;
}

const UserInfo: React.FC<Props> = ({ user, onSelectChange }) => {
  const { setLoading, setLoadingLabel } = useContext(AppContext);
  const [channels, setChannels] = useState<PackageViewerChannel[]>();
  const [selected, setSelected] = useState<PackageViewerChannel>();

  useEffect(() => {
    onSelectChange(selected!);
  }, [selected]);

  const handleClick = async () => {
    setLoading(true);
    setLoadingLabel("Loading Servers...");

    const response = await fetch("/api/loadChannels/" + user?.uploadFolder, {
      method: "GET",
    });
    const data = await response.json();
    if (response.ok) {
      setChannels(data.data.channels);
    } else {
      alert(data.error);
    }

    setLoading(false);
  };

  return user ? (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2">
        <h1 className="text-2xl uppercase tracking-wide text-center font-semibold border-b border-gray-300 mb-4">
          User Info
        </h1>
        <div className="flex flex-row w-full h-32 items-center justify-start space-x-4">
          <img src={DiscordDefaultPfp.src} className="rounded w-32 h-32" />
          <div className="flex flex-col justify-center items-start">
            <span className="text-xl leading-6 font-semibold inline-block">
              {user.global_name}
            </span>
            <span className="text-lg leading-6 font-normal inline-block">
              {user.username}
            </span>
            <span className="text-xs leading-6 font-thin italic inline-block">
              Timestamp: {user.uploadFolder}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="uppercase mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleClick}
        >
          Load Servers
        </button>
      </div>
      <div className="flex flex-col w-1/2">
        {channels && (
          <>
            <h1 className="text-2xl uppercase tracking-wide text-center font-semibold border-b border-gray-300 mb-4">
              Most Popular Channels
            </h1>
            <div className="flex flex-col max-h-48 overflow-y-scroll">
              {channels.map((c) => (
                <button
                  key={c.channel.id}
                  className="bg-transparent flex flex-row items-center justify-between w-full px-10 cursor-pointer"
                  onClick={() => setSelected(c)}
                >
                  <span
                    className={`text-lg hover:font-bold hover:tracking-wide hover:uppercase ${
                      selected === c &&
                      "text-blue-400 uppercase font-bold tracking-wide"
                    }`}
                  >
                    {c.channel.type === "GUILD_TEXT"
                      ? `${c.channel.name || "Delted Channel"} at ${
                          c.channel.guild?.name || "Unknown Server"
                        }`
                      : c.channel.type == "DM"
                      ? "Direct Message"
                      : c.channel.type === "GROUP_DM"
                      ? `(Group Chat) ${c.channel.name}`
                      : "Other"}
                  </span>
                  <span className="text-sm font-thin italic">
                    {c.messages.length} messages
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default UserInfo;
