import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: 'cursoswebrosemberg',
  api_key: '344497639637794',
  api_secret: 'KAQfHEYME527RFl2K3GtDpJfz9M',
  secure: true
})

describe('Name of the group', () => {
  
  test('should upload files correctly', async () => {
    
    const imageURL = 'https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb'
    const resp = await fetch( imageURL );
    const blob = await resp.blob()

    const file = new File([blob], 'imagetest.jpg')
    const url = await fileUpload(file)

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageID = segments[segments.length - 1].replace('.jpg', '')

    await cloudinary.api.delete_resources(['journal/' + imageID],{
      resource_type: 'image'
    } );
    
  });

  test('should return null', async () => {
    const file = new File([], 'testfile.jpg')
    const url = await fileUpload(file)

    expect(url).toBe(null);

  });
  
});