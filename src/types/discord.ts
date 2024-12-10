export interface PackageViewer {
    uploadFolder: string;
}

export interface DiscordUser extends PackageViewer {
    id: string;
    username: string;
    global_name: string;
}

export interface DiscordServer extends PackageViewer {
    id: string;
    name: string;   
}

export interface DiscordServerChannel extends PackageViewer {
    id: string;
    name: string;
    topic: string;
}

export interface DiscordTextChannel extends PackageViewer {
    id: string;
    name: string;
    type: "DM" | "GUILD_TEXT" | "GUILD_VOICE" | "PUBLIC_THREAD" | "GROUP_DM";
    guild: DiscordServer;
}

export interface DiscordMessage extends PackageViewer {
    ID: string;
    Timestamp: string;
    Contents: string;
    Attachments: string;
}

export interface PackageViewerChannel extends PackageViewer {
    channel: DiscordTextChannel;
    messages: DiscordMessage[];
}