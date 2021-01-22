const fs = require('fs');
const path = require('path');

const fsp = fs.promises; //Работа с файловой системой основанная на промисах

const dirPath = path.resolve(__dirname, '/temp');//__dirname - абсолютный путь к каталогу
const filePath = path.resolve(dirPath, 'trolleybus-park.json');

const readData = async () => {
    if(!fs.existsSync(filePath)) {
        if(!fs.existsSync(dirPath)) {
            await fsp.mkdir(dirPath);
        }

        const file = await fsp.open(filePath, 'w');
        await file.write('[]');
        await file.close();
        return [];
    }

    const data = await fsp.readFile(filePath, {encoding:'utf-8'});
    return JSON.parse(data);
};

const writeData = async (data) => {
    if(data === undefined) return;
    if(!fs.existsSync(dirPath)) {
        await fsp.mkdir(dirPath);
    }
    await fsp.writeFile(filePath, JSON.stringify(data),'utf-8');
};

module.exports = {
    readData,
    writeData
};