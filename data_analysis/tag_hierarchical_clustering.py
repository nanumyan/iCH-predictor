# -*- coding: utf-8 -*-
# <nbformat>3.0</nbformat>

# <codecell>

import json
import os
import pprint
for filename in os.listdir('jsons'):
    print filename

# <codecell>

preys = json.load(open('jsons/preys.json','r'))
print 'n preys:', len(preys)

feeds = []

for prey in preys:
    if prey['descr'] and prey['tags'] and prey['link']:
        feeds.append(prey)
        
print len(feeds)

# <codecell>

from itertools import permutations
from collections import Counter

tag_groups = [feed['tags'] for feed in feeds]

tags = [item for sublist in tag_groups for item in sublist]

tags_set = []
for tag in tags:
    if tag not in tags_set:
        tags_set.append(tag)

# <codecell>

tag_map = { tag:n for n, tag in enumerate(tags_set)}
tag_map_inv = {v:k for k, v in tag_map.items()}

# <codecell>

tag_groups_mapped = map(lambda gr: [tag_map[t] for t in gr], tag_groups)

# <codecell>

tag_perm = map(lambda x: permutations(x, 2), tag_groups_mapped)

# <codecell>

tag_permutations = []

for t in tag_perm:
    tag_permutations.extend(list(t))

# <codecell>

c = Counter(tag_permutations)
c.most_common(10)

# <codecell>

tag_cooccur_matrix = np.zeros( (len(tag_map), len(tag_map)) )

# <codecell>

i = 0
for k, v in c.iteritems():
    tag_cooccur_matrix[k] = v

# <codecell>

tag_dist_matrix = tag_cooccur_matrix.max() - tag_cooccur_matrix

# <codecell>

np.fill_diagonal(tag_dist_matrix, 0)

# <codecell>

from scipy.spatial.distance import squareform
tag_dist = squareform(tag_dist_matrix)

# <codecell>

from scipy.cluster.hierarchy import single

# <codecell>

tag_linkage = single(tag_dist)

# <codecell>

np.save('tag_linkage',tag_linkage)

# <codecell>

from scipy.cluster.hierarchy import leaves_list, to_tree, dendrogram

# <codecell>

tag_closeness_id = leaves_list(tag_linkage)

# <codecell>

tag_closeness = []
for i in tag_closeness_id[::-1]:
    tag_closeness.append(tag_map_inv[i])

# <codecell>

with open('tag_single_linkage.dat','w') as f:
    for i, tag in enumerate(tag_closeness):
        f.write( '%i\t%s\n' % (i, tag.encode('utf8')) )

# <codecell>


