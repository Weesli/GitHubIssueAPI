import fs from 'fs';
const filePath = "./data/thread-issues.json"

// create if not exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({}));
}

function readThreadIssueMap(): Record<string, number> {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeThreadIssueMap(map: Record<string, number>) {
  fs.writeFileSync(filePath, JSON.stringify(map, null, 2));
}

export {
    readThreadIssueMap,
    writeThreadIssueMap
}