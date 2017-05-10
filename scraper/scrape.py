import sys
import codecs
import time
from queue import Queue
import requests
from bs4 import BeautifulSoup

start = time.time()
item_count = 0
url = "https://nihongoichiban.com/2014/07/22/complete-list-of-kanji-for-jlpt-n3/"

def write_to_file(input):
    """Loop to write each row in table"""
    file.write("{0}\n".format('{'))
    file.write("\"kanji\": \"{0}\",\n\"onyomi\": \"{1}\",\n\"kunyomi\": \"{2}\",\n\"meaning\": \"{3}\",".format(*(str(i) for i in input)))
    file.write("\n\"img\": \"{0}\"".format('one'))
    file.write("\n{0}".format('},'))

with codecs.open("N3.json", "w", "utf-8") as file:
    file.write("{\n\"Kanji\": {\n\"N3\": [\n")
    print('Processing "{}"...\n'.format(url))

    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html)

    # http://stackoverflow.com/questions/36833357/python-correct-encoding-of-website-beautiful-soup
    encoding = response.encoding if 'charset' in response.headers.get('content-type', '').lower() else None
    soup = BeautifulSoup(html, from_encoding=encoding)

    table = soup.find("table")

    # Loop over table
    list_of_rows = []
    for row in table.findAll("tr")[1:]:
        list_of_cells = []
        for cell in row.findAll("td")[1:]:
            list_of_cells.append(cell.text)

        item_count += 1
        write_to_file(list_of_cells)
        del list_of_rows[:]
        del list_of_cells[:]

    file.write("]\n}\n}")
    file.close()

end = time.time()
print ("Finished processing {} items in {} seconds".format(str(item_count), str(end - start)))
