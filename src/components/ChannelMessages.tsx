import { PackageViewerChannel } from "@/types/discord";
import OpenAI from "openai";
import React, { useContext, useState } from "react";
import { AppContext } from "./AppProvider";

export interface Props {
  channel: PackageViewerChannel;
}

const ChannelMessages: React.FC<Props> = ({ channel }) => {
  const [ai, setAi] = useState<string>("");

  const { setLoading, setLoadingLabel } = useContext(AppContext);

  const getAIConclusion = async (contents: string[]) => {
    console.log(process.env.OPENAI_API_KEY);
    if (!process.env.OPENAI_API_KEY) {
      alert(
        "OpenAI API Key not found. Please add it to your environment variables."
      );
      return;
    }
    setLoading(true);
    setLoadingLabel("Generating AI Conclusion...");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        {
          role: "user",
          content:
            "The following messages (seperated by ';') are messages by a person without context. Please write a character description based off of these messages.",
        },
        {
          role: "user",
          content: contents.join(";"),
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.5,
    });
    setLoading(false);
    console.log(completion);
    setAi(completion.choices[0].message.content!);
    
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2">
        <h1 className="text-2xl uppercase tracking-wide text-center font-semibold border-b border-gray-300 mb-4">
          Messages
        </h1>
        <div className="flex flex-col h-80 overflow-y-scroll">
          {channel.messages.map((m) => (
            <div key={m.ID} className="flex flex-col justify-start space-x-4">
              <span className="font-semibold">{m.Timestamp}</span>
              <span className="overflow-clip">
                {m.Contents || m.Attachments}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        <h1 className="text-2xl uppercase tracking-wide text-center font-semibold border-b border-gray-300 mb-4">
          AI Conclusion
        </h1>
        {ai && <p>{ai}</p>}
        <button
          type="button"
          className="uppercase mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() =>
            getAIConclusion(channel.messages.map((m) => m.Contents))
          }
        >
          Generate AI Conclusion
        </button>
      </div>
    </div>
  );
};

export default ChannelMessages;
