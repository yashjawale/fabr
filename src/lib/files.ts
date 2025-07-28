import fs from 'fs';
import path from 'path';

/**
 * Recursively walks a directory and returns all file paths.
 * @param dirPath - The directory to walk.
 * @returns An array of full file paths.
 */
const walkDir = (dirPath: string): string[] => {
    let fileList: string[] = [];
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                fileList = [...fileList, ...walkDir(fullPath)];
            }
        } else {
            fileList.push(fullPath);
        }
    });
    return fileList;
};

/**
 * Finds and replaces placeholder values in all files within a directory.
 * @param projectPath - The root path of the project.
 * @param placeholderValues - An object mapping placeholder keys to their final values.
 */
export const findAndReplace = (projectPath: string, placeholderValues: Record<string, string>): void => {
    const filesToProcess = walkDir(projectPath);

    filesToProcess.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        for (const key in placeholderValues) {
            if (Object.prototype.hasOwnProperty.call(placeholderValues, key) && placeholderValues[key] !== undefined) {
                const regex = new RegExp(key, 'g');
                if (content.match(regex)) {
                    content = content.replace(regex, placeholderValues[key]);
                    changed = true;
                }
            }
        }
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    });
};
