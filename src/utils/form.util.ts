import { forms } from "../config"

export type Form = {
    id: string,
    channelId: string,
    owner: string,
    repo:  string,
    title: string,
    content?: string,
    labels: string[]
}

export type FormConfig = {
    id: string,
    channelId: string,
    owner: string,
    repo: string,
}

export const DetectForm = (channelId: string): FormConfig | undefined => {
    return forms.find((form) => form.channelId === channelId);
};
