export interface PackageViewer {
    uploadFolder: string;
}

export interface DiscordUser extends PackageViewer {
    id: string;
    username: string;
    global_name: string;
}