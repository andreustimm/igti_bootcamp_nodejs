import fs from 'fs';

console.log(1);

fs.writeFile('teste1.txt', 'bla bla bla', (err) => {
    console.log(2);

    if (err) {
        console.log(err);
    } else {
        fs.appendFile('teste1.txt', ' xxxxx ', (err) => {
            if (err) {
                console.log(err);
            } else {
                fs.readFile('teste1.txt', 'UTF-8', (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }
});

console.log(3);