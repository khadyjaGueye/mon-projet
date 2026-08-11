export interface Model<T> {
    data: T;
}

export interface Data {
    service: Service;
    services: Service[];
    videos: Video[];
    video: Video
    user: User
    message: string;
    token: string;
}

export interface User {
    id: number;
    role: string;
    image: string
}

export interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    duration: number;
    created_at: string;
}

export interface Video {
    id: number,
    title: string;
    description: string;
    url: string;
    createdAt:string;
}

export interface Horaire {
    id: number;

}