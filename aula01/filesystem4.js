import { promises as fs} from 'fs';

async function init() {
    try {
        await fs.writeFile('teste4.txt', 'bla bla bla');
        await fs.appendFile('teste4.txt', ' xxxxxx');

        const data = await fs.readFile('teste4.txt', 'utf-8');

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

init();