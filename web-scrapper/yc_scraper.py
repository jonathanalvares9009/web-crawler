import requests, os, time, re
from bs4 import BeautifulSoup
from selenium import webdriver

def render_spa(url):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=options)

    driver.get(url)

    # Scroll down the page to trigger dynamic content loading
    SCROLL_PAUSE_TIME = 2  # Adjust this value based on the loading speed of the SPA
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    rendered_html = driver.page_source
    driver.quit()

    return rendered_html


def get_yc_companies(url):
    # Send a GET request to the URL
    response = render_spa(url)
    # Check if the request was successful
    if response:
        # Parse the HTML content using Beautiful Soup
        soup = BeautifulSoup(response, "html.parser")

        # Check if tag has href attribute and class name is _company_1xm0u_341
        a_tags = soup.find_all("a", {"href": True, "class": re.compile("_company.*")})

        # Check if href starts with /companies/*
        company_links = [a["href"] for a in a_tags if a["href"].startswith("/companies/")]

        # Create a list of company URLs
        company_urls = [f"https://ycombinator.com{link}" for link in company_links]

        return company_urls
    else:
        print("Failed to retrieve the web page")


def parser(url):
    company_urls = get_yc_companies(url)

    external_company_urls = []
    for company_url in company_urls:
        response = render_spa(company_url)
        soup = BeautifulSoup(response, "html.parser")
        # Get all the a tags with href attribute
        a_tags = soup.find_all("a", {"href": True})
        for a in a_tags:
            # Check if the a tag has a svg tag as a child
            if a["href"].startswith("http") and a.find("path", {"stroke-linecap": "round", "stroke-linejoin": "round", "d": "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"}):
                external_company_urls.append(a["href"])

    return external_company_urls

if __name__ == "__main__":
    external_company_urls = parser("https://www.ycombinator.com/companies?query=payment%20fraud")
    try:
        with open("../output/yc_companies.txt", "w") as f:
            for url in external_company_urls:
                f.write(url + "\n")
    except Exception as e:
        print(e)
