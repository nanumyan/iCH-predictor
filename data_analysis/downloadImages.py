import json

from getPhotos import getImageFromURL
#from getColors import colorz
#from colorsys import rgb_to_hsv
#from colormath.color_conversions import convert_color
#from colormath.color_objects import sRGBColor, HSLColor, HSVColor
import urllib2
import os.path


preys    = json.load(open('subjsons/preys.json','r'))
prey_ids = [prey['id'] for prey in preys]

#fRGB = open('RGBcolors.txt', 'a')
#fHSV = open('HSVcolors.txt', 'a')

for pid in prey_ids:

    if os.path.isfile('images/%s'%pid):
        print 'there'
        continue
    
    #ich url containing the prey photo
    purl = 'https://www.icoolhunt.com/prey/%d' % pid

    #downloads the photo to images/ dir
    try:
        getImageFromURL(purl, str(pid), 'images1/')
    except urllib2.HTTPError:
        with open('processError1.log', 'a') as err:
            err.write('%s\t%s\n' % (pid, 'HTTP Error'))
        continue

#fRGB.close()
#fHSV.close()
