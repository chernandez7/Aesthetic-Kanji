import sys
import time
from queue import Queue
import requests
from bs4 import BeautifulSoup

start = time.time()
item_count = 0
url = "https://nihongoichiban.com/2011/04/10/complete-list-of-kanji-for-jlpt-n5/"

file = open("N5.json", "w+")
file.write("{\n\t\"Kanji\": {\n\t\"N5\": [\n")
print('Processing "{}"...\n'.format(url))

response = requests.get(url)
html = response.content
soup = BeautifulSoup(html, "html.parser")
table = soup.find("table")

# Loop over table
list_of_rows = []
for row in table.findAll("tr")[1:]:
    item_count += 1
    list_of_cells = []
    for cell in row.findAll("td")[1:]:
        #for a in cell.findAll("td"):
            #list_of_cells.append(name)
        list_of_cells.append(cell.text)

for a in list_of_cells:
    file.write(a)
    """{ Example
      "kanji": "四",
      "onyomi": "shi",
      "kunyomi": "yo(ttsu), yu(tsu), yo-, yon-",
      "meaning": "four",
      "img": "one"
    },"""

    #file.write("\{\n"kanji": {},\n"onyomi": {},\n"kunyomi": {},\n"meaning": {},\n"img": {},\n\},".format(input))

del list_of_rows[:]
del list_of_cells[:]

file.write("]\n}\n}")
file.close()

end = time.time()
print ("Finished processing {} items in {} seconds".format(str(item_count), str(end - start)))
