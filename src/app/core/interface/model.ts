export interface Model<T> {
    data: T;
}

export interface Data {
    service: Service;
    services: Service[];
    user:User
    message:string;
    token:string;
}

export interface User{
    id:number;
    role:string;
    image:string
}

export interface Service {
id :number;
name:string;
price:number;
description:string;
image:string;
duration:number;
created_at :string;
}

export interface Video{
    id:number
}

export interface Horaire{
    id:number;
}