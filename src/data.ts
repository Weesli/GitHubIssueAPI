import { readThreadIssueMap } from "./utils/number.util";

const threadIssues: Record<string, number> = readThreadIssueMap();


export {
    threadIssues
}