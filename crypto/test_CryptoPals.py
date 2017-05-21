
import unittest
from CryptoPals import *


class CryptoChallenge_Basic(unittest.TestCase):
    def test_set1_ch1_hextToBase64(self):
        self.assertEqual(
            b'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t',
            hexToBase64(
                '49276d206b696c6c696e6720796f757220627261696e206c696b652061207'+
                '06f69736f6e6f7573206d757368726f6f6d')) 

    def test_set1_ch2_fixedXorStrings(self):
        self.assertEqual(
            '746865206b696420646f6e277420706c6179',
            xorStrings('1c0111001f010100061a024b53535009181c',
                        '686974207468652062756c6c277320657965'))

    def test_set1_ch3_singleByteXorCipher(self):
        self.assertEqual("Cooking MC's like a pound of bacon",
            decodeByCharacter2('1b37373331363f78151b7f2b783431333d783978283'+
                              '72d363c78373e783a393b3736')[0][1])

    def test_set1_ch4_detectSingleCharacterXor(self):
        self.assertEqual("ow that the party is jumping",
            findEncrypted("http://www.cryptopals.com/static/challenge-data/4.txt")[0][1])

    def test_set1_ch5_implementRepeatingKeyXor(self):
        self.assertEqual('0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272'
                         'a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f',
            iceEncode('''
Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal'''.strip()))

    def test_set1_ch6_step2_hammingDistance(self):
        self.assertEqual(37, getHammingDistanceString('this is a test', 'wokka wokka!!!'))

    def test_set1_ch6_step4_shortestNormalizedDistance(self):
        self.assertEqual([5, 3, 2], getKeySize("http://www.cryptopals.com/static/challenge-data/6.txt")[:3])

    @unittest.skip("getCryptoKey is not fully implemented")
    def test_set1_ch6_step7_charKeysMakeFullKey(self):
        self.assertEqual([5, 3, 2], getCryptoKey("http://www.cryptopals.com/static/challenge-data/6.txt")[:3])

if __name__ == '__main__':
    unittest.main()






