# Web Crawler

## Description
This is a web crawler that crawls the website and displays it.

## Installation for web-crawler
1. Clone the repository
2. Install the requirements (`npm i`)
3. Run `npm start <URL>` to crawl through a URL
4. Run `npm start --yc-companies` to crawl through YC companies

## Installation for web-scrapper
1. In a new terminal cd into the folder
2. Run `virtualenv venv` to create a virtual env
3. Run `source venv/bin/activate` to activate the virtual env
4. Run `pip install -r requirements` to install the requirements

Now to scrape a website, run `python main.py` and follow the instructions provided in the terminal.

Now to find YC companies run `yc_scrapper.py` and this will create a file called yc_companies.txt in the output folder which is a dependency for the `--yc-companies` parameter in the web-crawler which recursively crawls through the YC websites.

