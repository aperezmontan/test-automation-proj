import { writeFileSync } from 'fs';
import path from 'path';

// Helper function to create files
export const createFile = ({ data, fileName, type }: { data: string, fileName: string, type: string }): string => {
  const filePath = path.join(__dirname, `${fileName}.${type}`)
  writeFileSync(filePath, data);
  return filePath;
}
