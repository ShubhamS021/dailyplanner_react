export interface Content {
    text: string;
    subtext: string;
    icon?: string;
}

export interface ContentSection {
    header: string;
    subheader: string;
    image?: string;
    content: Content[];
}
