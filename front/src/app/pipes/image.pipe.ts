import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return 'http://localhost:8000/uploads/' + value;
    }

    return '/assets/images/no_image_available.jpg';
  }

}
