import fs from 'fs';
import path from 'path';

function extractTodos(directory) {
    const todoMap = new Map();
    const files = getAllFiles(directory);
    files.forEach(file => {
        if (['.vue', '.ts', '.sass',].includes(path.extname(file))) {
            const content = fs.readFileSync(file, 'utf-8');
            const matches = content.match(/@todo:?\s*(.*)/gi);
            if (matches) {
                const todos = matches.map(match => match.replace(/@todo:?\s*/i, '').trim());
                todoMap.set(file, todos);
            }
        }
    });
    return todoMap;
}

function getAllFiles(dir) {
    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            files = files.concat(getAllFiles(filePath));
        } else {
            files.push(filePath);
        }
    });
    return files;
}

function writeTodosToFile(todoMap, outputFile) {
    let content = '# TODO 列表\n\n';
    todoMap.forEach((todos, file) => {
        content += `## \`${file}\`\n\n`;
        todos.forEach(todo => {
            content += `- ${todo}\n`;
        });
        content += '\n';
    });
    fs.writeFileSync(outputFile, content, 'utf-8');
}

const projectDirectory = '.';
const outputFile = 'TODO.md';
const todoMap = extractTodos(projectDirectory);
writeTodosToFile(todoMap, outputFile);
console.log(`已將 ${Array.from(todoMap.values()).flat().length} 個 TODO 項目寫入 ${outputFile}`);