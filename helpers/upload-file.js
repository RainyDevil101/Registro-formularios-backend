const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validatesExtension = ['png', 'jpg', 'jpeg'], folder = '') => {

    console.log(files);
    return new Promise((resolve, reject) => {

        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];


        //Validate extension

        if (!validatesExtension.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${validatesExtension}`);
        }

        console.log('a');

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( tempName );
        });

    });



}

module.exports = {
    uploadFile
}