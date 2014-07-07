import json

from getPhotos import getImageFromURL
from getColors import colorz
from colorsys import rgb_to_hsv
from colormath.color_conversions import convert_color
from colormath.color_objects import sRGBColor, HSLColor, HSVColor
import urllib2

preys    = json.load(open('subjsons/preys.json','r'))
prey_ids = [prey['id'] for prey in preys]

fRGB = open('RGBcolors.txt', 'a')
fHSV = open('HSVcolors.txt', 'a')

for pid in prey_ids[1787:]:
	#ich url containing the prey photo
	purl = 'https://www.icoolhunt.com/prey/%d' % pid
	
        #downloads the photo to images/ dir
        try:
            getImageFromURL(purl, str(pid), 'images/')
        except urllib2.HTTPError:
            with open('processError.log', 'a') as err:
                err.write('%s\t%s\n' % (pid, 'HTTP Error'))
            continue
	
	#file to be analyzed
	filename = 'images/%d' % pid
	
        #returns rgb colors, count=n
        try:
            photoRGBColors = colorz(filename, n=3)
        except IOError:
            with open('processError.log', 'a') as err:
                err.write('%s\t%s\n' % (pid, 'image IOError'))
            continue
	
	#write to file [pid - R1 - G1 - B1 - R2 - G2 - B2 - R3 - G3 - B3]
	fRGB.write("%d\t" % pid + '\t'.join([("%s" % color) for sublist in photoRGBColors for color in sublist])+'\n')
	
	#convert to HSV
	photoHSVColors = [convert_color(sRGBColor(*c), HSVColor) for c in photoRGBColors]
	
	#write to file [pid - H1 - S1 - V1 - H2 - S2 - V2 - H3 - S3 - V3]
	fHSV.write('%d\t' % pid + '\t'.join(['\t'.join([str(color.hsv_h), str(color.hsv_s), str(color.hsv_v)]) for color in photoHSVColors])+'\n')
	
fRGB.close()
fHSV.close()
