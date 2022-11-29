import Application from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import fs from 'fs';

export default class ImageController {
  async image({ request, response }: HttpContextContract) {
    const { img_path } = request.qs();

    if (fs.existsSync(Application.publicPath(img_path))) {
      return response.download(Application.publicPath(img_path));
    }

    return response.status(404).json({ message: 'Image not found' });
  }
}
