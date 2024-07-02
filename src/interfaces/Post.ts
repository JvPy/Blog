export interface Post {
    title: string;
    text: string;
    createdAd: Date
    comments?: Comment[];
}
