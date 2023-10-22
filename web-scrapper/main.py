import requests, os, time
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

def parser(url):
    # Send a GET request to the URL
    response = render_spa(url)
    # Check if the request was successful
    if response:
        # Parse the HTML content using Beautiful Soup
        soup = BeautifulSoup(response, "html.parser")

        tags = {}

        for tag in soup.find_all():
            if tag.name == "script" or tag.name == "style" or tag.name == "head" or tag.name == "body" or tag.name == "html":
                continue
            # if tag present in tags, then add to the list
            if tag.name in tags:
                tags[tag.name].append(tag.text)
            # else create a new list
            else:
                tags[tag.name] = [tag.text]
        
        return tags
    else:
        print("Failed to retrieve the web page")


def save_parsed_result(folder_name, data):
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
        print(f"Folder '{folder_name}' created.")
    else:
        print(f"Folder '{folder_name}' already exists.")

    for key, content in data.items():
        file_name = f"{folder_name}/{key.replace('/', '.')}.txt"
        with open(file_name, 'w') as file:
            file.write(str(content))
        print(f"File '{file_name}' created with content.")
    

if __name__ == "__main__":
    file_name = input("Please pass the file name to read (eg: senseip): ")
    file_path = f"../output/{file_name}.txt"
    folder_name = f"../output/{file_name}"

    parsed_content = {}
    with open(file_path, 'r') as file:
        # Loop over each line in the file
        for line in file:
            url = f"https://{line.strip()}"
            parsed_content[line.strip()] = parser(url)
            # print(render_spa(url))

    

    save_parsed_result(folder_name, parsed_content)


