
import base64

def hexToBase64(line):
    return base64.b64encode(bytes.fromhex(line))

def xorStrings(hex1,hex2):
    return "%x" % (int(hex1,16) ^ int(hex2,16))

def singleByteXor(line):
    return [line[i:i+2] for i in range(0, len(line), 2)]

def decodeByCharacter(line):
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

    # identify the most common letters in English
    commonLetters = ' etaoiETAOInshrdluNSHRDLU'

    # iterate over most common letters in phrase and most common 
    # letters in English
    for topKey, topValue in sortedCount:
        for letter in commonLetters:
            # find the key character based on common letters
            keyChar = ord(letter) ^ topKey

            # calculate the values based on the supplied keyChar
            values = [(keyChar ^ val) for val in charbytes]

            # verify a valid string based on alpha-numeric characters 
            # and some others. 
            n = next(filter(lambda i: 
                        (i!=32 and i!=39 and i<48) 
                        or (i>57 and i<66) or (i>90 and i<97)
                        or i>122, values), None)
            if n == None:
                a = ''.join([chr(v) for v in values])
                return a
        
        

#print (hexToBase64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'))
#print (xorStrings('1c0111001f010100061a024b53535009181c','686974207468652062756c6c277320657965'))
#print (decodeByCharacter('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'))



