import {FormConfig } from "./utils/form.util"

export const forms: FormConfig[] = [
    // first the example form
    {
        // id: The ID you have defined for this channel (not equal to any value)
        id: "GitHubIssueAPI",
        // channelId: After opening the form, the ID of the channel that this repo will follow
        channelId: "<id>",
        // owner: The owner of the repository
        owner: "Weesli",
        // repo: The name of the repository
        repo: "GitHubIssueAPI",
    },
    // here you can add more forms or replace first example form
]