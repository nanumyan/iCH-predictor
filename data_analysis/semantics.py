from collections import OrderedDict

def checkPower(colors):
	cnt = dict(Vigorous = 0, Powerful = 0, Robust = 0, Strong = 0)
	
	for h, s, l in colors:
		if h <= 30 and s > 75 and s <= 100 and l >= 40 and l <= 60:
			cnt['Vigorous'] += 1			
		elif h == 0 and s > 75 and s <= 100 and l >= 40 and l <= 60:
			cnt['Powerful'] += 1
		elif h == 0 and ((s >= 50 and s <= 75 and l >= 30 and l <= 60) or 
					(s >= 75 and s <= 100 and l > 30 and l < 40)):
			cnt['Robust'] += 1
		elif h == 0 and s == 100 and l >= 12 and l < 30:
			cnt['Strong'] += 1				
	return cnt
			
def checkPassion(colors):
	cnt = dict(Passionate = 0, Desirous = 0, Romantic = 0, Sensitive = 0)
	
        for h, s, l in colors:
		if (h == 0 or h == 330) and s > 75 and s <= 100 and l >= 40 and l <= 60:
			cnt['Passionate'] += 1
		elif h > 330 and s > 75 and s <= 100 and l >= 40 and l <= 60:
			cnt['Desirous'] += 1
		elif (h == 0 or h >= 350) and ((s <= 75 and s >= 50 and l <= 70 and l >= 40) or 
				(s <= 100 and s >= 75 and l <= 70 and l >= 60)):
			cnt['Romantic'] += 1
		elif (h == 0 or h >= 350) and ((s <= 50 and s >= 25 and l <= 90 and l >= 40) or
				(s <= 100 and s >= 50 and l <= 90 and l >= 70)):
			cnt['Sensitive'] += 1
	return cnt
		
def checkEnergy(colors):
	cnt = dict(Explosive = 0, Exciting = 0, Energetic = 0, Lively = 0)
	
	for h, s, l in colors:
		if h <= 60 and s <= 100 and s >= 75 and l <= 60 and l >= 40:
			cnt['Explosive'] += 1
		elif h >= 25 and h <= 30 and s <= 100 and s >= 75 and l <= 60 and l >= 40:
			cnt['Exciting'] += 1
		elif h == 30 and ((s <= 75 and s >= 50 and l <= 70 and l >= 40) or
				(s <= 100 and s >= 75 and l <= 70 and l >= 60)):
			cnt['Energetic'] += 1
		elif h == 30 and ((s <= 50 and s >= 25 and l <= 90 and l >= 40) or 
				(s <= 100 and s >= 50 and l <= 90 and l >= 70)):
			cnt['Lively'] += 1
	return cnt
		
def checkJoy(colors):
	cnt = dict(Frantic = 0, Ecstatic = 0, Jolly = 0, Cheerful = 0)
	
	for h, s, l in colors:
		if (h >= 60 and h <= 150) and s <= 100 and s >= 75 and l <= 60 and l >= 40:
			cnt['Frantic'] += 1
		elif (h >= 60 and h <= 75) and s <= 100 and s >= 75 and l <= 60 and l >= 40:
			cnt['Ecstatic'] += 1
		elif h == 60 and ((s <= 75 and s >= 50 and l <= 70 and l >= 40) or 
				(s <= 100 and s >= 75 and l <= 70 and l >= 60)):
			cnt['Jolly'] += 1
		elif h == 60 and ((s <= 50 and s >= 25 and l <= 80 and l >= 40) or 
				(s <= 100 and s >= 50 and l <= 80 and l >= 70)):
			cnt['Cheerful'] += 1
	return cnt
	
def checkEase(colors):
	cnt = dict(Easeful = 0, Content = 0, Mellow = 0)
	
	for h, s, l in colors:
		if h == 90 and s <= 90 and l <= 70 and l >= 10:
			cnt['Easeful'] += 1
		elif h == 120 and s >= 90:
			cnt['Content'] += 1
		elif h >= 60 and h <= 90 and s == 100 and l <= 6:
			cnt['Mellow'] += 1
	return cnt

def checkLight(colors):
	cnt = dict(Luminous = 0, Misty = 0, Deep = 0)
	
	for h, s, l in colors:
		if h >= 90 and h <= 240 and s >= 75 and l >= 40:
			cnt['Luminous'] += 1
		elif h >= 210 and h <= 240 and s <= 90 and l <= 30 and l >= 10:
			cnt['Misty'] += 1
		elif h >= 180 and h <= 220 and s == 100 and l <= 6:
			cnt['Deep'] += 1
	return cnt
	
def checkBlue(colors):
	cnt = dict(Tranquil = 0, Calm = 0, Soothing = 0)
	
	for h, s, l in colors:
		if h >= 210 and h <= 220 and s <= 100 and s >= 75 and l <= 50 and l >= 20:
			cnt['Tranquil'] += 1
		elif (h >= 210 and h <= 230) and ((s <= 75 and s >= 50 and l <= 70 and 
			l >= 40) or (s <= 100 and s >= 75 and l <= 70 and l >= 60)):
			cnt['Calm'] += 1
		elif (h >= 210 and h <= 235) and ((s <= 30 and s >= 15 and l <= 100 and 
			l >= 50) or (s <= 100 and s >= 50 and l <= 100 and l >= 70)):
			cnt['Soothing'] += 1
	return cnt

def checkTemp(colors):
	cnt = dict(Warm = 0, Subtle = 0, Cool = 0, Cold = 0)
	
	for h, s, l in colors:
		if h >= 0 and h <= 60 and s == 100:
			cnt['Warm'] += 1
		elif h > 60 and h < 150 and s == 100:
			cnt['Subtle'] += 1
		elif h >= 150 and h < 240 and s == 100:
			cnt['Cool'] += 1
		elif h >= 240 and h <= 270 and s == 100:
			cnt['Cold'] += 1				
	return cnt

def checkPurity(colors):
	cnt = dict(Intricate = 0, Bold = 0, Innocent = 0, Pure = 0)
	
	for h, s, l in colors:
		if s <= 25 and l <= 5:
			cnt['Intricate'] += 1
		elif (h == 0 or h >= 330) and s >= 90 and l <= 15 and l >= 6:
			cnt['Bold'] += 1
		elif l >= 60 and l <= 80 and s >= 50 and s <= 75:
			cnt['Innocent'] += 1
		elif (h == 0 or h >= 300) and l >= 90 and s <= 25:
			cnt['Pure'] += 1
	return cnt


def orderedsem(colors):
        semantics = OrderedDict()
        semantics.update( checkTemp(colors) )
        semantics.update( checkLight(colors) )
        semantics.update( checkEnergy(colors) )
        semantics.update( checkPower(colors) )
        semantics.update( checkPurity(colors) )
        semantics.update( checkBlue(colors) )
        semantics.update( checkEase(colors) )
        semantics.update( checkJoy(colors) )

        return semantics
        
def checkAll(colors):
        return orderedsem(colors).values()
        
def semanticsNames():                
        return dict(enumerate( orderedsem([[0,0,0],[0,0,0],[0,0,0]]).keys() ))