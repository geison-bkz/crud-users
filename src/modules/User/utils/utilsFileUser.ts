import fs from 'node:fs';
import path from 'node:path';

export class UtilsFileUser {
    private static _userPath = ['assets', 'files'];

    private static _validateFolder(userId: string) {
        return fs.existsSync(path.resolve(...this._userPath, userId));
    }

    public static createFolderUser(userId: string) {
        if (!this._validateFolder(userId)) {
            fs.mkdirSync(path.resolve(...this._userPath, userId));
        }
    }
}
