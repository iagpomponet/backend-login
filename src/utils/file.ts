import fs from 'fs';

export const deleteFile = async (path: string) => {
	try {
		await fs.promises.stat(path);
	} catch {
		return;
	}

	await fs.promises.unlink(path);
};