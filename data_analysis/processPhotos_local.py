import json

from getPhotos import getImageFromURL
from getColors import colorz
from colorsys import rgb_to_hsv
from colormath.color_conversions import convert_color
from colormath.color_objects import sRGBColor, HSLColor, HSVColor
import urllib2
import os

#preys    = json.load(open('subjsons/preys.json','r'))
#prey_ids = [prey['id'] for prey in preys]
#with open('out/RGBcolors.txt', 'r') as fRGB:
#        RGB = fRGB.readlines()

images = os.listdir('images')

n_clusters = 10

fRGB = open('RGB10colors.txt', 'a')
fHSL = open('HSL10colors.txt', 'a')

for pid in images[:10]:
    #write to file [pid - R1 - G1 - B1 - R2 - G2 - B2 - R3 - G3 - B3]

    #file to be analyzed
    filename = 'images/%s' % pid

    try:
        photoRGBColors = colorz(filename, n=n_clusters)
    except IOError:
        with open('processImageError.log', 'a') as err:
            err.write('%s\t%s\n' % (pid, 'image IOError'))
        continue

    #pid, R1,G1,B1, R2,G2,B2, R3,G3,B3 = map(int, prey.strip().split('\t'))
    #photoRGBColors = [[R1,G1,B1], [R2,G2,B2], [R3,G3,B3]]

    fRGB.write("%s\t" % pid + '\t'.join([("%s" % color) for sublist in photoRGBColors for color in sublist])+'\n')
        

    #convert to HSL
    photoHSLColors = [convert_color(sRGBColor(*c, is_upscaled=True), HSLColor) for c in photoRGBColors]
    
    #write to file [pid - H1 - S1 - L1 - H2 - S2 - L2 - H3 - S3 - L3]
    fHSL.write("%s\t" % pid  + '\t'.join(['\t'.join([str(color.hsl_h), str(color.hsl_s), str(color.hsl_l)]) for color in photoHSLColors])+'\n')
    print pid
        
fRGB.close()
fHSL.close()