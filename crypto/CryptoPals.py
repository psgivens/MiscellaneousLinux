
import base64
import requests
import itertools

def hexToBase64(line):
    return base64.b64encode(bytes.fromhex(line))

def xorStrings(hex1,hex2):
    return "%02x" % (int(hex1,16) ^ int(hex2,16))

def singleByteXor(line):
    return [line[i:i+2] for i in range(0, len(line), 2)]


#def decodeByCharacter(line):
#    # identify the most common letters in English
#    commonLetters = ' etaoiETAOInshrdluNSHRDLU'
#    #commonLetters = ' etaoiETAOI'
#
#    # Convert text to bytes
#    charbytes = bytes.fromhex(line)
#
#    # count bytes
#    charcount = {}
#    for cb in charbytes:
#        if cb in charcount:
#            charcount[cb] += 1
#        else:
#            charcount[cb] = 1
#
#    # sort by count
#    sortedCount = [(key, charcount[key]) 
#        for key in sorted(charcount, key=charcount.get, reverse=True)]
#
#    # iterate over most common letters in phrase and most common 
#    # letters in English
#    for topKey, topValue in sortedCount:
#        for letter in commonLetters:
#            # find the key character based on common letters
#            keyChar = ord(letter) ^ topKey
#
#            # calculate the values based on the supplied keyChar
#            values = [(keyChar ^ val) for val in charbytes]
#
#            # verify a valid string based on alpha-numeric characters 
#            # and some others. 
#            #n = next(filter(lambda i: 
#            #            (i!=32 and i!=39 and i<48) 
#            #            or (i>57 and i<66) 
#            #            or (i>90 and i<97)
#            #            or i>122, values), None)
#            #if n == None:
#            #    a = ''.join([chr(v) for v in values])
#            #    return a
#
#            a = ''.join([chr(v) for v in values]).strip()
#            n = next(filter(lambda i: i>122, values), None)
#            if n == None and a.isprintable():
#                return a
#
#def scoreText(line):
#    commonLetters = [' etaoi', 'ETAOI', 'nshrdlu', 'NSHRDLU']
#
#    # count bytes
#    charcount = {}
#    for cb in line:
#        if cb in charcount:
#            charcount[cb] += 1
#        else:
#            charcount[cb] = 1
#
#    # sort by count
#    sortedCount = [(key, charcount[key]) 
#        for key in sorted(charcount, key=charcount.get, reverse=True)]
#
#    score = 0;
#    
#    for ch, i in sortedCount[:5]:
#        for j, letters in enumerate(commonLetters):
#            weight = 5 - j
#            if ch in letters:
#                score += i*weight 
#    
#    print ("%s %d" % (line, score))




def decodeByCharacter2(line):
    # identify the most common letters in English
    commonLetters = ['etaoi', 'ETAOI', 'nshrdlu', 'NSHRDLU']

    # Convert text to bytes
    charbytes = bytes.fromhex(line)

    # count bytes
    charcount = {}
    for cb in charbytes:
        if cb in charcount:
            charcount[cb] += 1
        else:
            charcount[cb] = 1

    # sort by count
    sortedCount = [(key, charcount[key]) 
        for key in sorted(charcount, key=charcount.get, reverse=True)]

    # iterate over most common letters in phrase and most common 
    # letters in English
    candidates = {}
    for topKey, topValue in sortedCount[:5]:
        for letter in (commonLetters[0] + commonLetters[1]):

            # find the key character based on common letters
            keyChar = ord(letter) ^ topKey

            # calculate the values based on the supplied keyChar
            values = [(keyChar ^ val) for val in charbytes]

            # verify a valid string based on alpha-numeric characters 
            # and some others. 
            #n = next(filter(lambda i: 
            #            (i!=32 and i!=39 and i<48) 
            #            or (i>57 and i<66) 
            #            or (i>90 and i<97)
            #            or i>122, values), None)
            #if n == None:
            #    a = ''.join([chr(v) for v in values])
            #    return a

            a = ''.join([chr(v) for v in values]).strip()
            n = next(filter(lambda i: i>122, values), None)
            if n == None and a.isprintable():
                score = 0;
                for j, letters in enumerate(commonLetters):
                    weight = 5 - j
                    if chr(topKey) in letters:
                        score += topValue * weight 
                candidates[(keyChar, a)] = score 

    return [(keychar, text, candidates[(keychar,text)]) 
        for (keychar, text)  
        in sorted(candidates, key=candidates.get, reverse=True)]
        #score = candidates[(keychar, text)]
        #print ("%c %s %d" % (keychar, text, score))
    


def findEncrypted(url):
    response = requests.get(url)
    for line in response.text.split('\n'):
        # python prints b' at the beginning fo binary lines
        result = decodeByCharacter2(line[2:])
        if (result): return result
       
def findEncrypted2(url):
    response = requests.get(url)
    for line in response.text.split('\n'):
        # python prints b' at the beginning fo binary lines
        result = decodeByCharacter2(line[2:])
        if (result): return result
       
def iceEncode(text):
    key = 'ICE'
    value = ''
    for i, c in enumerate(text):
        k = key[i%3]
        t = ord(c) ^ ord(k)
        #print ("%c %c %02x" % (k, c, t))
        value += "%02x" % t
    return value

def getBitDiff(a, b):
    diff = a ^ b
    return 0 \
        + (diff & 0x01 > 0) \
        + (diff & 0x02 > 0) \
        + (diff & 0x04 > 0) \
        + (diff & 0x08 > 0) \
        + (diff & 0x10 > 0) \
        + (diff & 0x20 > 0) \
        + (diff & 0x40 > 0) \
        + (diff & 0x80 > 0) 
        
def getHammingDistanceString(one, two):
    return sum(getBitDiff(ord(a),ord(b)) for (a, b) in zip(one, two))

#'this is a test', 'wokka wokka!!!')
def getHammingDistance(one, two):
    return sum(getBitDiff(a,b) for (a, b) in zip(one, two)) / len(one)

def getKeySize(url):
    response = requests.get(url)
    payload = base64.b64decode(response.text)
    keySizes = {}
    for s in range (2, 40):
        h = getHammingDistance(payload[:s], payload[s:2*s])
        keySizes[s] = h
    return [key for key in sorted(keySizes, key=keySizes.get)]

def getCryptoKey(url):
    keySize = getKeySize(url)[0]
    print (keySize)
    response = requests.get(url)
    payload = base64.b64decode(response.text)

    values = []
    for b in payload[:keySize]:
        values.append([b])
    payload = payload[keySize:]
    for i in range(len(payload)):
        values[i%keySize] += [payload[i]]
    
    for value in values:
        print (value)
    

    #[print (chunk) for chunk in chunks]
    #print (type(payload))
    #print (len(payload))
    #print (payload[:4])
    #print (keySize)
    #print (payload)
    #keySizes = {}
    #for s in range (2, 40):
    #    h = getHammingDistance(payload[:s], payload[s:2*s])
    #    keySizes[s] = h
    #return [key for key in sorted(keySizes, key=keySizes.get)]
    

if __name__ == '__main__':
#    print (hexToBase64('49276d206b696c6c696e6720796f757220627261696'+
#            'e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'))
#    print (xorStrings('1c0111001f010100061a024b53535009181c',
#            '686974207468652062756c6c277320657965'))
#    print (decodeByCharacter('1b37373331363f78151b7f2b783431333d783'+
#            '97828372d363c78373e783a393b3736'))
#    print (findEncrypted("http://www.cryptopals.com/static/challenge-data/4.txt"))
    #print (findEncrypted2("http://www.cryptopals.com/static/challenge-data/4.txt"))
#    iceEncode('''
#Burning 'em, if you ain't quick and nimble
#I go crazy when I hear a cymbal'''.strip())
#    print (getHammingDistanceString('this is a test', 'wokka wokka!!!'))
#    print (getKeySize("http://www.cryptopals.com/static/challenge-data/6.txt"))
    #response = requests.get("http://www.cryptopals.com/static/challenge-data/6.txt")
    #[print ("%d %c" %(i,c)) for (i,c) in filter(lambda t:t[0]%5==0,enumerate(response.text))] 
    #decodeByCharacter(''.join([c for i,c in filter(lambda t:t[0]%5==0,enumerate(response.text))]))
    #for i, c in enumerate(text):
    #[print ("%c"% c) for i, c in enumerate(response.text)]
    
    #scoreText ("One flew over the cookoo's nest")
    #scoreText ("oNE fLEW OVER THE COOKOO'S NEST")
    #keys = getKeySize("http://www.cryptopals.com/static/challenge-data/6.txt")
    getCryptoKey("http://www.cryptopals.com/static/challenge-data/6.txt")
    #[print ("%d" % k) for k in keys]

    0





