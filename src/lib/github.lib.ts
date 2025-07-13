import { Octokit } from '@octokit/core';
import dotenv from 'dotenv';
import { Form } from '../utils/form.util';
dotenv.config();

const github_token = process.env.GITHUB_TOKEN;

const octokit = new Octokit({
  auth: github_token
})


export const createIssue = async (form: Form) => {
    const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: form.owner,
        repo: form.repo,
        title: form.title,
        body: form.content,
        labels: form.labels,
        headers:{
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    if(res.status === 201){
        return {
            statusKey: 1,
            issueNumber: res.data.number
        }
    }else{
        return {
            statusKey: 0,
            issueNumber: null
        }
    }
}

export const closeIssue = async (issueNumber: number, owner: string, repo: string) => {
    const res = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner,
        repo,
        issue_number: issueNumber,
        state: 'closed',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        }
    });
    return { statusKey: res.status === 200 ? 1 : 0 };
}

export const reopenIssue = async (issueNumber: number, owner: string, repo: string) => {
    const res = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner,
        repo,
        issue_number: issueNumber,
        state: 'open',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        }
    });
    return { statusKey: res.status === 200 ? 1 : 0 };
}
