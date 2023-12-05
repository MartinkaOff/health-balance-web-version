import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IFileAvatar } from '../models/IFiles'
import { typeImage } from '../utils/enums'

export default class FileService {
  static async uploadImage(
    image: Blob,
    type: typeImage
  ): Promise<AxiosResponse<IFileAvatar>> {
    return $api.post(
      `images?type=${type}&token=${localStorage.getItem('token')}`,
      { image: image },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}
