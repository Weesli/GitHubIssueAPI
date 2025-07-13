import { ChannelType } from "discord.js";
import {client} from "../client";
import { DetectForm, FormConfig } from "../utils/form.util";
import { closeIssue, createIssue, reopenIssue, } from "../lib/github.lib";
import { threadIssues } from "../data";
import { writeThreadIssueMap } from "../utils/number.util";

client.on('threadCreate', async (thread) => {
    if(thread.parent?.type === ChannelType.GuildForum){
        const form: FormConfig | undefined = DetectForm(thread.parent.id);
        if(form === undefined){
            return;
        }
        try{
            const starterContent = await thread.fetchStarterMessage();
            const res = await createIssue(
                {
                    id: form.id,
                    channelId: form.channelId,
                    owner: form.owner,
                    repo: form.repo,
                    title: `${thread.name} | ${starterContent?.author.username} | ${starterContent?.createdAt}`,
                    content: starterContent?.content,
                    labels: [
                        "created a client",
                        `created by ${starterContent?.author.username}`
                    ]
                }
            );
            if(res.statusKey === 1  && res.issueNumber !== null){
                console.log(`Issue created: ${res.issueNumber}`);
                thread.setName(`${thread.name} | Issue #${res.issueNumber}`);
                // push the issue number to database
                if(thread.parent.id){
                    threadIssues[thread.id] = res.issueNumber;
                    writeThreadIssueMap(threadIssues)
                }
            }
        }catch(err) {
            console.error(err);
        }
    }
})

client.on('threadUpdate', async (oldThread, newThread) => {
    if (oldThread.locked === false && newThread.locked === true) {
        const form: FormConfig | undefined = DetectForm(oldThread.parent?.id as string);
        if(form === undefined){
            return;
        }
        try{
            const id = threadIssues[oldThread.id];
            const res = await closeIssue(id, form.owner, form.repo);
            if(res.statusKey === 1){
                console.log(`Issue closed: ${id}`);
            }
        }catch(err){
            console.error(err);
        }
    }
    // unlock
    if (oldThread.locked === true && newThread.locked === false) {
        const form: FormConfig | undefined = DetectForm(oldThread.parent?.id as string);
        if(form === undefined){
            return;
        }
        try{
            const id = threadIssues[oldThread.id];
            const res = await reopenIssue(id, form.owner, form.repo);
            if(res.statusKey === 1){
                console.log(`Issue reopened: ${id}`);
            }
        }catch(err){
            console.error(err);
        }
    }
      if (oldThread.name !== newThread.name) {
    const hasIssueId = /#\d+/.test(newThread.name);

    if (!hasIssueId) {
        const issueId = threadIssues[oldThread.id];

        const fixedName = `${newThread.name} | Issue #${issueId}`;
        try {
          await newThread.setName(fixedName);
          console.log(`Thread adı güncellendi: ${fixedName}`);
        } catch (err) {
          console.error("Thread adı güncellenemedi:", err);
        }
    }
  }
})