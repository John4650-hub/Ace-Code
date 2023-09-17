'''
update automatically to a the change log for every build
'''

P1="www/js/components/tabs/changeLog.js"
P2=".github/workflows/build.yml"
P3="sample.txt"
def read_file(path):
    '''
    return file content
    '''
    with open(path,'r',encoding='utf-8') as f_hand:
        return f_hand.read()
def write_file(path,new_content):
    '''
    write content to file
    '''
    with open(path,'w',encoding='utf-8') as file_handle:
        file_handle.write(new_content)
        file_handle.close()


content = read_file(P1)
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
write_file(P1,newUpdate)

content_2 = read_file(P2)
pos2 = content_2.find(' #release')
newUpdate = content_2.replace(content_2[pos2-6:pos2],version)
write_file(P2,newUpdate)

write_file(P3,INFO)
