import jimp from 'jimp'
import path from 'path'
import fs from 'fs/promises'

class UploadAvatarService{
    constructor(folderAvatar) {
        this.folderAvatar=folderAvatar
    }
    async transformAvatar(pathFile) {
        const pic = await jimp.read(pathFile)
        await pic
            .autocrop()
            .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
            .writeAsync(pathFile)
    }
    async saveAvatar({ idUser, file }) {
        await this.transformAvatar(file.path)
        const folderUserAvatar = path.join(this.folderAvatar, idUser)
        await createFolderIsNotExist(folderUserAvatar)
        await fs.rename(file.path, path.join(folderUserAvatar, file.filename))
        return path.normalize(path.join(idUser,file.filename))
    }
}
export default UploadAvatarService