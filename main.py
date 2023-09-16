'''
update automatically to a the change log for every build
'''

P="www/js/components/tabs/changeLog.js"
with open(P,'r',encoding='utf-8') as fhand:
    content = fhand.read()

version = input("Enter version name:")
line = []
print("What's new: ")
while True:
    info=input()
    if not info:
        break
    line.append('\u2705'+info)
INFO = ''
for l in line:
    INFO += l+"\n" 
MSG = f",{{version:'{version}',info: `{INFO}`}}"
pos = content.find("}\n]")+1
newUpdate = content[:(pos)] + MSG + content[(pos):]

with open(P,'w',encoding='utf-8') as fl:
    fl.write(newUpdate)
