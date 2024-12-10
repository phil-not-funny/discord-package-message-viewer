import { DiscordUser } from "@/types/discord";
import React from "react";

export interface Props {
  user: DiscordUser | undefined;
}

const UserInfo: React.FC<Props> = ({ user }) => {
  return user ? (
    <>
      <h1 className="text-2xl uppercase tracking-wide text-center font-semibold">
        User Info
      </h1>
      <div className="flex flex-row w-full h-48">
        {/*<img src={""} className="rounded-sm" />*/}
        <div className="w-full justify-center items-center">
          <h1 className="text-xl leading-6 text-center font-semibold">
            {user.global_name}
          </h1>
          <h6 className="text-lg leading-6 text-center font-normal">
            {user.username}
          </h6>
          <h6 className="text-xs leading-6 text-center font-thin italic">
            Timestamp: {user.uploadFolder}
          </h6>
        </div>
      </div>
    </>
  ) : null;
};

export default UserInfo;
