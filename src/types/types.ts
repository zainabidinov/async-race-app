export interface CarTypes {
    name: string;
    color: string;
    id: number;
    status?: string;
    velocity: number;
    distance: number;
    success?: boolean | string;
}

export interface ButtonTypes {
    color: string;
    text: string;
    icon?: string;
    btnType?: string;
    btnSubmitType?: string;
}
