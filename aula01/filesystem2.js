import fs from 'fs';

try {
    console.log(1);
    fs.writeFileSync('teste2.txt', 'bla bla bla');
    console.log(2);
    const data = fs.readFileSync('teste2.txt', 'UTF-8');
    console.log(data);
    console.log(3);
} catch (error) {
    console.log(error);
}