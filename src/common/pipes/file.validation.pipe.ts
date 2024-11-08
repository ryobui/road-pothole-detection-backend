import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    /**
     * Pipe to validate uploaded files based on size and type.
     * @param fieldName - Field name file upload.
     *
     * @param maxSize - Maximum allowed file size in bytes (displayed in MB in error messages).
     *                  Note: Pass this value in bytes when creating the instance (e.g., 5 * 1024 * 1024 for 5 MB).
     * @param allowedTypes - Array of allowed file types (e.g., ['jpeg', 'png']).
     */
    constructor(
        private readonly fieldName: string,
        private readonly maxSize: number,
        private readonly allowedTypes: string[],
    ) {}

    transform(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException({ [this.fieldName]: ['File is required'] });
        }

        if (file.size > this.maxSize) {
            throw new BadRequestException({
                [this.fieldName]: [
                    `File size should not exceed ${this.maxSize / (1024 * 1024)} MB`,
                ],
            });
        }

        const fileType = file.mimetype.split('/')[1];
        if (!this.allowedTypes.includes(fileType)) {
            throw new BadRequestException({
                [this.fieldName]: [
                    `File type should be one of the following: ${this.allowedTypes.join(', ')}`,
                ],
            });
        }
        return file;
    }
}
