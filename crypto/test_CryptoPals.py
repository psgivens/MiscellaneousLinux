
import unittest
from CryptoPals import *


class CryptoTests(unittest.TestCase):
    def test_hextToBase64(self):
        self.assertEqual(
            b'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t',
            hexToBase64(
                '49276d206b696c6c696e6720796f757220627261696e206c696b652061207'+
                '06f69736f6e6f7573206d757368726f6f6d')) 

    def test_xorStrings(self):
        self.assertEqual(
            '746865206b696420646f6e277420706c6179',
            xorStrings('1c0111001f010100061a024b53535009181c',
                        '686974207468652062756c6c277320657965'))

    def test_decodeByCharacter(self):
        self.assertEqual("Cooking MC's like a pound of bacon",
            decodeByCharacter('1b37373331363f78151b7f2b783431333d783978283'+
                              '72d363c78373e783a393b3736'))

if __name__ == '__main__':
    unittest.main()






