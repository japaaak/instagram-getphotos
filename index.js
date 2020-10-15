const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/a_haruaki');

    const imgList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img');

        const imgArray = [...nodeList];

        const imgList = imgArray.map(img => ({
            src: img.src,
            alt: img.alt
        }));

        return imgList;
    });

    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if (err) throw new Error('eerrooooor');

        console.log('nice!');
    })

    await browser.close();
})();

