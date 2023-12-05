import { Camera, CameraResultType} from '@capacitor/camera'
import { useState } from 'react'
import FileService from '../services/FilesServices'
import { showToast } from '../utils/common-functions'
import { typeImage } from '../utils/enums'
import axios from 'axios'

export const useLoadImage = () => {
  const [image, setImage] = useState<any>('')
  const [photoPath, setPhotoPath] = useState<any | null>(null)
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false)

  const clearImages = () => {
    setIsLoadingAvatar(false)
    setPhotoPath('')
    setImage('')
  }

  const uploadImage = async (type: typeImage) => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        promptLabelPhoto: 'Выбрать фото из галерии',
        promptLabelPicture: 'Сделать фотографию',
        promptLabelHeader: 'Фото',
        promptLabelCancel: 'Отмена'
      })
      setIsLoadingAvatar(true)
      let imageUrl = image.webPath || ''
      let blob = await fetch(imageUrl).then((r) => r.blob())
      if (blob) {
        const response = await FileService.uploadImage(blob, type)
        if (response?.data?.data?.avatar) {
          setPhotoPath(imageUrl)
          setImage(response.data.data.avatar)
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        await showToast('Максимальный вес изображения  3 мб')
      }
      if (error.errorMessage === 'Error loading image') {
        await showToast('Максимальный вес изображения  3 мб')
      }
      clearImages()
    } finally {
      setIsLoadingAvatar(false)
    }
  }

  return {image, photoPath, isLoadingAvatar, clearImages, uploadImage} as const
}
